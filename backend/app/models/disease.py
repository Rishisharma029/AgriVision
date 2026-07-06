from sqlalchemy import ForeignKey, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from ..database.base_class import Base

class Disease(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    crop_id: Mapped[int] = mapped_column(ForeignKey("crop.id", ondelete="CASCADE"), index=True)
    condition: Mapped[str] = mapped_column(String(100), index=True)
    symptoms: Mapped[str] = mapped_column(Text, nullable=True)
    causes: Mapped[str] = mapped_column(Text, nullable=True)
    spread: Mapped[str] = mapped_column(Text, nullable=True)
    severity: Mapped[str] = mapped_column(String(50), nullable=True)
    prevention: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Relationships
    crop: Mapped["Crop"] = relationship(back_populates="diseases")
    treatments: Mapped[List["Treatment"]] = relationship(
        back_populates="disease", 
        cascade="all, delete-orphan"
    )
    predictions: Mapped[List["Prediction"]] = relationship(back_populates="disease")

    # Enforce uniqueness of condition name within a single crop (e.g., Tomato -> Early Blight is unique)
    __table_args__ = (
        UniqueConstraint("crop_id", "condition", name="uq_crop_disease_condition"),
    )
