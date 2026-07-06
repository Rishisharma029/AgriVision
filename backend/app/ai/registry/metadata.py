from pydantic import BaseModel
from typing import Optional

class ModelMetadata(BaseModel):
    version: str
    architecture: str
    training_date: str
    dataset: str
    checksum: str
    accuracy: Optional[float] = None
    description: Optional[str] = None
