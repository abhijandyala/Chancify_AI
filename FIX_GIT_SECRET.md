# Fix Git Secret Issue

## The Problem
GitHub is blocking push because the API key is in old commits (af0bed3 and a2b9d0b).

## Solution: Remove Secret from Git History

### Option 1: Use Git Filter-Branch (Recommended)

Run these commands in your terminal:

```bash
# Navigate to project root
cd C:\Users\abhij\OneDrive\Desktop\Chancify_AI

# Remove the file from all commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/config/settings.py" --prune-empty --tag-name-filter cat -- --all

# Clean up
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: This rewrites history)
git push --force
```

### Option 2: Simpler - Just Rewrite the Specific Commits

```bash
# Interactive rebase to edit the commits
git rebase -i HEAD~5

# In the editor, change 'pick' to 'edit' for commits af0bed3 and a2b9d0b
# Then for each commit:
git commit --amend
# Remove the API key line, save
git rebase --continue

# Force push
git push --force
```

### Option 3: Easiest - Create New Branch Without History

```bash
# Create orphan branch (no history)
git checkout --orphan new-main

# Add all current files
git add .

# Commit
git commit -m "Initial commit without secrets"

# Force push to replace main
git branch -M main
git push -f origin main
```

## ⚠️ WARNING

Force pushing rewrites history. If others are using this repo, coordinate with them first.

## ✅ After Fixing

Once the secret is removed from history, you can push normally:
```bash
git push
```

