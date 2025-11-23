# Ngrok Backend Setup - Current Configuration

## ✅ Current Setup

- **Frontend:** Deployed on Railway at `https://chancifyai.up.railway.app`
- **Backend:** Running locally via ngrok at `https://unsmug-untensely-elroy.ngrok-free.dev`
- **Ngrok Status:** Running (PID: 74844)

## 🔧 Configuration

### Backend (Local + Ngrok)
1. Backend runs locally on `http://localhost:8000`
2. Ngrok tunnels to expose it: `ngrok http 8000`
3. Current ngrok URL: `https://unsmug-untensely-elroy.ngrok-free.dev`
4. CORS configured to allow `https://chancifyai.up.railway.app` origin

### Frontend (Railway)
1. Frontend deployed on Railway
2. **IMPORTANT:** Set `NEXT_PUBLIC_API_URL` environment variable in Railway to your current ngrok URL
3. When ngrok URL changes, update the Railway environment variable

## 📝 Railway Environment Variables

In your Railway frontend service, set:

```
NEXT_PUBLIC_API_URL=https://unsmug-untensely-elroy.ngrok-free.dev
```

**Note:** When ngrok restarts and gets a new URL, you MUST update this variable in Railway and redeploy the frontend.

## 🔄 When Ngrok URL Changes

1. Get new ngrok URL: Check `http://127.0.0.1:4040/api/tunnels` or ngrok dashboard
2. Update Railway: Go to frontend service → Variables → Update `NEXT_PUBLIC_API_URL`
3. Redeploy frontend: Railway will automatically redeploy, or trigger manually
4. Verify: Test API calls from frontend

## 🧪 Testing

1. **Backend Health:**
   ```bash
   curl https://unsmug-untensely-elroy.ngrok-free.dev/api/health
   ```

2. **CORS Test:**
   ```bash
   curl -X OPTIONS https://unsmug-untensely-elroy.ngrok-free.dev/api/suggest/colleges \
     -H "Origin: https://chancifyai.up.railway.app" \
     -H "Access-Control-Request-Method: POST" \
     -v
   ```

## ⚠️ Important Notes

- **Ngrok URLs change on restart** - Always update Railway env var when ngrok restarts
- **CORS is configured** - Backend allows `.railway.app` origins
- **Frontend uses dynamic URL resolution** - Can also use `localStorage` or `window.__CHANCIFY_API_URL__` for runtime overrides
- **Backend must be running locally** - Ngrok won't work if backend isn't running on port 8000

## 🚀 Quick Start

1. Start backend locally:
   ```bash
   cd backend
   python main.py
   ```

2. Start ngrok:
   ```bash
   ngrok http 8000
   ```

3. Update Railway env var with ngrok URL

4. Frontend will automatically use the ngrok URL

