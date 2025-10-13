"""
Configuration settings for Chancify AI backend.
"""

import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Supabase Configuration
    supabase_url: str = "https://vwvqfellrhxznesaifwe.supabase.co"
    supabase_anon_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dnFmZWxscmh4em5lc2FpZndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzU2NjQsImV4cCI6MjA3NTg1MTY2NH0.TBYg6XEy1cmsPePkT2Q5tSSDcEqi0AWNCTt7pGT2ZBc"
    supabase_service_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dnFmZWxscmh4em5lc2FpZndlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3NTY2NCwiZXhwIjoyMDc1ODUxNjY0fQ.zVtdMf9Z5gklqfmkjUdMeALE3AGqVlGz1efoNHqSiK4"
    
    # Database
    database_url: Optional[str] = None
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    debug: bool = True
    
    # Security
    secret_key: str = "chancify-ai-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    frontend_url: str = "http://localhost:3000"
    
    # ML Model Path
    model_path: str = "../models/trained/"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()
