import os
import sys
from loguru import logger
from .paths import paths

# Ensure directory is created
paths.ensure_directories()

# Remove standard loguru default handler
logger.remove()

# Add console handler
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - [Req: {extra[request_id]}] - <level>{message}</level>",
    level="INFO"
)

# Standard template format for files
file_format = "{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {name}:{function}:{line} - [Req: {extra[request_id]}] - {message}"

# Setup rotating files for our specific logs using filter functions
logger.add(
    os.path.join(paths.LOGS_DIR, "prediction.log"),
    format=file_format,
    rotation="5 MB",
    retention="10 days",
    filter=lambda record: record["extra"].get("log_type") == "prediction",
    level="INFO"
)

logger.add(
    os.path.join(paths.LOGS_DIR, "api.log"),
    format=file_format,
    rotation="5 MB",
    retention="10 days",
    filter=lambda record: record["extra"].get("log_type") == "api",
    level="INFO"
)

logger.add(
    os.path.join(paths.LOGS_DIR, "error.log"),
    format=file_format,
    rotation="5 MB",
    retention="10 days",
    filter=lambda record: record["level"].name in ("ERROR", "CRITICAL"),
    level="ERROR"
)

logger.add(
    os.path.join(paths.LOGS_DIR, "security.log"),
    format=file_format,
    rotation="5 MB",
    retention="10 days",
    filter=lambda record: record["extra"].get("log_type") == "security",
    level="INFO"
)

# Configure default global context variables
logger.configure(extra={"request_id": "SYSTEM", "log_type": "api"})

# Export bound loggers to keep drop-in compatibility with existing code
logger_prediction = logger.bind(log_type="prediction")
logger_api = logger.bind(log_type="api")
logger_error = logger.bind(log_type="error")
logger_security = logger.bind(log_type="security")
