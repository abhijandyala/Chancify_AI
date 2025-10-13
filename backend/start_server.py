"""
Start the Chancify AI API server.
"""

import uvicorn

if __name__ == "__main__":
    print("Starting Chancify AI API Server...")
    print("Server will be available at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("Health Check: http://localhost:8000/api/health")
    print("\nPress CTRL+C to stop the server\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

