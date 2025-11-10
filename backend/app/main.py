"""
SafeSpace AI Council - FastAPI Backend
Main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from app.config import Config
from app.routes import auth, cases, evidence, ai_analysis

# Create FastAPI app
app = FastAPI(
    title="SafeSpace AI Council API",
    description="Multi-Agent AI system for trauma-informed Title IX case management",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(auth.router)
app.include_router(cases.router)
app.include_router(evidence.router)
app.include_router(ai_analysis.router)


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "llm_provider": Config.get_llm_provider(),
        "anthropic_available": Config.is_anthropic_available(),
        "local_llm_available": Config.is_local_llm_available()
    }


@app.get("/api/config")
async def get_config():
    """Get public configuration"""
    return {
        "llm_provider": Config.get_llm_provider(),
        "anthropic_available": Config.is_anthropic_available(),
        "local_llm_available": Config.is_local_llm_available(),
        "can_toggle_provider": True
    }


# Serve frontend static files (for production Docker build)
# Check if frontend build exists
# In Docker: /app/Frontend/dist
# In local dev: ../../Frontend/dist
frontend_build_path = os.path.join(os.path.dirname(__file__), "../../Frontend/dist")
if not os.path.exists(frontend_build_path):
    # Try Docker path
    frontend_build_path = "/app/Frontend/dist"

print(f"Frontend build path: {frontend_build_path}")
print(f"Frontend exists: {os.path.exists(frontend_build_path)}")

if os.path.exists(frontend_build_path):
    # Mount static assets
    app.mount("/assets", StaticFiles(directory=f"{frontend_build_path}/assets"), name="assets")

    # Import Request for accessing the request object
    from fastapi import Request
    from starlette.exceptions import HTTPException as StarletteHTTPException

    # Custom exception handler to serve SPA for 404s on non-API routes
    @app.exception_handler(StarletteHTTPException)
    async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
        # If it's a 404 and NOT an API route, serve the SPA
        if exc.status_code == 404 and not request.url.path.startswith("/api"):
            index_path = os.path.join(frontend_build_path, "index.html")
            return FileResponse(index_path)
        # Otherwise, return the original error
        from fastapi.responses import JSONResponse
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )

    # Serve index.html for root
    @app.get("/")
    async def serve_root():
        """Serve frontend index"""
        index_path = os.path.join(frontend_build_path, "index.html")
        return FileResponse(index_path)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=Config.API_HOST,
        port=Config.API_PORT,
        reload=True
    )
