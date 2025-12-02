# 🍎 Fix 406 Errors on MacBook - Complete Guide

## 🎯 The Problem
You're seeing 406 errors in Cursor on your MacBook. This is because:
1. **Packages aren't installed** in the virtual environment
2. **Pyright can't find** the installed packages
3. **Wrong Python interpreter** selected in Cursor

## ✅ The Solution (Step-by-Step)

### Step 1: Open Terminal on MacBook
- Press `Command + Space`
- Type "Terminal"
- Press Enter

### Step 2: Navigate to Your Project
```bash
cd ~/Desktop/Chancify_AI
```

### Step 3: Pull Latest Code
```bash
git pull origin main
```

### Step 4: Remove Old/Broken Virtual Environment
```bash
rm -rf .venv
```
(This removes the Windows-created venv that doesn't work on Mac)

### Step 5: Create New Mac-Compatible Virtual Environment
```bash
python3 -m venv .venv
```
Wait 5-10 seconds for it to complete.

### Step 6: Activate the Virtual Environment
```bash
source .venv/bin/activate
```
You should see `(.venv)` at the start of your prompt.

### Step 7: Upgrade Pip
```bash
pip install --upgrade pip
```

### Step 8: Install ALL Essential Packages
```bash
pip install -r backend/requirements-essential.txt
```
**This is the most important step!** It installs:
- fastapi
- sqlalchemy  
- pandas
- numpy
- scikit-learn
- And all other required packages

Wait for it to finish (2-5 minutes).

### Step 9: Verify Packages Are Installed
```bash
python -c "import fastapi; import sqlalchemy; import pandas; import numpy; print('✅ All packages installed!')"
```
If you see the success message, packages are installed correctly.

### Step 10: Open Project in Cursor
```bash
code .
```
Or open Cursor manually and open the `Chancify_AI` folder.

### Step 11: Select the Correct Python Interpreter
1. Press `Command + Shift + P`
2. Type: **"Python: Select Interpreter"**
3. Choose: **`.venv/bin/python`** or **`Python 3.11.x (.venv)`**
   - It should show the path ending in `.venv/bin/python`

### Step 12: Reload Cursor Window
1. Press `Command + Shift + P`
2. Type: **"Reload Window"**
3. Press Enter

### Step 13: Check Problems Panel
- Click the **"Problems"** tab at the bottom
- The error count should drop from **406 to < 50**

## 🚀 Quick Setup Script (Alternative)

If you prefer automation, use the setup script:

```bash
cd ~/Desktop/Chancify_AI
chmod +x setup_mac.sh
./setup_mac.sh
```

Then follow Steps 10-13 above.

## 🔍 Troubleshooting

### Still seeing 406 errors?

**Check 1: Is venv activated?**
```bash
which python
```
Should show: `/Users/abhijandyala/Desktop/Chancify_AI/.venv/bin/python`

**Check 2: Are packages installed?**
```bash
source .venv/bin/activate
pip list | grep fastapi
```
Should show `fastapi` in the list.

**Check 3: Is correct interpreter selected?**
- In Cursor, bottom-right corner should show: `Python 3.11.x (.venv)`
- If not, select it (Step 11 above)

**Check 4: Restart Cursor completely**
- Quit Cursor: `Command + Q`
- Reopen it
- Open the project folder
- Select interpreter again

### "command not found: python3"
Install Python:
```bash
brew install python@3.11
```

### "pip: command not found"
Make sure venv is activated:
```bash
source .venv/bin/activate
```

### Packages install but still show errors
1. Make sure you selected `.venv/bin/python` as interpreter
2. Reload window
3. Restart Cursor completely

## 📊 Expected Results

**Before:**
- 406 errors
- Import errors for fastapi, sqlalchemy, etc.
- Type checking errors

**After:**
- < 50 errors (mostly warnings)
- No import errors for installed packages
- Only real code issues remain

## ✅ Verification Checklist

After setup, verify:
- [ ] `.venv` folder exists
- [ ] `source .venv/bin/activate` works
- [ ] `python -c "import fastapi"` works (no error)
- [ ] Cursor shows `.venv/bin/python` as interpreter
- [ ] Problems panel shows < 50 errors

## 🎉 Success!

If you see < 50 errors instead of 406, you're all set! The remaining errors are likely:
- Minor type warnings (not critical)
- Real code issues that need fixing
- False positives from strict type checking

The code will work the same on both Windows and MacBook now! 🚀

