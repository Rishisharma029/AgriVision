from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database.base_class import Base

class Treatment(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    disease_id: Mapped[int] = mapped_column(ForeignKey("disease.id", ondelete="CASCADE"), index=True)
    treatment_type: Mapped[str] = mapped_column(String(50), index=True)  # 'organic', 'chemical', 'fertilizer'
    description: Mapped[str] = mapped_column(Text)
    
    # Relationships
    disease: Mapped["Disease"] = relationship(back_populates="treatments")
