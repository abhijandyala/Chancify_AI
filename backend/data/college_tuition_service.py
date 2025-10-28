#!/usr/bin/env python3
"""
College Tuition Data Service
Serves real tuition and cost data for colleges
"""

import logging
import time
from typing import Dict, Any, Optional
from .hardcoded_tuition_data import get_tuition_data_for_college

logger = logging.getLogger(__name__)

class CollegeTuitionService:
    def __init__(self):
        """Initialize tuition service with hardcoded data"""
        logger.info("CollegeTuitionService initialized with hardcoded data.")
    
    def get_college_tuition_data(self, college_name: str) -> Dict[str, Any]:
        """
        Get tuition and cost data for a specific college
        
        Args:
            college_name: Name of the college
            
        Returns:
            Dictionary with tuition and cost information
        """
        logger.info(f"Getting tuition data for {college_name}")
        
        # Get hardcoded data for the college
        tuition_data = get_tuition_data_for_college(college_name)
        
        logger.info(f"Retrieved tuition data for {college_name}: ${tuition_data['total_in_state']:,} total")
        return tuition_data
    
    def get_tuition_data_with_cache(self, college_name: str, cache: Dict = None) -> Dict[str, Any]:
        """
        Get tuition data with optional caching
        
        Args:
            college_name: Name of the college
            cache: Optional cache dictionary to store results
            
        Returns:
            Dictionary with tuition and cost information
        """
        if cache is None:
            cache = {}
        
        # Check cache first
        cache_key = f"tuition_data_{college_name.lower().replace(' ', '_')}"
        if cache_key in cache:
            logger.info(f"Using cached tuition data for {college_name}")
            return cache[cache_key]
        
        # Get fresh data
        data = self.get_college_tuition_data(college_name)
        
        # Cache the result
        cache[cache_key] = data
        logger.info(f"Cached tuition data for {college_name}")
        
        return data

# Global instance
college_tuition_service = CollegeTuitionService()
