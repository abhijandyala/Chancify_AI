# Lessons Learned - Important Patterns to Remember

## 🚨 Critical Mistakes to Avoid

### 1. Always Check Actual Build Errors First
**Mistake:** Assumed Dockerfile issue when build logs showed TypeScript compilation error  
**Lesson:** Read build logs carefully - identify the ACTUAL error before making changes  
**Fix:** Fixed TypeScript type mismatch in `useImprovementAnalysis.ts` first, then Dockerfile CMD format

### 2. Set Timeouts on Commands That Might Hang
**Mistake:** Used `curl` or commands without timeouts, causing tool calls to hang infinitely  
**Lesson:** Always add timeouts to ALL commands - never run commands without timeouts  
**Fix:** Use `timeout /t <seconds> >nul 2>&1 && <command>` pattern for Windows  
**Pattern:**
```cmd
# Quick checks: 1-2 seconds
timeout /t 2 >nul 2>&1 && netstat -ano | findstr :8000

# Network requests: 5-10 seconds  
timeout /t 5 >nul 2>&1 && <network-command>

# PowerShell with timeout
powershell -Command "Invoke-WebRequest -Uri '<url>' -TimeoutSec 10"
```
**Rule:** Every command MUST have a timeout - no exceptions!

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

### 5. CORS Errors: NEVER Use Multiple CORS Middlewares
**Problem:** CORS errors persisted - "No 'Access-Control-Allow-Origin' header"  
**Root Cause:** 
- FastAPI's CORSMiddleware was conflicting with custom CORS middleware
- FastAPI's middleware handled OPTIONS first, preventing custom middleware from running
- FastAPI's middleware doesn't support suffix-based origin matching (`.railway.app`)
- Multiple middlewares caused headers to not be added properly

**Lesson:** 
- **NEVER use multiple CORS middlewares** - They conflict and break CORS
- If using custom CORS middleware, REMOVE FastAPI's CORSMiddleware
- Custom middleware must handle ALL CORS (OPTIONS preflight + actual requests)
- FastAPI's CORSMiddleware only supports exact origin matches, not suffixes
- Always use ONE CORS middleware solution

**Fix:** 
1. **Removed FastAPI's CORSMiddleware** - Was causing conflicts
2. **Enhanced custom CORS middleware** - Now handles everything
3. **Added comprehensive logging** - See all CORS decisions
4. **Improved error handling** - Never fails silently

**Pattern:**
```python
# ❌ WRONG - Don't do this:
app.add_middleware(CORSMiddleware, ...)  # FastAPI's
@app.middleware("http")
async def custom_cors_middleware(...):  # Custom
    # They conflict!

# ✅ CORRECT - Use ONLY one:
@app.middleware("http")
async def custom_cors_middleware(request: Request, call_next):
    # Handle ALL CORS here - OPTIONS and actual requests
    # Support exact and suffix-based origin matching
    # Always add CORS headers when origin is allowed
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
4. **ALWAYS set command timeouts** - Every command MUST have timeout, no exceptions
5. **CORS middleware needs error handling** - Wrap in try-catch to prevent breaking CORS
6. **OAuth must work** - Ensure OAuth works with ngrok URL changes
7. **Use getApiBaseUrl()** - All API calls should use this function for consistency
8. **Backend must be running** - CORS only works if backend is active

## 🔄 When Ngrok URL Changes

1. Update `NGROK_API_URL` constant in `frontend/lib/config.ts`
2. Or set `NEXT_PUBLIC_API_URL` environment variable in Railway
3. OAuth will automatically use new URL via `getApiBaseUrl()`
4. No code changes needed in OAuth or API routes

---

**Last Updated:** 2025-12-01  
**Ngrok URL:** `https://unsmug-untensely-elroy.ngrok-free.dev`

