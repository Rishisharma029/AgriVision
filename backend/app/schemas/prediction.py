from pydantic import BaseModel, ConfigDict
from typing import Optional

class PerformanceLogBase(BaseModel):
    upload_ms: float = 0.0
    inference_ms: float = 0.0
    gradcam_ms: float = 0.0
    total_ms: float = 0.0

class PerformanceLogCreate(PerformanceLogBase):
    pass

class PerformanceLog(PerformanceLogBase):
    id: int
    prediction_id: int
    
    model_config = ConfigDict(from_attributes=True)

class PredictionBase(BaseModel):
    request_id: str
    disease_id: int
    model_version_id: int
    confidence: float
    healthy: bool
    timestamp: float

class PredictionCreate(PredictionBase):
    pass

class Prediction(PredictionBase):
    id: int
    performance_log: Optional[PerformanceLog] = None
    
    model_config = ConfigDict(from_attributes=True)
