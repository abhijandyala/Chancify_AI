"""
Authentication routes for user signup, login, and profile management.
"""

from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, get_supabase, UserProfile, AcademicData, Extracurricular, SavedCollege
from database.schemas import (
    UserProfileCreate,
    UserProfileResponse,
    AcademicDataResponse,
    ExtracurricularResponse,
    SavedCollegeResponse,
    Token,
    CompleteProfileResponse
)
from api.dependencies import get_current_user_profile

router = APIRouter()


@router.post("/signup", response_model=Token)
async def signup(
    email: str,
    password: str,
    profile_data: UserProfileCreate,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Create a new user account and profile.
    
    Args:
        email: User's email address
        password: User's password
        profile_data: Initial profile information
        db: Database session
        
    Returns:
        Dict: Access token and user information
    """
    supabase = get_supabase()
    
    try:
        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        if auth_response.user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user account"
            )
        
        user_id = auth_response.user.id
        
        # Create profile in our database
        profile = UserProfile(
            user_id=user_id,
            **profile_data.dict()
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
        
        # Return token and user info
        return {
            "access_token": auth_response.session.access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "email": email,
                "profile": UserProfileResponse.from_orm(profile)
            }
        }
        
    except Exception as e:
        db.rollback()
        if "already registered" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create account: {str(e)}"
        )


@router.post("/login", response_model=Token)
async def login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Login existing user.
    
    Args:
        email: User's email address
        password: User's password
        db: Database session
        
    Returns:
        Dict: Access token and user information
    """
    supabase = get_supabase()
    
    try:
        # Authenticate with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        if auth_response.user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        user_id = auth_response.user.id
        
        # Get user profile
        profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        
        return {
            "access_token": auth_response.session.access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "email": email,
                "profile": UserProfileResponse.from_orm(profile) if profile else None
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )


@router.post("/logout")
async def logout():
    """
    Logout user (invalidate token).
    
    Returns:
        Dict: Success message
    """
    # Note: With JWT tokens, we can't actually invalidate them server-side
    # In production, you'd want to implement a token blacklist
    # For now, we'll just return success
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=CompleteProfileResponse)
async def get_current_user(
    db: Session = Depends(get_db),
    current_user_profile: UserProfile = Depends(get_current_user_profile)
):
    """
    Get current user's complete profile information.
    
    Args:
        db: Database session
        current_user_profile: Current user's profile
        
    Returns:
        CompleteProfileResponse: Complete user profile with all related data
    """
    # Get academic data
    academic_data = db.query(AcademicData).filter(
        AcademicData.profile_id == current_user_profile.id
    ).first()
    
    # Get extracurriculars
    extracurriculars = db.query(Extracurricular).filter(
        Extracurricular.profile_id == current_user_profile.id
    ).order_by(Extracurricular.display_order).all()
    
    # Get saved colleges
    saved_colleges = db.query(SavedCollege).filter(
        SavedCollege.profile_id == current_user_profile.id
    ).all()
    
    return CompleteProfileResponse(
        profile=UserProfileResponse.from_orm(current_user_profile),
        academic_data=AcademicDataResponse.from_orm(academic_data) if academic_data else None,
        extracurriculars=[ExtracurricularResponse.from_orm(ec) for ec in extracurriculars],
        saved_colleges=[SavedCollegeResponse.from_orm(sc) for sc in saved_colleges]
    )
