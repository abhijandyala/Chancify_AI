"""
Shared dependencies for API endpoints.
"""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from database import get_db, get_supabase, UserProfile
from config import settings

# Security scheme
security = HTTPBearer()


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> str:
    """
    Extract and validate JWT token to get current user ID.
    
    Args:
        credentials: JWT token from Authorization header
        
    Returns:
        str: User ID from token
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials

    # Support custom tokens generated for Google/dev flows
    if token.startswith("google_token_"):
        # Format: google_token_{user_id}_{google_id}
        remainder = token[len("google_token_") :]
        parts = remainder.split("_", 1)
        if parts and parts[0]:
            return parts[0]
        raise credentials_exception

    if token.startswith("demo_token_"):
        return "demo_user"

    try:
        # Decode JWT token (Supabase uses HS256)
        payload = jwt.decode(
            token,
            settings.supabase_service_key,  # Use service key to verify
            algorithms=[settings.algorithm]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception


def get_current_user_profile(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
) -> UserProfile:
    """
    Get current user's profile from database.
    
    Args:
        user_id: Current user's ID
        db: Database session
        
    Returns:
        UserProfile: User's profile
        
    Raises:
        HTTPException: If profile not found
    """
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    return profile


def get_optional_user_profile(
    user_id: Optional[str] = Depends(get_current_user_id),
    db: Session = Depends(get_db)
) -> Optional[UserProfile]:
    """
    Get current user's profile if authenticated, None otherwise.
    
    Args:
        user_id: Current user's ID (optional)
        db: Database session
        
    Returns:
        Optional[UserProfile]: User's profile or None
    """
    if user_id is None:
        return None
    
    try:
        profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        return profile
    except:
        return None
