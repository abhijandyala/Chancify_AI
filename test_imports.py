#!/usr/bin/env python3
"""
Test script to verify all imports work correctly.
Run this to check if the IDE import errors are real or just IDE issues.
"""

import sys
import os

# Add backend to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_imports():
    """Test all critical imports."""
    try:
        print("Testing imports...")
        
        # Core FastAPI imports
        import fastapi
        print(f"✅ FastAPI {fastapi.__version__}")
        
        import uvicorn
        print(f"✅ Uvicorn {uvicorn.__version__}")
        
        # Pydantic imports
        import pydantic
        print(f"✅ Pydantic {pydantic.__version__}")
        
        import pydantic_settings
        print("✅ Pydantic Settings")
        
        # Project imports
        from config import settings
        print("✅ Config settings")
        
        from database import create_tables
        print("✅ Database module")
        
        print("\n🎉 All imports successful!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = test_imports()
    sys.exit(0 if success else 1)
