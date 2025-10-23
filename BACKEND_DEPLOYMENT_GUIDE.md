# Backend Deployment Guide

## Issue: 404 Error for API Endpoints

The frontend is getting a 404 error when trying to access `/api/suggest/colleges` because the backend is not deployed to Railway.

## Current Status
- ✅ Frontend deployed to Railway: `https://chancifyai.up.railway.app`
- ❌ Backend not deployed (causing 404 errors)
- ✅ Backend works locally: `http://localhost:8000`

## Solution: Deploy Backend to Railway

### Option 1: Deploy Backend as Separate Railway Service (Recommended)

1. **Create New Railway Project for Backend:**
   ```bash
   # Install Railway CLI if not already installed
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Create new project for backend
   railway new
   # Name it: "chancifyai-backend"
   ```

2. **Deploy Backend:**
   ```bash
   # Link to the backend project
   railway link
   
   # Deploy using the backend Dockerfile
   railway up --dockerfile Dockerfile
   ```

3. **Update Frontend API URL:**
   - Once deployed, Railway will provide a URL like: `https://chancifyai-backend-production.up.railway.app`
   - Update `frontend/lib/api.ts` with the new backend URL:
   ```typescript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://chancifyai-backend-production.up.railway.app'
     : 'http://localhost:8000';
   ```

### Option 2: Deploy Both Services in Same Railway Project

1. **Update railway.json to support multiple services:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "services": [
       {
         "name": "frontend",
         "build": {
           "builder": "DOCKERFILE",
           "dockerfilePath": "Dockerfile.frontend"
         }
       },
       {
         "name": "backend", 
         "build": {
           "builder": "DOCKERFILE",
           "dockerfilePath": "Dockerfile"
         }
       }
     ]
   }
   ```

2. **Deploy both services:**
   ```bash
   railway up
   ```

### Option 3: Quick Fix for Development

If you want to test locally with the deployed frontend:

1. **Start backend locally:**
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

2. **Use ngrok to expose local backend:**
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Expose local backend
   ngrok http 8000
   ```

3. **Update frontend API URL temporarily:**
   ```typescript
   const API_BASE_URL = 'https://your-ngrok-url.ngrok.io';
   ```

## Environment Variables Needed

The backend needs these environment variables in Railway:

```bash
ENVIRONMENT=production
PYTHONPATH=/app
```

## Verification

After deployment, test the backend:

```bash
# Test health endpoint
curl https://your-backend-url.up.railway.app/api/health

# Test college suggestions
curl -X POST https://your-backend-url.up.railway.app/api/suggest/colleges \
  -H "Content-Type: application/json" \
  -d '{"gpa_unweighted":"3.8","gpa_weighted":"4.2","sat":"1400","act":"32","rigor":"7","ap_count":"3","honors_count":"2","class_rank_percentile":"85","class_size":"300","extracurricular_depth":"7","leadership_positions":"6","awards_publications":"5","passion_projects":"6","business_ventures":"4","volunteer_work":"7","research_experience":"5","portfolio_audition":"4","essay_quality":"7","recommendations":"8","interview":"6","demonstrated_interest":"7","legacy_status":"3","hs_reputation":"7","geographic_diversity":"5","plan_timing":"6","geography_residency":"5","firstgen_diversity":"5","ability_to_pay":"6","policy_knob":"5","conduct_record":"9","major":"Computer Science","college":""}'
```

## Current Backend Status

- ✅ Backend code is ready for deployment
- ✅ Dockerfile is configured correctly
- ✅ All API endpoints are working locally
- ✅ ML models are loaded and functional
- ❌ Backend not deployed to Railway (causing 404 errors)

## Next Steps

1. Choose one of the deployment options above
2. Deploy the backend to Railway
3. Update the frontend API URL
4. Test the full application
5. Update this guide with the actual deployed URLs
