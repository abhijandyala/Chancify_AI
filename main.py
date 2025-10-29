"""
Chancify AI - Main Application Entry Point
This file serves as the entry point for Railway deployment
"""

import sys
import os

# Add the backend directory to the Python path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Import the FastAPI app from backend.main (avoid circular import)
from backend.main import app

# This allows Railway to find the app
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
