"""
SQLAlchemy models for Chancify AI database.
"""

import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Text, 
    DECIMAL, ForeignKey, JSON, ARRAY, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class UserProfile(Base):
    """User profile information."""
    
    __tablename__ = "user_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), unique=True, nullable=False)  # References auth.users
    
    # Personal Information
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(255))
    high_school_name = Column(String(255))
    graduation_year = Column(Integer)
    
    # Profile Status
    profile_complete = Column(Boolean, default=False)
    last_updated = Column(DateTime(timezone=True), default=datetime.utcnow)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    academic_data = relationship("AcademicData", back_populates="profile", uselist=False)
    extracurriculars = relationship("Extracurricular", back_populates="profile")
    saved_colleges = relationship("SavedCollege", back_populates="profile")
    calculations = relationship("ProbabilityCalculation", back_populates="profile")


class AcademicData(Base):
    """Academic information for a user."""
    
    __tablename__ = "academic_data"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("user_profiles.id"), nullable=False)
    
    # GPA Information
    gpa_unweighted = Column(DECIMAL(3, 2))
    gpa_weighted = Column(DECIMAL(3, 2))
    gpa_scale = Column(String(10))  # "4.0", "5.0", "100", "other"
    class_rank = Column(Integer)
    class_size = Column(Integer)
    
    # Standardized Testing
    sat_total = Column(Integer)
    sat_math = Column(Integer)
    sat_reading_writing = Column(Integer)
    act_composite = Column(Integer)
    test_optional_choice = Column(Boolean)
    
    # Curriculum (stored as JSON for flexibility)
    ap_courses = Column(JSON, default=list)
    ib_program = Column(JSON, default=dict)
    honors_courses = Column(JSON, default=list)
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="academic_data")


class Extracurricular(Base):
    """Extracurricular activities for a user."""
    
    __tablename__ = "extracurriculars"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("user_profiles.id"), nullable=False)
    
    # Activity Information
    activity_name = Column(String(255), nullable=False)
    category = Column(String(50))  # Academic, Arts, Athletics, etc.
    leadership_positions = Column(ARRAY(String), default=list)
    years_participated = Column(ARRAY(Integer), default=list)
    hours_per_week = Column(DECIMAL(4, 1))
    weeks_per_year = Column(Integer)
    description = Column(Text)
    achievements = Column(JSON, default=list)
    
    # Display order
    display_order = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class College(Base):
    """College/university reference data."""
    
    __tablename__ = "colleges"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Basic Information
    name = Column(String(255), nullable=False, unique=True)
    common_name = Column(String(255))
    location_city = Column(String(100))
    location_state = Column(String(50))
    
    # Admissions Data
    acceptance_rate = Column(DECIMAL(5, 4))
    acceptance_rate_ed1 = Column(DECIMAL(5, 4))
    acceptance_rate_ea = Column(DECIMAL(5, 4))
    acceptance_rate_rd = Column(DECIMAL(5, 4))
    
    # Academic Profile
    sat_25th = Column(Integer)
    sat_75th = Column(Integer)
    act_25th = Column(Integer)
    act_75th = Column(Integer)
    gpa_average = Column(DECIMAL(3, 2))
    
    # Policies
    test_policy = Column(String(20))  # Required, Optional, Blind
    financial_aid_policy = Column(String(20))  # Need-blind, Need-aware
    uses_common_app = Column(Boolean)
    
    # Factor Weights (custom per college)
    custom_weights = Column(JSON)
    
    # Metadata
    data_source = Column(String(100))
    last_updated = Column(DateTime(timezone=True), default=datetime.utcnow)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    saved_by_users = relationship("SavedCollege", back_populates="college")
    calculations = relationship("ProbabilityCalculation", back_populates="college")


class SavedCollege(Base):
    """Colleges saved by users with application details."""
    
    __tablename__ = "saved_colleges"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("user_profiles.id"), nullable=False)
    college_id = Column(UUID(as_uuid=True), ForeignKey("colleges.id"), nullable=False)
    
    # Application Plan
    application_round = Column(String(10))  # ED1, ED2, EA, RD
    intended_major = Column(String(100))
    demonstrated_interest_score = Column(DECIMAL(3, 1))
    campus_visited = Column(Boolean, default=False)
    
    # User Notes
    notes = Column(Text)
    category = Column(String(20))  # reach, target, safety
    
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Ensure unique combination
    __table_args__ = (
        UniqueConstraint('profile_id', 'college_id', name='unique_user_college'),
    )
    
    # Relationships
    profile = relationship("UserProfile", back_populates="saved_colleges")
    college = relationship("College", back_populates="saved_by_users")


class ProbabilityCalculation(Base):
    """Cached probability calculation results."""
    
    __tablename__ = "probability_calculations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("user_profiles.id"), nullable=False)
    college_id = Column(UUID(as_uuid=True), ForeignKey("colleges.id"), nullable=False)
    
    # Input Factors (snapshot)
    factor_scores = Column(JSON, nullable=False)
    
    # Results
    composite_score = Column(DECIMAL(6, 2))
    probability = Column(DECIMAL(5, 4))
    percentile_estimate = Column(DECIMAL(5, 2))
    
    # Audit Trail
    audit_breakdown = Column(JSON)
    policy_notes = Column(JSON)
    
    # Metadata
    calculation_version = Column(String(10), default="1.0")
    calculated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    profile = relationship("UserProfile", back_populates="calculations")
    college = relationship("College", back_populates="calculations")
