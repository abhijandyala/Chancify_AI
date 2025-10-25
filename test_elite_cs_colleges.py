#!/usr/bin/env python3
"""
Test script to get the top 6 elite colleges for Computer Science
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import pandas as pd

def main():
    # Initialize the mapping system
    mapping = RealIPEDSMajorMapping()
    
    print("TOP 6 ELITE COLLEGES FOR COMPUTER SCIENCE")
    print("=" * 50)
    
    # Get all colleges for Computer Science (no tier limit)
    all_cs_colleges = mapping.get_colleges_for_major('Computer Science', limit=20)
    
    print(f"Found {len(all_cs_colleges)} Computer Science colleges")
    print()
    
    # Get the top 6 with their scores
    top_6 = []
    for college in all_cs_colleges[:10]:  # Check first 10 to find top 6
        strength_score = mapping.get_major_strength_score(college, 'Computer Science')
        relevance_info = mapping.get_major_relevance_info(college, 'Computer Science')
        
        top_6.append({
            'college': college,
            'score': strength_score,
            'match_level': relevance_info['match_level'],
            'is_strong': relevance_info['is_strong']
        })
    
    # Sort by score (descending)
    top_6.sort(key=lambda x: x['score'], reverse=True)
    
    # Display top 6
    for i, college_data in enumerate(top_6[:6], 1):
        print(f"{i}. {college_data['college']}")
        print(f"   Major Strength Score: {college_data['score']:.3f}")
        print(f"   Match Level: {college_data['match_level']}")
        print(f"   Is Strong Match: {college_data['is_strong']}")
        print()

if __name__ == "__main__":
    main()
