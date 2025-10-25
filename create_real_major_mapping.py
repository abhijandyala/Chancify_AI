#!/usr/bin/env python3
"""
Create a real major-college mapping system using the IPEDS database
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple, Optional
import json

class RealMajorMapping:
    def __init__(self):
        """Initialize with real IPEDS data"""
        self.ipeds_df = None
        self.college_df = None
        self.major_mapping = {}
        self.college_major_data = {}
        self.load_data()
        self.create_mappings()
    
    def load_data(self):
        """Load the IPEDS data and existing college data"""
        print("Loading IPEDS major data...")
        self.ipeds_df = pd.read_csv("therealdatabase/ipeds_top_majors_2024.csv")
        
        print("Loading existing college data...")
        self.college_df = pd.read_csv("backend/data/raw/real_colleges_integrated.csv")
        
        print(f"IPEDS data: {self.ipeds_df.shape}")
        print(f"College data: {self.college_df.shape}")
    
    def create_mappings(self):
        """Create comprehensive major-college mappings"""
        print("Creating major-college mappings...")
        
        # Create a mapping from UNITID to college name
        unitid_to_name = {}
        for _, row in self.college_df.iterrows():
            unitid = row.get('unitid')
            name = row.get('name')
            if pd.notna(unitid) and pd.notna(name):
                unitid_to_name[int(unitid)] = name
        
        print(f"Found {len(unitid_to_name)} colleges with UNITID mapping")
        
        # Process IPEDS data to create major mappings
        major_college_data = {}
        
        for _, row in self.ipeds_df.iterrows():
            unitid = row['UNITID']
            college_name = unitid_to_name.get(unitid)
            
            if not college_name:
                continue
            
            # Get major data
            majors = []
            for i in range(1, 4):  # major_1, major_2, major_3
                major_col = f'major_{i}'
                pct_col = f'pct_{i}'
                count_col = f'count_{i}'
                
                if pd.notna(row[major_col]) and row[major_col] != 'nan':
                    major_name = row[major_col]
                    percentage = row[pct_col] if pd.notna(row[pct_col]) else 0
                    count = row[count_col] if pd.notna(row[count_col]) else 0
                    
                    majors.append({
                        'name': major_name,
                        'percentage': percentage,
                        'count': count,
                        'rank': i
                    })
            
            if majors:
                major_college_data[college_name] = {
                    'unitid': unitid,
                    'majors': majors,
                    'total_bachelors': row.get('bach_total', 0)
                }
        
        self.college_major_data = major_college_data
        print(f"Created major data for {len(major_college_data)} colleges")
        
        # Create reverse mapping: major -> colleges
        self.create_major_to_college_mapping()
    
    def create_major_to_college_mapping(self):
        """Create mapping from majors to colleges"""
        print("Creating major-to-college mapping...")
        
        major_to_colleges = {}
        
        for college_name, data in self.college_major_data.items():
            for major_info in data['majors']:
                major_name = major_info['name']
                
                if major_name not in major_to_colleges:
                    major_to_colleges[major_name] = []
                
                major_to_colleges[major_name].append({
                    'college': college_name,
                    'percentage': major_info['percentage'],
                    'count': major_info['count'],
                    'rank': major_info['rank'],
                    'total_bachelors': data['total_bachelors']
                })
        
        # Sort colleges by strength for each major
        for major_name, colleges in major_to_colleges.items():
            # Sort by percentage (descending), then by count (descending)
            colleges.sort(key=lambda x: (x['percentage'], x['count']), reverse=True)
            major_to_colleges[major_name] = colleges
        
        self.major_mapping = major_to_colleges
        print(f"Created mapping for {len(major_to_colleges)} majors")
    
    def get_colleges_for_major(self, major: str, tier: str = None, limit: int = None) -> List[str]:
        """Get colleges that offer a specific major, optionally filtered by tier"""
        if major not in self.major_mapping:
            return []
        
        colleges = self.major_mapping[major]
        
        # Filter by tier if specified
        if tier:
            tier_colleges = []
            for college_info in colleges:
                college_name = college_info['college']
                college_tier = self.get_college_tier(college_name)
                if college_tier == tier:
                    tier_colleges.append(college_name)
            colleges = tier_colleges
        else:
            colleges = [college_info['college'] for college_info in colleges]
        
        # Apply limit
        if limit:
            colleges = colleges[:limit]
        
        return colleges
    
    def get_college_tier(self, college_name: str) -> str:
        """Get the selectivity tier for a college"""
        college_row = self.college_df[self.college_df['name'] == college_name]
        if len(college_row) == 0:
            return 'moderately_selective'
        
        tier = college_row.iloc[0]['selectivity_tier']
        tier_mapping = {
            'Elite': 'elite',
            'Highly Selective': 'highly_selective',
            'Moderately Selective': 'selective',
            'Less Selective': 'moderately_selective'
        }
        return tier_mapping.get(tier, 'moderately_selective')
    
    def get_major_strength_score(self, college_name: str, major: str) -> float:
        """Get strength score for a college in a specific major based on real data"""
        if college_name not in self.college_major_data:
            return 0.0
        
        college_data = self.college_major_data[college_name]
        
        # Find the major in the college's data
        for major_info in college_data['majors']:
            if major_info['name'] == major:
                # Calculate strength score based on percentage and rank
                percentage = major_info['percentage']
                rank = major_info['rank']
                
                # Base score from percentage (0-100% -> 0-1.0)
                base_score = percentage / 100.0
                
                # Rank bonus (1st major gets full score, 2nd gets 0.8x, 3rd gets 0.6x)
                rank_multiplier = {1: 1.0, 2: 0.8, 3: 0.6}.get(rank, 0.4)
                
                # Final score
                final_score = base_score * rank_multiplier
                
                # Add selectivity bonus
                tier = self.get_college_tier(college_name)
                selectivity_bonus = {
                    'elite': 0.2,
                    'highly_selective': 0.15,
                    'selective': 0.1,
                    'moderately_selective': 0.05
                }.get(tier, 0.0)
                
                return min(1.0, final_score + selectivity_bonus)
        
        return 0.0
    
    def get_major_relevance_info(self, college_name: str, major: str) -> Dict:
        """Get detailed major relevance information"""
        score = self.get_major_strength_score(college_name, major)
        
        # Determine match level based on score
        if score >= 0.7:
            match_level = "Strong Match"
            confidence = "High"
            is_relevant = True
            is_strong = True
        elif score >= 0.5:
            match_level = "Good Match"
            confidence = "High"
            is_relevant = True
            is_strong = False
        elif score >= 0.3:
            match_level = "Moderate Match"
            confidence = "Medium"
            is_relevant = True
            is_strong = False
        elif score >= 0.1:
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
        return sorted(list(self.major_mapping.keys()))
    
    def get_college_majors(self, college_name: str) -> List[str]:
        """Get all majors offered by a specific college"""
        if college_name not in self.college_major_data:
            return []
        
        return [major_info['name'] for major_info in self.college_major_data[college_name]['majors']]
    
    def analyze_computer_science_colleges(self):
        """Analyze Computer Science colleges specifically"""
        print("\n" + "=" * 60)
        print("COMPUTER SCIENCE ANALYSIS")
        print("=" * 60)
        
        cs_major = "Computer & Information Sciences"
        if cs_major not in self.major_mapping:
            print(f"Major '{cs_major}' not found in data")
            return
        
        cs_colleges = self.major_mapping[cs_major]
        print(f"Found {len(cs_colleges)} colleges offering Computer Science")
        
        # Show top 20 CS colleges
        print("\nTop 20 Computer Science Colleges:")
        for i, college_info in enumerate(cs_colleges[:20]):
            college_name = college_info['college']
            percentage = college_info['percentage']
            count = college_info['count']
            rank = college_info['rank']
            tier = self.get_college_tier(college_name)
            
            print(f"{i+1:2d}. {college_name}")
            print(f"    CS Students: {count:,} ({percentage:.1f}%) - Rank #{rank}")
            print(f"    Tier: {tier}")
            print()
    
    def save_mappings(self):
        """Save the mappings to files for use by the backend"""
        print("Saving mappings...")
        
        # Save major mapping
        with open('backend/data/real_major_mapping.json', 'w') as f:
            json.dump(self.major_mapping, f, indent=2)
        
        # Save college major data
        with open('backend/data/college_major_data.json', 'w') as f:
            json.dump(self.college_major_data, f, indent=2)
        
        print("Mappings saved to backend/data/")

def main():
    """Main function to create and analyze the real major mapping"""
    print("Creating Real Major Mapping System")
    print("=" * 50)
    
    mapping = RealMajorMapping()
    
    # Analyze Computer Science specifically
    mapping.analyze_computer_science_colleges()
    
    # Save the mappings
    mapping.save_mappings()
    
    # Test some functions
    print("\n" + "=" * 60)
    print("TESTING FUNCTIONS")
    print("=" * 60)
    
    # Test Computer Science
    cs_colleges = mapping.get_colleges_for_major("Computer & Information Sciences", limit=5)
    print(f"Top 5 CS colleges: {cs_colleges}")
    
    if cs_colleges:
        test_college = cs_colleges[0]
        score = mapping.get_major_strength_score(test_college, "Computer & Information Sciences")
        info = mapping.get_major_relevance_info(test_college, "Computer & Information Sciences")
        print(f"\nTest: {test_college}")
        print(f"CS Score: {score:.3f}")
        print(f"Match Info: {info}")
    
    print("\nReal major mapping system created successfully!")

if __name__ == "__main__":
    main()
