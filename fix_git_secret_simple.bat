@echo off
echo Fixing git secret issue...
echo.
echo This will remove the API key from git history
echo.
pause

cd /d "%~dp0"

echo Step 1: Removing secret from git history...
git filter-branch -f --tree-filter "if [ -f backend/config/settings.py ]; then sed -i 's/sk-proj-[^'\"]*//g' backend/config/settings.py; fi" HEAD

echo.
echo Step 2: Cleaning up...
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo.
echo Done! Now run: git push --force
pause

