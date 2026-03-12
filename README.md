# 👟 Sneakr.lab

> **A full-stack sneaker customization platform with real-time 3D preview, AI-powered design assistance, and virtual try-on technology.**

![Status](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/React-19.2.4-61dafb.svg?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-black.svg?logo=three.js)
![Django](https://img.shields.io/badge/Django-6.0-092e20.svg?logo=django)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?logo=node.js)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development](#development)
- [License](#license)

---

## 🎯 Overview

**Sneakr.lab** is a modern web application that empowers users to design custom sneakers with an intuitive interface. Built as a **DATASTALGO Project**, it combines cutting-edge 3D rendering, AI-powered design assistance, and intelligent image processing to deliver a professional-grade customization experience.

### Key Capabilities

- 🎨 **Real-time 3D Customization** - Interactive sneaker design with live preview
- 🤖 **AI Design Assistant** - Get intelligent color scheme suggestions
- 📸 **Virtual Try-On** - See your custom sneakers on real photos using computer vision
- 💾 **Cloud Sync** - Save and share designs across devices
- 💎 **Subscription Tiers** - Flexible feature gating for free and premium users

---

## ✨ Features

### 🎨 3D Customizer
- **Multi-zone color customization**: Upper, sole, laces, and accent panels
- **Real-time 3D preview**: Powered by Three.js with smooth rotation and zoom
- **Multiple sneaker models**: Classic Low, High-Top, and more
- **Interactive controls**: Click-and-drag rotation, scroll to zoom
- **Texture support**: Solid colors with future support for patterns and materials

### 🤖 AI Design Assistant
- **Smart color suggestions**: AI-powered palette recommendations
- **Design inspiration**: Get creative ideas based on trends
- **Style matching**: Generates complementary color schemes
- **Context-aware**: Understands design principles and color theory

### 📸 Virtual Try-On
- **Intelligent image compositing**: Local processing without external APIs
- **Automatic foot detection**: Smart placement using computer vision
- **Realistic sizing**: Natural proportions and perspective
- **Visual enhancements**: Automatic shadows and lighting adjustments
- **Professional output**: High-quality renders with proper blending

### 💎 Subscription Tiers

#### Free Tier
- ✅ Classic Low sneaker model
- ✅ 5 basic color options
- ✅ Standard resolution export (1024x1024)
- ✅ 3 saved designs
- ⚠️ Watermark on virtual try-on

#### Premium Tier
- ✅ **All free features**
- ✅ 15+ premium colors
- ✅ All sneaker models
- ✅ HD export (2048x2048)
- ✅ Unlimited saved designs
- ✅ No watermarks
- ✅ Priority AI suggestions
- ✅ Advanced textures and materials

### 💾 Database & Sync
- **PostgreSQL backend**: Reliable design storage
- **User authentication**: Secure account management
- **Design history**: View and restore previous versions
- **Share by URL**: Generate shareable links for designs
- **Export options**: PNG, JSON configuration export

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.2.4
- **Routing**: React Router DOM 7.13.0
- **3D Engine**: Three.js 0.182.0
- **3D React**: React Three Fiber 9.5, React Three Drei 10.7
- **UI Components**: React Bootstrap 2.10, Bootstrap 5.3.8
- **State Management**: React Context API
- **HTTP Client**: Fetch API

### Backend Services

#### Node.js Server (Design Storage)
- **Runtime**: Node.js with Express.js 4.21
- **Database**: PostgreSQL 8.13
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv configuration

#### Django Server (AI & Try-On)
- **Framework**: Django 6.0.2
- **AI Integration**: Google Vertex AI (optional)
- **Image Processing**: Python Pillow (PIL)
- **API**: Django REST endpoints
- **CORS**: django-cors-headers

### Development Tools
- **Package Manager**: npm
- **Build Tool**: React Scripts 5.0.1
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+ (for Django backend)
- **PostgreSQL** 12+ (optional, for design storage)
- **Git** for version control

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/Sneakr.lab.git
cd Sneakr.lab
```

#### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### 3️⃣ Node.js Server Setup (Optional - for Design Storage)

```bash
cd ../server
npm install

# Create .env file
echo "DATABASE_URL=postgresql://username:password@localhost:5432/sneakrlab" > .env
echo "PORT=3001" >> .env

# Setup PostgreSQL database
createdb sneakrlab
psql sneakrlab -f schema.sql
```

#### 4️⃣ Django Backend Setup (Optional - for AI & Virtual Try-On)

```bash
cd ../backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.\.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers pillow
pip install google-cloud-aiplatform google-auth  # Optional for AI features

# Run migrations
python manage.py migrate

# Load fixtures (FAQ data)
python manage.py loaddata base/fixtures/faqs.json

# Create superuser (optional)
python manage.py createsuperuser
```

### Running the Application

You'll need **up to 3 terminal windows** depending on which features you want:

#### Terminal 1: React Frontend (Required)
```bash
cd frontend
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

#### Terminal 2: Node.js Server (Optional - Design Storage)
```bash
cd server
npm start
```
API at [http://localhost:3001](http://localhost:3001)

#### Terminal 3: Django Backend (Optional - AI & Try-On)
```bash
cd backend
.\.venv\Scripts\Activate.ps1  # Windows
python manage.py runserver
```
API at [http://localhost:8000](http://localhost:8000)

### 🎯 Quick Test

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click **"Start Customizing"**
3. Select colors for different sneaker zones
4. Rotate the 3D model by clicking and dragging
5. Try the **AI Helper** for color suggestions (requires Django backend)
6. Upload a photo for **Virtual Try-On** (requires Django backend)

---

## 📁 Project Structure

```
Sneakr.lab/
├── frontend/                      # React application (Main UI)
│   ├── public/
│   │   ├── index.html             # HTML entry point
│   │   ├── manifest.json          # PWA manifest
│   │   ├── models/                # 3D sneaker models (.glb)
│   │   └── *.png                  # Landing page assets
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── LandingPage.js     # Hero section and CTAs
│   │   │   ├── CustomizerPage.js  # Main customization interface
│   │   │   ├── TryOnPage.js       # Virtual try-on interface
│   │   │   ├── SneakerSetup.js    # Model selection
│   │   │   ├── ColorCustomizer.js # Color picker UI
│   │   │   ├── Mockup3D.js        # Three.js 3D viewer
│   │   │   ├── AIHelper.js        # AI design assistant
│   │   │   ├── SaveExport.js      # Save/export functionality
│   │   │   ├── OrderSummary.js    # Design summary card
│   │   │   └── SubscriptionTierToggle.js
│   │   ├── context/               # React Context state
│   │   │   ├── DesignContext.js   # Design state management
│   │   │   └── SubscriptionContext.js
│   │   ├── data/                  # Configuration files
│   │   │   ├── sneakerOptions.js  # Available models & colors
│   │   │   └── sneakerModelAssets.js
│   │   ├── services/
│   │   │   └── api.js             # API client for backends
│   │   ├── utils/
│   │   │   └── designTextures.js  # Texture utilities
│   │   ├── App.js                 # Main app component
│   │   └── index.js               # React entry point
│   └── package.json
│
├── server/                        # Node.js + Express (Design Storage)
│   ├── routes/
│   │   └── designs.js             # CRUD endpoints for designs
│   ├── db.js                      # PostgreSQL connection
│   ├── index.js                   # Express server
│   ├── schema.sql                 # Database schema
│   └── package.json
│
├── backend/                       # Django (AI & Virtual Try-On)
│   ├── backend/                   # Django project settings
│   │   ├── settings.py            # Configuration
│   │   ├── urls.py                # URL routing
│   │   └── wsgi.py
│   ├── base/                      # Main Django app
│   │   ├── models.py              # Database models
│   │   ├── views.py               # API views
│   │   ├── urls.py                # App-level routing
│   │   ├── admin.py               # Django admin config
│   │   └── fixtures/
│   │       └── faqs.json          # Sample FAQ data
│   ├── manage.py                  # Django CLI
│   └── db.sqlite3                 # SQLite database
│
├── src/                           # Source files (duplicates?)
├── service-account.json           # Google Cloud credentials (optional)
├── GEMINI-API-SETUP.md           # AI setup documentation
├── VIRTUAL-TRYON-SETUP.md        # Try-on feature docs
├── package.json                   # Root package config
└── README.md                      # This file
```

---

## 📡 API Documentation

### Node.js Server (Port 3001)

#### **POST** `/api/designs`
Save a new design.

**Request Body:**
```json
{
  "name": "My Cool Sneaker",
  "model": "classic-low",
  "colors": {
    "upper": "#FF5733",
    "sole": "#000000",
    "accent": "#FFFFFF"
  }
}
```

**Response:**
```json
{
  "id": 123,
  "name": "My Cool Sneaker",
  "created_at": "2026-03-12T10:30:00Z"
}
```

#### **GET** `/api/designs`
Retrieve all saved designs.

**Response:**
```json
[
  {
    "id": 123,
    "name": "My Cool Sneaker",
    "model": "classic-low",
    "colors": { ... },
    "created_at": "2026-03-12T10:30:00Z"
  }
]
```

#### **GET** `/api/designs/:id`
Get a specific design by ID.

### Django Backend (Port 8000)

#### **POST** `/api/ai-suggestions/`
Get AI-powered color recommendations.

**Request Body:**
```json
{
  "prompt": "vibrant summer colors"
}
```

**Response:**
```json
{
  "suggestions": [
    {"upper": "#FFD700", "sole": "#87CEEB", "accent": "#FF69B4"}
  ]
}
```

#### **POST** `/api/virtual-tryon/`
Generate virtual try-on image.

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `image`: Photo file (JPEG/PNG)
  - `design`: JSON string with sneaker colors

**Response:**
```json
{
  "result_image": "data:image/png;base64,iVBORw0KG..."
}
```

#### **GET** `/api/faqs/`
Get FAQ data.

---

## 🔧 Development

### Available Scripts

#### Frontend (`frontend/`)
```bash
npm start        # Development server (localhost:3000)
npm run build    # Production build
npm test         # Run Jest tests
npm run eject    # Eject from CRA (irreversible)
```

#### Node.js Server (`server/`)
```bash
npm start        # Start server (localhost:3001)
npm run dev      # Start with auto-reload (Node 18+)
```

#### Django Backend (`backend/`)
```bash
python manage.py runserver           # Start server (localhost:8000)
python manage.py migrate             # Run migrations
python manage.py createsuperuser     # Create admin user
python manage.py loaddata base/fixtures/faqs.json  # Load fixtures
```

### Environment Variables

**Frontend** (`.env` in `frontend/`):
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DJANGO_API_URL=http://localhost:8000
```

**Node.js Server** (`.env` in `server/`):
```env
DATABASE_URL=postgresql://username:password@localhost:5432/sneakrlab
PORT=3001
NODE_ENV=development
```

**Django Backend** (`.env` in `backend/`):
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
GOOGLE_APPLICATION_CREDENTIALS=../service-account.json  # Optional
```

### Adding New 3D Models

1. **Find or create a sneaker model** in `.glb` or `.gltf` format
   - Free models: [Sketchfab](https://sketchfab.com), [TurboSquid](https://www.turbosquid.com)
   - Ensure the model has proper vertex groups for coloring

2. **Place the model** in `frontend/public/models/`
   ```
   frontend/public/models/my-new-sneaker.glb
   ```

3. **Register the model** in `frontend/src/data/sneakerOptions.js`:
   ```javascript
   export const sneakerModels = {
     // ... existing models
     'my-sneaker': {
       name: 'My New Sneaker',
       path: '/models/my-new-sneaker.glb',
       tier: 'premium'  // or 'free'
     }
   };
   ```

4. **Test the model** by selecting it in the customizer

### Feature Deep Dive

#### 🎨 Color Customization System
The color system uses **vertex coloring** for real-time updates:
- Each vertex in the 3D model has a Y-coordinate
- Vertices are grouped into zones (upper, sole, accent) based on height
- Colors are applied via Three.js `BufferGeometry` attributes
- Changes are instant without texture reloading

**Implementation:** See `frontend/src/utils/designTextures.js`

#### 🤖 AI Integration
Two modes available:
1. **Google Vertex AI** (requires API key) - Advanced suggestions
2. **Local Processing** (no API needed) - Basic color theory

**Setup:** See [GEMINI-API-SETUP.md](GEMINI-API-SETUP.md)

#### 📸 Virtual Try-On Technology
Uses **intelligent image compositing** without external APIs:
- Foot detection via region analysis (bottom 15% of image)
- Automatic sizing based on person proportions (25% width)
- Shadow and lighting adjustments for realism
- PIL/Pillow for all image processing

**Setup:** See [VIRTUAL-TRYON-SETUP.md](VIRTUAL-TRYON-SETUP.md)

#### 💎 Subscription System
Managed via React Context:
- **Free tier**: Limited colors, watermarked exports
- **Premium tier**: All features unlocked
- Toggle subscription in UI (development mode)
- Production mode would integrate payment APIs (Stripe, PayPal)

---

## 🚢 Deployment

### Frontend (Static Hosting)

#### Vercel
```bash
cd frontend
npm run build
vercel --prod
```

#### Netlify
```bash
cd frontend
npm run build
netlify deploy --prod --dir=build
```

### Node.js Server

#### Railway
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy from `server/` directory

#### Render
1. Create new Web Service
2. Build command: `cd server && npm install`
3. Start command: `cd server && npm start`

### Django Backend

#### Heroku
```bash
# Add Procfile to backend/
echo "web: gunicorn backend.wsgi" > Procfile

# Deploy
heroku create sneakrlab-django
heroku addons:create heroku-postgresql:mini
git subtree push --prefix backend heroku main
```

---

## 🐛 Troubleshooting

### Frontend Issues

**"Module not found" errors**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**3D model not loading**
- Check console for 404 errors
- Verify model path in `sneakerOptions.js`
- Ensure model is in `.glb` format
- Try opening model URL directly in browser

**Colors not applying**
- Check browser console for Three.js errors
- Verify model has proper geometry
- Clear browser cache

### Backend Issues

**PostgreSQL connection failed**
```bash
# Verify PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check DATABASE_URL format
# postgresql://username:password@localhost:5432/dbname
```

**Django server won't start**
```bash
# Activate virtual environment first
.\.venv\Scripts\Activate.ps1  # Windows
source .venv/bin/activate      # macOS/Linux

# Check for migration issues
python manage.py migrate
```

**Virtual Try-On not working**
- Ensure Pillow is installed: `pip install pillow`
- Check image upload size limits
- Verify CORS is enabled in Django settings

---

## 🗺 Roadmap

### Phase 1: Core Features ✅
- [x] 3D sneaker viewer with Three.js
- [x] Multi-zone color customization
- [x] Subscription tier system
- [x] Responsive UI design

### Phase 2: Advanced Features ✅
- [x] AI color suggestions
- [x] Virtual try-on with image compositing
- [x] Design save/load system
- [x] FAQ system

### Phase 3: Planned Features 🚧
- [ ] More sneaker models (Air Force 1, Jordan 1, Yeezy-style)
- [ ] Texture patterns (stripes, camo, gradients, custom images)
- [ ] Material options (leather, suede, mesh, canvas)
- [ ] Custom text and logos
- [ ] AR mobile try-on
- [ ] Social sharing (Twitter, Instagram)
- [ ] Design marketplace/gallery
- [ ] User authentication
- [ ] Payment integration (Stripe)
- [ ] Order fulfillment integration

---

## 🤝 Contributing

This is a **DATASTALGO educational project**. Contributions, issues, and feature requests are welcome!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Frontend: ESLint + Prettier (React)
- Backend: PEP 8 (Python), ESLint (Node.js)
- Comments: Document complex logic

---

## 📄 License

This project is for **educational and demonstration purposes**. 

© 2026 DATASTALGO - Sneakr.lab

---

## 📞 Support

- **Documentation**: See `GEMINI-API-SETUP.md` and `VIRTUAL-TRYON-SETUP.md`
- **Issues**: Open a GitHub issue
- **Questions**: Create a discussion thread

---

<div align="center">

**Sneakr.lab** - Where ideas become sneakers ✨

Made with ❤️ by the DATASTALGO team

</div>

