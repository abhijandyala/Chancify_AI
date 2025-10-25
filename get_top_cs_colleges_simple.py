#!/usr/bin/env python3
"""
Get the top 6 colleges for Computer Science based on real IPEDS data
No artificial "elite" tags - just pure data showing college strength for the major
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import pandas as pd

def main():
    # Initialize the mapping system
    mapping = RealIPEDSMajorMapping()
    
    print("TOP 6 COLLEGES FOR COMPUTER & INFORMATION SCIENCES")
    print("Based on real IPEDS data - no artificial tags")
    print("=" * 60)
    
    # Get colleges for Computer & Information Sciences (the correct IPEDS major name)
    cs_colleges = mapping.get_colleges_for_major('Computer & Information Sciences', limit=20)
    
    print(f"Found {len(cs_colleges)} colleges offering Computer & Information Sciences")
    print()
    
    # Get the top 6 with their real data scores
    top_6 = []
    for college in cs_colleges[:15]:  # Check first 15 to find top 6
        strength_score = mapping.get_major_strength_score(college, 'Computer & Information Sciences')
        relevance_info = mapping.get_major_relevance_info(college, 'Computer & Information Sciences')
        
        top_6.append({
            'college': college,
            'score': strength_score,
            'match_level': relevance_info['match_level'],
            'is_strong': relevance_info['is_strong']
        })
    
    # Sort by score (descending) - this shows the real strength based on IPEDS data
    top_6.sort(key=lambda x: x['score'], reverse=True)
    
    # Display top 6
    print("TOP 6 COLLEGES (ranked by real IPEDS data strength):")
    print()
    for i, college_data in enumerate(top_6[:6], 1):
        print(f"{i}. {college_data['college']}")
        print(f"   Real IPEDS Strength Score: {college_data['score']:.3f}")
        print(f"   Match Level: {college_data['match_level']}")
        print(f"   Is Strong Match: {college_data['is_strong']}")
        print()

if __name__ == "__main__":
    main()
