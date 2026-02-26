/**
 * Sneakr.lab - DATASTALGO
 * 3D sneaker mockup with rotation and real-time design preview
 * Updated: Mesh-based coloring only
 */

import { useRef, useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useDesign } from '../context/DesignContext';
import { useSubscription } from '../context/SubscriptionContext';
import { getSneakerAsset } from '../data/sneakerModelAssets';
import { getDesignTexture, getDesignOverrides } from '../utils/designTextures';

/** Target size so every model fits the viewport the same way */
const NORMALIZED_SIZE = 2;

function applyLayerColorsToScene(scene, designId, layerColors) {
  console.log('🎨 === COLOR APPLICATION START ===');
  console.log('Layer Colors:', layerColors);
  
  const texture = getDesignTexture(designId, layerColors.accent);
  const overrides = getDesignOverrides(designId, layerColors.accent);
  
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    
    // Skip Object_2 mesh
    if (child.name && child.name.toLowerCase().includes('object_2')) {
      console.log(`⏭️ Skipping mesh: "${child.name}"`);
      return;
    }
    
    // Log mesh names for debugging
    console.log(`\n📦 Found mesh: "${child.name || 'unnamed'}"`);
    
    const meshName = (child.name || '').toLowerCase();
    let targetColor = null;
    let zoneName = '';
    
    // Map mesh names to color zones - ORDER MATTERS!
    // Check most specific patterns first
    
    // Rims zone: Midsole rim & toe rim combined (check for 'rim' in name)
    if (meshName.includes('rim')) {
      targetColor = layerColors.midsoleRim;
      zoneName = 'RIMS (midsoleRim)';
    }
    // Toe Rim specifically
    else if (meshName.includes('toe')) {
      targetColor = layerColors.midsoleRim;
      zoneName = 'RIMS (toe)';
    }
    // Heel zone: Heel area (check BEFORE sole to avoid conflicts)
    else if (meshName.includes('heel')) {
      targetColor = layerColors.heel;
      zoneName = 'HEEL';
    } 
    // Sole zone: Bottom and midsole (but not midsole rim)
    else if (meshName.includes('sole') || meshName.includes('midsole')) {
      targetColor = layerColors.sole;
      zoneName = 'SOLE';
    } 
    // Laces zone - All laces (Laces, Laces2, Laces3, Laces4, etc.)
    else if (meshName.includes('lace')) {
      targetColor = layerColors.laces;
      zoneName = 'LACES';
    } 
    // Logos zone: Nike & Air logos combined
    else if (meshName.includes('logo')) {
      targetColor = layerColors.accent;
      zoneName = 'LOGOS (logo)';
    }
    else if (meshName.includes('air')) {
      targetColor = layerColors.accent;
      zoneName = 'LOGOS (air)';
    }
    else if (meshName.includes('swoosh') || meshName.includes('accent')) {
      targetColor = layerColors.accent;
      zoneName = 'LOGOS (swoosh/accent)';
    }
    // Upper zone: All Main Body meshes (Main Body1, Main Body2, Main Body3, etc.)
    else if (meshName.includes('main') && meshName.includes('body')) {
      targetColor = layerColors.upper;
      zoneName = 'UPPER (Main Body)';
    } 
    // Upper zone fallback: Other upper parts
    else if (meshName.includes('upper')) {
      targetColor = layerColors.upper;
      zoneName = 'UPPER';
    } 
    // Default: unnamed objects go to upper color
    else {
      targetColor = layerColors.upper;
      zoneName = 'UPPER (default)';
    }
    
    console.log(`  ✅ Zone: ${zoneName}`);
    console.log(`  🎨 Color: ${targetColor}`);
    
    if (targetColor) {
      const geometry = child.geometry;
      if (geometry.attributes.position) {
        const positions = geometry.attributes.position;
        const colors = new Float32Array(positions.count * 3);
        const color = new THREE.Color(targetColor);
        
        // Apply uniform color to all vertices
        for (let i = 0; i < positions.count; i++) {
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }
        
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.attributes.color.needsUpdate = true;
      }
    }
    
    // Handle both single material and material arrays
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    
    materials.forEach((mat, idx) => {
      if (!mat || typeof mat.clone !== 'function') return;
      
      const cloned = mat.clone();
      
      // Enable vertex colors
      cloned.vertexColors = true;
      
      // Apply texture if applicable
      if (texture) {
        cloned.map = texture;
        cloned.map.wrapS = cloned.map.wrapT = THREE.RepeatWrapping;
        cloned.map.needsUpdate = true;
      } else {
        cloned.map = null;
      }
      
      if (overrides.roughness !== undefined) {
        cloned.roughness = overrides.roughness;
      } else {
        cloned.roughness = 0.6;
      }
      
      cloned.metalness = 0.1;
      cloned.needsUpdate = true;
      
      // Update the material
      if (Array.isArray(child.material)) {
        child.material[idx] = cloned;
        child.material = [...child.material];
      } else {
        child.material = cloned;
      }
      
      child.material.needsUpdate = true;
    });
  });
}

function ShoeModel({ asset, modelId, designId, layerColors, hasWatermark }) {
  const { scene } = useGLTF(asset.url);
  const groupRef = useRef(null);

  // Store original materials to always clone from fresh source
  const originalMaterials = useRef(new Map());

  const { clonedScene, scaleFactor } = useMemo(() => {
    const s = scene.clone();
    const bbox = new THREE.Box3().setFromObject(s);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bbox.getCenter(center);
    bbox.getSize(size);
    s.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = NORMALIZED_SIZE / maxDim;
    
    // Store original materials
    originalMaterials.current.clear();
    s.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        originalMaterials.current.set(child, child.material.clone());
      }
    });
    
    return { clonedScene: s, scaleFactor: scale };
  }, [scene]);

  useEffect(() => {
    // Reset materials to original before applying new colors
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const originalMat = originalMaterials.current.get(child);
        if (originalMat) {
          child.material = originalMat.clone();
        }
      }
    });
    
    applyLayerColorsToScene(clonedScene, designId, layerColors);
  }, [clonedScene, designId, layerColors]);

  const rotX = asset.rotationX ?? 0;

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      rotation={[rotX, asset.rotationY, 0]}
      scale={1}
    >
      <group scale={scaleFactor}>
        <primitive object={clonedScene} />
      </group>
      {hasWatermark && (
        <mesh position={[0, 0.15 * scaleFactor, 0.25 * scaleFactor]}>
          <planeGeometry args={[0.4, 0.1]} />
          <meshBasicMaterial color="#fff" opacity={0.5} transparent />
        </mesh>
      )}
    </group>
  );
}

function Scene({ modelId, designId, layerColors, showWatermark }) {
  const asset = getSneakerAsset(modelId);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#888" wireframe />
          </mesh>
        }
      >
        <ShoeModel
          asset={asset}
          modelId={modelId}
          designId={designId}
          layerColors={layerColors}
          hasWatermark={showWatermark}
        />
      </Suspense>
      <OrbitControls enablePan={false} minPolarAngle={0.2} maxPolarAngle={Math.PI / 2} />
      <Environment preset="studio" />
    </>
  );
}

export function Mockup3D() {
  const { design } = useDesign();
  const { canRemoveWatermark } = useSubscription();
  const showWatermark = !canRemoveWatermark();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">🎨 3D Preview</h2>
        <p className="text-muted small mb-3">
          Rotate the shoe to view your custom design from all angles. All layer colors update in real-time!
        </p>

        <div
          ref={containerRef}
          className="rounded overflow-hidden bg-dark d-flex align-items-center justify-content-center"
          style={{ height: 320 }}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          <Canvas
            camera={{ position: [1.8, 1, 1.8], fov: 42 }}
            gl={{ antialias: true }}
            style={{ width: '100%', height: '100%', cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <Suspense fallback={null} key={design.modelId}>
              <Scene
                modelId={design.modelId}
                designId={design.designId}
                layerColors={design.layerColors}
                showWatermark={showWatermark}
              />
            </Suspense>
          </Canvas>
        </div>

        {showWatermark && (
          <p className="text-muted small mt-2 mb-0">
            Watermark removed for premium users.
          </p>
        )}
      </div>
    </section>
  );
}


