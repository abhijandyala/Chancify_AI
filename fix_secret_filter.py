import re
import os

# Fix backend/config/settings.py
f = 'backend/config/settings.py'
if os.path.exists(f):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    # Replace hardcoded API key with environment variable
    pattern = r'openai_api_key: str = "sk-proj-[^"]+"'
    replacement = 'openai_api_key: str = os.getenv("OPENAI_API_KEY", "")'
    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)

# Fix CREATE_ENV_FILE.md
f2 = 'CREATE_ENV_FILE.md'
if os.path.exists(f2):
    with open(f2, 'r', encoding='utf-8') as file:
        content = file.read()
    # Replace actual API key with placeholder
    pattern2 = r'OPENAI_API_KEY=sk-proj-[^\n]+'
    replacement2 = 'OPENAI_API_KEY=your-openai-api-key-here'
    new_content = re.sub(pattern2, replacement2, content)
    if new_content != content:
        with open(f2, 'w', encoding='utf-8') as file:
            file.write(new_content)

