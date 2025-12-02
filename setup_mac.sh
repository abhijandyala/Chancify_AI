#!/bin/bash
# Mac Setup Script for Chancify AI
# This script sets up the project on MacBook

set -e  # Exit on any error

echo "=========================================="
echo "Chancify AI - Mac Setup Script"
echo "=========================================="
echo ""

# Step 1: Check Python version
echo "[1/7] Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Found Python $PYTHON_VERSION"

# Step 2: Remove old venv if it exists
echo ""
echo "[2/7] Cleaning up old virtual environment..."
if [ -d ".venv" ]; then
    echo "   Removing old .venv folder..."
    rm -rf .venv
fi

# Step 3: Create new virtual environment
echo ""
echo "[3/7] Creating new virtual environment..."
python3 -m venv .venv
echo "✅ Virtual environment created"

# Step 4: Activate virtual environment
echo ""
echo "[4/7] Activating virtual environment..."
source .venv/bin/activate
echo "✅ Virtual environment activated"

# Step 5: Upgrade pip
echo ""
echo "[5/7] Upgrading pip..."
pip install --upgrade pip
echo "✅ Pip upgraded"

# Step 6: Install essential requirements
echo ""
echo "[6/7] Installing essential requirements..."
echo "   This may take a few minutes..."
pip install -r backend/requirements-essential.txt
echo "✅ Essential packages installed"

# Step 7: Install full requirements (optional, for development)
echo ""
echo "[7/7] Installing full requirements (for development)..."
read -p "   Install full requirements? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    pip install -r backend/requirements.txt
    echo "✅ Full requirements installed"
else
    echo "⏭️  Skipping full requirements (you can install later with: pip install -r backend/requirements.txt)"
fi

# Final verification
echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Verifying installation..."
python -c "import fastapi; import sqlalchemy; import pandas; import numpy; print('✅ All essential packages are installed!')" || {
    echo "❌ Some packages failed to install. Please check the errors above."
    exit 1
}

echo ""
echo "Next steps:"
echo "1. Activate the virtual environment: source .venv/bin/activate"
echo "2. Open the project in Cursor/VS Code"
echo "3. Select the Python interpreter: .venv/bin/python"
echo "4. Reload the window (Cmd+Shift+P -> 'Reload Window')"
echo ""
echo "Your virtual environment is ready! 🎉"

