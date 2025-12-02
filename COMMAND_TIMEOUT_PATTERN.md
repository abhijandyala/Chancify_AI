# Command Timeout Pattern - Updated

## ⚠️ CRITICAL: Always Use Timeouts

**Problem:** Commands can hang indefinitely, blocking terminal output  
**Solution:** Use `timeout /t <seconds>` for ALL commands

## ✅ Updated Pattern (10-25 seconds for long operations)

### For Quick Commands (2-5 seconds):
```cmd
timeout /t 3 >nul 2>&1 && <command>
```

### For Longer Operations (10-25 seconds):
```cmd
timeout /t 15 >nul 2>&1 && <command>
timeout /t 20 >nul 2>&1 && <command>
timeout /t 25 >nul 2>&1 && <command>
```

### For Background Processes:
```cmd
# Start in background
cd backend && timeout /t 3 >nul 2>&1 && python main.py
# Then wait longer for it to start
timeout /t 15 >nul 2>&1 && <verification command>
```

## 📋 Examples

### Starting Backend:
```cmd
# Start backend in background
cd backend && timeout /t 3 >nul 2>&1 && python main.py

# Wait 15 seconds for startup, then verify
timeout /t 15 >nul 2>&1 && netstat -ano | findstr "8000"
```

### Testing CORS:
```cmd
# Test with 5 second timeout
timeout /t 5 >nul 2>&1 && python test_cors_direct.py
```

### PowerShell Commands:
```cmd
# Use 5-10 second timeout for web requests
timeout /t 5 >nul 2>&1 && powershell -Command "<command>"
```

## 🎯 Timeout Guidelines

- **Quick checks:** 2-3 seconds
- **File operations:** 3-5 seconds
- **Network requests:** 5-10 seconds
- **Backend startup:** 15-25 seconds
- **Complex operations:** 20-25 seconds

## ⚠️ Remember

1. **Always use timeouts** - No exceptions
2. **Increase timeout for long operations** - 10-25 seconds as needed
3. **Background processes need longer waits** - 15+ seconds
4. **Network requests need 5-10 seconds** - Don't rush

---

**Last Updated:** 2025-12-01  
**Pattern:** `timeout /t <seconds> >nul 2>&1 && <command>`
