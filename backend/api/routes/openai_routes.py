"""
API endpoint for fetching college information using OpenAI
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import logging
from services.openai_service import college_info_service

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/college-info")
async def get_college_info(college_name: str) -> Dict[str, Any]:
    """
    Get comprehensive college information using OpenAI
    
    Args:
        college_name: Name of the college
        
    Returns:
        Dictionary with college information
    """
    try:
        college_data = await college_info_service.get_college_info(college_name)
        return {
            "success": True,
            "data": college_data
        }
    except Exception as e:
        logger.error(f"Error fetching college info for {college_name}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch college information: {str(e)}")

@router.post("/multiple-colleges-info")
async def get_multiple_colleges_info(college_names: List[str]) -> Dict[str, Any]:
    """
    Get information for multiple colleges
    
    Args:
        college_names: List of college names
        
    Returns:
        Dictionary with college information for each college
    """
    try:
        if len(college_names) > 10:
            raise HTTPException(status_code=400, detail="Maximum 10 colleges per request")
        
        colleges_data = await college_info_service.get_multiple_colleges_info(college_names)
        return {
            "success": True,
            "data": colleges_data
        }
    except Exception as e:
        logger.error(f"Error fetching multiple colleges info: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch college information: {str(e)}")

@router.get("/college-info/{college_name}")
async def get_college_info_by_name(college_name: str) -> Dict[str, Any]:
    """
    Get college information by name (GET endpoint)
    
    Args:
        college_name: Name of the college
        
    Returns:
        Dictionary with college information
    """
    try:
        college_data = await college_info_service.get_college_info(college_name)
        return {
            "success": True,
            "data": college_data
        }
    except Exception as e:
        logger.error(f"Error fetching college info for {college_name}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch college information: {str(e)}")
