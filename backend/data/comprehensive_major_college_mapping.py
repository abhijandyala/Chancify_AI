"""
Comprehensive Major-College Mapping System
Intelligently maps majors to colleges based on college names, characteristics, and known program strengths
"""

import pandas as pd
import re
from typing import Dict, List, Tuple, Set

class ComprehensiveMajorCollegeMapper:
    def __init__(self, colleges_df_path: str = 'backend/data/raw/integrated_colleges_with_elite.csv'):
        """Initialize with college data"""
        self.df = pd.read_csv(colleges_df_path)
        self.college_names = set(self.df['name'].dropna().str.lower())
        
        # Major keywords for intelligent matching
        self.major_keywords = {
            'Computer Science': {
                'keywords': ['computer', 'computing', 'software', 'programming', 'tech', 'technology', 'engineering', 'informatics', 'cyber'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Engineering': {
                'keywords': ['engineering', 'tech', 'technology', 'institute', 'polytechnic', 'mechanical', 'electrical', 'civil', 'aerospace'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Business': {
                'keywords': ['business', 'management', 'commerce', 'economics', 'finance', 'marketing', 'administration'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Medicine': {
                'keywords': ['medical', 'medicine', 'health', 'healthcare', 'hospital', 'clinical', 'biomedical', 'pharmacy'],
                'exclude': ['theology', 'divinity', 'seminary', 'bible', 'christian']
            },
            'Nursing': {
                'keywords': ['nursing', 'health', 'medical', 'hospital', 'clinical', 'healthcare'],
                'exclude': ['theology', 'divinity', 'seminary', 'bible', 'christian']
            },
            'Psychology': {
                'keywords': ['psychology', 'behavioral', 'mental health', 'counseling', 'social work'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Biology': {
                'keywords': ['biology', 'biological', 'life sciences', 'biomedical', 'biochemistry', 'microbiology'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Mathematics': {
                'keywords': ['mathematics', 'math', 'statistics', 'applied math', 'computational'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Physics': {
                'keywords': ['physics', 'physical', 'astronomy', 'astrophysics', 'quantum'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'English': {
                'keywords': ['english', 'literature', 'writing', 'creative writing', 'journalism', 'communications'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'History': {
                'keywords': ['history', 'historical', 'classics', 'archaeology', 'anthropology'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Art': {
                'keywords': ['art', 'arts', 'design', 'fine arts', 'visual', 'creative', 'studio', 'painting', 'sculpture'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            },
            'Music': {
                'keywords': ['music', 'musical', 'conservatory', 'performance', 'composition', 'orchestra'],
                'exclude': ['health', 'medical', 'nursing', 'theology', 'divinity', 'seminary', 'bible', 'christian', 'baptist health']
            }
        }
        
        # Known elite programs (overrides keyword matching)
        self.elite_programs = {
            'Computer Science': [
                'massachusetts institute of technology', 'stanford university', 'carnegie mellon university',
                'university of california berkeley', 'georgia institute of technology', 'university of illinois urbana champaign',
                'university of washington', 'cornell university', 'university of texas austin', 'university of michigan ann arbor'
            ],
            'Engineering': [
                'massachusetts institute of technology', 'stanford university', 'california institute of technology',
                'georgia institute of technology', 'university of illinois urbana champaign', 'purdue university',
                'university of michigan ann arbor', 'carnegie mellon university', 'texas a&m university', 'virginia tech'
            ],
            'Business': [
                'university of pennsylvania', 'stanford university', 'harvard university', 'northwestern university',
                'university of michigan ann arbor', 'university of virginia', 'cornell university', 'new york university',
                'indiana university bloomington', 'university of texas austin'
            ],
            'Medicine': [
                'harvard university', 'stanford university', 'johns hopkins university', 'university of pennsylvania',
                'university of california san francisco', 'duke university', 'yale university', 'columbia university',
                'university of michigan ann arbor', 'university of north carolina chapel hill'
            ],
            'Psychology': [
                'stanford university', 'harvard university', 'university of california berkeley', 'yale university',
                'university of michigan ann arbor', 'university of california los angeles', 'university of north carolina chapel hill',
                'university of virginia', 'university of wisconsin madison', 'university of texas austin'
            ]
        }
        
        # College type indicators
        self.college_types = {
            'research_university': ['university', 'institute', 'polytechnic'],
            'liberal_arts': ['college'],
            'community_college': ['community college', 'junior college'],
            'specialized': ['medical', 'health', 'nursing', 'art', 'music', 'conservatory', 'seminary', 'theological']
        }

    def get_major_strength_score(self, college_name: str, major: str) -> float:
        """
        Get a comprehensive strength score (0-1) for how strong a college is in a specific major
        
        Args:
            college_name: Name of the college
            major: The major field of study
            
        Returns:
            Float score between 0 and 1
        """
        if not college_name or pd.isna(college_name):
            return 0.0
            
        college_name_lower = college_name.lower()
        
        # Check if major is supported
        if major not in self.major_keywords:
            return 0.5  # Default neutral score for unsupported majors
        
        # Check elite programs first (highest priority)
        if major in self.elite_programs:
            for elite_college in self.elite_programs[major]:
                if elite_college in college_name_lower or college_name_lower in elite_college:
                    return 1.0
        
        # Check for exclusion keywords (immediate disqualification)
        exclude_keywords = self.major_keywords[major]['exclude']
        for exclude in exclude_keywords:
            if exclude in college_name_lower:
                return 0.1  # Very low score for excluded colleges
        
        # Check for major-specific keywords
        major_keywords = self.major_keywords[major]['keywords']
        keyword_matches = 0
        for keyword in major_keywords:
            if keyword in college_name_lower:
                keyword_matches += 1
        
        # Calculate base score from keyword matches
        if keyword_matches > 0:
            base_score = min(0.8, 0.3 + (keyword_matches * 0.2))  # 0.5-0.8 for keyword matches
        else:
            base_score = 0.3  # Default for no keyword matches
        
        # Adjust based on college type and characteristics
        college_type_multiplier = self._get_college_type_multiplier(college_name_lower, major)
        selectivity_multiplier = self._get_selectivity_multiplier(college_name_lower)
        
        # Final score calculation
        final_score = base_score * college_type_multiplier * selectivity_multiplier
        return min(1.0, max(0.1, final_score))  # Clamp between 0.1 and 1.0

    def _get_college_type_multiplier(self, college_name_lower: str, major: str) -> float:
        """Get multiplier based on college type and major compatibility"""
        
        # Specialized colleges get high multipliers for their specialties
        if any(specialized in college_name_lower for specialized in ['medical', 'health', 'nursing']):
            if major in ['Medicine', 'Nursing', 'Biology']:
                return 1.2
            else:
                return 0.7  # Lower for non-health majors
        
        if any(specialized in college_name_lower for specialized in ['art', 'music', 'conservatory']):
            if major in ['Art', 'Music']:
                return 1.2
            else:
                return 0.6  # Lower for non-arts majors
        
        if any(specialized in college_name_lower for specialized in ['theological', 'seminary', 'bible', 'christian']):
            return 0.5  # Lower for all majors (specialized religious education)
        
        # Research universities are good for most majors
        if any(research in college_name_lower for research in ['university', 'institute', 'polytechnic']):
            return 1.0
        
        # Liberal arts colleges are good for humanities and some STEM
        if 'college' in college_name_lower and 'university' not in college_name_lower:
            if major in ['English', 'History', 'Psychology', 'Mathematics', 'Biology']:
                return 1.0
            elif major in ['Computer Science', 'Engineering']:
                return 0.8
            else:
                return 0.9
        
        # Default multiplier
        return 0.8

    def _get_selectivity_multiplier(self, college_name_lower: str) -> float:
        """Get multiplier based on college selectivity"""
        
        # Elite universities get slight boost
        elite_indicators = ['harvard', 'stanford', 'mit', 'yale', 'princeton', 'columbia', 'university of pennsylvania', 
                          'dartmouth', 'brown', 'cornell', 'duke', 'northwestern', 'vanderbilt', 'rice', 'emory', 
                          'georgetown', 'carnegie mellon', 'new york university', 'university of chicago']
        
        if any(elite in college_name_lower for elite in elite_indicators):
            return 1.1
        
        # State flagships get slight boost
        state_flagships = ['university of california', 'university of michigan', 'university of virginia', 
                          'university of north carolina', 'university of wisconsin', 'university of texas',
                          'university of illinois', 'purdue university', 'georgia institute of technology']
        
        if any(flagship in college_name_lower for flagship in state_flagships):
            return 1.05
        
        return 1.0

    def get_colleges_for_major(self, major: str, limit: int = 50) -> List[Tuple[str, float]]:
        """
        Get colleges ranked by strength in a specific major
        
        Args:
            major: The major field of study
            limit: Maximum number of colleges to return
            
        Returns:
            List of (college_name, strength_score) tuples, sorted by strength
        """
        college_scores = []
        
        for _, row in self.df.iterrows():
            college_name = row['name']
            if pd.isna(college_name):
                continue
                
            score = self.get_major_strength_score(college_name, major)
            college_scores.append((college_name, score))
        
        # Sort by score (descending) and return top colleges
        college_scores.sort(key=lambda x: x[1], reverse=True)
        return college_scores[:limit]

    def get_major_relevance_info(self, college_name: str, major: str) -> Dict:
        """
        Get detailed relevance information for a college-major pair
        
        Args:
            college_name: Name of the college
            major: The major field of study
            
        Returns:
            Dictionary with relevance information
        """
        score = self.get_major_strength_score(college_name, major)
        
        if score >= 0.8:
            match_level = "Strong Match"
            confidence = "High"
        elif score >= 0.6:
            match_level = "Good Match"
            confidence = "Good"
        elif score >= 0.4:
            match_level = "Moderate Match"
            confidence = "Moderate"
        else:
            match_level = "Weak Match"
            confidence = "Low"
        
        return {
            'score': score,
            'match_level': match_level,
            'confidence': confidence,
            'is_relevant': score >= 0.4,
            'is_strong': score >= 0.8
        }

# Create global instance
_mapper_instance = None

def get_mapper() -> ComprehensiveMajorCollegeMapper:
    """Get the global mapper instance"""
    global _mapper_instance
    if _mapper_instance is None:
        _mapper_instance = ComprehensiveMajorCollegeMapper()
    return _mapper_instance

def get_major_strength_score(college_name: str, major: str) -> float:
    """Get major strength score for a college-major pair"""
    return get_mapper().get_major_strength_score(college_name, major)

def get_colleges_for_major(major: str, limit: int = 50) -> List[Tuple[str, float]]:
    """Get colleges ranked by strength in a specific major"""
    return get_mapper().get_colleges_for_major(major, limit)

def get_major_relevance_info(college_name: str, major: str) -> Dict:
    """Get detailed relevance information for a college-major pair"""
    return get_mapper().get_major_relevance_info(college_name, major)
