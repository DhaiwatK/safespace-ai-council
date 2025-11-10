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
frontend_build_path = os.path.join(os.path.dirname(__file__), "../../Frontend/dist")

if os.path.exists(frontend_build_path):
    app.mount("/assets", StaticFiles(directory=f"{frontend_build_path}/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        """Serve frontend for all non-API routes"""
        if full_path.startswith("api/"):
            return {"error": "API endpoint not found"}

        # Serve index.html for all routes (SPA)
        index_path = os.path.join(frontend_build_path, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)

        return {"error": "Frontend not found"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=Config.API_HOST,
        port=Config.API_PORT,
        reload=True
    )
