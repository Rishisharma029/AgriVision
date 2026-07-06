from sqlalchemy import ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database.base_class import Base

class PerformanceLog(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    prediction_id: Mapped[int] = mapped_column(
        ForeignKey("prediction.id", ondelete="CASCADE"), 
        unique=True, 
        index=True
    )
    upload_ms: Mapped[float] = mapped_column(Float, default=0.0)
    inference_ms: Mapped[float] = mapped_column(Float, default=0.0)
    gradcam_ms: Mapped[float] = mapped_column(Float, default=0.0)
    total_ms: Mapped[float] = mapped_column(Float, default=0.0)
    
    # Relationships
    prediction: Mapped["Prediction"] = relationship(back_populates="performance_log")
