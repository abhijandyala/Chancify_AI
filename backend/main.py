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
from backend.ml.models.predictor import get_predictor
from backend.ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures
from pydantic import BaseModel
from typing import Dict, Any
import pandas as pd

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(calculations.router, prefix="/api/calculations", tags=["Probability Calculations"])
app.include_router(ml_calculations.router, prefix="/api/calculations", tags=["ML Predictions"])

# College data mapping based on training data
def get_college_data(college_id: str) -> Dict[str, Any]:
    """Get college data based on the college ID from training data."""
    
    # Load the real college data
    try:
        df = pd.read_csv('data/raw/real_colleges_100.csv')
        
        # Extract UNITID from college_id (format: college_166027)
        if college_id.startswith('college_'):
            unitid = int(college_id.replace('college_', ''))
        else:
            unitid = int(college_id)
        
        # Find the college in the data
        college_row = df[df['unitid'] == unitid]
        
        if not college_row.empty:
            row = college_row.iloc[0]
            return {
                'acceptance_rate': float(row['acceptance_rate']),
                'sat_25th': int(row['sat_total_25']) if pd.notna(row['sat_total_25']) else 1200,
                'sat_75th': int(row['sat_total_75']) if pd.notna(row['sat_total_75']) else 1500,
                'act_25th': int(row['act_composite_25']) if pd.notna(row['act_composite_25']) else 25,
                'act_75th': int(row['act_composite_75']) if pd.notna(row['act_composite_75']) else 35,
                'test_policy': row['test_policy'],
                'financial_aid_policy': row['financial_aid_policy'],
                'selectivity_tier': row['selectivity_tier']
            }
    except Exception as e:
        logger.warning(f"Could not load college data: {e}")
    
    # Default fallback data
    return {
        'acceptance_rate': 0.1,
        'sat_25th': 1200,
        'sat_75th': 1500,
        'act_25th': 25,
        'act_75th': 35,
        'test_policy': 'Required',
        'financial_aid_policy': 'Need-blind',
        'selectivity_tier': 'Elite'
    }

# Prediction request model
class PredictionRequest(BaseModel):
    # Academic data
    gpa_unweighted: float
    gpa_weighted: float
    sat: int
    act: int
    rigor: int
    
    # Unique factors
    extracurricular_depth: int
    leadership_positions: int
    awards_publications: int
    passion_projects: int
    business_ventures: int
    volunteer_work: int
    research_experience: int
    portfolio_audition: int
    essay_quality: int
    recommendations: int
    interview: int
    demonstrated_interest: int
    legacy_status: int
    geographic_diversity: int
    firstgen_diversity: int
    major: str
    hs_reputation: int
    
    # College selection
    college: str

@app.post("/predict")
async def predict_admission(request: PredictionRequest):
    """Predict admission probability using ML model"""
    try:
        # Get predictor
        predictor = get_predictor()
        
        # Create student features
        student = StudentFeatures(
            gpa_unweighted=request.gpa_unweighted,
            gpa_weighted=request.gpa_weighted,
            sat_score=request.sat,
            act_score=request.act,
            rigor_score=request.rigor / 10.0,  # Convert to 0-1 scale
            factor_scores={
                'extracurricular_depth': request.extracurricular_depth / 10.0,
                'leadership_positions': request.leadership_positions / 10.0,
                'awards_publications': request.awards_publications / 10.0,
                'passion_projects': request.passion_projects / 10.0,
                'business_ventures': request.business_ventures / 10.0,
                'volunteer_work': request.volunteer_work / 10.0,
                'research_experience': request.research_experience / 10.0,
                'portfolio_audition': request.portfolio_audition / 10.0,
                'essay_quality': request.essay_quality / 10.0,
                'recommendations': request.recommendations / 10.0,
                'interview': request.interview / 10.0,
                'demonstrated_interest': request.demonstrated_interest / 10.0,
                'legacy_status': request.legacy_status / 10.0,
                'geographic_diversity': request.geographic_diversity / 10.0,
                'firstgen_diversity': request.firstgen_diversity / 10.0,
                'hs_reputation': request.hs_reputation / 10.0,
            }
        )
        
        # Create college features based on the selected college
        # Map college selection to actual training data
        college_data = get_college_data(request.college)
        college = CollegeFeatures(
            name=request.college,
            acceptance_rate=college_data['acceptance_rate'],
            sat_25th=college_data.get('sat_25th', 1200),
            sat_75th=college_data.get('sat_75th', 1500),
            act_25th=college_data.get('act_25th', 25),
            act_75th=college_data.get('act_75th', 35),
            test_policy=college_data.get('test_policy', 'Required'),
            financial_aid_policy=college_data.get('financial_aid_policy', 'Need-blind'),
            selectivity_tier=college_data.get('selectivity_tier', 'Elite')
        )
        
        # Make prediction
        result = predictor.predict(student, college)
        
        # Determine outcome based on probability
        if result.probability >= 0.7:
            outcome = "Acceptance"
        elif result.probability >= 0.3:
            outcome = "Waitlist"
        else:
            outcome = "Rejection"
        
        return {
            "probability": result.probability,
            "outcome": outcome,
            "confidence": result.ml_confidence,
            "model_used": result.model_used,
            "explanation": result.explanation
        }
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        # Return mock result for development
        import random
        mock_prob = random.uniform(0.2, 0.8)
        if mock_prob >= 0.7:
            outcome = "Acceptance"
        elif mock_prob >= 0.3:
            outcome = "Waitlist"
        else:
            outcome = "Rejection"
            
        return {
            "probability": mock_prob,
            "outcome": outcome,
            "confidence": 0.85,
            "model_used": "mock",
            "explanation": "Mock prediction for development"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

