# Railway Deployment Checklist

## ✅ Pre-Deployment (Completed)

- [x] Fixed `.dockerignore` - removed `frontend/` exclusion
- [x] Updated `Dockerfile.frontend` with proper configuration
- [x] Configured `railway.json` with correct build settings
- [x] Created verification script (`verify_railway_setup.py`)
- [x] All verification checks pass
- [x] Frontend has `output: 'standalone'` in `next.config.js`

## 📋 Deployment Steps

### Step 1: Verify Setup ✅
```bash
python verify_railway_setup.py
```
**Expected:** `[SUCCESS] ALL CHECKS PASSED`

### Step 2: Commit Changes
```bash
git status
git add .
git commit -m "Fix Railway frontend deployment - resolve dockerignore issue"
```

### Step 3: Push to GitHub
```bash
git push origin main
```

### Step 4: Railway Configuration

#### If deploying for the first time:
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will detect `railway.json` automatically
6. Click "Deploy"

#### If updating existing deployment:
- Railway will auto-deploy on git push (if connected to GitHub)
- Or manually trigger deploy in Railway dashboard

### Step 5: Monitor Build
1. Open Railway dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Watch the build logs

**Look for:**
```
✓ Building Docker image
✓ FROM node:18-alpine
✓ COPY frontend/package*.json
✓ RUN npm ci
✓ COPY frontend/ .
✓ RUN npm run build
✓ Image built successfully
✓ Pushing to registry
✓ Deployment successful
```

### Step 6: Verify Deployment
1. Railway will provide a URL: `https://yourapp.railway.app`
2. Open the URL in browser
3. Verify the app loads correctly

## 🔍 Troubleshooting

### If build fails:

#### Error: "frontend not found"
**Cause:** `.dockerignore` still excludes frontend  
**Fix:** 
```bash
# Check .dockerignore doesn't have 'frontend/' line
grep "^frontend/$" .dockerignore
# Should return nothing

# If it returns a match:
# Edit .dockerignore and remove that line
```

#### Error: "npm ci" fails
**Cause:** `package-lock.json` out of sync  
**Fix:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

#### Error: "Cannot find module 'next'"
**Cause:** Dependencies not installed  
**Fix:** Check Dockerfile COPY commands match package files

#### Error: Build succeeds but "Application failed to respond"
**Cause:** App not listening on correct port  
**Fix:**
- Ensure `Dockerfile.frontend` has `ENV PORT=3000`
- Verify `CMD ["node", "server.js"]` in Dockerfile
- Check Next.js standalone output is enabled

### If deployment is slow:
- First deploy takes longer (building base images)
- Subsequent deploys use cached layers (faster)
- Railway shows build progress in real-time

## 🎯 Post-Deployment

### Immediate Actions:
- [ ] Test the deployed URL
- [ ] Verify all pages load correctly
- [ ] Check browser console for errors
- [ ] Test on mobile viewport

### Optional Configuration:
- [ ] Set up custom domain (Railway Settings → Domains)
- [ ] Configure environment variables (if needed later)
- [ ] Set up monitoring/alerts
- [ ] Enable auto-scaling (if needed)

### Environment Variables (Future):
If you need to add backend API later:
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## 📊 Expected Results

### Build Time:
- First build: 3-5 minutes
- Subsequent builds: 1-2 minutes (with cache)

### Container Size:
- ~150-200 MB (Alpine-based image)

### Startup Time:
- ~2-5 seconds

### Memory Usage:
- ~150-250 MB RAM

## 🚀 Success Indicators

✅ Build completes without errors  
✅ "Deployment successful" message in Railway  
✅ Service shows "Active" status  
✅ URL responds with HTTP 200  
✅ Frontend loads in browser  
✅ No errors in browser console  
✅ Health check passes (if configured)  

## 📝 Notes

### Current Configuration:
- **Build Method:** Docker (Dockerfile.frontend)
- **Node Version:** 18-alpine
- **Next.js Version:** 14.1.0
- **Output Mode:** Standalone
- **Port:** 3000
- **Build Context:** Repository root

### Files That Matter:
- `Dockerfile.frontend` - Build instructions
- `.dockerignore` - Files to exclude
- `railway.json` - Railway configuration
- `frontend/package.json` - Dependencies
- `frontend/next.config.js` - Next.js config

### Files to Ignore:
- `.dockerignore.frontend` - Reference only (not used)
- `verify_railway_setup.py` - Local verification only
- Documentation files (*.md)

## 🔄 Update Process (Future Deployments)

1. Make changes to frontend code
2. Test locally: `cd frontend && npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
4. Railway auto-deploys (usually within 2-3 minutes)
5. Verify deployment at Railway URL

## 🆘 Need Help?

### Check Logs:
```bash
# Railway CLI (if installed)
railway logs

# Or use Railway dashboard → Deployments → Logs
```

### Common Log Messages:

**Good:**
```
> chancify-ai-frontend@0.1.0 build
> next build
✓ Creating an optimized production build
✓ Compiled successfully
```

**Bad:**
```
Error: Cannot find module 'X'
→ Missing dependency, check package.json

COPY failed: file not found
→ Check .dockerignore isn't excluding needed files
```

## 📞 Support Resources

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Next.js Deployment: https://nextjs.org/docs/deployment
- This project's docs: See `RAILWAY_FIX_SUMMARY.md`

---

**Ready to Deploy:** ✅ YES  
**All Fixes Applied:** ✅ YES  
**Verification Passed:** ✅ YES  

**Next Action:** Commit and push to trigger deployment!

