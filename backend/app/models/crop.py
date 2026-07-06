from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text
from typing import List
from ..database.base_class import Base

class Crop(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    scientific_name: Mapped[str] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    soil: Mapped[str] = mapped_column(Text, nullable=True)
    growing_temp: Mapped[str] = mapped_column(String(50), nullable=True)
    seasonal_care: Mapped[str] = mapped_column(Text, nullable=True)
    
    diseases: Mapped[List["Disease"]] = relationship(
        back_populates="crop", 
        cascade="all, delete-orphan"
    )
