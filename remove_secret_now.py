"""
Remove OpenAI API key from git history and push
"""
import subprocess
import sys
import os
import re

def run_cmd(cmd, check=True):
    """Run command and return output"""
    print(f"\n>>> {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"ERROR: {result.stderr}")
        return None
    print(result.stdout)
    return result.stdout

# Set git to not use pager
os.environ['GIT_PAGER'] = 'cat'

print("=" * 60)
print("Removing OpenAI API Key from Git History")
print("=" * 60)

# Step 1: Create backup
print("\n1. Creating backup branch...")
run_cmd("git branch backup-before-secret-removal", check=False)

# Step 2: Use git filter-branch to rewrite history
print("\n2. Rewriting git history (this may take a few minutes)...")
print("   Removing API key from all commits...")

# Create a Python script that will be executed by git filter-branch
filter_script = '''python -c "import re, os, sys; f='backend/config/settings.py'; \
if os.path.exists(f): \
    with open(f, 'r', encoding='utf-8') as file: \
        content = file.read(); \
    pattern = r'openai_api_key:\\\\s*str\\\\s*=\\\\s*\\\"sk-proj-[^\\\"]+\\\"'; \
    replacement = 'openai_api_key: str = os.getenv(\\\\\"OPENAI_API_KEY\\\\\", \\\\\"\\\\\")'; \
    new_content = re.sub(pattern, replacement, content); \
    if new_content != content: \
        with open(f, 'w', encoding='utf-8') as file: \
            file.write(new_content); \
        sys.exit(0); \
    else: \
        sys.exit(0)"'''

# Use git filter-branch
cmd = f'git filter-branch --force --tree-filter "{filter_script}" --prune-empty --tag-name-filter cat -- --all'
result = run_cmd(cmd, check=False)

if result is None or "Rewrite" not in result:
    print("\nTrying alternative method...")
    # Alternative: Use a simpler approach with sed-like replacement
    # For Windows, we'll modify files directly in each commit
    print("Using direct file modification approach...")
    
    # Create a script file that git filter-branch can use
    script_content = '''import re, os
f = 'backend/config/settings.py'
if os.path.exists(f):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    # Replace hardcoded API key with environment variable
    pattern = r'openai_api_key:\\s*str\\s*=\\s*"sk-proj-[^"]+"'
    replacement = 'openai_api_key: str = os.getenv("OPENAI_API_KEY", "")'
    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
'''
    
    with open('filter_script_temp.py', 'w') as f:
        f.write(script_content)
    
    cmd2 = 'git filter-branch --force --tree-filter "python filter_script_temp.py" --prune-empty --tag-name-filter cat -- --all'
    run_cmd(cmd2, check=False)
    
    # Clean up temp file
    if os.path.exists('filter_script_temp.py'):
        os.remove('filter_script_temp.py')

# Step 3: Clean up
print("\n3. Cleaning up git references...")
run_cmd('git for-each-ref --format="delete %(refname)" refs/original 2>nul', check=False)
run_cmd("git reflog expire --expire=now --all", check=False)
run_cmd("git gc --prune=now --aggressive", check=False)

# Step 4: Verify
print("\n4. Verifying secret is removed...")
verify = run_cmd('git log -p --all -- backend/config/settings.py', check=False)
if verify and "sk-proj-" in verify:
    print("WARNING: Secret may still be in history!")
    print("Checking specific commit...")
    check_commit = run_cmd('git show a2b9d0b:backend/config/settings.py', check=False)
    if check_commit and "sk-proj-" in check_commit:
        print("ERROR: Secret still in commit a2b9d0b")
        print("Trying more aggressive removal...")
        # Try removing the entire file from that commit and re-adding it
        sys.exit(1)
else:
    print("✓ Secret appears to be removed from history")

print("\n" + "=" * 60)
print("History rewrite complete!")
print("=" * 60)
print("\nNext: Adding, committing, and pushing...")

