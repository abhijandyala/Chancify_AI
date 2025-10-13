"""
Pydantic schemas for API request/response validation.
"""

from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field


# Base schemas
class BaseSchema(BaseModel):
    """Base schema with common configuration."""
    
    class Config:
        from_attributes = True
        use_enum_values = True


# User Profile Schemas
class UserProfileBase(BaseSchema):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    high_school_name: Optional[str] = None
    graduation_year: Optional[int] = None


class UserProfileCreate(UserProfileBase):
    pass


class UserProfileUpdate(UserProfileBase):
    pass


class UserProfileResponse(UserProfileBase):
    id: UUID
    user_id: UUID
    profile_complete: bool
    created_at: datetime
    last_updated: datetime


# Academic Data Schemas
class AcademicDataBase(BaseSchema):
    # GPA Information
    gpa_unweighted: Optional[float] = Field(None, ge=0.0, le=4.0)
    gpa_weighted: Optional[float] = Field(None, ge=0.0, le=6.0)
    gpa_scale: Optional[str] = None
    class_rank: Optional[int] = Field(None, gt=0)
    class_size: Optional[int] = Field(None, gt=0)
    
    # Standardized Testing
    sat_total: Optional[int] = Field(None, ge=400, le=1600)
    sat_math: Optional[int] = Field(None, ge=200, le=800)
    sat_reading_writing: Optional[int] = Field(None, ge=200, le=800)
    act_composite: Optional[int] = Field(None, ge=1, le=36)
    test_optional_choice: Optional[bool] = None
    
    # Curriculum
    ap_courses: Optional[List[Dict[str, Any]]] = None
    ib_program: Optional[Dict[str, Any]] = None
    honors_courses: Optional[List[Dict[str, Any]]] = None


class AcademicDataCreate(AcademicDataBase):
    pass


class AcademicDataUpdate(AcademicDataBase):
    pass


class AcademicDataResponse(AcademicDataBase):
    id: UUID
    profile_id: UUID
    created_at: datetime
    updated_at: datetime


# Extracurricular Schemas
class ExtracurricularBase(BaseSchema):
    activity_name: str = Field(..., max_length=255)
    category: Optional[str] = Field(None, max_length=50)
    leadership_positions: Optional[List[str]] = None
    years_participated: Optional[List[int]] = None
    hours_per_week: Optional[float] = Field(None, ge=0.0)
    weeks_per_year: Optional[int] = Field(None, ge=0, le=52)
    description: Optional[str] = None
    achievements: Optional[List[str]] = None
    display_order: Optional[int] = 0


class ExtracurricularCreate(ExtracurricularBase):
    pass


class ExtracurricularUpdate(ExtracurricularBase):
    activity_name: Optional[str] = Field(None, max_length=255)


class ExtracurricularResponse(ExtracurricularBase):
    id: UUID
    profile_id: UUID
    created_at: datetime


# College Schemas
class CollegeBase(BaseSchema):
    name: str = Field(..., max_length=255)
    common_name: Optional[str] = Field(None, max_length=255)
    location_city: Optional[str] = Field(None, max_length=100)
    location_state: Optional[str] = Field(None, max_length=50)
    
    # Admissions Data
    acceptance_rate: Optional[float] = Field(None, ge=0.0, le=1.0)
    acceptance_rate_ed1: Optional[float] = Field(None, ge=0.0, le=1.0)
    acceptance_rate_ea: Optional[float] = Field(None, ge=0.0, le=1.0)
    acceptance_rate_rd: Optional[float] = Field(None, ge=0.0, le=1.0)
    
    # Academic Profile
    sat_25th: Optional[int] = Field(None, ge=400, le=1600)
    sat_75th: Optional[int] = Field(None, ge=400, le=1600)
    act_25th: Optional[int] = Field(None, ge=1, le=36)
    act_75th: Optional[int] = Field(None, ge=1, le=36)
    gpa_average: Optional[float] = Field(None, ge=0.0, le=4.0)
    
    # Policies
    test_policy: Optional[str] = None
    financial_aid_policy: Optional[str] = None
    uses_common_app: Optional[bool] = None
    
    # Factor Weights
    custom_weights: Optional[Dict[str, float]] = None


class CollegeCreate(CollegeBase):
    pass


class CollegeUpdate(CollegeBase):
    name: Optional[str] = Field(None, max_length=255)


class CollegeResponse(CollegeBase):
    id: UUID
    data_source: Optional[str] = None
    created_at: datetime
    last_updated: datetime


# Saved College Schemas
class SavedCollegeBase(BaseSchema):
    application_round: Optional[str] = Field(None, max_length=10)
    intended_major: Optional[str] = Field(None, max_length=100)
    demonstrated_interest_score: Optional[float] = Field(None, ge=0.0, le=10.0)
    campus_visited: Optional[bool] = False
    notes: Optional[str] = None
    category: Optional[str] = Field(None, max_length=20)


class SavedCollegeCreate(SavedCollegeBase):
    college_id: UUID


class SavedCollegeUpdate(SavedCollegeBase):
    pass


class SavedCollegeResponse(SavedCollegeBase):
    id: UUID
    profile_id: UUID
    college_id: UUID
    created_at: datetime


# Probability Calculation Schemas
class ProbabilityCalculationBase(BaseSchema):
    factor_scores: Dict[str, float] = Field(..., description="Factor scores (0-10 scale)")
    composite_score: Optional[float] = None
    probability: Optional[float] = Field(None, ge=0.0, le=1.0)
    percentile_estimate: Optional[float] = Field(None, ge=0.0, le=100.0)
    audit_breakdown: Optional[List[Dict[str, Any]]] = None
    policy_notes: Optional[List[str]] = None
    calculation_version: Optional[str] = "1.0"


class ProbabilityCalculationCreate(ProbabilityCalculationBase):
    college_id: UUID


class ProbabilityCalculationResponse(ProbabilityCalculationBase):
    id: UUID
    profile_id: UUID
    college_id: UUID
    calculated_at: datetime


# Request/Response schemas for specific endpoints
class FactorScoresRequest(BaseSchema):
    """Request schema for probability calculation."""
    factor_scores: Dict[str, Optional[float]] = Field(
        ..., 
        description="Factor scores (0-10 scale). Missing factors default to 5.0"
    )


class BatchCalculationRequest(BaseSchema):
    """Request schema for batch probability calculation."""
    college_ids: List[UUID] = Field(..., description="List of college IDs to calculate for")


class CalculationResponse(BaseSchema):
    """Response schema for probability calculation."""
    college_id: UUID
    college_name: str
    composite_score: float
    probability: float
    percentile_estimate: float
    audit_breakdown: List[Dict[str, Any]]
    policy_notes: List[str]
    category: Optional[str] = None  # reach, target, safety


class BatchCalculationResponse(BaseSchema):
    """Response schema for batch calculation."""
    results: List[CalculationResponse]


# Authentication schemas
class Token(BaseSchema):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseSchema):
    user_id: Optional[str] = None


# Search and filtering schemas
class CollegeSearchRequest(BaseSchema):
    search: Optional[str] = None
    state: Optional[str] = None
    test_policy: Optional[str] = None
    acceptance_rate_min: Optional[float] = Field(None, ge=0.0, le=1.0)
    acceptance_rate_max: Optional[float] = Field(None, ge=0.0, le=1.0)
    limit: Optional[int] = Field(20, ge=1, le=100)
    offset: Optional[int] = Field(0, ge=0)


class CollegeSearchResponse(BaseSchema):
    colleges: List[CollegeResponse]
    total: int
    limit: int
    offset: int


# Complete profile response
class CompleteProfileResponse(BaseSchema):
    """Complete user profile with all related data."""
    profile: UserProfileResponse
    academic_data: Optional[AcademicDataResponse] = None
    extracurriculars: List[ExtracurricularResponse] = []
    saved_colleges: List[SavedCollegeResponse] = []
