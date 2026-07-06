import time
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, limit: int = 30, window: int = 60):
        """
        limit: Max requests allowed within the time window.
        window: Time window in seconds. Default is 30 requests per 60 seconds (1 minute).
        """
        super().__init__(app)
        self.limit = limit
        self.window = window
        self.clients = {}  # In-memory IP -> list of timestamps mapping

    async def dispatch(self, request: Request, call_next):
        # Exclude docs, redoc, and openapi schema from rate limiting
        if not request.url.path.startswith("/api/"):
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        now = time.time()

        # Clean up and update requests timestamps for the IP
        timestamps = self.clients.get(client_ip, [])
        timestamps = [t for t in timestamps if now - t < self.window]

        if len(timestamps) >= self.limit:
            return JSONResponse(
                status_code=429,
                content={
                    "request_id": request.state.request_id if hasattr(request.state, "request_id") else "unknown",
                    "success": False,
                    "message": "Too many requests. Please try again later."
                }
            )

        timestamps.append(now)
        self.clients[client_ip] = timestamps

        return await call_next(request)
