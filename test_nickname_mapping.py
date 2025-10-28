#!/usr/bin/env python3
"""
Test College Nickname Mapping
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.data.college_nickname_mapper import nickname_mapper

def test_nickname_mapping():
    """Test the nickname mapping functionality"""
    
    test_cases = [
        'mit',
        'harvard',
        'stanford',
        'yale',
        'princeton',
        'columbia',
        'upenn',
        'brown',
        'dartmouth',
        'cornell',
        'caltech',
        'carnegie mellon',
        'cmu',
        'duke',
        'northwestern',
        'rice',
        'vanderbilt',
        'notre dame',
        'uc berkeley',
        'berkeley',
        'ucla',
        'ucsd',
        'nyu',
        'usc',
        'boston college',
        'bc',
        'georgetown',
        'johns hopkins',
        'jhu',
        'washu',
        'umich',
        'georgia tech',
        'gatech',
        'unc',
        'uva',
        'ut austin',
        'texas',
        'penn state',
        'ohio state',
        'osu',
        'florida',
        'uf'
    ]
    
    print("Testing College Nickname Mapping")
    print("=" * 50)
    
    for nickname in test_cases:
        official_name = nickname_mapper.find_college_by_nickname(nickname)
        status = "PASS" if official_name else "FAIL"
        print(f"{status} '{nickname}' -> {official_name}")
    
    print("\n" + "=" * 50)
    print(f"Total mappings available: {len(nickname_mapper.get_all_nicknames())}")

if __name__ == "__main__":
    test_nickname_mapping()
