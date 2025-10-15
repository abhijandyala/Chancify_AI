# 🎨 Frontend Setup for Railway Backend

## ✅ Your Backend is Live!

**API URL:** https://chancifyai.up.railway.app

---

## 🔧 Connect Frontend to Backend

### **Step 1: Create Environment File**

Create `frontend/.env.local` (this file is gitignored):

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://chancifyai.up.railway.app
```

### **Step 2: Create API Client**

Create `frontend/lib/api.ts`:

```typescript
// API client configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = {
  baseURL: API_URL,
  
  // Health check
  async health() {
    const response = await fetch(`${API_URL}/api/health`)
    return response.json()
  },
  
  // Calculate admission probability
  async calculateProbability(profileData: any) {
    const response = await fetch(`${API_URL}/api/calculations/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    })
    return response.json()
  },
  
  // ML prediction
  async mlPredict(profileData: any, collegeId: string) {
    const response = await fetch(`${API_URL}/api/calculations/ml-predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: profileData,
        college_id: collegeId
      })
    })
    return response.json()
  },
  
  // Authentication
  async signup(email: string, password: string, fullName: string) {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, full_name: fullName })
    })
    return response.json()
  },
  
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    return response.json()
  }
}
```

### **Step 3: Use in Your Components**

Update `frontend/app/(dashboard)/home/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function HomePage() {
  const [profile, setProfile] = useState({ ... })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculateChances = async () => {
    setLoading(true)
    try {
      const data = await api.calculateProbability(profile)
      setResult(data)
      console.log('Admission probability:', data)
    } catch (error) {
      console.error('API Error:', error)
      alert('Failed to calculate. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // ... your JSX
    <Button onClick={calculateChances} disabled={loading}>
      {loading ? 'Calculating...' : 'Calculate My Chances'}
    </Button>
  )
}
```

---

## 🧪 Test the Connection

### **Option 1: Browser Console**

Open developer tools and run:

```javascript
fetch('https://chancifyai.up.railway.app/api/health')
  .then(r => r.json())
  .then(data => console.log(data))
```

### **Option 2: Create Test Component**

Create `frontend/components/APITest.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export function APITest() {
  const [status, setStatus] = useState<any>(null)

  const testAPI = async () => {
    try {
      const health = await api.health()
      setStatus(health)
      alert('✅ API Connected!')
    } catch (error) {
      alert('❌ API Connection Failed')
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={testAPI}>Test API Connection</button>
      {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
    </div>
  )
}
```

---

## 🚀 Quick Start Commands

```bash
# 1. Navigate to frontend
cd frontend

# 2. Create .env.local file
echo "NEXT_PUBLIC_API_URL=https://chancifyai.up.railway.app" > .env.local

# 3. Restart dev server (if running)
# Press Ctrl+C to stop, then:
npm run dev

# 4. Open browser
# http://localhost:3001
```

---

## 🔍 Verify Setup

### **1. Check Environment Variable**

Add this to any component temporarily:

```typescript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
// Should log: https://chancifyai.up.railway.app
```

### **2. Test Health Endpoint**

```typescript
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`)
    .then(r => r.json())
    .then(data => console.log('Backend status:', data))
}, [])
```

### **3. Check Network Tab**

- Open DevTools → Network tab
- Click "Calculate My Chances"
- Should see POST request to `chancifyai.up.railway.app`

---

## ⚠️ Common Issues

### **CORS Errors**

✅ **Already Fixed!** Your backend allows all origins in production.

If you still see CORS errors:
1. Check Railway environment has `ENVIRONMENT=production`
2. Clear browser cache
3. Hard refresh (Ctrl + Shift + R)

### **"Failed to fetch"**

**Cause:** Backend might be sleeping (Railway free tier)
**Solution:** Visit https://chancifyai.up.railway.app/api/health to wake it up

### **Environment Variable Not Working**

**Cause:** Need to restart dev server after creating `.env.local`
**Solution:**
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

---

## 📊 Example Request/Response

### **Request:**
```json
POST https://chancifyai.up.railway.app/api/calculations/predict

{
  "profile": {
    "gpa_unweighted": 3.85,
    "gpa_weighted": 4.25,
    "sat": 1450,
    "act": 32,
    "extracurricular_depth": 8,
    "leadership_positions": 7,
    "awards_publications": 6
  },
  "college": {
    "name": "Stanford University",
    "acceptance_rate": 0.04
  }
}
```

### **Response:**
```json
{
  "probability": 0.42,
  "composite_score": 785,
  "confidence_interval": [0.38, 0.46],
  "factors": {
    "gpa": "strong",
    "testing": "competitive",
    "extracurriculars": "exceptional"
  }
}
```

---

## 🎯 Next Steps

1. ✅ Create `frontend/.env.local` with Railway URL
2. ✅ Create `frontend/lib/api.ts` API client
3. ✅ Update Home page to use API
4. ✅ Test the connection
5. ⏳ Deploy frontend to Vercel
6. ⏳ Update Railway `FRONTEND_URL` to Vercel domain

**Your backend is live and ready to use!** 🎉

---

## 📞 Quick Links

- **API Docs:** https://chancifyai.up.railway.app/api/docs
- **Health Check:** https://chancifyai.up.railway.app/api/health
- **Railway Dashboard:** https://railway.app/dashboard
- **Documentation:** `RAILWAY_DEPLOYMENT.md`

