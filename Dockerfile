# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first for layer caching
COPY backend/requirements-essential.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend code (filtered by .dockerignore)
COPY backend /app/backend
COPY main.py /app/
COPY pyproject.toml /app/

# Set environment variables
ENV PYTHONPATH=/app
ENV ENVIRONMENT=production

# Expose port (Railway will set PORT env var)
EXPOSE 8000

# Start the application
# Note: Railway handles healthchecks externally, no need for Docker HEALTHCHECK
# Use backend.main:app since main.py imports from backend.main
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1 --log-level info

