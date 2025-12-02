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

1. **Homebrew** (package manager for Mac)
   - Check: `brew --version`
   - If missing, install it first (see below)

2. **Python 3.11+** installed
   - Check: `python3 --version`
   - If you have Python 3.9 or 3.10, you need to upgrade (see below)

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

### "command not found: brew" (Homebrew not installed)

**Install Homebrew first:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This will take 5-10 minutes. Follow the prompts and enter your Mac password when asked.

After installation, you may need to add Homebrew to your PATH. The installer will tell you what to do, but usually it's:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Then verify it works:
```bash
brew --version
```

### "command not found: python3" or Python version is too old (3.9, 3.10)

**If you have Python 3.9.6 (like you do), you need to install Python 3.11+:**

First, make sure Homebrew is installed (see above), then:
```bash
brew install python@3.11
```

After installation, verify:
```bash
python3.11 --version
```

You should see: `Python 3.11.x`

**Note:** You can use `python3.11` instead of `python3` in all commands, or create an alias:
```bash
alias python3=python3.11
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

