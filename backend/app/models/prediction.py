from sqlalchemy import ForeignKey, String, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database.base_class import Base

class Prediction(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    request_id: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    disease_id: Mapped[int] = mapped_column(ForeignKey("disease.id", ondelete="RESTRICT"), index=True)
    model_version_id: Mapped[int] = mapped_column(ForeignKey("modelversion.id", ondelete="RESTRICT"), index=True)
    confidence: Mapped[float] = mapped_column(Float)
    healthy: Mapped[bool] = mapped_column(Boolean, index=True)
    timestamp: Mapped[float] = mapped_column(Float, index=True) # Unix timestamp of scan
    
    # Relationships
    disease: Mapped["Disease"] = relationship(back_populates="predictions")
    model_version: Mapped["ModelVersion"] = relationship(back_populates="predictions")
    performance_log: Mapped["PerformanceLog"] = relationship(
        back_populates="prediction", 
        cascade="all, delete-orphan",
        uselist=False
    )
