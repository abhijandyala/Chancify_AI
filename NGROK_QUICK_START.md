# Ngrok Quick Start - From Command Prompt

## 🚀 Quick Command

From any command prompt location, run:

```cmd
ngrok http 8000
```

This will:
- Start ngrok tunnel
- Forward all requests to `localhost:8000`
- Give you a public URL like `https://xxxxx.ngrok-free.dev`

---

## 📍 If You're in C:\Windows\System32

### Option 1: Just Run the Command (if ngrok is in PATH)
```cmd
ngrok http 8000
```

### Option 2: Navigate to Ngrok Location First
If ngrok is installed in a specific folder:
```cmd
cd C:\path\to\ngrok
ngrok http 8000
```

### Option 3: Use Full Path
```cmd
C:\path\to\ngrok\ngrok.exe http 8000
```

---

## ✅ What You Should See

After running `ngrok http 8000`, you'll see:

```
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxxx.ngrok-free.dev -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Important:** Copy the `https://xxxxx.ngrok-free.dev` URL - that's your public backend URL!

---

## ⚠️ Before Starting Ngrok

Make sure your backend is running first:

1. Open a **separate** command prompt
2. Navigate to your project:
   ```cmd
   cd C:\Users\abhij\OneDrive\Desktop\Chancify_AI\backend
   ```
3. Start the backend:
   ```cmd
   python main.py
   ```
4. Wait for: `INFO: Uvicorn running on http://0.0.0.0:8000`

Then start ngrok in another terminal.

---

## 🔍 Find Ngrok Location

If you don't know where ngrok is installed:

```cmd
where ngrok
```

Or check common locations:
- `C:\ngrok\ngrok.exe`
- `C:\Program Files\ngrok\ngrok.exe`
- `%USERPROFILE%\AppData\Local\ngrok\ngrok.exe`

---

## 📋 Complete Setup Steps

1. **Terminal 1 - Start Backend:**
   ```cmd
   cd C:\Users\abhij\OneDrive\Desktop\Chancify_AI\backend
   python main.py
   ```

2. **Terminal 2 - Start Ngrok:**
   ```cmd
   ngrok http 8000
   ```

3. **Copy the ngrok URL** from the output

4. **Update frontend config** with the new URL

---

## 🛑 To Stop Ngrok

Press `Ctrl+C` in the ngrok terminal window.

---

**Current Location:** `C:\Windows\System32>`  
**Command to Run:** `ngrok http 8000`

