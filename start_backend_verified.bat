@echo off
echo Starting Chancify AI Backend...
echo.
cd backend
echo Current directory: %CD%
echo.
echo Checking Python...
python --version
echo.
echo Starting server on port 8000...
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload --log-level info
pause

