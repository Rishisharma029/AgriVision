from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class TreatmentBase(BaseModel):
    treatment_type: str
    description: str

class TreatmentCreate(TreatmentBase):
    pass

class Treatment(TreatmentBase):
    id: int
    disease_id: int
    
    model_config = ConfigDict(from_attributes=True)

class DiseaseBase(BaseModel):
    crop_id: int
    condition: str
    symptoms: Optional[str] = None
    causes: Optional[str] = None
    spread: Optional[str] = None
    severity: Optional[str] = None
    prevention: Optional[str] = None

class DiseaseCreate(DiseaseBase):
    pass

class Disease(DiseaseBase):
    id: int
    treatments: List[Treatment] = []
    
    model_config = ConfigDict(from_attributes=True)
