# How to Run Ngrok on Port 8000

## 🎯 Quick Start

Ngrok exposes your local backend (running on `localhost:8000`) to the internet so your Railway frontend can access it.

---

## 📱 Method 1: Using Ngrok Desktop App (Easiest)

### Step 1: Download and Install Ngrok
1. Go to https://ngrok.com/download
2. Download the Windows version
3. Install the ngrok desktop app
4. Sign up/login to ngrok account (free tier works)

### Step 2: Get Your Authtoken
1. Open ngrok desktop app
2. Go to **Settings** → **Your Authtoken**
3. Copy your authtoken (or get it from https://dashboard.ngrok.com/get-started/your-authtoken)

### Step 3: Configure the Tunnel
1. In ngrok desktop app, click **"New Tunnel"** or **"+"** button
2. Select **"HTTP"** as the protocol
3. Enter **`localhost:8000`** as the Forward To address
4. (Optional) Give it a name like "Chancify Backend"
5. Click **"Create Tunnel"**

### Step 4: Start the Tunnel
1. Click the **"Start"** button next to your tunnel
2. You'll see a public URL like: `https://xxxxx.ngrok-free.dev`
3. **Copy this URL** - you'll need it for your frontend configuration

### Step 5: Verify It's Working
1. Make sure your backend is running on port 8000:
   ```bash
   cd backend
   python main.py
   ```
2. Test the ngrok URL in your browser:
   ```
   https://your-ngrok-url.ngrok-free.dev/api/health
   ```
   Should return: `{"status":"healthy",...}`

---

## 💻 Method 2: Using Command Line

### Step 1: Install Ngrok CLI
1. Download ngrok from https://ngrok.com/download
2. Extract `ngrok.exe` to a folder (e.g., `C:\ngrok\`)
3. Add ngrok to your PATH, or use full path

### Step 2: Authenticate
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```
Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken

### Step 3: Start the Tunnel
```bash
ngrok http 8000
```

**Expected Output:**
```
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxxx.ngrok-free.dev -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### Step 4: Copy the URL
- Look for the line: `Forwarding https://xxxxx.ngrok-free.dev -> http://localhost:8000`
- Copy the `https://xxxxx.ngrok-free.dev` URL

---

## 🔧 Method 3: Using Ngrok Config File (Persistent)

### Step 1: Create Config File
Create/edit `%USERPROFILE%\.ngrok2\ngrok.yml` (or `%LOCALAPPDATA%\ngrok\ngrok.yml`):

```yaml
version: "2"
authtoken: YOUR_AUTHTOKEN
tunnels:
  chancify-backend:
    addr: 8000
    proto: http
```

### Step 2: Start Named Tunnel
```bash
ngrok start chancify-backend
```

This will use the same URL every time (if you have a paid plan) or a new URL each time (free plan).

---

## ✅ Verification Steps

### 1. Check Backend is Running
```bash
# In one terminal
cd backend
python main.py
# Should see: INFO: Uvicorn running on http://0.0.0.0:8000
```

### 2. Check Ngrok is Forwarding
```bash
# Test health endpoint
curl https://your-ngrok-url.ngrok-free.dev/api/health
# Or visit in browser
```

### 3. Check Ngrok Dashboard
Open in browser: `http://127.0.0.1:4040`
- See all requests
- See request/response details
- Verify tunnel is active

---

## 🔄 Update Frontend Configuration

Once you have your ngrok URL, update your frontend:

### Option 1: Update `frontend/lib/config.ts`
```typescript
const NGROK_API_URL = 'https://your-new-ngrok-url.ngrok-free.dev' // PRIMARY
```

### Option 2: Set Environment Variable (Railway)
In Railway dashboard → Frontend Service → Variables:
```
NEXT_PUBLIC_API_URL=https://your-ngrok-url.ngrok-free.dev
```

---

## ⚠️ Important Notes

1. **Ngrok URLs Change on Restart** (Free Plan)
   - Each time you restart ngrok, you get a new URL
   - You MUST update your frontend configuration with the new URL

2. **Backend Must Be Running**
   - Ngrok only forwards requests - it doesn't run your backend
   - Always start backend first: `cd backend && python main.py`
   - Then start ngrok

3. **Ngrok Free Plan Limits**
   - 1 tunnel at a time
   - URLs change on restart
   - 40 connections/minute
   - For production, consider paid plan or static domain

4. **Browser Warning**
   - Ngrok free plan shows a browser warning page
   - Add header to requests: `ngrok-skip-browser-warning: true`
   - Already configured in your frontend code

---

## 🚨 Troubleshooting

### Problem: "Tunnel not found"
**Solution:** Make sure backend is running on port 8000 first

### Problem: "ERR_NGROK_3200" or "authtoken required"
**Solution:** Run `ngrok config add-authtoken YOUR_AUTHTOKEN`

### Problem: "Address already in use"
**Solution:** Another process is using port 8000. Stop it or use a different port

### Problem: Ngrok URL not working
**Solution:** 
1. Check backend is running: `curl http://localhost:8000/api/health`
2. Check ngrok dashboard: `http://127.0.0.1:4040`
3. Restart ngrok tunnel

---

## 📋 Quick Reference

```bash
# Start backend
cd backend && python main.py

# Start ngrok (in separate terminal)
ngrok http 8000

# Or with desktop app:
# 1. Open ngrok desktop app
# 2. Create tunnel: localhost:8000
# 3. Start tunnel
# 4. Copy URL
```

---

**Current Ngrok URL:** `https://unsmug-untensely-elroy.ngrok-free.dev`  
**Last Updated:** 2025-12-01

