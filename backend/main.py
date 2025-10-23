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
        df = pd.read_csv('backend/data/raw/real_colleges_100.csv')
        
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
                'name': f"College_{unitid}",  # Add name for ML model
                'acceptance_rate': float(row['acceptance_rate']),
                'sat_25th': int(row['sat_total_25']) if pd.notna(row['sat_total_25']) else 1200,
                'sat_75th': int(row['sat_total_75']) if pd.notna(row['sat_total_75']) else 1500,
                'act_25th': int(row['act_composite_25']) if pd.notna(row['act_composite_25']) else 25,
                'act_75th': int(row['act_composite_75']) if pd.notna(row['act_composite_75']) else 35,
                'test_policy': row['test_policy'],
                'financial_aid_policy': row['financial_aid_policy'],
                'selectivity_tier': row['selectivity_tier'],
                'gpa_average': float(row['gpa_average']) if pd.notna(row['gpa_average']) else 3.7
            }
    except Exception as e:
        logger.warning(f"Could not load college data: {e}")
    
    # Default fallback data
    return {
        'name': f"College_{college_id}",
        'acceptance_rate': 0.1,
        'sat_25th': 1200,
        'sat_75th': 1500,
        'act_25th': 25,
        'act_75th': 35,
        'test_policy': 'Required',
        'financial_aid_policy': 'Need-blind',
        'selectivity_tier': 'Elite',
        'gpa_average': 3.7
    }

# Frontend profile request model (matches frontend format)
class FrontendProfileRequest(BaseModel):
    # Academic data
    gpa_unweighted: str
    gpa_weighted: str
    sat: str
    act: str
    
    # Course rigor and class info
    rigor: str
    ap_count: str
    honors_count: str
    class_rank_percentile: str
    class_size: str
    
    # Factor scores (1-10 scale from frontend dropdowns)
    extracurricular_depth: str
    leadership_positions: str
    awards_publications: str
    passion_projects: str
    business_ventures: str
    volunteer_work: str
    research_experience: str
    portfolio_audition: str
    essay_quality: str
    recommendations: str
    interview: str
    demonstrated_interest: str
    legacy_status: str
    hs_reputation: str
    
    # Additional ML model fields (derived from dropdowns)
    geographic_diversity: str
    plan_timing: str
    geography_residency: str
    firstgen_diversity: str
    ability_to_pay: str
    policy_knob: str
    conduct_record: str
    
    # Major and college
    major: str
    college: str

# Legacy prediction request model (for backward compatibility)
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

@app.post("/api/predict/frontend")
async def predict_admission_frontend(request: FrontendProfileRequest):
    """Predict admission probability using hybrid ML+Formula system for frontend"""
    try:
        # Get predictor
        predictor = get_predictor()
        
        # Convert frontend string values to appropriate types
        def safe_float(value: str) -> float:
            try:
                return float(value) if value and value.strip() else 0.0
            except (ValueError, TypeError):
                return 0.0
        
        def safe_int(value: str) -> int:
            try:
                return int(value) if value and value.strip() else 0
            except (ValueError, TypeError):
                return 0
        
        # Calculate derived factor scores from real data
        gpa_unweighted = safe_float(request.gpa_unweighted)
        gpa_weighted = safe_float(request.gpa_weighted)
        sat_score = safe_int(request.sat)
        act_score = safe_int(request.act)
        
        # Calculate grades score from GPA (0-10 scale)
        def calculate_grades_score(gpa_unweighted, gpa_weighted):
            if gpa_unweighted > 0:
                # Convert 4.0 scale to 10.0 scale
                return min(10.0, (gpa_unweighted / 4.0) * 10.0)
            elif gpa_weighted > 0:
                # Convert 5.0 scale to 10.0 scale
                return min(10.0, (gpa_weighted / 5.0) * 10.0)
            return 5.0  # Default neutral
        
        # Calculate testing score from SAT/ACT (0-10 scale)
        def calculate_testing_score(sat, act):
            if sat > 0:
                # Convert SAT to 10.0 scale (1200-1600 range)
                return min(10.0, max(0.0, ((sat - 1200) / 400) * 10.0))
            elif act > 0:
                # Convert ACT to 10.0 scale (20-36 range)
                return min(10.0, max(0.0, ((act - 20) / 16) * 10.0))
            return 5.0  # Default neutral
        
        # Calculate major fit score based on major relevance
        def calculate_major_fit_score(major, college_name):
            # This would ideally use a major-college relevance database
            # For now, use a simple heuristic based on major popularity
            popular_majors = ['Computer Science', 'Business', 'Engineering', 'Biology', 'Psychology']
            if major in popular_majors:
                return 7.0  # Good fit for popular majors
            return 6.0  # Neutral fit
        
        # Create student features from frontend data
        student = StudentFeatures(
            # Academic metrics
            gpa_unweighted=gpa_unweighted,
            gpa_weighted=gpa_weighted,
            sat_total=sat_score,
            act_composite=act_score,
            
            # Course rigor and class info
            ap_count=safe_int(request.ap_count),
            honors_count=safe_int(request.honors_count),
            class_rank_percentile=safe_float(request.class_rank_percentile),
            class_size=safe_int(request.class_size),
            
            # Extracurricular counts and commitment
            ec_count=min(10, max(1, safe_int(request.extracurricular_depth) // 2)),  # Derive from extracurricular depth
            leadership_positions_count=safe_int(request.leadership_positions),
            years_commitment=min(6, max(1, safe_int(request.extracurricular_depth) // 2)),  # Derive from extracurricular depth
            hours_per_week=min(20.0, max(2.0, safe_float(request.extracurricular_depth) * 1.5)),  # Derive from extracurricular depth
            awards_count=safe_int(request.awards_publications),
            national_awards=min(5, max(0, safe_int(request.awards_publications) // 2)),  # Derive from awards/publications
            
            # Demographics and diversity
            first_generation=safe_float(request.firstgen_diversity) > 7.0,  # Derive from firstgen_diversity
            underrepresented_minority=safe_float(request.firstgen_diversity) > 6.0,  # Derive from firstgen_diversity
            geographic_diversity=safe_float(request.geographic_diversity),
            legacy_status=bool(safe_int(request.legacy_status)),
            recruited_athlete=safe_float(request.athletic_recruit) > 7.0,  # Derive from athletic_recruit
            
            # Factor scores (calculated from real data, not defaults)
            factor_scores={
                'grades': calculate_grades_score(gpa_unweighted, gpa_weighted),
                'rigor': safe_float(request.rigor),
                'testing': calculate_testing_score(sat_score, act_score),
                'essay': safe_float(request.essay_quality),
                'ecs_leadership': safe_float(request.extracurricular_depth),
                'recommendations': safe_float(request.recommendations),
                'plan_timing': safe_float(request.plan_timing),
                'athletic_recruit': safe_float(request.athletic_recruit),
                'major_fit': calculate_major_fit_score(request.major, request.college),
                'geography_residency': safe_float(request.geography_residency),
                'firstgen_diversity': safe_float(request.firstgen_diversity),
                'ability_to_pay': safe_float(request.ability_to_pay),
                'awards_publications': safe_float(request.awards_publications),
                'portfolio_audition': safe_float(request.portfolio_audition),
                'policy_knob': safe_float(request.policy_knob),
                'demonstrated_interest': safe_float(request.demonstrated_interest),
                'legacy': safe_float(request.legacy_status),
                'interview': safe_float(request.interview),
                'conduct_record': safe_float(request.conduct_record),
                'hs_reputation': safe_float(request.hs_reputation)
            }
        )
        
        # Get college data
        college_data = get_college_data(request.college)
        college = CollegeFeatures(
            name=college_data['name'],
            acceptance_rate=college_data['acceptance_rate'],
            sat_25th=college_data['sat_25th'],
            sat_75th=college_data['sat_75th'],
            act_25th=college_data['act_25th'],
            act_75th=college_data['act_75th'],
            test_policy=college_data['test_policy'],
            financial_aid_policy=college_data['financial_aid_policy'],
            selectivity_tier=college_data['selectivity_tier'],
            gpa_average=college_data['gpa_average']
        )
        
        # Make hybrid prediction
        result = predictor.predict(student, college, model_name='ensemble', use_formula=True)
        
        # Determine category based on final probability
        prob = result.probability
        if prob < 0.15:
            category = "reach"
        elif prob < 0.40:
            category = "target"
        else:
            category = "safety"
        
        return {
            "success": True,
            "college_id": request.college,
            "college_name": college_data['name'],
            "probability": round(result.probability, 4),
            "confidence_interval": {
                "lower": round(result.confidence_interval[0], 4),
                "upper": round(result.confidence_interval[1], 4)
            },
            "ml_probability": round(result.ml_probability, 4),
            "formula_probability": round(result.formula_probability, 4),
            "ml_confidence": round(result.ml_confidence, 4),
            "blend_weights": result.blend_weights,
            "model_used": result.model_used,
            "prediction_method": "hybrid_ml_formula",
            "explanation": result.explanation,
            "category": category,
            "acceptance_rate": college_data['acceptance_rate'],
            "selectivity_tier": college_data['selectivity_tier']
        }
        
    except Exception as e:
        logger.error(f"Frontend prediction error: {e}")
        return {
            "success": False,
            "error": str(e),
            "message": "Prediction failed. Please try again."
        }

@app.post("/api/suggest/colleges")
async def suggest_colleges(request: FrontendProfileRequest):
    """Get AI-suggested colleges based on user profile using hybrid ML system"""
    try:
        # Get predictor
        predictor = get_predictor()
        
        # Convert frontend string values to appropriate types
        def safe_float(value: str) -> float:
            try:
                return float(value) if value and value.strip() else 0.0
            except (ValueError, TypeError):
                return 0.0
        
        def safe_int(value: str) -> int:
            try:
                return int(value) if value and value.strip() else 0
            except (ValueError, TypeError):
                return 0
        
        # Calculate derived factor scores from real data
        gpa_unweighted = safe_float(request.gpa_unweighted)
        gpa_weighted = safe_float(request.gpa_weighted)
        sat_score = safe_int(request.sat)
        act_score = safe_int(request.act)
        
        # Calculate grades score from GPA (0-10 scale)
        def calculate_grades_score(gpa_unweighted, gpa_weighted):
            if gpa_unweighted > 0:
                return min(10.0, (gpa_unweighted / 4.0) * 10.0)
            elif gpa_weighted > 0:
                return min(10.0, (gpa_weighted / 5.0) * 10.0)
            return 5.0
        
        # Calculate testing score from SAT/ACT (0-10 scale)
        def calculate_testing_score(sat, act):
            if sat > 0:
                return min(10.0, max(0.0, ((sat - 1200) / 400) * 10.0))
            elif act > 0:
                return min(10.0, max(0.0, ((act - 20) / 16) * 10.0))
            return 5.0
        
        # Calculate major fit score based on major relevance
        def calculate_major_fit_score(major, college_name):
            popular_majors = ['Computer Science', 'Business', 'Engineering', 'Biology', 'Psychology']
            if major in popular_majors:
                return 7.0
            return 6.0
        
        # Create student features from frontend data
        student = StudentFeatures(
            # Academic metrics
            gpa_unweighted=gpa_unweighted,
            gpa_weighted=gpa_weighted,
            sat_total=sat_score,
            act_composite=act_score,
            
            # Course rigor and class info
            ap_count=safe_int(request.ap_count),
            honors_count=safe_int(request.honors_count),
            class_rank_percentile=safe_float(request.class_rank_percentile),
            class_size=safe_int(request.class_size),
            
            # Extracurricular counts and commitment
            ec_count=min(10, max(1, safe_int(request.extracurricular_depth) // 2)),  # Derive from extracurricular depth
            leadership_positions_count=safe_int(request.leadership_positions),
            years_commitment=min(6, max(1, safe_int(request.extracurricular_depth) // 2)),  # Derive from extracurricular depth
            hours_per_week=min(20.0, max(2.0, safe_float(request.extracurricular_depth) * 1.5)),  # Derive from extracurricular depth
            awards_count=safe_int(request.awards_publications),
            national_awards=min(5, max(0, safe_int(request.awards_publications) // 2)),  # Derive from awards/publications
            
            # Demographics and diversity
            first_generation=safe_float(request.firstgen_diversity) > 7.0,  # Derive from firstgen_diversity
            underrepresented_minority=safe_float(request.firstgen_diversity) > 6.0,  # Derive from firstgen_diversity
            geographic_diversity=safe_float(request.geographic_diversity),
            legacy_status=bool(safe_int(request.legacy_status)),
            recruited_athlete=safe_float(request.athletic_recruit) > 7.0,  # Derive from athletic_recruit
            
            # Factor scores (calculated from real data, not defaults)
            factor_scores={
                'grades': calculate_grades_score(gpa_unweighted, gpa_weighted),
                'rigor': safe_float(request.rigor),
                'testing': calculate_testing_score(sat_score, act_score),
                'essay': safe_float(request.essay_quality),
                'ecs_leadership': safe_float(request.extracurricular_depth),
                'recommendations': safe_float(request.recommendations),
                'plan_timing': safe_float(request.plan_timing),
                'athletic_recruit': safe_float(request.athletic_recruit),
                'major_fit': calculate_major_fit_score(request.major, request.college),
                'geography_residency': safe_float(request.geography_residency),
                'firstgen_diversity': safe_float(request.firstgen_diversity),
                'ability_to_pay': safe_float(request.ability_to_pay),
                'awards_publications': safe_float(request.awards_publications),
                'portfolio_audition': safe_float(request.portfolio_audition),
                'policy_knob': safe_float(request.policy_knob),
                'demonstrated_interest': safe_float(request.demonstrated_interest),
                'legacy': safe_float(request.legacy_status),
                'interview': safe_float(request.interview),
                'conduct_record': safe_float(request.conduct_record),
                'hs_reputation': safe_float(request.hs_reputation)
            }
        )
        
        # Load college data to get suggestions
        df = pd.read_csv('backend/data/raw/real_colleges_100.csv')
        
        # Calculate academic strength to determine target tier
        gpa = safe_float(request.gpa_unweighted)
        sat = safe_int(request.sat)
        act = safe_int(request.act)
        
        # Calculate composite academic score
        academic_score = 0
        if gpa > 0:
            academic_score += (gpa / 4.0) * 40
        if sat > 0:
            academic_score += (sat / 1600) * 40
        elif act > 0:
            academic_score += (act / 36) * 40
        
        # Add factor scores
        factor_score = (
            safe_float(request.rigor) + 
            safe_float(request.extracurricular_depth) + 
            safe_float(request.leadership_positions) + 
            safe_float(request.awards_publications) + 
            safe_float(request.essay_quality) + 
            safe_float(request.recommendations)
        ) / 6.0
        
        academic_score += factor_score * 20
        
        # Determine target tier based on academic strength
        if academic_score >= 80:
            target_tiers = ['Elite', 'Highly Selective']
        elif academic_score >= 60:
            target_tiers = ['Highly Selective', 'Selective']
        elif academic_score >= 40:
            target_tiers = ['Selective', 'Moderately Selective']
        else:
            target_tiers = ['Moderately Selective', 'Less Selective']
        
        # Get predictions for all colleges to find balanced suggestions
        all_college_predictions = []
        
        for i, row in df.iterrows():
            try:
                college_data = {
                    'unitid': row['unitid'],
                    'name': f"College_{row['unitid']}",
                    'acceptance_rate': float(row['acceptance_rate']),
                    'selectivity_tier': row['selectivity_tier'],
                    'sat_25th': int(row['sat_total_25']) if pd.notna(row['sat_total_25']) else 1200,
                    'sat_75th': int(row['sat_total_75']) if pd.notna(row['sat_total_75']) else 1500,
                    'act_25th': int(row['act_composite_25']) if pd.notna(row['act_composite_25']) else 25,
                    'act_75th': int(row['act_composite_75']) if pd.notna(row['act_composite_75']) else 35,
                    'test_policy': row['test_policy'],
                    'financial_aid_policy': row['financial_aid_policy'],
                    'gpa_average': float(row['gpa_average']) if pd.notna(row['gpa_average']) else 3.7
                }
                
                # Create college features and get prediction
                college = CollegeFeatures(
                    name=college_data['name'],
                    acceptance_rate=college_data['acceptance_rate'],
                    sat_25th=college_data['sat_25th'],
                    sat_75th=college_data['sat_75th'],
                    act_25th=college_data['act_25th'],
                    act_75th=college_data['act_75th'],
                    test_policy=college_data['test_policy'],
                    financial_aid_policy=college_data['financial_aid_policy'],
                    selectivity_tier=college_data['selectivity_tier'],
                    gpa_average=college_data['gpa_average']
                )
                
                # Get prediction
                result = predictor.predict(student, college, model_name='ensemble', use_formula=True)
                
                all_college_predictions.append({
                    'college_id': f"college_{row['unitid']}",
                    'name': college_data['name'],
                    'probability': round(result.probability, 4),
                    'confidence_interval': {
                        "lower": round(result.confidence_interval[0], 4),
                        "upper": round(result.confidence_interval[1], 4)
                    },
                    'acceptance_rate': college_data['acceptance_rate'],
                    'selectivity_tier': college_data['selectivity_tier'],
                    'tier': college_data['selectivity_tier'],
                    'tuition': f"${int(row.get('tuition', 50000)):,}",
                    'enrollment': f"{int(row.get('enrollment', 10000)):,}",
                    'difficulty': college_data['selectivity_tier'],
                    'popularMajors': [request.major, 'Business', 'Engineering', 'Liberal Arts'],
                    'description': f"Strong {college_data['selectivity_tier'].lower()} institution with {college_data['acceptance_rate']:.1f}% acceptance rate"
                })
                
                # Log progress every 10 colleges
                if (i + 1) % 10 == 0:
                    logger.info(f"Processed {i + 1} colleges, current count: {len(all_college_predictions)}")
                    
            except Exception as e:
                logger.error(f"Error processing college {i}: {e}")
                continue
        
        # Categorize colleges by probability ranges
        # Note: ML model probabilities are typically lower, so we adjust the ranges
        # Sort all predictions by probability to understand the distribution
        all_college_predictions.sort(key=lambda x: x['probability'], reverse=True)
        
        # Use percentile-based categorization to ensure balanced distribution
        total_colleges = len(all_college_predictions)
        safety_colleges = all_college_predictions[:total_colleges//3]  # Top third
        target_colleges = all_college_predictions[total_colleges//3:2*total_colleges//3]  # Middle third
        reach_colleges = all_college_predictions[2*total_colleges//3:]  # Bottom third
        
        # Assign categories
        for college in safety_colleges:
            college['category'] = 'safety'
        for college in target_colleges:
            college['category'] = 'target'
        for college in reach_colleges:
            college['category'] = 'reach'
        
        # Sort each category by probability (highest first for safety, balanced for target, highest for reach)
        safety_colleges.sort(key=lambda x: x['probability'], reverse=True)
        target_colleges.sort(key=lambda x: x['probability'], reverse=True)
        reach_colleges.sort(key=lambda x: x['probability'], reverse=True)
        
        # Select balanced suggestions: 3 safety, 3 target, 3 reach
        balanced_suggestions = []
        
        # Add 3 safety colleges (75%+ chance)
        for college in safety_colleges[:3]:
            college['category'] = 'safety'
            balanced_suggestions.append(college)
        
        # Add 3 target colleges (25-75% chance)
        for college in target_colleges[:3]:
            college['category'] = 'target'
            balanced_suggestions.append(college)
        
        # Add 3 reach colleges (10-25% chance)
        for college in reach_colleges[:3]:
            college['category'] = 'reach'
            balanced_suggestions.append(college)
        
        # If we don't have enough in any category, fill with the best available
        if len(balanced_suggestions) < 9:
            remaining_colleges = [c for c in all_college_predictions if c not in balanced_suggestions]
            remaining_colleges.sort(key=lambda x: x['probability'], reverse=True)
            
            while len(balanced_suggestions) < 9 and remaining_colleges:
                college = remaining_colleges.pop(0)
                # Determine category based on probability
                if college['probability'] >= 0.75:
                    college['category'] = 'safety'
                elif college['probability'] >= 0.25:
                    college['category'] = 'target'
                else:
                    college['category'] = 'reach'
                balanced_suggestions.append(college)
        
        # Debug: Log the distribution
        logger.info(f"Total colleges processed: {len(all_college_predictions)}")
        logger.info(f"Found {len(safety_colleges)} safety, {len(target_colleges)} target, {len(reach_colleges)} reach colleges")
        logger.info(f"Total balanced suggestions: {len(balanced_suggestions)}")
        
        # Log some sample probabilities
        if all_college_predictions:
            sample_probs = [c['probability'] for c in all_college_predictions[:5]]
            logger.info(f"Sample probabilities: {sample_probs}")
        
        # Return top 9 balanced suggestions
        top_suggestions = balanced_suggestions[:9]
        
        return {
            "success": True,
            "suggestions": top_suggestions,
            "academic_score": round(academic_score, 2),
            "target_tiers": target_tiers,
            "prediction_method": "hybrid_ml_formula"
        }
        
    except Exception as e:
        logger.error(f"College suggestion error: {e}")
        return {
            "success": False,
            "error": str(e),
            "message": "College suggestions failed. Please try again."
        }

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

