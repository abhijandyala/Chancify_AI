# 🍎 MacBook Setup - Quick Start Guide

## ⚡ Fastest Way (3 Commands)

```bash
cd ~/Desktop/Chancify_AI
chmod +x setup_mac.sh
./setup_mac.sh
```

That's it! The script will:
- ✅ Create a fresh virtual environment
- ✅ Install all required packages
- ✅ Verify everything works

## 📋 What You Need

1. **Python 3.11+** installed
   - Check: `python3 --version`
   - If missing: `brew install python@3.11`

2. **Terminal** (built into Mac)

3. **Cursor or VS Code** (for editing)

## 🔧 After Running Setup Script

### 1. Open in Cursor
```bash
code .
```

### 2. Select Python Interpreter
- Press `Cmd + Shift + P`
- Type: "Python: Select Interpreter"
- Choose: `.venv/bin/python`

### 3. Reload Window
- Press `Cmd + Shift + P`
- Type: "Reload Window"
- Press Enter

### 4. Check Problems
- Click "Problems" tab
- Should see < 50 errors (down from 406!)

## 🐛 Troubleshooting

### "command not found: python3"
```bash
brew install python@3.11
```

### "pip: command not found"
Make sure venv is activated:
```bash
source .venv/bin/activate
```

### Still seeing import errors?
1. Verify venv is activated: `which python` should show `.venv/bin/python`
2. Reinstall packages: `pip install -r backend/requirements-essential.txt`
3. Restart Cursor completely

## ✅ Verification

Run this to verify everything works:
```bash
source .venv/bin/activate
python -c "import fastapi; import sqlalchemy; import pandas; print('✅ All good!')"
```

If you see the success message, you're ready to go! 🎉

