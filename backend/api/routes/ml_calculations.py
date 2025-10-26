"""
ML-enhanced probability calculation routes.

Provides endpoints for ML+Formula hybrid predictions.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db, College, UserProfile, AcademicData, Extracurricular
from database.schemas import CalculationResponse
from api.dependencies import get_current_user_profile
from ml.models.predictor import get_predictor, model_available
from ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures

router = APIRouter()


def db_profile_to_student_features(
    profile: UserProfile,
    academic_data: Optional[AcademicData],
    extracurriculars: List[Extracurricular]
) -> StudentFeatures:
    """
    Convert database profile to ML StudentFeatures.
    
    This extracts all the detailed information needed for ML prediction.
    """
    # Calculate factor scores (simplified version - could use more sophisticated mapping)
    factor_scores = {}
    
    # GPA score
    if academic_data and academic_data.gpa_unweighted:
        gpa = float(academic_data.gpa_unweighted)
        if gpa >= 3.9:
            factor_scores["grades"] = 9.5
        elif gpa >= 3.7:
            factor_scores["grades"] = 8.5
        elif gpa >= 3.5:
            factor_scores["grades"] = 7.5
        elif gpa >= 3.3:
            factor_scores["grades"] = 6.5
        else:
            factor_scores["grades"] = 5.5
    else:
        factor_scores["grades"] = 5.0
    
    # Rigor score
    if academic_data:
        ap_count = len(academic_data.ap_courses) if academic_data.ap_courses else 0
        honors_count = len(academic_data.honors_courses) if academic_data.honors_courses else 0
        total_rigorous = ap_count + honors_count
        
        if total_rigorous >= 12:
            factor_scores["rigor"] = 9.5
        elif total_rigorous >= 8:
            factor_scores["rigor"] = 8.5
        elif total_rigorous >= 5:
            factor_scores["rigor"] = 7.5
        else:
            factor_scores["rigor"] = 6.0
    else:
        factor_scores["rigor"] = 5.0
    
    # Testing score
    if academic_data and academic_data.sat_total:
        sat = academic_data.sat_total
        if sat >= 1550:
            factor_scores["testing"] = 10.0
        elif sat >= 1500:
            factor_scores["testing"] = 9.5
        elif sat >= 1450:
            factor_scores["testing"] = 8.5
        elif sat >= 1400:
            factor_scores["testing"] = 7.5
        elif sat >= 1300:
            factor_scores["testing"] = 6.5
        else:
            factor_scores["testing"] = 5.5
    else:
        factor_scores["testing"] = 5.0
    
    # ECs score
    leadership_count = sum(1 for ec in extracurriculars 
                          if ec.leadership_positions and len(ec.leadership_positions) > 0)
    total_years = sum(len(ec.years_participated) if ec.years_participated else 0 
                     for ec in extracurriculars)
    
    if leadership_count >= 3 and total_years >= 10:
        factor_scores["ecs_leadership"] = 9.0
    elif leadership_count >= 2 and total_years >= 8:
        factor_scores["ecs_leadership"] = 8.0
    elif leadership_count >= 1:
        factor_scores["ecs_leadership"] = 7.0
    else:
        factor_scores["ecs_leadership"] = 5.5
    
    # Fill in remaining factor scores with defaults
    default_factors = {
        "essay": 7.0,
        "recommendations": 7.0,
        "plan_timing": 6.0,
        "athletic_recruit": 3.0,
        "major_fit": 6.5,
        "geography_residency": 5.5,
        "firstgen_diversity": 5.0,
        "ability_to_pay": 5.5,
        "awards_publications": 5.5,
        "portfolio_audition": 5.0,
        "policy_knob": 5.0,
        "demonstrated_interest": 6.0,
        "legacy": 3.0,
        "interview": 6.5,
        "conduct_record": 9.5,
        "hs_reputation": 6.0
    }
    
    for key, val in default_factors.items():
        if key not in factor_scores:
            factor_scores[key] = val
    
    # Create StudentFeatures
    return StudentFeatures(
        factor_scores=factor_scores,
        gpa_unweighted=float(academic_data.gpa_unweighted) if academic_data and academic_data.gpa_unweighted else None,
        gpa_weighted=float(academic_data.gpa_weighted) if academic_data and academic_data.gpa_weighted else None,
        sat_total=academic_data.sat_total if academic_data else None,
        sat_math=academic_data.sat_math if academic_data else None,
        sat_reading_writing=academic_data.sat_reading_writing if academic_data else None,
        act_composite=academic_data.act_composite if academic_data else None,
        ap_count=len(academic_data.ap_courses) if academic_data and academic_data.ap_courses else 0,
        honors_count=len(academic_data.honors_courses) if academic_data and academic_data.honors_courses else 0,
        ec_count=len(extracurriculars),
        leadership_positions_count=leadership_count,
        years_commitment=total_years,
        hours_per_week=sum(float(ec.hours_per_week) if ec.hours_per_week else 0 for ec in extracurriculars) / len(extracurriculars) if extracurriculars else 0,
        awards_count=0,  # TODO: Extract from profile
        national_awards=0,
        first_generation=False,  # TODO: Extract from profile
        underrepresented_minority=False,
        geographic_diversity=5.0,
        legacy_status=False,
        recruited_athlete=False
    )


def db_college_to_college_features(college: College) -> CollegeFeatures:
    """Convert database College to ML CollegeFeatures."""
    return CollegeFeatures(
        name=college.name,
        acceptance_rate=float(college.acceptance_rate) if college.acceptance_rate else 0.10,
        acceptance_rate_ed=float(college.acceptance_rate_ed1) if college.acceptance_rate_ed1 else None,
        acceptance_rate_rd=float(college.acceptance_rate_rd) if college.acceptance_rate_rd else None,
        sat_25th=college.sat_25th,
        sat_75th=college.sat_75th,
        act_25th=college.act_25th,
        act_75th=college.act_75th,
        test_policy=college.test_policy or "Required",
        financial_aid_policy=college.financial_aid_policy or "Need-blind",
        selectivity_tier="Selective",  # TODO: Calculate from acceptance rate
        region="Northeast",  # TODO: Extract from location
        gpa_average=float(college.gpa_average) if college.gpa_average else None
    )


@router.post("/ml/calculate/{college_id}")
async def calculate_ml_probability(
    college_id: str,
    model_name: str = Query(default="ensemble", description="ML model to use"),
    current_user_profile: UserProfile = Depends(get_current_user_profile),
    db: Session = Depends(get_db)
):
    """
    Calculate admission probability using ML+Formula hybrid.
    
    Args:
        college_id: UUID of the college
        model_name: ML model to use ('ensemble', 'logistic_regression', 'random_forest', 'xgboost')
        current_user_profile: Current user's profile
        db: Database session
        
    Returns:
        Enhanced CalculationResponse with ML predictions
    """
    # Check if ML is available
    if not model_available():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ML models not available. Please use standard calculation endpoint."
        )
    
    # Get college data
    college = db.query(College).filter(College.id == college_id).first()
    if not college:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="College not found"
        )
    
    # Get user's academic data
    academic_data = db.query(AcademicData).filter(
        AcademicData.profile_id == current_user_profile.id
    ).first()
    
    # Get user's extracurriculars
    extracurriculars = db.query(Extracurricular).filter(
        Extracurricular.profile_id == current_user_profile.id
    ).all()
    
    # Convert to ML features
    student_features = db_profile_to_student_features(
        current_user_profile,
        academic_data,
        extracurriculars
    )
    
    college_features = db_college_to_college_features(college)
    
    # Get predictor and make prediction
    predictor = get_predictor()
    result = predictor.predict(
        student=student_features,
        college=college_features,
        model_name=model_name,
        use_formula=True
    )
    
    # Determine category based on final probability
    prob = result.probability
    if prob < 0.15:
        category = "reach"
    elif prob < 0.40:
        category = "reach"
    elif prob < 0.65:
        category = "target"
    else:
        category = "safety"
    
    return {
        "college_id": str(college.id),
        "college_name": college.name,
        "composite_score": None,  # ML doesn't use composite score
        "probability": result.probability,
        "confidence_interval": {
            "lower": result.confidence_interval[0],
            "upper": result.confidence_interval[1]
        },
        "ml_probability": result.ml_probability,
        "formula_probability": result.formula_probability,
        "ml_confidence": result.ml_confidence,
        "blend_weights": result.blend_weights,
        "model_used": result.model_used,
        "prediction_method": "hybrid_ml",
        "explanation": result.explanation,
        "category": category,
        "percentile_estimate": None,
        "audit_breakdown": [],
        "policy_notes": [result.explanation]
    }


@router.get("/ml/status")
async def ml_status():
    """
    Check ML model availability and status.
    
    Returns:
        Model status and metadata
    """
    if not model_available():
        return {
            "available": False,
            "message": "ML models not loaded"
        }
    
    predictor = get_predictor()
    info = predictor.get_model_info()
    
    return {
        "available": True,
        "models": info.get('models_loaded', []),
        "num_features": info.get('num_features'),
        "training_date": info.get('training_date'),
        "num_training_samples": info.get('num_training_samples'),
        "metrics": info.get('metrics', {})
    }

