# 🚀 CoverCraft AI — AI Cover Letter Generator

A production-level AI SaaS web application that generates ATS-optimized, personalized cover letters in seconds using Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)
![AI](https://img.shields.io/badge/AI-Google_Gemini-orange)
![Frontend](https://img.shields.io/badge/Frontend-React_+_Vite-61dafb)
![Deploy](https://img.shields.io/badge/Deploy-Vercel_+_Render-black)
Vercel Live Link  :- https://covercraft-ai-l21l.vercel.app
---

## ✨ Features

- 🤖 **Gemini AI Integration** — Google's most capable model for human-quality output
- 📄 **Smart PDF Resume Parsing** — Extracts and uses your resume content automatically
- 🎯 **ATS-Optimized Output** — Engineered to pass Applicant Tracking Systems
- ⚡ **Instant Generation** — Complete cover letter in under 10 seconds
- 💾 **PDF Download** — Formatted, professional PDF ready to submit
- 📋 **Copy to Clipboard** — One-click copy for easy pasting
- 🌙 **Dark / Light Mode** — Full theme support with system preference detection
- 📱 **Fully Responsive** — Mobile-first design that works on all devices
- 🔒 **Secure Architecture** — API keys never exposed to the frontend

---

## 🏗 Project Structure

```
ai-cover-letter/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server entry point
│   │   ├── routes/
│   │   │   └── coverLetter.js     # API route definitions
│   │   ├── controllers/
│   │   │   └── coverLetterController.js  # Request handlers
│   │   ├── middleware/
│   │   │   └── upload.js          # Multer PDF upload config
│   │   └── utils/
│   │       ├── pdfParser.js       # pdf-parse wrapper
│   │       └── gemini.js          # Gemini AI service
│   ├── uploads/                   # Temporary PDF storage (auto-cleared)
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.jsx               # React entry
    │   ├── App.jsx                # Root component + routing
    │   ├── index.css              # Tailwind + global styles
    │   ├── pages/
    │   │   ├── LandingPage.jsx    # Full landing page
    │   │   └── GeneratorPage.jsx  # Generator tool page
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx     # Responsive sticky navbar
    │   │   │   └── Footer.jsx     # Site footer
    │   │   ├── sections/
    │   │   │   ├── HeroSection.jsx
    │   │   │   ├── FeaturesSection.jsx
    │   │   │   ├── HowItWorksSection.jsx
    │   │   │   ├── TestimonialsSection.jsx
    │   │   │   └── CTASection.jsx
    │   │   └── generator/
    │   │       ├── GeneratorForm.jsx    # Main form
    │   │       ├── ResumeUpload.jsx     # Drag & drop PDF uploader
    │   │       └── GeneratedOutput.jsx  # Output with typing animation
    │   ├── hooks/
    │   │   └── useTheme.jsx       # Dark/light mode context
    │   ├── services/
    │   │   └── api.js             # Axios API service layer
    │   └── utils/
    │       └── pdfDownload.js     # jsPDF download utility
    ├── index.html                 # SEO meta tags
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

> **⚠️ Security:** Never commit `.env` files. Both are listed in `.gitignore`.

---

## 🚀 Getting Started

### 1. Get a Gemini API Key
1. Visit [https://aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL is already set to http://localhost:5000 for local dev
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌐 API Reference

### `POST /api/generate`
Generates a cover letter using Gemini AI.

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidateName | string | ✅ | Full name |
| email | string | ✅ | Email address |
| jobRole | string | ✅ | Target position |
| company | string | ✅ | Target company |
| skills | string | ✅ | Comma-separated skills |
| experienceLevel | string | ✅ | e.g. "Mid Level (2-5 years)" |
| jobDescription | string | ✅ | Full job posting text |
| resume | file | ❌ | PDF resume (max 5MB) |

**Response:**
```json
{
  "success": true,
  "coverLetter": "Dear Hiring Manager...",
  "metadata": {
    "candidateName": "Alex Johnson",
    "jobRole": "Senior Frontend Engineer",
    "company": "Google",
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "wordCount": 320,
    "hasResume": true
  }
}
```

### `POST /api/parse-resume`
Parses a PDF resume and returns extracted text.

| Field | Type | Required |
|-------|------|----------|
| resume | file | ✅ |

### `GET /api/status`
Returns API health and configuration status.

### `GET /health`
Returns server health.

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build

# In Vercel dashboard:
# - Root: ./frontend
# - Build Command: npm run build
# - Output Directory: dist
```

### Backend → Render
```
# In Render dashboard:
# - Root Directory: ./backend
# - Build Command: npm install
# - Start Command: node src/server.js
# - Add env vars: GEMINI_API_KEY, NODE_ENV=production,

---

## 🔧 Tech Stack Details

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Forms | React Hook Form 7 |
| HTTP Client | Axios |
| Markdown | React Markdown |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| PDF Generation | jsPDF |
| Backend | Node.js + Express 4 |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| AI Provider | Google Gemini 1.5 Flash |
| Environment | dotenv |

---

## 📝 License

MIT License — free to use and modify for personal and commercial projects.


