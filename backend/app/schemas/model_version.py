from pydantic import BaseModel, ConfigDict
from typing import Optional

class ModelVersionBase(BaseModel):
    version: str
    architecture: str
    training_date: str
    dataset: str
    checksum: str
    accuracy: Optional[float] = None
    active: bool = False

class ModelVersionCreate(ModelVersionBase):
    pass

class ModelVersion(ModelVersionBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
