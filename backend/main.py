import logging
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import router

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

app = FastAPI(
    title="MediVision AI Backend API",
    description="AI-Based Medical Image Analysis System for Early Disease Detection",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server & production origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(router, prefix="/api")

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "MediVision AI API",
        "version": "1.0.0",
        "endpoints": [
            "POST /chat",
            "POST /analyze",
            "POST /analyze-image",
            "POST /api/chat",
            "POST /api/analyze",
            "POST /api/analyze-image"
        ]
    }

if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
