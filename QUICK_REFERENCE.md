# Quick Reference - Critical Patterns to Remember

## 🚨 ALWAYS CHECK THIS BEFORE MAKING CHANGES

### 1. Ngrok URL is PRIMARY
- **Never use localhost as primary** - Always use ngrok URL first
- Priority: Runtime override → Env vars → **Ngrok URL** → Localhost (fallback only)

### 2. NEVER Use Multiple CORS Middlewares
- **Only ONE CORS middleware** - FastAPI's OR custom, NOT both
- Custom middleware needed for suffix matching (`.railway.app`, `.ngrok-free.dev`)

### 3. Always Set Command Timeouts
- **Every command MUST have timeout** - No exceptions
- Pattern: `timeout /t <seconds> >nul 2>&1 && <command>`

### 4. Check Actual Errors First
- **Read build logs carefully** - Don't assume the problem
- Identify the ACTUAL error before making changes

### 5. OAuth Must Work with Ngrok
- OAuth uses `getApiBaseUrl()` automatically
- Ngrok URL changes don't break OAuth

## 📋 File Locations

- **LESSONS_LEARNED.md** - Comprehensive lessons and patterns
- **CORS_FINAL_FIX.md** - CORS solution details
- **NGROK_PRIMARY_CONFIG.md** - Ngrok configuration
- **COMMAND_TIMEOUT_PATTERN.md** - Timeout patterns

## ⚡ Quick Checks Before Any Request

1. ✅ Check LESSONS_LEARNED.md for relevant patterns
2. ✅ Verify ngrok URL is PRIMARY (not localhost)
3. ✅ Ensure only ONE CORS middleware exists
4. ✅ All commands have timeouts
5. ✅ Read actual error messages, don't assume

---

**Remember:** Always reference LESSONS_LEARNED.md before making changes!

