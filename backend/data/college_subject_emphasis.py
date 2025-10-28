#!/usr/bin/env python3
"""
Hardcoded College Subject Emphasis Data
Uses predefined data instead of OpenAI API
"""

import os
import json
import logging
import time
from typing import Dict, List, Optional
from .hardcoded_subject_emphasis import get_subject_emphasis_for_college

logger = logging.getLogger(__name__)

class CollegeSubjectEmphasis:
    def __init__(self):
        """Initialize with hardcoded data"""
        logger.info("CollegeSubjectEmphasis initialized with hardcoded data.")
        
        self.default_subjects = {
            "Computer Science": 20.0,
            "Engineering": 18.0,
            "Business": 15.0,
            "Biological Sciences": 12.0,
            "Mathematics & Stats": 10.0,
            "Social Sciences": 10.0,
            "Arts & Humanities": 10.0,
            "Education": 5.0,
        }
    
    def get_college_subject_emphasis(self, college_name: str) -> Dict[str, float]:
        """
        Get subject emphasis for a college using hardcoded data.
        
        Args:
            college_name: Name of the college
            
        Returns:
            Dictionary with subject names as keys and emphasis percentages as values
        """
        logger.info(f"Getting hardcoded subject emphasis for {college_name}")
        
        # Get hardcoded data for the college
        subject_data = get_subject_emphasis_for_college(college_name)
        
        logger.info(f"Retrieved subject emphasis for {college_name}: {len(subject_data)} subjects")
        return subject_data
    
    def get_fallback_data(self) -> Dict[str, float]:
        """Return fallback data"""
        return self.default_subjects
    
    def get_subject_emphasis_with_cache(self, college_name: str, cache: Dict = None) -> Dict[str, float]:
        """
        Get subject emphasis with optional caching
        
        Args:
            college_name: Name of the college
            cache: Optional cache dictionary to store results
            
        Returns:
            Dictionary with subject emphasis percentages
        """
        if cache is None:
            cache = {}
        
        # Check cache first
        cache_key = f"subject_emphasis_{college_name.lower().replace(' ', '_')}"
        if cache_key in cache:
            logger.info(f"Using cached subject emphasis for {college_name}")
            return cache[cache_key]
        
        # Get fresh data
        data = self.get_college_subject_emphasis(college_name)
        
        # Cache the result
        cache[cache_key] = data
        logger.info(f"Cached subject emphasis for {college_name}")
        
        return data

# Global instance
college_subject_emphasis = CollegeSubjectEmphasis()