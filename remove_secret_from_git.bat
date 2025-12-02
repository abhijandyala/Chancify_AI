@echo off
REM Remove OpenAI API key from git history
echo ========================================
echo Remove OpenAI API Key from Git History
echo ========================================
echo.
echo WARNING: This will rewrite your git history!
echo Make sure you have a backup or are okay with force pushing.
echo.
pause

REM Create backup branch
echo Creating backup branch...
git branch backup-before-secret-removal

echo.
echo Removing API key from git history...
echo This may take a few minutes...
echo.

REM Method 1: Use git filter-branch with Python to replace the API key
REM This works if you have Python in your PATH
python -c "import subprocess, sys; subprocess.run(['git', 'filter-branch', '--force', '--tree-filter', 'python -c \"import re, os; f=\\\"backend/config/settings.py\\\"; c=open(f, \\\"r\\\", encoding=\\\"utf-8\\\").read() if os.path.exists(f) else \\\"\\\"; open(f, \\\"w\\\", encoding=\\\"utf-8\\\").write(re.sub(r\\\"openai_api_key: str = \\\\\\\"sk-proj-[^\\\\\\\\\\\\\"]+\\\\\\\\\\\\\"\\\", \\\"openai_api_key: str = os.getenv(\\\\\\\\\\\\\"OPENAI_API_KEY\\\\\\\\\\\\\", \\\\\\\\\\\\\\\"\\\\\\\\\\\\\")\\\", c)) if c else None\"', '--prune-empty', '--tag-name-filter', 'cat', '--', '--all'])"

if errorlevel 1 (
    echo.
    echo Python method failed. Trying alternative method...
    echo.
    echo Please use Git Bash or WSL and run:
    echo git filter-branch --force --tree-filter "sed -i 's/openai_api_key: str = \"sk-proj-[^\"]*\"/openai_api_key: str = os.getenv(\"OPENAI_API_KEY\", \"\")/g' backend/config/settings.py" --prune-empty --tag-name-filter cat -- --all
    echo.
    pause
    exit /b 1
)

REM Clean up
echo.
echo Cleaning up git references...
git for-each-ref --format="delete %(refname)" refs/original 2>nul | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo.
echo ========================================
echo History rewrite complete!
echo ========================================
echo.
echo Next steps:
echo 1. Verify: git log -p --all -- backend/config/settings.py ^| findstr /i "sk-proj-"
echo    (Should return nothing)
echo 2. Force push: git push --force origin main
echo.
echo To restore from backup:
echo    git branch -D main
echo    git checkout -b main backup-before-secret-removal
echo.
pause

