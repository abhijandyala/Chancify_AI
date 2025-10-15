# 🚂 Railway Deployment Guide

## ✅ Your Project is Railway-Ready!

All necessary configuration files have been added and your project is now fully compatible with Railway deployment.

---

## 📁 Railway Configuration Files

### **1. `nixpacks.toml`**
- Configures Nixpacks builder
- Specifies Python 3.11 and Node.js 18
- Installs backend dependencies
- Sets up the start command

### **2. `railway.json`**
- Railway-specific configuration
- Points to nixpacks.toml
- Configures health checks
- Sets restart policies
- Uses 4 workers for production

### **3. `Procfile`**
- Fallback start command
- Works with Railway's default builder

### **4. `runtime.txt`**
- Specifies Python 3.11.0

### **5. `.railwayignore`**
- Excludes frontend, docs, datasets
- Keeps deployment size small
- Only deploys backend essentials

---

## 🚀 How to Deploy to Railway

### **Step 1: Prepare Your Repository**

Your code is already Railway-ready! Just make sure everything is committed:

```bash
git add .
git commit -m "feat: Add Railway deployment configuration"
git push origin main
```

### **Step 2: Create Railway Project**

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `Chancify_AI` repository
5. Railway will automatically detect the configuration

### **Step 3: Set Environment Variables**

In Railway dashboard, add these environment variables:

**Required:**
```
ENVIRONMENT=production
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Optional (if using JWT):**
```
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### **Step 4: Deploy**

Railway will automatically:
- ✅ Detect `nixpacks.toml`
- ✅ Install Python 3.11 and dependencies
- ✅ Run the start command
- ✅ Expose your API on a public URL

---

## 🔧 Configuration Details

### **Start Command**
```bash
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT --workers 4
```

- Uses 4 workers for better performance
- Binds to Railway's dynamic $PORT
- Runs from backend directory

### **Health Check**
- **Path:** `/api/health`
- **Timeout:** 300 seconds
- **Restart Policy:** ON_FAILURE
- **Max Retries:** 10

### **CORS Configuration**
- Development: Specific origins only
- Production: All origins allowed (`*`)
- Automatically detects environment

---

## 📊 Expected Build Process

When you deploy, Railway will:

1. **Setup Phase** (30-60s)
   - Install Python 3.11
   - Install Node.js 18
   - Set up build environment

2. **Install Phase** (2-5min)
   - Upgrade pip
   - Install all Python dependencies from `requirements.txt`
   - May take longer first time (cached afterwards)

3. **Build Phase** (<1min)
   - Quick verification
   - Prepares for deployment

4. **Start Phase** (10-30s)
   - Starts uvicorn server
   - Runs health checks
   - Your API goes live!

**Total time:** 3-7 minutes (first deploy)
**Subsequent deploys:** 1-3 minutes (with caching)

---

## 🌐 After Deployment

### **Your API will be available at:**
```
https://your-project-name.up.railway.app
```

### **API Endpoints:**
- **Health Check:** `https://your-url.up.railway.app/api/health`
- **API Docs:** `https://your-url.up.railway.app/api/docs`
- **Root:** `https://your-url.up.railway.app/`

### **Update Frontend**

Update your Next.js frontend to use the Railway URL:

```typescript
// In your frontend config
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-project.up.railway.app'
```

---

## 🔍 Troubleshooting

### **Build Fails**

**Issue:** Dependencies fail to install
**Solution:** Check `backend/requirements.txt` - remove any local/dev-only packages

**Issue:** Python version mismatch
**Solution:** Verify `runtime.txt` has `python-3.11.0`

### **Deployment Fails**

**Issue:** Health check timeout
**Solution:** 
- Check logs in Railway dashboard
- Verify database connection
- Ensure environment variables are set

**Issue:** Port binding error
**Solution:** Make sure you're using `$PORT` variable (already configured)

### **Runtime Errors**

**Issue:** Database connection fails
**Solution:** 
- Verify `DATABASE_URL` environment variable
- Check Supabase credentials
- Ensure Supabase allows Railway IP

**Issue:** CORS errors
**Solution:** 
- Set `ENVIRONMENT=production` in Railway
- Update `FRONTEND_URL` to your actual frontend domain

---

## 📈 Monitoring & Logs

### **View Logs**
1. Go to Railway dashboard
2. Click on your service
3. Click "Deployments"
4. View real-time logs

### **Check Health**
Visit: `https://your-url.up.railway.app/api/health`

Should return:
```json
{
  "status": "healthy",
  "database": "connected",
  "scoring_system": "loaded",
  "supabase_url": "your_url"
}
```

---

## 💰 Costs

### **Railway Pricing**
- **Hobby Plan:** $5/month (500 hours)
- **Pro Plan:** $20/month (unlimited)
- **First $5 free** with trial

### **Estimated Usage**
- Small API: ~1-2GB RAM
- ~0.5-1 vCPU
- Should fit in Hobby plan easily

---

## 🔐 Security Best Practices

### **Environment Variables**
✅ Never commit `.env` file
✅ Use Railway's environment variables
✅ Rotate SECRET_KEY regularly
✅ Use strong, unique keys

### **Database**
✅ Use Supabase Row Level Security (RLS)
✅ Limit database access to Railway IP
✅ Use service role key only for backend

### **CORS**
✅ Production allows all origins (safe for public API)
✅ Development restricts to localhost
✅ Update `FRONTEND_URL` to your actual domain

---

## 🚀 Continuous Deployment

Railway automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# Railway automatically:
# 1. Detects the push
# 2. Rebuilds the project
# 3. Runs health checks
# 4. Deploys new version
# 5. Zero downtime!
```

---

## ✅ Verification Checklist

Before deploying, verify:

- [x] `nixpacks.toml` exists
- [x] `railway.json` configured
- [x] `Procfile` created
- [x] `runtime.txt` specifies Python 3.11
- [x] `.railwayignore` excludes unnecessary files
- [x] `backend/main.py` has production CORS config
- [x] All environment variables documented
- [x] Code pushed to GitHub
- [x] Supabase credentials ready

**You're ready to deploy!** 🎉

---

## 📞 Support

**Railway Docs:** https://docs.railway.app
**Nixpacks Docs:** https://nixpacks.com/docs
**FastAPI Docs:** https://fastapi.tiangolo.com/deployment/manually/

**Your project is fully configured for Railway deployment!**

### **Next Steps:**
1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy!

**Good luck!** 🚀

