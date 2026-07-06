from sqlalchemy import String, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from ..database.base_class import Base

class ModelVersion(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    version: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    architecture: Mapped[str] = mapped_column(String(100))
    training_date: Mapped[str] = mapped_column(String(50))
    dataset: Mapped[str] = mapped_column(String(200))
    checksum: Mapped[str] = mapped_column(String(100))
    accuracy: Mapped[float] = mapped_column(Float, nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    
    # Relationships
    predictions: Mapped[List["Prediction"]] = relationship(back_populates="model_version")
