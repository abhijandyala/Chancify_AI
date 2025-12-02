# Lessons Learned - Important Patterns to Remember

## 🚨 Critical Mistakes to Avoid

### 1. Always Check Actual Build Errors First
**Mistake:** Assumed Dockerfile issue when build logs showed TypeScript compilation error  
**Lesson:** Read build logs carefully - identify the ACTUAL error before making changes  
**Fix:** Fixed TypeScript type mismatch in `useImprovementAnalysis.ts` first, then Dockerfile CMD format

### 2. Set Timeouts on Commands That Might Hang
**Mistake:** Used `curl` or commands without timeouts, causing tool calls to hang  
**Lesson:** Always add timeouts or use alternative methods for checking services  
**Fix:** Use `timeout` command or check if service is already running before attempting operations

### 3. Ngrok URL is PRIMARY, Not Fallback
**Mistake:** Used localhost as primary backend URL  
**User Requirement:** Ngrok URL (`https://unsmug-untensely-elroy.ngrok-free.dev`) must be PRIMARY  
**Lesson:** Always use ngrok URL as PRIMARY, localhost only as FALLBACK for local development  
**Fix:** Updated `frontend/lib/config.ts` priority order:
  1. Runtime override
  2. Environment variables  
  3. **Ngrok URL (PRIMARY)**
  4. Localhost (FALLBACK only)

### 4. Don't Break OAuth When Ngrok Restarts
**Requirement:** OAuth must continue working when ngrok URL changes  
**Solution:** OAuth callback uses `getApiBaseUrl()` which automatically uses ngrok URL  
**Pattern:** All API calls should use `getApiBaseUrl()` for consistency

### 5. CORS Errors: Always Add Error Handling to Middleware
**Problem:** CORS errors blocking frontend requests - "No 'Access-Control-Allow-Origin' header"  
**Root Cause:** 
- Backend CORS middleware might throw exceptions, preventing CORS headers from being added
- Middleware must handle OPTIONS preflight requests correctly
- Backend must be running and middleware must execute properly

**Lesson:** 
- CORS middleware MUST have try-catch to prevent exceptions from breaking CORS
- Always log CORS decisions for debugging
- Ensure CORS headers are added even if errors occur
- Backend must be running for CORS to work

**Fix:** Enhanced CORS middleware in `backend/main.py`:
- Added try-catch block around entire middleware
- Improved logging for debugging CORS issues
- Ensured CORS headers are added when origin is allowed
- Better error handling for edge cases

**Pattern:**
```python
@app.middleware("http")
async def custom_cors_middleware(request: Request, call_next):
    try:
        # Handle OPTIONS preflight
        # Add CORS headers
        # Process request
    except Exception as e:
        # Log error but still try to add CORS headers
        # Don't let middleware exceptions break CORS
```

## ✅ Correct Patterns

### Backend URL Configuration
```typescript
// frontend/lib/config.ts
const NGROK_API_URL = 'https://unsmug-untensely-elroy.ngrok-free.dev' // PRIMARY
const DEFAULT_API_URL = 'http://localhost:8000' // FALLBACK only

export function getApiBaseUrl(): string {
  return resolveRuntimeOverride() || 
         resolveEnvApiUrl() || 
         NGROK_API_URL ||      // PRIMARY
         DEFAULT_API_URL       // FALLBACK
}
```

### All API Calls Should Use This Pattern
```typescript
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config'

const API_BASE_URL = getApiBaseUrl()
const headers = withNgrokHeaders(API_BASE_URL, {
  'Content-Type': 'application/json'
})
```

### OAuth Compatibility
- OAuth callback route uses `getApiBaseUrl()` automatically
- OAuth redirect URLs are hardcoded to Railway production URL (correct)
- Ngrok URL changes don't break OAuth

## 📝 Remember These Rules

1. **Ngrok is PRIMARY** - Always use ngrok URL as primary backend URL
2. **Localhost is FALLBACK** - Only use localhost for local development
3. **Check actual errors first** - Read build logs, don't assume
4. **Set command timeouts** - Prevent hanging commands
5. **OAuth must work** - Ensure OAuth works with ngrok URL changes
6. **Use getApiBaseUrl()** - All API calls should use this function for consistency

## 🔄 When Ngrok URL Changes

1. Update `NGROK_API_URL` constant in `frontend/lib/config.ts`
2. Or set `NEXT_PUBLIC_API_URL` environment variable in Railway
3. OAuth will automatically use new URL via `getApiBaseUrl()`
4. No code changes needed in OAuth or API routes

---

**Last Updated:** 2025-12-01  
**Ngrok URL:** `https://unsmug-untensely-elroy.ngrok-free.dev`

