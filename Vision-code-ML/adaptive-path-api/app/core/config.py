"""
Configuration settings for the application
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    PROJECT_NAME: str = "Adaptive Path Recommendation API"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    
    # CORS settings
    ALLOWED_ORIGINS: List[str] = ["*"]
    
    # Database (using in-memory for demo)
    USE_MOCK_DB: bool = True
    
    # Algorithm parameters
    MIN_PASS_SCORE: int = 70
    MASTERY_THRESHOLD: int = 85
    REVIEW_THRESHOLD: int = 60
    
    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()