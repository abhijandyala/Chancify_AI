#!/usr/bin/env python3
"""
Verification script to check Railway deployment readiness
Run this before deploying to Railway to catch common issues
"""

import os
import json
import sys
from pathlib import Path

def check_file_exists(filepath, description):
    """Check if a file exists and report"""
    if os.path.exists(filepath):
        print(f"[PASS] {description}: {filepath}")
        return True
    else:
        print(f"[FAIL] {description} NOT FOUND: {filepath}")
        return False

def check_file_content(filepath, search_string, description):
    """Check if file contains specific content"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if search_string in content:
                print(f"[PASS] {description}")
                return True
            else:
                print(f"[FAIL] {description} - '{search_string}' not found in {filepath}")
                return False
    except Exception as e:
        print(f"[FAIL] Error reading {filepath}: {e}")
        return False

def check_dockerignore():
    """Check that .dockerignore doesn't exclude frontend"""
    print("\n=== Checking .dockerignore ===")
    try:
        with open('.dockerignore', 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line.strip() == 'frontend/':
                    print("[FAIL] .dockerignore excludes 'frontend/' - THIS WILL BREAK RAILWAY BUILD")
                    return False
        print("[PASS] .dockerignore does not exclude frontend/")
        return True
    except FileNotFoundError:
        print("[WARN] .dockerignore not found (will use Docker defaults)")
        return True

def check_dockerfile_frontend():
    """Verify Dockerfile.frontend structure"""
    print("\n=== Checking Dockerfile.frontend ===")
    checks = [
        check_file_exists('Dockerfile.frontend', 'Dockerfile.frontend exists'),
        check_file_content('Dockerfile.frontend', 'COPY frontend/', 'Copies frontend directory'),
        check_file_content('Dockerfile.frontend', 'npm run build', 'Runs npm build'),
        check_file_content('Dockerfile.frontend', 'CMD ["node", "server.js"]', 'Has correct CMD'),
    ]
    return all(checks)

def check_railway_json():
    """Verify railway.json configuration"""
    print("\n=== Checking railway.json ===")
    if not os.path.exists('railway.json'):
        print("[FAIL] railway.json not found")
        return False
    
    try:
        with open('railway.json', 'r') as f:
            config = json.load(f)
            
        checks = []
        
        # Check builder type
        if config.get('build', {}).get('builder') == 'DOCKERFILE':
            print("[PASS] Using DOCKERFILE builder")
            checks.append(True)
        else:
            print("[FAIL] Builder is not DOCKERFILE")
            checks.append(False)
        
        # Check dockerfile path
        if config.get('build', {}).get('dockerfilePath') == 'Dockerfile.frontend':
            print("[PASS] Dockerfile path is Dockerfile.frontend")
            checks.append(True)
        else:
            print("[FAIL] Dockerfile path is not Dockerfile.frontend")
            checks.append(False)
        
        return all(checks)
    except json.JSONDecodeError as e:
        print(f"[FAIL] railway.json is not valid JSON: {e}")
        return False

def check_frontend_files():
    """Check essential frontend files"""
    print("\n=== Checking Frontend Files ===")
    checks = [
        check_file_exists('frontend/package.json', 'package.json'),
        check_file_exists('frontend/package-lock.json', 'package-lock.json'),
        check_file_exists('frontend/next.config.js', 'next.config.js'),
        check_file_exists('frontend/tsconfig.json', 'tsconfig.json'),
        check_file_content('frontend/next.config.js', 'output: \'standalone\'', 'Next.js standalone output'),
    ]
    return all(checks)

def check_frontend_structure():
    """Check that frontend has proper directory structure"""
    print("\n=== Checking Frontend Structure ===")
    required_dirs = [
        'frontend/app',
        'frontend/components',
        'frontend/lib',
    ]
    checks = []
    for dir_path in required_dirs:
        if os.path.isdir(dir_path):
            print(f"[PASS] {dir_path} exists")
            checks.append(True)
        else:
            print(f"[FAIL] {dir_path} NOT FOUND")
            checks.append(False)
    return all(checks)

def main():
    """Run all verification checks"""
    print("=" * 60)
    print("Railway Deployment Verification")
    print("=" * 60)
    
    checks = [
        check_dockerignore(),
        check_dockerfile_frontend(),
        check_railway_json(),
        check_frontend_files(),
        check_frontend_structure(),
    ]
    
    print("\n" + "=" * 60)
    if all(checks):
        print("[SUCCESS] ALL CHECKS PASSED - Ready for Railway deployment!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Commit all changes: git add . && git commit -m 'Fix Railway deployment'")
        print("2. Push to GitHub: git push")
        print("3. Railway will auto-deploy from your connected repo")
        print("4. Check Railway logs for any build issues")
        return 0
    else:
        print("[ERROR] SOME CHECKS FAILED - Fix issues before deploying")
        print("=" * 60)
        return 1

if __name__ == '__main__':
    sys.exit(main())

