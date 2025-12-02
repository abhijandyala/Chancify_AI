# Command Timeout Pattern - Prevent Infinite Hangs

## 🚨 Problem
Commands can hang indefinitely, making it impossible to see results or analytics.

## ✅ Solution: Always Use Timeouts

### Windows Command Pattern
```cmd
timeout /t <seconds> >nul 2>&1 && <your-command>
```

### PowerShell Pattern (Better for HTTP requests)
```powershell
powershell -Command "$ProgressPreference='SilentlyContinue'; $response = Invoke-WebRequest -Uri '<url>' -TimeoutSec 10 -ErrorAction SilentlyContinue; <process-response>"
```

### Python Script Pattern (For complex operations)
```python
import signal
import subprocess

def run_with_timeout(cmd, timeout=30):
    try:
        result = subprocess.run(cmd, timeout=timeout, capture_output=True)
        return result
    except subprocess.TimeoutExpired:
        return None
```

## 📋 Examples

### Check if service is running
```cmd
timeout /t 2 >nul 2>&1 && netstat -ano | findstr :8000
```

### Test HTTP endpoint
```powershell
powershell -Command "Invoke-WebRequest -Uri 'https://example.com' -TimeoutSec 10"
```

### Check process
```cmd
timeout /t 1 >nul 2>&1 && tasklist | findstr /i python
```

## 🎯 Rules

1. **Always set timeouts** - Never run commands without timeouts
2. **Use appropriate timeout values:**
   - Quick checks: 1-2 seconds
   - Network requests: 5-10 seconds
   - Complex operations: 30-60 seconds
3. **Redirect output** - Use `>nul 2>&1` to suppress output when needed
4. **Handle timeouts gracefully** - Check if command succeeded or timed out

## ⚠️ Remember

- Commands without timeouts can hang forever
- Always use `timeout` command or `-TimeoutSec` parameter
- Check command exit codes to verify success
- Log results for analytics

---

**Last Updated:** 2025-12-01

