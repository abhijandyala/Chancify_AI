@echo off
REM Script to remove OpenAI API key from git history
REM This rewrites git history to remove the secret from all commits

echo ========================================
echo Removing OpenAI API Key from Git History
echo ========================================
echo.
echo WARNING: This will rewrite your git history!
echo Make sure you have a backup or are okay with force pushing.
echo.
pause

REM Create a backup branch first
echo Creating backup branch...
git branch backup-before-secret-removal

REM Use git filter-branch to remove the API key from history
echo.
echo Removing API key from git history...
echo This may take a few minutes...
echo.

REM Remove the hardcoded API key line and replace with environment variable approach
git filter-branch --force --index-filter ^
"git ls-files -s | sed 's/\t\"&/\t/' | ^
GIT_INDEX_FILE=$GIT_INDEX_FILE.new git update-index --index-info && ^
if git checkout HEAD -- backend/config/settings.py 2>nul; then ^
  (type backend\config\settings.py | findstr /v /c:\"sk-proj-\" > backend\config\settings.py.tmp && ^
   move /y backend\config\settings.py.tmp backend\config\settings.py) && ^
  git add backend/config/settings.py; ^
fi && ^
mv \"$GIT_INDEX_FILE.new\" \"$GIT_INDEX_FILE\"" ^
--prune-empty --tag-name-filter cat -- --all

REM Alternative simpler approach using sed replacement
echo.
echo Using alternative method with git filter-branch...
git filter-branch --force --tree-filter ^
"if exist backend\config\settings.py ( ^
  powershell -Command \"(Get-Content backend\config\settings.py) -replace 'openai_api_key: str = \"sk-proj-[^\"]+\"', 'openai_api_key: str = os.getenv(\"OPENAI_API_KEY\", \"\")' | Set-Content backend\config\settings.py.tmp && Move-Item -Force backend\config\settings.py.tmp backend\config\settings.py\" ^
)" ^
--prune-empty --tag-name-filter cat -- --all

echo.
echo ========================================
echo History rewrite complete!
echo ========================================
echo.
echo Next steps:
echo 1. Verify the changes: git log -p --all -- backend/config/settings.py
echo 2. Force push to GitHub: git push --force origin main
echo.
echo NOTE: If you're working with others, coordinate this change!
echo.

