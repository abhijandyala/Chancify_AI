# Railway Frontend Deployment Guide

## Problem Summary
The previous Railway deployment was failing because the `.dockerignore` file was excluding the `frontend/` directory, which prevented the Docker build from accessing frontend files.

## Solution Applied
1. **Updated `.dockerignore`** - Removed the `frontend/` exclusion so frontend files are available during Docker builds
2. **Updated `Dockerfile.frontend`** - Optimized for Railway's build context (repository root)
3. **Updated `railway.json`** - Added watch patterns for frontend-only changes

## Railway Configuration

### Frontend Service Setup

1. **Create New Service in Railway**
   - Go to your Railway project
   - Click "New" → "Empty Service"
   - Name it "Chancify-Frontend" or similar

2. **Connect to GitHub Repository**
   - Link the service to your GitHub repository
   - Railway will detect the repository

3. **Configure Build Settings**
   - Railway should automatically detect `railway.json`
   - Build will use `Dockerfile.frontend`
   - Root directory: `/` (repository root)
   - Build context: Repository root

4. **Environment Variables** (if needed)
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway will automatically build and deploy
   - The service will be available on a Railway-provided domain

### Backend Service Setup

If you also need to deploy the backend:

1. **Create Another Service**
   - Name it "Chancify-Backend"

2. **Configure Build Settings**
   - Use `Dockerfile` (not `Dockerfile.frontend`)
   - Or use `nixpacks.toml` for Nixpacks build

3. **Environment Variables**
   ```
   DATABASE_URL=<your-database-url>
   ENVIRONMENT=production
   PORT=8000
   ```

## Dockerfile Explanation

### Dockerfile.frontend Structure

```dockerfile
# Stage 1: Install dependencies
FROM node:18-alpine AS deps
- Copies package*.json from frontend/
- Runs npm ci for clean install

# Stage 2: Build application
FROM node:18-alpine AS builder
- Copies frontend source code
- Builds Next.js application
- Creates optimized production build

# Stage 3: Production runtime
FROM node:18-alpine AS runner
- Copies only necessary files
- Runs as non-root user (nextjs)
- Exposes port 3000
- Uses Next.js standalone output
```

## Testing Locally

To test the Docker build locally:

```bash
# Build the frontend Docker image
docker build -f Dockerfile.frontend -t chancify-frontend .

# Run the container
docker run -p 3000:3000 chancify-frontend

# Visit http://localhost:3000
```

## Troubleshooting

### Build Fails with "frontend not found"
- Ensure `.dockerignore` does NOT exclude `frontend/`
- Verify `railway.json` points to `Dockerfile.frontend`
- Check that build context is set to repository root

### "runc run failed: container process is already dead"
- This often indicates Alpine Linux compatibility issues
- Our Dockerfile uses `node:18-alpine` which is stable
- Ensure `libc6-compat` is installed (already in Dockerfile)

### Next.js Standalone Output Issues
- Verify `next.config.js` has `output: 'standalone'`
- Check that `.next/standalone` directory is created during build
- Ensure public files are copied to runner stage

### Port Issues
- Railway automatically sets the `PORT` environment variable
- Dockerfile uses `PORT=3000` as default
- Next.js will bind to this port automatically

## Files Modified

1. `.dockerignore` - Removed `frontend/` exclusion
2. `Dockerfile.frontend` - Optimized for Railway deployment
3. `railway.json` - Added watch patterns and build config
4. `.dockerignore.frontend` - Created as reference (not used by Railway)

## Railway-Specific Notes

- Railway uses the `.dockerignore` file in the repository root
- Custom dockerignore files (like `.dockerignore.frontend`) are NOT supported
- Build context is always the repository root
- Railway automatically sets `PORT` environment variable
- Health checks use the path defined in `railway.json`

## Success Indicators

When deployment succeeds, you should see:
```
✓ Built image
✓ Pushing image to registry
✓ Deploying container
✓ Service is healthy
```

Your frontend will be accessible at: `https://<your-service>.railway.app`

## Next Steps

1. Set up custom domain (optional)
2. Configure environment variables for API connection
3. Set up monitoring and alerts
4. Configure caching and CDN (Railway provides this automatically)

## Support

If you encounter issues:
1. Check Railway build logs
2. Verify all files are committed to Git
3. Ensure `.dockerignore` doesn't exclude necessary files
4. Test Docker build locally first

