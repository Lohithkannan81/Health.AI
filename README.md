# Health.AI — Medical Screening & Image Analysis Platform

Health.AI (MediVision) is an intelligent medical screening and diagnostic platform that combines structured conversational symptom assessment with automated clinical report generation.

## Features

- **Interactive Medical Screening Chatbot**: Follows clinical screening guidelines to evaluate symptoms through structured questions and YES/NO choices, culminating in a preliminary assessment with risk categorization (Low, Moderate, High, Emergency).
- **Official Clinical PDF Reports**: Instant one-click PDF generation with hospital letterhead, risk evaluation, complete screening transcript, and medical disclaimers.
- **Saved Reports History**: Persistent local screening session archive with search, filtering, full transcript inspection, and PDF download.
- **FastAPI Backend**: Seamless integration with Google Gemini AI (`gemini-2.5-flash`) for real-time medical screening analysis.
- **Modern Responsive UI**: Built with React, Tailwind CSS, Lucide icons, and Framer Motion.

## Getting Started

### Prerequisites
- Node.js (v18+) & npm
- Python (3.10+)

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set your GEMINI_API_KEY
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access the application.

## Deployment Guide

### 1. Deploy Backend on Render
1. Go to [render.com](https://render.com) and log in with your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your repository `Lohithkannan81/Health.AI`.
4. Configure the service:
   - **Name**: `health-ai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API key)*
   - `PYTHON_VERSION`: `3.11.9`
6. Click **Deploy Web Service**.
7. Once deployed, copy your backend URL (e.g., `https://health-ai-backend.onrender.com`).

### 2. Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** → **Project**.
3. Import `Lohithkannan81/Health.AI`.
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://health-ai-backend.onrender.com`)
6. Click **Deploy**.
7. Your app is live!

## Medical Disclaimer
This software is intended for educational and preliminary screening purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any medical questions.

