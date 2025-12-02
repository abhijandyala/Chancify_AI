import re
import os

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

