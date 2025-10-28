#!/usr/bin/env python3
"""
OpenAI College Subject Emphasis API
Uses OpenAI API to get real subject emphasis data for colleges
"""

import os
import openai
import json
import logging
from typing import Dict, List, Optional
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class CollegeSubjectEmphasis:
    def __init__(self):
        """Initialize OpenAI client"""
        self.client = None
        self.setup_openai()
    
    def setup_openai(self):
        """Setup OpenAI client with API key"""
        try:
            api_key = os.getenv('OPENAI_API_KEY')
            if not api_key:
                logger.error("OPENAI_API_KEY not found in environment variables")
                return
            
            openai.api_key = api_key
            self.client = openai.OpenAI(api_key=api_key)
            logger.info("OpenAI client initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing OpenAI client: {e}")
    
    def get_college_subject_emphasis(self, college_name: str) -> Dict[str, float]:
        """
        Get subject emphasis percentages for a specific college using OpenAI
        
        Args:
            college_name: Name of the college
            
        Returns:
            Dictionary with subject names as keys and emphasis percentages as values
        """
        if not self.client:
            logger.error("OpenAI client not initialized")
            return self.get_fallback_data()
        
        try:
            prompt = f"""
            You are an expert on college academic programs and subject emphasis. 
            For the college "{college_name}", provide the percentage emphasis on each academic subject area.
            
            Return ONLY a JSON object with these exact subject names as keys and percentages (0-100) as values:
            {{
                "Computer Science": 0-100,
                "Engineering": 0-100,
                "Business": 0-100,
                "Biological Sciences": 0-100,
                "Mathematics & Stats": 0-100,
                "Social Sciences": 0-100,
                "Arts & Humanities": 0-100,
                "Education": 0-100
            }}
            
            Requirements:
            - Percentages should add up to approximately 100%
            - Be accurate based on the college's actual academic focus
            - Consider the college's reputation and known strengths
            - For technical schools like MIT, emphasize STEM subjects
            - For liberal arts colleges, emphasize Arts & Humanities
            - For business schools, emphasize Business
            
            Return ONLY the JSON object, no other text.
            """
            
            logger.info(f"Requesting subject emphasis for: {college_name}")
            
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert college academic advisor with deep knowledge of university programs and subject emphasis."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            content = response.choices[0].message.content.strip()
            logger.info(f"OpenAI response: {content}")
            
            # Parse JSON response
            try:
                # Remove any markdown formatting if present
                if content.startswith('```json'):
                    content = content.replace('```json', '').replace('```', '').strip()
                elif content.startswith('```'):
                    content = content.replace('```', '').strip()
                
                subject_data = json.loads(content)
                
                # Validate the response
                required_subjects = [
                    "Computer Science", "Engineering", "Business", "Biological Sciences",
                    "Mathematics & Stats", "Social Sciences", "Arts & Humanities", "Education"
                ]
                
                for subject in required_subjects:
                    if subject not in subject_data:
                        logger.warning(f"Missing subject: {subject}")
                        subject_data[subject] = 0.0
                    else:
                        # Ensure value is a number
                        try:
                            subject_data[subject] = float(subject_data[subject])
                        except (ValueError, TypeError):
                            subject_data[subject] = 0.0
                
                logger.info(f"Successfully parsed subject emphasis for {college_name}")
                return subject_data
                
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {e}")
                logger.error(f"Response content: {content}")
                return self.get_fallback_data()
                
        except Exception as e:
            logger.error(f"Error getting subject emphasis for {college_name}: {e}")
            return self.get_fallback_data()
    
    def get_fallback_data(self) -> Dict[str, float]:
        """Return fallback data when OpenAI fails"""
        return {
            "Computer Science": 20.0,
            "Engineering": 18.0,
            "Business": 15.0,
            "Biological Sciences": 12.0,
            "Mathematics & Stats": 10.0,
            "Social Sciences": 10.0,
            "Arts & Humanities": 10.0,
            "Education": 5.0
        }
    
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
