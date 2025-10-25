#!/usr/bin/env python3
"""
Test if the module import is failing
"""

import sys
import traceback

def test_module_import():
    """Test if backend.main can be imported successfully"""
    
    print("Testing module import...")
    
    try:
        print("1. Importing backend.data.real_college_suggestions...")
        from backend.data.real_college_suggestions import real_college_suggestions
        print("   OK - real_college_suggestions imported")
        
        print("2. Importing backend.main...")
        import backend.main
        print("   OK - backend.main imported")
        
        print("3. Getting the app...")
        app = backend.main.app
        print(f"   OK - app: {app}")
        
        print("4. Checking suggest_colleges endpoint...")
        from backend.main import suggest_colleges
        print(f"   OK - suggest_colleges: {suggest_colleges}")
        
        print("\nAll imports successful!")
        
    except Exception as e:
        print(f"   ERROR: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_module_import()
