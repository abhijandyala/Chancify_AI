#!/usr/bin/env python3
"""
Simple test script to verify core imports work correctly.
"""

import sys
import os

# Add backend to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_core_imports():
    """Test core imports only."""
    try:
        print("Testing core imports...")
        
        # Core FastAPI imports
        import fastapi
        print(f"FastAPI {fastapi.__version__} - OK")
        
        import uvicorn
        print(f"Uvicorn {uvicorn.__version__} - OK")
        
        # Pydantic imports
        import pydantic
        print(f"Pydantic {pydantic.__version__} - OK")
        
        import pydantic_settings
        print("Pydantic Settings - OK")
        
        # Project imports
        from config import settings
        print("Config settings - OK")
        
        print("\nAll core imports successful!")
        print("Your FastAPI backend is ready to run!")
        return True
        
    except ImportError as e:
        print(f"Import error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = test_core_imports()
    sys.exit(0 if success else 1)
