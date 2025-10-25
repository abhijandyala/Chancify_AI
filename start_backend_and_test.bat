@echo off
echo Starting backend...
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --log-level debug

