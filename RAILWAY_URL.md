# 🚂 Railway Deployment URLs

## ✅ Your Live Deployment

**API Base URL:** https://chancifyai.up.railway.app

---

## 📍 API Endpoints

### **Health Check**
```
https://chancifyai.up.railway.app/api/health
```

### **API Documentation**
```
https://chancifyai.up.railway.app/api/docs
```

### **Root Endpoint**
```
https://chancifyai.up.railway.app/
```

---

## 🔗 API Routes

### **Authentication**
- **Signup:** `POST https://chancifyai.up.railway.app/api/auth/signup`
- **Login:** `POST https://chancifyai.up.railway.app/api/auth/login`
- **Current User:** `GET https://chancifyai.up.railway.app/api/auth/me`

### **Calculations**
- **Calculate Probability:** `POST https://chancifyai.up.railway.app/api/calculations/predict`
- **ML Prediction:** `POST https://chancifyai.up.railway.app/api/calculations/ml-predict`

---

## 🎯 Connect Frontend to Backend

Update your Next.js frontend environment variables:

### **Create/Update `frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=https://chancifyai.up.railway.app
```

### **Use in Your Frontend Code:**
```typescript
// In your API client
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Example fetch
const response = await fetch(`${API_URL}/api/calculations/predict`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // your data
  })
})
```

---

## 🔧 Update Railway Environment Variables

Make sure these are set in Railway dashboard:

```
ENVIRONMENT=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
```

---

## ✅ Test Your Deployment

### **1. Check Health:**
Visit: https://chancifyai.up.railway.app/api/health

Should return:
```json
{
  "status": "healthy",
  "database": "connected",
  "scoring_system": "loaded",
  "supabase_url": "..."
}
```

### **2. View API Docs:**
Visit: https://chancifyai.up.railway.app/api/docs

Interactive Swagger UI with all endpoints

### **3. Test Root:**
Visit: https://chancifyai.up.railway.app/

Should return API status

---

## 🎨 Frontend Integration

Your Next.js frontend (`http://localhost:3001`) can now connect to the Railway backend!

### **Example API Call:**
```typescript
// pages/home.tsx or components
const calculateChances = async (profileData: any) => {
  try {
    const response = await fetch('https://chancifyai.up.railway.app/api/calculations/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    })
    
    const data = await response.json()
    console.log('Admission probability:', data)
    return data
  } catch (error) {
    console.error('API Error:', error)
  }
}
```

---

## 🚀 Your Stack

**Frontend:** Next.js (localhost:3001 → Deploy to Vercel)
**Backend:** FastAPI (chancifyai.up.railway.app) ✅ **LIVE**
**Database:** Supabase
**ML Model:** 85.51% ROC-AUC

---

## 📊 Monitoring

**Railway Dashboard:** https://railway.app/dashboard
- View logs
- Check metrics
- Monitor performance
- Update environment variables

---

## 🎯 Next Steps

1. **Test the API:** Visit https://chancifyai.up.railway.app/api/docs
2. **Update Frontend:** Add `NEXT_PUBLIC_API_URL` to `.env.local`
3. **Deploy Frontend:** Deploy Next.js to Vercel
4. **Update CORS:** Set `FRONTEND_URL` in Railway to your Vercel domain

**Your backend is live and ready to use!** 🎉

