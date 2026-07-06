# Import all models here so that Base.metadata can be populated correctly
from .base_class import Base
from ..models.crop import Crop
from ..models.disease import Disease
from ..models.treatment import Treatment
from ..models.model_version import ModelVersion
from ..models.prediction import Prediction
from ..models.performance import PerformanceLog
