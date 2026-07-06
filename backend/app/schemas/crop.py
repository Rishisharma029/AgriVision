from pydantic import BaseModel, ConfigDict
from typing import Optional

class CropBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    soil: Optional[str] = None
    growing_temp: Optional[str] = None
    seasonal_care: Optional[str] = None

class CropCreate(CropBase):
    pass

class CropUpdate(CropBase):
    name: Optional[str] = None

class Crop(CropBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
