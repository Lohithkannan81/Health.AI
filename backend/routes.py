import json
import logging
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, UploadFile, File, Form, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ai_service import analyze_patient_data, analyze_medical_image, chat_with_model

router = APIRouter()
logger = logging.getLogger("medivision.routes")


# ── Chatbot models ──────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str   # 'user' | 'assistant'
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    analysis_context: Optional[Dict[str, Any]] = None

@router.post("/chat")
async def chat_endpoint(
    request: ChatRequest,
    x_api_key: Optional[str] = Header(None, alias="X-API-Key")
):
    """
    POST /chat — Multi-turn medical chatbot endpoint.
    Accepts conversation history and optional image analysis context.
    Returns assistant reply.
    """
    try:
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        reply = await chat_with_model(
            messages=messages,
            analysis_context=request.analysis_context,
            api_key_override=x_api_key
        )
        return JSONResponse(content={"reply": reply})
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze-image")
async def analyze_image_endpoint(
    image: UploadFile = File(...),
    notes: Optional[str] = Form(None),
    x_api_key: Optional[str] = Header(None, alias="X-API-Key")
):
    """
    POST /analyze-image — Dedicated AI Medical Image Analysis endpoint.
    Receives image file, validates, preprocesses via PIL, and analyzes via AI Vision model.
    Returns structured medical evaluation JSON.
    """
    try:
        image_bytes = await image.read()
        content_type = image.content_type or "image/jpeg"
        logger.info(f"Analyzing medical image: {image.filename} ({len(image_bytes)} bytes, content_type: {content_type})")

        analysis = await analyze_medical_image(
            image_bytes=image_bytes,
            content_type=content_type,
            user_notes=notes,
            api_key_override=x_api_key
        )

        return JSONResponse(content={
            "success": True,
            "analysis": analysis
        })
    except ValueError as ve:
        logger.warning(f"Image validation error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Image analysis error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {str(e)}")




@router.post("/analyze")
async def analyze_health_data(
    symptoms: str = Form(...),
    full_name: Optional[str] = Form(None),
    age: Optional[str] = Form(None),
    gender: Optional[str] = Form(None),
    height: Optional[str] = Form(None),
    weight: Optional[str] = Form(None),
    blood_group: Optional[str] = Form(None),
    medical_history: Optional[str] = Form(None),
    current_medication: Optional[str] = Form(None),
    severity: Optional[str] = Form("Moderate"),
    patient_json: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    x_api_key: Optional[str] = Header(None, alias="X-API-Key")
):
    """
    POST /analyze endpoint
    Receives patient data, symptoms, and optional medical image file.
    Proxies data to AI model via API Key or internal clinical engine.
    """
    try:
        # Parse patient details
        patient_details = {}
        if patient_json:
            try:
                patient_details = json.loads(patient_json)
            except Exception:
                pass
        
        # Merge individual fields if provided
        patient_details.update({
            "full_name": full_name or patient_details.get("full_name", "Anonymous Patient"),
            "age": age or patient_details.get("age", "N/A"),
            "gender": gender or patient_details.get("gender", "Unspecified"),
            "height": height or patient_details.get("height", "N/A"),
            "weight": weight or patient_details.get("weight", "N/A"),
            "blood_group": blood_group or patient_details.get("blood_group", "N/A"),
            "medical_history": medical_history or patient_details.get("medical_history", "None reported"),
            "current_medication": current_medication or patient_details.get("current_medication", "None reported"),
            "severity": severity or patient_details.get("severity", "Moderate")
        })

        image_bytes = None
        image_mime = None

        if image:
            image_bytes = await image.read()
            image_mime = image.content_type or "image/jpeg"
            logger.info(f"Received medical image: {image.filename} ({len(image_bytes)} bytes, mime: {image_mime})")

        # Invoke AI Service
        result = await analyze_patient_data(
            patient_details=patient_details,
            symptoms=symptoms,
            image_bytes=image_bytes,
            image_mime=image_mime,
            api_key_override=x_api_key
        )

        return JSONResponse(content={
            "status": "success",
            "patient": patient_details,
            "analysis": result
        })

    except Exception as e:
        logger.error(f"Analysis endpoint error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to complete AI medical analysis: {str(e)}")
