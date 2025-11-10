from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import cases, ai

app = FastAPI(title="SAFESPACE AI Council API", version="1.0.0")

# CORS middleware - allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cases.router, prefix="/api", tags=["cases"])
app.include_router(ai.router, prefix="/api", tags=["ai"])

@app.get("/")
async def root():
    return {
        "message": "SAFESPACE AI Council API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
