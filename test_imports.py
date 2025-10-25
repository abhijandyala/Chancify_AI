#!/usr/bin/env python3
"""
Test script to check if all imports are working correctly
"""

import sys
import traceback

def test_imports():
    """Test all the imports used in the backend"""
    
    print("Testing imports...")
    
    try:
        print("1. Testing pandas...")
        import pandas as pd
        print("   OK pandas imported successfully")
        
        print("2. Testing numpy...")
        import numpy as np
        print("   OK numpy imported successfully")
        
        print("3. Testing real_ipeds_major_mapping...")
        from backend.data.real_ipeds_major_mapping import real_ipeds_mapping
        print("   OK real_ipeds_major_mapping imported successfully")
        
        print("4. Testing real_college_suggestions...")
        from backend.data.real_college_suggestions import real_college_suggestions
        print("   OK real_college_suggestions imported successfully")
        
        print("5. Testing get_balanced_suggestions...")
        suggestions = real_college_suggestions.get_balanced_suggestions("Computer Science", 8.0)
        print(f"   OK get_balanced_suggestions works, got {len(suggestions)} suggestions")
        
        print("\nAll imports successful!")
        
    except Exception as e:
        print(f"   ERROR Import failed: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_imports()