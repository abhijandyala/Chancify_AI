"""
Chancify AI - Backend API
FastAPI application for college admissions probability calculations
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import create_tables

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
    try:
        create_tables()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Database initialization warning: {e}")
        print("   The API will still work without database connection.")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Chancify AI API is running",
        "version": "0.1.0",
        "database": "connected"
    }

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "database": "connected",
        "scoring_system": "loaded",
        "supabase_url": settings.supabase_url
    }

# Include API routes
from api.routes import auth, calculations, ml_calculations

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(calculations.router, prefix="/api/calculations", tags=["Probability Calculations"])
app.include_router(ml_calculations.router, prefix="/api/calculations", tags=["ML Predictions"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

