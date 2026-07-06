import time
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .core.settings import settings
from .core.logging_config import logger_api, logger_error
from .core.paths import paths
from .exceptions.prediction import PredictionException
from .exceptions.storage import StorageException
from .exceptions.model import ModelException
from .ai.registry.registry import ModelRegistry
from .api.v1.prediction import router as prediction_router
from .api.v1.health import router as health_router
from .api.v1.crops import router as crops_router
from .api.v1.diseases import router as diseases_router
from .api.v1.history import router as history_router
from .api.v1.analytics import router as analytics_router
from .middleware.tracing import TracingMiddleware
from .middleware.rate_limit import RateLimitMiddleware
from .database.base import Base
from .database.session import engine, SessionLocal
from .services.database_seed import seed_database

# Ensure directory paths are configured
paths.ensure_directories()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Production-grade FastAPI diagnostic backend for crop leaf disease classification and explainability."
)

# Register middlewares (executed in reverse order of addition)
app.add_middleware(RateLimitMiddleware, limit=30, window=60)
app.add_middleware(TracingMiddleware)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event: initialize DB, warm up registry and model loads
@app.on_event("startup")
async def startup_event():
    logger_api.info("FastAPI service starting up...")
    
    # 1. Initialize SQLite Database Schema
    try:
        logger_api.info("Initializing database tables...")
        Base.metadata.create_all(bind=engine)
        logger_api.info("Database tables initialized successfully.")
    except Exception as db_err:
        logger_error.critical(f"Critical startup failure: Database schema creation failed: {str(db_err)}")
        raise db_err

    # 2. Seed Database with Crop/Disease Care Guides
    db = SessionLocal()
    try:
        seed_database(db)
    except Exception as seed_err:
        logger_error.error(f"Database seeding failed during startup: {str(seed_err)}")
    finally:
        db.close()

    # 3. Warm up CNN Inference Model
    try:
        ModelRegistry.get_active_model()
        logger_api.info("CNN inference model loaded and warmed up successfully.")
    except Exception as e:
        logger_error.critical(f"Critical startup failure: CNN model loading failed: {str(e)}")

# Custom HTTP Exception handlers
@app.exception_handler(PredictionException)
async def prediction_exception_handler(request: Request, exc: PredictionException):
    logger_error.error(f"Prediction exception at {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "PredictionError", "message": exc.detail}
    )

@app.exception_handler(StorageException)
async def storage_exception_handler(request: Request, exc: StorageException):
    logger_error.error(f"Storage exception at {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "StorageError", "message": exc.detail}
    )

@app.exception_handler(ModelException)
async def model_exception_handler(request: Request, exc: ModelException):
    logger_error.critical(f"Model exception at {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "ModelError", "message": exc.detail}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger_error.error(f"Unhandled exception at {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "InternalServerError", "message": "An unexpected error occurred on the server."}
    )

# Include v1 API Routers
app.include_router(prediction_router, prefix=settings.API_V1_STR)
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(crops_router, prefix=settings.API_V1_STR)
app.include_router(diseases_router, prefix=settings.API_V1_STR)
app.include_router(history_router, prefix=settings.API_V1_STR)
app.include_router(analytics_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to LeafSense AI API. Refer to /docs for interactive Swagger specs."}
