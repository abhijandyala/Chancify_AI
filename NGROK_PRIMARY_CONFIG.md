# Ngrok as Primary Backend URL - Configuration Pattern

## ✅ Current Setup

**PRIMARY Backend URL:** `https://unsmug-untensely-elroy.ngrok-free.dev` (ngrok)  
**FALLBACK Backend URL:** `http://localhost:8000` (local development only)

## 📋 Configuration Priority Order

The `frontend/lib/config.ts` uses the following priority order:

1. **Runtime Override** (highest priority)
   - `window.__CHANCIFY_API_URL__` (browser console override)
   - `localStorage.getItem('api_base_url')` (browser storage)

2. **Environment Variables**
   - `NEXT_PUBLIC_API_URL`
   - `API_BASE_URL`
   - `BACKEND_URL` (server-side only)

3. **Ngrok URL** (PRIMARY - user requirement)
   - `https://unsmug-untensely-elroy.ngrok-free.dev`

4. **Localhost** (FALLBACK only)
   - `http://localhost:8000`

## 🔧 How It Works

```typescript
// frontend/lib/config.ts
const NGROK_API_URL = 'https://unsmug-untensely-elroy.ngrok-free.dev'
const DEFAULT_API_URL = 'http://localhost:8000'

export function getApiBaseUrl(): string {
  return resolveRuntimeOverride() || 
         resolveEnvApiUrl() || 
         NGROK_API_URL ||  // PRIMARY
         DEFAULT_API_URL   // FALLBACK
}
```

## ⚠️ Important Notes

### OAuth Compatibility
- OAuth callback route (`/api/auth/callback/google/route.ts`) uses `getApiBaseUrl()`
- This ensures OAuth works with ngrok URL automatically
- OAuth redirect URLs are hardcoded to Railway production URL (correct behavior)

### When Ngrok URL Changes
1. Update `NGROK_API_URL` constant in `frontend/lib/config.ts`
2. Or set `NEXT_PUBLIC_API_URL` environment variable in Railway
3. OAuth will automatically use the new URL via `getApiBaseUrl()`

### Backend Requirements
- Backend must be running on `localhost:8000`
- Ngrok tunnel must be active: `ngrok http 8000`
- Backend CORS must allow ngrok domain

## 🚀 Quick Start

1. **Start Backend:**
   ```bash
   cd backend
   python main.py
   ```

2. **Start Ngrok:**
   ```bash
   ngrok http 8000
   ```

3. **Frontend automatically uses ngrok URL** (no configuration needed)

## 📝 Remember This Pattern

**User Requirement:** Always use ngrok URL as PRIMARY, localhost as FALLBACK only.

**Why:** 
- Frontend is deployed on Railway
- Backend runs locally via ngrok tunnel
- OAuth must work with ngrok URL
- Localhost is only for local development

**Files Modified:**
- `frontend/lib/config.ts` - Updated priority order

**Files That Use This:**
- All API calls via `getApiBaseUrl()`
- OAuth callback route
- All hooks and services

---

**Last Updated:** 2025-12-01  
**Ngrok URL:** `https://unsmug-untensely-elroy.ngrok-free.dev`


