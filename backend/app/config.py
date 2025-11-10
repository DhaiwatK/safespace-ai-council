"""
Configuration for SafeSpace AI Council Backend
"""
import os
from enum import Enum
from typing import Optional

class LLMProvider(str, Enum):
    """Available LLM providers"""
    LOCAL = "local"  # LM Studio or Ollama
    ANTHROPIC = "anthropic"  # Claude API
    MOCK = "mock"  # For testing without LLM

class Config:
    """Application configuration"""

    # API Settings
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))

    # LLM Provider Configuration
    LLM_PROVIDER = os.getenv("LLM_PROVIDER", LLMProvider.LOCAL)

    # Anthropic API Configuration
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
    ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")

    # Local LLM Configuration (LM Studio / Ollama)
    LOCAL_LLM_URL = os.getenv("LOCAL_LLM_URL", "http://localhost:1234/v1")
    LOCAL_LLM_MODEL = os.getenv("LOCAL_LLM_MODEL", "default")

    # CORS Settings (for frontend)
    CORS_ORIGINS = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Production served by backend
        "http://localhost:8000",
    ]

    # File Upload Settings
    MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx", ".txt"}

    # Case Settings
    DEFAULT_INVESTIGATION_TIMELINE_DAYS = 60  # Title IX requirement

    @classmethod
    def get_llm_provider(cls) -> LLMProvider:
        """Get the current LLM provider"""
        return cls.LLM_PROVIDER

    @classmethod
    def is_anthropic_available(cls) -> bool:
        """Check if Anthropic API is configured"""
        return bool(cls.ANTHROPIC_API_KEY)

    @classmethod
    def is_local_llm_available(cls) -> bool:
        """Check if local LLM is configured"""
        import requests
        try:
            response = requests.get(f"{cls.LOCAL_LLM_URL}/models", timeout=2)
            return response.status_code == 200
        except:
            return False

config = Config()
