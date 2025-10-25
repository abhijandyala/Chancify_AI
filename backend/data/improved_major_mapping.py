"""
Improved Major Mapping System
Handles related majors and provides better mapping for Computer Science and other fields
"""

import pandas as pd
from typing import Dict, List, Tuple

class ImprovedMajorMapping:
    def __init__(self, data_path: str = 'backend/data/raw/real_colleges_integrated.csv'):
        """Initialize with real college data"""
        self.df = pd.read_csv(data_path)
        self.major_mapping = self._build_major_mapping()
        
    def _build_major_mapping(self) -> Dict[str, Dict[str, List[str]]]:
        """Build major mapping from real data with related major handling"""
        mapping = {}
        
        # Define major relationships - what majors are related to each other
        major_relationships = {
            'Computer Science': ['Engineering', 'Mathematics', 'Business'],
            'Engineering': ['Computer Science', 'Mathematics', 'Physics'],
            'Business': ['Economics', 'Liberal Arts'],
            'Pre-Medicine': ['Biology', 'Chemistry', 'Engineering'],
            'Medicine': ['Biology', 'Chemistry', 'Pre-Medicine'],
            'Nursing': ['Biology', 'Pre-Medicine'],
            'Psychology': ['Liberal Arts', 'Biology'],
            'Mathematics': ['Computer Science', 'Engineering', 'Physics'],
            'Physics': ['Mathematics', 'Engineering'],
            'Biology': ['Pre-Medicine', 'Medicine', 'Nursing'],
            'Chemistry': ['Pre-Medicine', 'Medicine', 'Biology'],
            'Economics': ['Business', 'Mathematics'],
            'English': ['Liberal Arts', 'History'],
            'History': ['Liberal Arts', 'English'],
            'Political Science': ['Liberal Arts', 'History'],
            'Sociology': ['Liberal Arts', 'Psychology'],
            'Art': ['Liberal Arts', 'Performing Arts'],
            'Music': ['Performing Arts', 'Liberal Arts'],
            'Film': ['Performing Arts', 'Art'],
            'Education': ['Liberal Arts', 'Psychology'],
            'Environmental Science': ['Biology', 'Chemistry', 'Engineering']
        }
        
        # Get all unique majors from the data
        all_majors = set()
        for _, row in self.df.iterrows():
            for col in ['major_1', 'major_2', 'major_3']:
                if pd.notna(row[col]):
                    all_majors.add(row[col])
        
        # Build mapping for each major (including related majors)
        for major in all_majors:
            mapping[major] = {
                'elite': [],
                'highly_selective': [],
                'selective': [],
                'moderately_selective': []
            }
            
            # Find colleges that offer this major OR related majors
            colleges_with_major = []
            for _, row in self.df.iterrows():
                college_majors = [row['major_1'], row['major_2'], row['major_3']]
                college_majors = [m for m in college_majors if pd.notna(m)]
                
                # Check if college offers this major or a related major
                is_relevant = False
                if major in college_majors:
                    is_relevant = True
                else:
                    # Check for related majors
                    related_majors = major_relationships.get(major, [])
                    if any(related in college_majors for related in related_majors):
                        is_relevant = True
                
                if is_relevant:
                    colleges_with_major.append({
                        'name': row['name'],
                        'selectivity_tier': row['selectivity_tier'],
                        'acceptance_rate': row['acceptance_rate'],
                        'majors': college_majors
                    })
            
            # Sort by selectivity and categorize
            colleges_with_major.sort(key=lambda x: x['acceptance_rate'])
            
            for college in colleges_with_major:
                tier = college['selectivity_tier']
                # Map the tier names to our internal format
                tier_mapping = {
                    'Elite': 'elite',
                    'Highly Selective': 'highly_selective',
                    'Moderately Selective': 'selective',
                    'Less Selective': 'moderately_selective'
                }
                mapped_tier = tier_mapping.get(tier, 'moderately_selective')
                if mapped_tier in mapping[major]:
                    mapping[major][mapped_tier].append(college['name'])
        
        return mapping
    
    def _build_major_mapping_for_major(self, major: str):
        """Build mapping for a specific major on the fly"""
        # Define major relationships - what majors are related to each other
        major_relationships = {
            'Computer Science': ['Engineering', 'Mathematics', 'Business'],
            'Engineering': ['Computer Science', 'Mathematics', 'Physics'],
            'Business': ['Economics', 'Liberal Arts'],
            'Pre-Medicine': ['Biology', 'Chemistry', 'Engineering'],
            'Medicine': ['Biology', 'Chemistry', 'Pre-Medicine'],
            'Nursing': ['Biology', 'Pre-Medicine'],
            'Psychology': ['Liberal Arts', 'Biology'],
            'Mathematics': ['Computer Science', 'Engineering', 'Physics'],
            'Physics': ['Mathematics', 'Engineering'],
            'Biology': ['Pre-Medicine', 'Medicine', 'Nursing'],
            'Chemistry': ['Pre-Medicine', 'Medicine', 'Biology'],
            'Economics': ['Business', 'Mathematics'],
            'English': ['Liberal Arts', 'History'],
            'History': ['Liberal Arts', 'English'],
            'Political Science': ['Liberal Arts', 'History'],
            'Sociology': ['Liberal Arts', 'Psychology'],
            'Art': ['Liberal Arts', 'Performing Arts'],
            'Music': ['Performing Arts', 'Liberal Arts'],
            'Film': ['Performing Arts', 'Art'],
            'Education': ['Liberal Arts', 'Psychology'],
            'Environmental Science': ['Biology', 'Chemistry', 'Engineering']
        }
        
        # Initialize mapping for this major
        self.major_mapping[major] = {
            'elite': [],
            'highly_selective': [],
            'selective': [],
            'moderately_selective': []
        }
        
        # Find colleges that offer this major OR related majors
        colleges_with_major = []
        for _, row in self.df.iterrows():
            college_majors = [row['major_1'], row['major_2'], row['major_3']]
            college_majors = [m for m in college_majors if pd.notna(m)]
            
            # Check if college offers this major or a related major
            is_relevant = False
            if major in college_majors:
                is_relevant = True
            else:
                # Check for related majors
                related_majors = major_relationships.get(major, [])
                if any(related in college_majors for related in related_majors):
                    is_relevant = True
            
            if is_relevant:
                colleges_with_major.append({
                    'name': row['name'],
                    'selectivity_tier': row['selectivity_tier'],
                    'acceptance_rate': row['acceptance_rate'],
                    'majors': college_majors
                })
        
        # Sort by selectivity and categorize
        colleges_with_major.sort(key=lambda x: x['acceptance_rate'])
        
        for college in colleges_with_major:
            tier = college['selectivity_tier']
            # Map the tier names to our internal format
            tier_mapping = {
                'Elite': 'elite',
                'Highly Selective': 'highly_selective',
                'Moderately Selective': 'selective',
                'Less Selective': 'moderately_selective'
            }
            mapped_tier = tier_mapping.get(tier, 'moderately_selective')
            if mapped_tier in self.major_mapping[major]:
                self.major_mapping[major][mapped_tier].append(college['name'])
    
    def get_colleges_for_major(self, major: str, tier: str) -> List[str]:
        """Get colleges that offer a specific major in a specific tier"""
        # If major is not in mapping, build it on the fly
        if major not in self.major_mapping:
            self._build_major_mapping_for_major(major)
        
        if major not in self.major_mapping:
            return []
        return self.major_mapping[major].get(tier, [])
    
    def get_major_strength_score(self, college_name: str, major: str) -> float:
        """Get strength score for a college in a specific major"""
        # Find the college in our data
        college_row = self.df[self.df['name'] == college_name]
        if len(college_row) == 0:
            return 0.3  # Default score for unknown colleges
        
        row = college_row.iloc[0]
        college_majors = [row['major_1'], row['major_2'], row['major_3']]
        college_majors = [m for m in college_majors if pd.notna(m)]
        
        # Check if the college offers this major directly
        if major in college_majors:
            position = college_majors.index(major) + 1  # 1, 2, or 3
            position_score = {1: 1.0, 2: 0.7, 3: 0.4}.get(position, 0.2)
        else:
            # Check for related majors
            major_relationships = {
                'Computer Science': ['Engineering', 'Mathematics', 'Business'],
                'Engineering': ['Computer Science', 'Mathematics', 'Physics'],
                'Business': ['Economics', 'Liberal Arts'],
                'Pre-Medicine': ['Biology', 'Chemistry', 'Engineering'],
                'Medicine': ['Biology', 'Chemistry', 'Pre-Medicine'],
                'Nursing': ['Biology', 'Pre-Medicine'],
                'Psychology': ['Liberal Arts', 'Biology'],
                'Mathematics': ['Computer Science', 'Engineering', 'Physics'],
                'Physics': ['Mathematics', 'Engineering'],
                'Biology': ['Pre-Medicine', 'Medicine', 'Nursing'],
                'Chemistry': ['Pre-Medicine', 'Medicine', 'Biology'],
                'Economics': ['Business', 'Mathematics'],
                'English': ['Liberal Arts', 'History'],
                'History': ['Liberal Arts', 'English'],
                'Political Science': ['Liberal Arts', 'History'],
                'Sociology': ['Liberal Arts', 'Psychology'],
                'Art': ['Liberal Arts', 'Performing Arts'],
                'Music': ['Performing Arts', 'Liberal Arts'],
                'Film': ['Performing Arts', 'Art'],
                'Education': ['Liberal Arts', 'Psychology'],
                'Environmental Science': ['Biology', 'Chemistry', 'Engineering']
            }
            
            related_majors = major_relationships.get(major, [])
            best_related_score = 0.0
            
            for related in related_majors:
                if related in college_majors:
                    position = college_majors.index(related) + 1
                    related_score = {1: 0.8, 2: 0.6, 3: 0.4}.get(position, 0.2)
                    best_related_score = max(best_related_score, related_score)
            
            position_score = best_related_score
        
        # Add selectivity bonus
        selectivity_bonus = {
            'Elite': 0.3,
            'Highly Selective': 0.2,
            'Moderately Selective': 0.1,
            'Less Selective': 0.0
        }.get(row['selectivity_tier'], 0.0)
        
        # Final score with selectivity bonus
        final_score = min(1.0, position_score + selectivity_bonus)
        
        return final_score
    
    def get_major_relevance_info(self, college_name: str, major: str) -> Dict:
        """Get detailed major relevance information"""
        score = self.get_major_strength_score(college_name, major)
        
        # Determine match level
        if score >= 0.8:
            match_level = "Strong Match"
            confidence = "High"
            is_relevant = True
            is_strong = True
        elif score >= 0.6:
            match_level = "Good Match"
            confidence = "High"
            is_relevant = True
            is_strong = False
        elif score >= 0.4:
            match_level = "Moderate Match"
            confidence = "Medium"
            is_relevant = True
            is_strong = False
        elif score >= 0.2:
            match_level = "Weak Match"
            confidence = "Low"
            is_relevant = False
            is_strong = False
        else:
            match_level = "No Match"
            confidence = "Low"
            is_relevant = False
            is_strong = False
        
        return {
            "score": score,
            "match_level": match_level,
            "confidence": confidence,
            "is_relevant": is_relevant,
            "is_strong": is_strong
        }
    
    def get_all_majors(self) -> List[str]:
        """Get list of all majors in the system"""
        all_majors = set()
        for _, row in self.df.iterrows():
            for col in ['major_1', 'major_2', 'major_3']:
                if pd.notna(row[col]):
                    all_majors.add(row[col])
        return sorted(list(all_majors))
    
    def get_college_majors(self, college_name: str) -> List[str]:
        """Get all majors offered by a specific college"""
        college_row = self.df[self.df['name'] == college_name]
        if len(college_row) == 0:
            return []
        
        row = college_row.iloc[0]
        majors = []
        for col in ['major_1', 'major_2', 'major_3']:
            if pd.notna(row[col]):
                majors.append(row[col])
        return majors

# Global instance
improved_major_mapping = ImprovedMajorMapping()

# Convenience functions
def get_colleges_for_major(major: str, tier: str) -> List[str]:
    """Get colleges that offer a specific major in a specific tier"""
    return improved_major_mapping.get_colleges_for_major(major, tier)

def get_major_strength_score(college_name: str, major: str) -> float:
    """Get strength score for a college in a specific major"""
    return improved_major_mapping.get_major_strength_score(college_name, major)

def get_major_relevance_info(college_name: str, major: str) -> Dict:
    """Get detailed major relevance information"""
    return improved_major_mapping.get_major_relevance_info(college_name, major)

def get_all_majors() -> List[str]:
    """Get list of all majors in the system"""
    return improved_major_mapping.get_all_majors()

def get_college_majors(college_name: str) -> List[str]:
    """Get all majors offered by a specific college"""
    return improved_major_mapping.get_college_majors(college_name)
