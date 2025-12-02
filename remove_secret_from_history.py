"""
Script to remove OpenAI API key from git history.
This rewrites git history to remove the hardcoded API key from all commits.
"""

import subprocess
import sys
import os
import re
from pathlib import Path

def run_command(cmd, check=True):
    """Run a git command and return the output."""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error: {result.stderr}")
        return None
    return result.stdout.strip()

def remove_secret_from_file(file_path):
    """Remove hardcoded OpenAI API key from a file."""
    if not os.path.exists(file_path):
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match: openai_api_key: str = "sk-proj-..."
    pattern = r'openai_api_key:\s*str\s*=\s*"sk-proj-[^"]+"'
    replacement = 'openai_api_key: str = os.getenv("OPENAI_API_KEY", "")'
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    print("=" * 60)
    print("Remove OpenAI API Key from Git History")
    print("=" * 60)
    print()
    print("WARNING: This will rewrite your git history!")
    print("Make sure you have a backup or are okay with force pushing.")
    print()
    
    response = input("Continue? (yes/no): ").strip().lower()
    if response != 'yes':
        print("Aborted.")
        return
    
    # Create backup branch
    print("\n1. Creating backup branch...")
    run_command("git branch backup-before-secret-removal", check=False)
    
    # Check if we're on the right branch
    current_branch = run_command("git branch --show-current")
    print(f"Current branch: {current_branch}")
    
    # Use git filter-branch to rewrite history
    print("\n2. Rewriting git history to remove API key...")
    print("   This may take a few minutes...")
    
    # Create a script that will be used by git filter-branch
    script_content = '''#!/bin/sh
if [ -f backend/config/settings.py ]; then
    # Use sed to replace the API key (works on Git Bash on Windows)
    sed -i 's/openai_api_key: str = "sk-proj-[^"]*"/openai_api_key: str = os.getenv("OPENAI_API_KEY", "")/g' backend/config/settings.py
fi
'''
    
    # For Windows, we'll use a different approach
    # Use git filter-branch with a tree-filter that uses Python
    filter_script = f'''python -c "
import re
import sys
import os
file_path = 'backend/config/settings.py'
if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = r'openai_api_key:\\\\s*str\\\\s*=\\\\s*\\\"sk-proj-[^\\\"]+\\\"'
    replacement = 'openai_api_key: str = os.getenv(\\\\\"OPENAI_API_KEY\\\\\", \\\\\"\\\\\")'
    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
"'''
    
    # Use git filter-branch
    cmd = f'git filter-branch --force --tree-filter "{filter_script}" --prune-empty --tag-name-filter cat -- --all'
    
    print(f"\nExecuting: git filter-branch...")
    result = run_command(cmd, check=False)
    
    if result is None:
        print("\nError occurred. Trying alternative method...")
        # Alternative: Use BFG Repo-Cleaner instructions
        print("\nAlternative: You can use BFG Repo-Cleaner:")
        print("1. Download from: https://rtyley.github.io/bfg-repo-cleaner/")
        print("2. Create a file 'secrets.txt' with: sk-proj-")
        print("3. Run: java -jar bfg.jar --replace-text secrets.txt")
        print("4. Run: git reflog expire --expire=now --all && git gc --prune=now --aggressive")
        return
    
    print("\n3. Cleaning up...")
    run_command("git reflog expire --expire=now --all", check=False)
    run_command("git gc --prune=now --aggressive", check=False)
    
    print("\n" + "=" * 60)
    print("History rewrite complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Verify the changes:")
    print("   git log -p --all -- backend/config/settings.py")
    print("2. Force push to GitHub:")
    print("   git push --force origin main")
    print("\nNOTE: If you're working with others, coordinate this change!")
    print("\nTo restore from backup:")
    print("   git branch -D main")
    print("   git checkout -b main backup-before-secret-removal")

if __name__ == "__main__":
    main()

