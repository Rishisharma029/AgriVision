from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import Optional
import uuid
from ...services.prediction_service import PredictionService
from ...core.logging_config import logger_api, logger_error
from ...database.session import get_db

router = APIRouter(prefix="/prediction", tags=["prediction"])

@router.post("/detect")
async def detect_crop_disease(
    file: UploadFile = File(...),
    request_id: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Accepts an uploaded image file, validates it, and runs the CNN + Grad-CAM diagnostic pipeline.
    """
    if not request_id:
        request_id = str(uuid.uuid4())
        
    logger_api.info(f"Received prediction request {request_id}. File name: {file.filename}, Content type: {file.content_type}")
    
    try:
        # Read the file contents into memory
        file_bytes = await file.read()
        
        # Execute the unified prediction service pipeline with database session
        response_data = PredictionService.execute_pipeline(db, file_bytes, request_id=request_id)
        return response_data
        
    except HTTPException as he:
        # Re-raise known API HTTP Exceptions
        raise he
    except Exception as e:
        logger_error.error(f"Prediction route unhandled error for request {request_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during prediction processing."
        )
