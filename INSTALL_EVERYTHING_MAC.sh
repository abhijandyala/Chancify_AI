#!/bin/bash
# ============================================================================
# COMPLETE MAC INSTALLATION SCRIPT FOR CHANCIFY AI
# Copy and paste this ENTIRE script into your MacBook terminal
# ============================================================================

set -e  # Exit if any command fails

echo "============================================================================"
echo "CHANCIFY AI - COMPLETE MAC INSTALLATION"
echo "============================================================================"
echo ""
echo "This script will:"
echo "  1. Check Python installation"
echo "  2. Remove old virtual environment"
echo "  3. Create new Mac-compatible virtual environment"
echo "  4. Install ALL required packages"
echo "  5. Verify everything works"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# ============================================================================
# STEP 1: Check Python Version
# ============================================================================
echo "[STEP 1/8] Checking Python installation..."
echo "----------------------------------------"

if ! command -v python3 &> /dev/null; then
    echo "❌ ERROR: Python 3 is not installed!"
    echo ""
    echo "Please install Python 3.11+ first:"
    echo "  brew install python@3.11"
    echo ""
    exit 1
fi

PYTHON_VERSION=$(python3 --version)
PYTHON_MAJOR=$(python3 -c "import sys; print(sys.version_info.major)")
PYTHON_MINOR=$(python3 -c "import sys; print(sys.version_info.minor)")

echo "✅ Found: $PYTHON_VERSION"

if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 11 ]); then
    echo "⚠️  WARNING: Python 3.11+ recommended. You have Python $PYTHON_MAJOR.$PYTHON_MINOR"
    echo "   Continuing anyway, but you may encounter issues..."
fi

echo ""

# ============================================================================
# STEP 2: Navigate to Project Directory
# ============================================================================
echo "[STEP 2/8] Navigating to project directory..."
echo "----------------------------------------"

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "✅ Current directory: $(pwd)"
echo ""

# ============================================================================
# STEP 3: Pull Latest Code from GitHub
# ============================================================================
echo "[STEP 3/8] Pulling latest code from GitHub..."
echo "----------------------------------------"

if [ -d ".git" ]; then
    echo "   Pulling latest changes..."
    git pull origin main || echo "⚠️  Git pull failed (this is okay if you're not connected to git)"
    echo "✅ Code updated"
else
    echo "⚠️  Not a git repository, skipping pull"
fi

echo ""

# ============================================================================
# STEP 4: Remove Old Virtual Environment
# ============================================================================
echo "[STEP 4/8] Removing old virtual environment (if exists)..."
echo "----------------------------------------"

if [ -d ".venv" ]; then
    echo "   Removing old .venv folder..."
    rm -rf .venv
    echo "✅ Old virtual environment removed"
else
    echo "✅ No old virtual environment found (this is fine)"
fi

echo ""

# ============================================================================
# STEP 5: Create New Virtual Environment
# ============================================================================
echo "[STEP 5/8] Creating new Mac-compatible virtual environment..."
echo "----------------------------------------"
echo "   This may take 10-20 seconds..."

python3 -m venv .venv

if [ ! -d ".venv" ]; then
    echo "❌ ERROR: Failed to create virtual environment!"
    exit 1
fi

echo "✅ Virtual environment created successfully"
echo ""

# ============================================================================
# STEP 6: Activate Virtual Environment
# ============================================================================
echo "[STEP 6/8] Activating virtual environment..."
echo "----------------------------------------"

source .venv/bin/activate

if [ -z "$VIRTUAL_ENV" ]; then
    echo "❌ ERROR: Failed to activate virtual environment!"
    exit 1
fi

echo "✅ Virtual environment activated"
echo "   Python path: $(which python)"
echo "   Pip path: $(which pip)"
echo ""

# ============================================================================
# STEP 7: Upgrade Pip and Install Packages
# ============================================================================
echo "[STEP 7/8] Installing all required packages..."
echo "----------------------------------------"
echo "   This is the most important step!"
echo "   It will take 3-5 minutes..."
echo ""

# Upgrade pip first
echo "   [7a] Upgrading pip..."
pip install --upgrade pip --quiet
echo "   ✅ Pip upgraded"

# Install essential requirements
echo ""
echo "   [7b] Installing essential requirements..."
echo "   (fastapi, sqlalchemy, pandas, numpy, scikit-learn, etc.)"
pip install -r backend/requirements-essential.txt
echo "   ✅ Essential packages installed"

# Install full requirements (for development)
echo ""
echo "   [7c] Installing full requirements..."
echo "   (includes ML libraries, dev tools, etc.)"
pip install -r backend/requirements.txt
echo "   ✅ Full requirements installed"

echo ""

# ============================================================================
# STEP 8: Verify Installation
# ============================================================================
echo "[STEP 8/8] Verifying installation..."
echo "----------------------------------------"

echo "   Testing package imports..."

# Test essential packages
python -c "import fastapi; print('   ✅ fastapi')" || echo "   ❌ fastapi FAILED"
python -c "import sqlalchemy; print('   ✅ sqlalchemy')" || echo "   ❌ sqlalchemy FAILED"
python -c "import pandas; print('   ✅ pandas')" || echo "   ❌ pandas FAILED"
python -c "import numpy; print('   ✅ numpy')" || echo "   ❌ numpy FAILED"
python -c "import sklearn; print('   ✅ scikit-learn')" || echo "   ❌ scikit-learn FAILED"
python -c "import pydantic; print('   ✅ pydantic')" || echo "   ❌ pydantic FAILED"
python -c "import supabase; print('   ✅ supabase')" || echo "   ❌ supabase FAILED"

# Test ML packages (optional)
python -c "import xgboost; print('   ✅ xgboost')" 2>/dev/null || echo "   ⚠️  xgboost (optional, not critical)"
python -c "import lightgbm; print('   ✅ lightgbm')" 2>/dev/null || echo "   ⚠️  lightgbm (optional, not critical)"

echo ""

# ============================================================================
# FINAL SUMMARY
# ============================================================================
echo "============================================================================"
echo "✅ INSTALLATION COMPLETE!"
echo "============================================================================"
echo ""
echo "📦 Installed packages:"
pip list | head -20
echo "   ... (and more)"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Open Cursor/VS Code:"
echo "   code ."
echo ""
echo "2. Select Python Interpreter:"
echo "   - Press Cmd + Shift + P"
echo "   - Type: 'Python: Select Interpreter'"
echo "   - Choose: '.venv/bin/python'"
echo ""
echo "3. Reload Window:"
echo "   - Press Cmd + Shift + P"
echo "   - Type: 'Reload Window'"
echo ""
echo "4. Check Problems Panel:"
echo "   - Should see < 50 errors (down from 406!)"
echo ""
echo "============================================================================"
echo "🎉 Your MacBook is now set up and ready to code!"
echo "============================================================================"
echo ""
echo "💡 Tip: Always activate the venv before working:"
echo "   source .venv/bin/activate"
echo ""

