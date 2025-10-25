"""
Real Major Mapping System
Uses actual major data from the integrated dataset
"""

import pandas as pd
from typing import Dict, List, Tuple

class RealMajorMapping:
    def __init__(self, data_path: str = 'backend/data/raw/real_colleges_integrated.csv'):
        """Initialize with real college data"""
        self.df = pd.read_csv(data_path)
        self.major_mapping = self._build_major_mapping()
        
    def _build_major_mapping(self) -> Dict[str, Dict[str, List[str]]]:
        """Build major mapping from real data"""
        mapping = {}
        
        # Get all unique majors from the data
        all_majors = set()
        for _, row in self.df.iterrows():
            for col in ['major_1', 'major_2', 'major_3']:
                if pd.notna(row[col]):
                    all_majors.add(row[col])
        
        # Build mapping for each major
        for major in all_majors:
            mapping[major] = {
                'elite': [],
                'highly_selective': [],
                'selective': [],
                'moderately_selective': []
            }
            
            # Find colleges that offer this major
            colleges_with_major = []
            for _, row in self.df.iterrows():
                if (row['major_1'] == major or 
                    row['major_2'] == major or 
                    row['major_3'] == major):
                    colleges_with_major.append({
                        'name': row['name'],
                        'selectivity_tier': row['selectivity_tier'],
                        'acceptance_rate': row['acceptance_rate']
                    })
            
            # Sort by selectivity and categorize
            colleges_with_major.sort(key=lambda x: x['acceptance_rate'])
            
            for college in colleges_with_major:
                tier = college['selectivity_tier']
                if tier in mapping[major]:
                    mapping[major][tier].append(college['name'])
        
        return mapping
    
    def get_colleges_for_major(self, major: str, tier: str) -> List[str]:
        """Get colleges that offer a specific major in a specific tier"""
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
        
        # Check if the college offers this major
        majors = [row['major_1'], row['major_2'], row['major_3']]
        if major not in majors:
            return 0.2  # Low score if major not offered
        
        # Calculate strength based on position and selectivity
        position = majors.index(major) + 1  # 1, 2, or 3
        selectivity_bonus = {
            'Elite': 0.3,
            'Highly Selective': 0.2,
            'Moderately Selective': 0.1,
            'Less Selective': 0.0
        }.get(row['selectivity_tier'], 0.0)
        
        # Base score from position (1st major = 1.0, 2nd = 0.7, 3rd = 0.4)
        position_score = {1: 1.0, 2: 0.7, 3: 0.4}.get(position, 0.2)
        
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
real_major_mapping = RealMajorMapping()

# Convenience functions
def get_colleges_for_major(major: str, tier: str) -> List[str]:
    """Get colleges that offer a specific major in a specific tier"""
    return real_major_mapping.get_colleges_for_major(major, tier)

def get_major_strength_score(college_name: str, major: str) -> float:
    """Get strength score for a college in a specific major"""
    return real_major_mapping.get_major_strength_score(college_name, major)

def get_major_relevance_info(college_name: str, major: str) -> Dict:
    """Get detailed major relevance information"""
    return real_major_mapping.get_major_relevance_info(college_name, major)

def get_all_majors() -> List[str]:
    """Get list of all majors in the system"""
    return real_major_mapping.get_all_majors()

def get_college_majors(college_name: str) -> List[str]:
    """Get all majors offered by a specific college"""
    return real_major_mapping.get_college_majors(college_name)
