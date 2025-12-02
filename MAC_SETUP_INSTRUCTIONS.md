# MacBook Setup Instructions for Chancify AI

## Quick Setup (Recommended)

### Option 1: Use the Setup Script (Easiest)

1. **Open Terminal on your MacBook**
   - Press `Command + Space`, type "Terminal", press Enter

2. **Navigate to your project**
   ```bash
   cd ~/Desktop/Chancify_AI
   ```

3. **Make the script executable and run it**
   ```bash
   chmod +x setup_mac.sh
   ./setup_mac.sh
   ```

4. **Follow the prompts** - The script will:
   - Check Python version
   - Create a new virtual environment
   - Install all required packages
   - Verify everything works

### Option 2: Manual Setup

If you prefer to do it step by step:

#### Step 1: Open Terminal
Press `Command + Space`, type "Terminal", press Enter

#### Step 2: Navigate to Project
```bash
cd ~/Desktop/Chancify_AI
```

#### Step 3: Remove Old Virtual Environment (if exists)
```bash
rm -rf .venv
```

#### Step 4: Create New Virtual Environment
```bash
python3 -m venv .venv
```

#### Step 5: Activate Virtual Environment
```bash
source .venv/bin/activate
```
You should see `(.venv)` at the start of your prompt.

#### Step 6: Upgrade Pip
```bash
pip install --upgrade pip
```

#### Step 7: Install Essential Requirements
```bash
pip install -r backend/requirements-essential.txt
```
This installs: fastapi, sqlalchemy, pandas, numpy, scikit-learn, etc.

#### Step 8: Install Full Requirements (Optional, for development)
```bash
pip install -r backend/requirements.txt
```
This includes additional dev tools and ML libraries.

#### Step 9: Verify Installation
```bash
python -c "import fastapi; import sqlalchemy; import pandas; import numpy; print('✅ All packages installed!')"
```

## After Setup: Configure Cursor/VS Code

### Step 1: Open Project in Cursor
```bash
code .
```
Or open Cursor manually and open the `Chancify_AI` folder.

### Step 2: Select Python Interpreter
1. Press `Command + Shift + P`
2. Type "Python: Select Interpreter"
3. Choose: `.venv/bin/python` or `Python 3.11.x (.venv)`

### Step 3: Reload Window
1. Press `Command + Shift + P`
2. Type "Reload Window"
3. Press Enter

### Step 4: Check Problems Panel
- Click "Problems" tab at bottom
- Errors should be significantly reduced (from 406 to much fewer)

## Troubleshooting

### If you see "command not found: python3"
Install Python 3.11+:
```bash
brew install python@3.11
```

### If pip install fails
Try upgrading pip first:
```bash
python3 -m pip install --upgrade pip
```

### If packages still can't be found in Cursor
1. Make sure you selected the correct interpreter (`.venv/bin/python`)
2. Restart Cursor completely (`Command + Q`, then reopen)
3. Check that `.venv` folder exists and has `bin/` directory

### If you see import errors
Make sure you activated the venv:
```bash
source .venv/bin/activate
which python  # Should show .venv/bin/python
```

## What Gets Installed

### Essential Requirements (`requirements-essential.txt`)
- FastAPI (web framework)
- SQLAlchemy (database)
- Pandas, NumPy (data processing)
- Scikit-learn (machine learning)
- Supabase (database client)
- Pydantic (data validation)

### Full Requirements (`requirements.txt`)
- Everything above, plus:
- XGBoost, LightGBM (advanced ML)
- Matplotlib, Seaborn (visualization)
- Pytest (testing)
- Black, Ruff (code formatting)
- OpenAI (AI features)

## Verification Checklist

After setup, verify:
- [ ] `.venv` folder exists
- [ ] `source .venv/bin/activate` works
- [ ] `python -c "import fastapi"` works
- [ ] Cursor shows correct Python interpreter
- [ ] Problems panel shows < 50 errors (down from 406)

## Need Help?

If you still have issues:
1. Check that Python 3.11+ is installed: `python3 --version`
2. Verify venv is activated: `which python` should show `.venv/bin/python`
3. Try reinstalling: `pip install --force-reinstall -r backend/requirements-essential.txt`

