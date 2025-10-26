# Ngrok + Backend Connection Troubleshooting

## Problem
Getting "Method Not Allowed" error when accessing `/api/predict/frontend` endpoint through ngrok.

## Root Causes

1. **Backend Not Running** - The FastAPI server isn't running locally on port 8000
2. **Ngrok Tunnel Not Started** - Ngrok isn't creating a tunnel to localhost:8000
3. **Backend Code Changes Not Deployed** - The latest code changes aren't running on the backend

## Quick Fix Steps

### Step 1: Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start the server
python main.py
```

**Expected Output:**
```
Starting Chancify AI API Server...
Server will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs
Health Check: http://localhost:8000/api/health

INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Start Ngrok Tunnel

```bash
# In a separate terminal, start ngrok
ngrok http 8000
```

**Expected Output:**
```
Session Status: online
Forwarding: https://xxxxx.ngrok-free.dev -> http://localhost:8000
```

### Step 3: Update Frontend API URL

In `frontend/.env.local` or `frontend/lib/api.ts`, set:
```
NEXT_PUBLIC_API_URL=https://your-ngrok-url.ngrok-free.dev
```

### Step 4: Test the Connection

1. Test health endpoint in browser:
   ```
   https://your-ngrok-url.ngrok-free.dev/api/health
   ```

2. Test from frontend:
   - Open DevTools → Network tab
   - Try to calculate chances
   - Should see POST request to `/api/predict/frontend`

## Verification Checklist

- [ ] Backend server running on localhost:8000
- [ ] Ngrok tunnel active (check ngrok dashboard: http://127.0.0.1:4040)
- [ ] Frontend environment variable updated
- [ ] Browser can access `/api/health` endpoint
- [ ] No "Method Not Allowed" errors in Network tab

## Common Errors

### Error: "Method Not Allowed"
**Fix**: Backend is not running or ngrok tunnel not connected

### Error: "ngrok-skip-browser-warning" needed
**Fix**: Add header in frontend requests:
```typescript
headers['ngrok-skip-browser-warning'] = 'true'
```

### Error: Backend returns college ID instead of name
**Fix**: Already fixed in latest code - restart backend to apply changes:
1. Stop backend (Ctrl+C)
2. Run `python main.py` again
3. Restart ngrok tunnel

## Testing with Direct API Call

```bash
curl -X POST https://your-ngrok-url.ngrok-free.dev/api/predict/frontend \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{
    "gpa_unweighted": "3.8",
    "gpa_weighted": "4.2",
    "sat": "1500",
    "act": "34",
    "major": "Computer Science",
    "college": "college_2073268"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "college_name": "Carnegie Mellon University",
  "college_data": {
    "name": "Carnegie Mellon University",
    "city": "Pittsburgh",
    "state": "PA",
    ...
  }
}
```

## Next Steps After Fixing

1. **Restart Backend** to apply latest college ID lookup fixes
2. **Update Ngrok URL** if it changed
3. **Clear Browser Cache** to ensure frontend uses new API URL
4. **Test Full Flow** from homepage to calculations page
