# Backend Deployment Instructions - Fix 404 Error

## Problem
The backend at `chancifyai-backend.up.railway.app` returns 404, meaning the backend service is **not deployed** or **not running**.

## Solution: Deploy Backend as Separate Railway Service

### Step 1: Create Backend Service in Railway

1. Go to your Railway project dashboard: https://railway.app
2. Click **"New"** → **"Empty Service"**
3. Name it: **"chancifyai-backend"** or **"Backend"**

### Step 2: Connect to GitHub Repository

1. Click **"Connect GitHub Repo"**
2. Select your `Chancify_AI` repository
3. Railway will detect the repository

### Step 3: Configure Backend Service

1. In the service settings, go to **"Settings"** → **"Build & Deploy"**
2. Set **"Root Directory"** to: `/` (repository root)
3. Set **"Dockerfile Path"** to: `Dockerfile` (NOT `Dockerfile.frontend`)
4. Or use **"Nixpacks"** builder with `nixpacks.toml`

### Step 4: Set Environment Variables

In Railway dashboard, add these environment variables for the **backend service**:

```
ENVIRONMENT=production
PORT=8000
PYTHONPATH=/app

# Database
DATABASE_URL=your_database_url

# Supabase
SUPABASE_URL=https://vwvqfellrhxznesaifwe.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# CORS
FRONTEND_URL=https://chancifyai.up.railway.app

# Security
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Step 5: Deploy

1. Railway will automatically detect the `Dockerfile` and start building
2. Watch the build logs to ensure it completes successfully
3. Once deployed, Railway will provide a URL like: `https://chancifyai-backend-production.up.railway.app`

### Step 6: Update Frontend Configuration

After backend is deployed, update the frontend service environment variable:

1. Go to your **frontend service** in Railway
2. Add/Update environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://chancifyai-backend-production.up.railway.app
   ```
3. Redeploy the frontend service

### Step 7: Verify Deployment

Test the backend health endpoint:
```bash
curl https://chancifyai-backend-production.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "scoring_system": "loaded"
}
```

## Alternative: Use Railway CLI

If you prefer command line:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new service
railway service create chancifyai-backend

# Link to project
railway link

# Set environment variables
railway variables set ENVIRONMENT=production
railway variables set FRONTEND_URL=https://chancifyai.up.railway.app
# ... add other variables

# Deploy
railway up --dockerfile Dockerfile
```

## Current Configuration Files

- ✅ `Dockerfile` - Backend Docker configuration
- ✅ `main.py` - Entry point for Railway
- ✅ `backend/main.py` - FastAPI app with `/api/health` endpoint
- ✅ `Procfile` - Fallback start command
- ✅ `nixpacks.toml` - Alternative build configuration

## Troubleshooting

### 404 Error Persists
- Check Railway logs for build errors
- Verify the service is running (not paused)
- Check that `Dockerfile` is being used (not `Dockerfile.frontend`)

### Build Fails
- Check `backend/requirements-essential.txt` exists
- Verify Python 3.11 is specified
- Check Railway build logs for specific errors

### Health Endpoint Not Found
- Verify the service is using `Dockerfile` (backend)
- Check that `main.py` imports from `backend.main`
- Verify uvicorn is starting correctly

## Quick Checklist

- [ ] Backend service created in Railway
- [ ] Service connected to GitHub repo
- [ ] Dockerfile path set to `Dockerfile` (not `Dockerfile.frontend`)
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] Health endpoint responds: `/api/health`
- [ ] Frontend `NEXT_PUBLIC_API_URL` updated
- [ ] CORS working (no 404 on preflight)

