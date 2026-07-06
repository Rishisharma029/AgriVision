import uuid
import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger
from ..core.logging_config import logger_api

class TracingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        # Generate or capture existing request ID
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        
        # Start timing request lifecycle
        start_time = time.time()
        
        # Bind the request_id to Loguru's thread contextvars
        with logger.contextualize(request_id=request_id):
            request.state.request_id = request_id
            
            # Continue down execution pipeline
            response = await call_next(request)
            
            # Append headers to the outgoing response
            duration_ms = (time.time() - start_time) * 1000
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time-Ms"] = f"{duration_ms:.2f}"
            
            # Log structured API request details with request ID bound
            logger_api.info(
                f"Method={request.method} Path={request.url.path} "
                f"Status={response.status_code} Duration={duration_ms:.2f}ms"
            )
            
            return response
