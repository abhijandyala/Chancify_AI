"""
Chancify AI - Backend API
FastAPI application for college admissions probability calculations
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Chancify AI API",
    description="College admissions probability calculator with personalized game plans",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Chancify AI API is running",
        "version": "0.1.0"
    }

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "database": "not_connected",  # Will be updated when DB is setup
        "ml_model": "not_loaded"  # Will be updated when model is ready
    }

# Future route includes:
# from api.routes import auth, profile, colleges, predictions, game_plan
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(profile.router, prefix="/api/profile", tags=["User Profile"])
# app.include_router(colleges.router, prefix="/api/colleges", tags=["Colleges"])
# app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
# app.include_router(game_plan.router, prefix="/api/game-plan", tags=["Game Plan"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

