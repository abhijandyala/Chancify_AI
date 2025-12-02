# How to Remove OpenAI API Key from Git History

GitHub Push Protection detected an OpenAI API key in your commit history. Here are **two ways** to solve this:

## Option 1: Remove Secret from History (RECOMMENDED) ✅

This properly removes the secret from all commits in your git history.

### Method A: Using git filter-branch (Built-in, works on Windows)

1. **Create a backup branch first:**
   ```bash
   git branch backup-before-secret-removal
   ```

2. **Remove the secret from all commits:**
   ```bash
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/config/settings.py" --prune-empty --tag-name-filter cat -- --all
   git filter-branch --force --tree-filter "if [ -f backend/config/settings.py ]; then sed -i 's/openai_api_key: str = \"sk-proj-[^\"]*\"/openai_api_key: str = os.getenv(\"OPENAI_API_KEY\", \"\")/g' backend/config/settings.py; fi" --prune-empty --tag-name-filter cat -- --all
   ```

   **For Windows (Git Bash or WSL):**
   ```bash
   git filter-branch --force --tree-filter "python -c \"import re, os; f='backend/config/settings.py'; c=open(f).read() if os.path.exists(f) else ''; open(f,'w').write(re.sub(r'openai_api_key: str = \\\"sk-proj-[^\\\"]+\\\"', 'openai_api_key: str = os.getenv(\\\"OPENAI_API_KEY\\\", \\\"\\\")', c)) if c else None\"" --prune-empty --tag-name-filter cat -- --all
   ```

3. **Clean up and optimize:**
   ```bash
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

4. **Verify the secret is gone:**
   ```bash
   git log -p --all -- backend/config/settings.py | findstr /i "sk-proj-"
   ```
   (Should return nothing)

5. **Force push to GitHub:**
   ```bash
   git push --force origin main
   ```

### Method B: Using BFG Repo-Cleaner (Easier, requires Java)

1. **Download BFG:** https://rtyley.github.io/bfg-repo-cleaner/

2. **Create a replacement file** `replacements.txt`:
   ```
   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==>REDACTED
   ```

3. **Run BFG:**
   ```bash
   java -jar bfg.jar --replace-text replacements.txt
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

4. **Force push:**
   ```bash
   git push --force origin main
   ```

---

## Option 2: Allow Secret via GitHub (NOT RECOMMENDED) ⚠️

This bypasses GitHub's protection but **does NOT remove the secret from history**. Anyone with access to your repository can still see the old commits with the secret.

**Steps:**
1. Visit the URL provided by GitHub in the error message:
   ```
   https://github.com/abhijandyala/Chancify_AI/security/secret-scanning/unblock-secret/36H9SRg4SmQJzIjAQuewWJ60HY3
   ```

2. Click "Allow secret" to bypass the protection

3. Push again:
   ```bash
   git push --force origin main
   ```

**⚠️ WARNING:** This is a security risk! The secret will still be in your git history and visible to anyone who clones your repository.

---

## Recommendation

**Use Option 1 (Method A or B)** to properly remove the secret from history. This is the secure approach and prevents the secret from being exposed in the future.

After fixing, make sure your `.env` file is in `.gitignore` and never commit API keys directly in code!

