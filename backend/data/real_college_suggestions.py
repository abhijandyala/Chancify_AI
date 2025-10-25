"""
Real College Suggestions System
Uses real IPEDS data to suggest colleges based on major strength
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple, Optional
from .real_ipeds_major_mapping import real_ipeds_mapping

class RealCollegeSuggestions:
    def __init__(self):
        """Initialize with real college and major data"""
        self.college_df = None
        self.college_by_name = {}  # Index for fast lookup by name
        self.load_college_data()
    
    def load_college_data(self):
        """Load the college data and create indexes for fast lookup"""
        try:
            self.college_df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')
            print(f"Loaded college data: {self.college_df.shape}")
            
            # Create index for fast lookup by name
            for idx, row in self.college_df.iterrows():
                college_name = row.get('name', '')
                if college_name:
                    self.college_by_name[college_name] = row
            
            print(f"Indexed {len(self.college_by_name)} colleges by name")
        except Exception as e:
            print(f"Error loading college data: {e}")
            self.college_df = pd.DataFrame()
    
    def get_colleges_for_major_and_tier(self, major: str, tier: str, limit: int = None) -> List[Dict]:
        """Get colleges that offer a specific major in a specific tier"""
        # Map user major to IPEDS major
        ipeds_major = real_ipeds_mapping.map_major_name(major)
        
        # Get colleges from IPEDS data
        ipeds_colleges = real_ipeds_mapping.get_colleges_for_major(ipeds_major, tier, limit)
        
        # Convert to college data format (using index for fast lookup)
        college_suggestions = []
        for college_name in ipeds_colleges:
            # Use indexed lookup instead of DataFrame search
            row = self.college_by_name.get(college_name)
            
            if row is not None:
                # Get major strength score
                major_fit_score = real_ipeds_mapping.get_major_strength_score(college_name, ipeds_major)
                
                college_data = {
                    'name': college_name,
                    'unitid': row.get('unitid', 0),
                    'city': row.get('city', ''),
                    'state': row.get('state', ''),
                    'selectivity_tier': row.get('selectivity_tier', 'Moderately Selective'),
                    'acceptance_rate': row.get('acceptance_rate', 0.5),
                    'tuition_in_state': row.get('tuition_in_state_usd', 0),
                    'tuition_out_of_state': row.get('tuition_out_of_state_usd', 0),
                    'student_body_size': row.get('student_body_size', 0),
                    'major_fit_score': major_fit_score,
                    'ipeds_major': ipeds_major
                }
                
                college_suggestions.append(college_data)
        
        return college_suggestions
    
    def get_balanced_suggestions(self, major: str, academic_strength: float) -> List[Dict]:
        """Get balanced suggestions (3 safety, 3 target, 3 reach) for a major"""
        suggestions = []
        
        # Determine tier limits based on academic strength
        if academic_strength >= 8.0:  # Elite student
            safety_tier = 'highly_selective'
            target_tier = 'elite'
            reach_tier = 'elite'
        elif academic_strength >= 6.0:  # Strong student
            safety_tier = 'selective'
            target_tier = 'highly_selective'
            reach_tier = 'elite'
        elif academic_strength >= 4.0:  # Average student
            safety_tier = 'moderately_selective'
            target_tier = 'selective'
            reach_tier = 'highly_selective'
        else:  # Weak student
            safety_tier = 'moderately_selective'
            target_tier = 'moderately_selective'
            reach_tier = 'selective'
        
        # Get colleges for each tier
        safety_colleges = self.get_colleges_for_major_and_tier(major, safety_tier, limit=10)
        target_colleges = self.get_colleges_for_major_and_tier(major, target_tier, limit=10)
        reach_colleges = self.get_colleges_for_major_and_tier(major, reach_tier, limit=10)
        
        # Sort by major fit score (descending)
        safety_colleges.sort(key=lambda x: x['major_fit_score'], reverse=True)
        target_colleges.sort(key=lambda x: x['major_fit_score'], reverse=True)
        reach_colleges.sort(key=lambda x: x['major_fit_score'], reverse=True)
        
        # Take top 3 from each category
        for college in safety_colleges[:3]:
            college['category'] = 'safety'
            suggestions.append(college)
        
        for college in target_colleges[:3]:
            college['category'] = 'target'
            suggestions.append(college)
        
        for college in reach_colleges[:3]:
            college['category'] = 'reach'
            suggestions.append(college)
        
        return suggestions
    
    def get_fallback_suggestions(self, major: str, academic_strength: float) -> List[Dict]:
        """Get fallback suggestions when major-specific colleges are limited"""
        suggestions = []
        
        # Get all colleges that offer this major
        ipeds_major = real_ipeds_mapping.map_major_name(major)
        all_colleges = real_ipeds_mapping.get_colleges_for_major(ipeds_major, limit=50)
        
        # Convert to college data and sort by major fit score
        college_data = []
        for college_name in all_colleges:
            college_row = self.college_df[self.college_df['name'] == college_name]
            
            if len(college_row) > 0:
                row = college_row.iloc[0]
                major_fit_score = real_ipeds_mapping.get_major_strength_score(college_name, ipeds_major)
                
                college_info = {
                    'name': college_name,
                    'unitid': row.get('unitid', 0),
                    'city': row.get('city', ''),
                    'state': row.get('state', ''),
                    'selectivity_tier': row.get('selectivity_tier', 'Moderately Selective'),
                    'acceptance_rate': row.get('acceptance_rate', 0.5),
                    'tuition_in_state': row.get('tuition_in_state_usd', 0),
                    'tuition_out_of_state': row.get('tuition_out_of_state_usd', 0),
                    'student_body_size': row.get('student_body_size', 0),
                    'major_fit_score': major_fit_score,
                    'ipeds_major': ipeds_major
                }
                
                college_data.append(college_info)
        
        # Sort by major fit score
        college_data.sort(key=lambda x: x['major_fit_score'], reverse=True)
        
        # Categorize based on acceptance rate and academic strength
        for i, college in enumerate(college_data[:9]):
            acceptance_rate = college['acceptance_rate']
            
            if acceptance_rate >= 0.75:
                category = 'safety'
            elif acceptance_rate >= 0.25:
                category = 'target'
            else:
                category = 'reach'
            
            college['category'] = category
            suggestions.append(college)
        
        return suggestions

# Global instance
real_college_suggestions = RealCollegeSuggestions()
