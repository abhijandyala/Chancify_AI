# How to Restart Backend - Quick Instructions

## Current Problem
You're in `C:\Windows\System32>` but need to be in the project directory.

## Solution - Run These Commands:

### Step 1: Navigate to Project Directory
```cmd
cd C:\Users\abhij\OneDrive\Desktop\Chancify_AI\backend
```

### Step 2: Start Backend
```cmd
python main.py
```

## OR - All in One Command:
```cmd
cd C:\Users\abhij\OneDrive\Desktop\Chancify_AI\backend && python main.py
```

## What to Look For:
After running, you should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

## After Backend Starts:
1. The `/api/auth/me` endpoint will return `200 OK` with `{"authenticated": false}` instead of `403 Forbidden`
2. Test it: Visit `https://unsmug-untensely-elroy.ngrok-free.dev/api/auth/me` in browser
3. Should see: `{"detail": "Not authenticated", "authenticated": false}`

---

**Important:** Keep this terminal window open - the backend needs to keep running!

