"""
Chancify AI - Backend API
FastAPI application for college admissions probability calculations
"""

import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.database import create_tables

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get environment
ENV = os.getenv("ENVIRONMENT", "development")

# Initialize FastAPI app
app = FastAPI(
    title="Chancify AI API",
    description="College admissions probability calculator with personalized game plans",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware configuration
# Allow all origins in production (Railway deployment)
allowed_origins = [
    "http://localhost:3000",  # Local development
    "http://localhost:3001",  # Local development (alt port)
    "https://chancifyai.up.railway.app",  # Railway frontend
    settings.frontend_url
]

# In production, allow Railway domains
if ENV == "production":
    allowed_origins.append("*")  # Allow all origins for Railway

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if ENV == "development" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database tables."""
    logger.info(f"Starting Chancify AI API in {ENV} mode")
    logger.info(f"Python path: {os.environ.get('PYTHONPATH', 'not set')}")
    logger.info(f"Working directory: {os.getcwd()}")
    
    try:
        create_tables()
        logger.info("✓ Database tables created/verified successfully")
    except Exception as e:
        logger.warning(f"⚠ Database initialization failed: {e}")
        logger.warning("  API will continue without database features")
    
    logger.info("✓ Chancify AI API started successfully")

@app.get("/")
async def root():
    """Root health check endpoint"""
    return {
        "status": "healthy",
        "message": "Chancify AI API is running",
        "version": "0.1.0",
        "environment": ENV
    }

@app.get("/api/health")
async def health_check():
    """Detailed health check for Railway"""
    # Test database connection
    db_status = "unknown"
    try:
        from backend.database.connection import engine
        from sqlalchemy import text
        if engine is not None:
            # Try a simple query to verify connection
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            db_status = "connected"
        else:
            db_status = "not_initialized"
    except Exception as e:
        logger.warning(f"Database health check failed: {e}")
        db_status = "error"
    
    return {
        "status": "healthy",
        "database": db_status,
        "scoring_system": "loaded",
        "environment": ENV,
        "port": os.environ.get("PORT", "8000")
    }

# Include API routes
from backend.api.routes import auth, calculations, ml_calculations

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(calculations.router, prefix="/api/calculations", tags=["Probability Calculations"])
app.include_router(ml_calculations.router, prefix="/api/calculations", tags=["ML Predictions"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

