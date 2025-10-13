"""
Update Reddit API credentials in .env file.

Run this after creating your Reddit app to update credentials.
"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = PROJECT_ROOT / ".env"


def update_credentials():
    """Interactively update Reddit credentials."""
    
    print("="*60)
    print("UPDATE REDDIT API CREDENTIALS")
    print("="*60)
    print()
    print("Please enter your Reddit API credentials.")
    print("(Get them from: https://www.reddit.com/prefs/apps)")
    print()
    
    # Get input
    client_id = input("Reddit Client ID (14 chars): ").strip()
    client_secret = input("Reddit Client Secret (27 chars): ").strip()
    username = input("Reddit Username: ").strip()
    password = input("Reddit Password: ").strip()
    
    if not all([client_id, client_secret, username, password]):
        print("\nERROR: All fields are required!")
        return
    
    # Read current .env
    env_lines = []
    if ENV_FILE.exists():
        with open(ENV_FILE, 'r') as f:
            env_lines = f.readlines()
    
    # Update Reddit credentials
    updated = False
    new_lines = []
    
    for line in env_lines:
        if line.startswith('REDDIT_CLIENT_ID='):
            new_lines.append(f'REDDIT_CLIENT_ID={client_id}\n')
            updated = True
        elif line.startswith('REDDIT_CLIENT_SECRET='):
            new_lines.append(f'REDDIT_CLIENT_SECRET={client_secret}\n')
        elif line.startswith('REDDIT_USERNAME='):
            new_lines.append(f'REDDIT_USERNAME={username}\n')
        elif line.startswith('REDDIT_PASSWORD='):
            new_lines.append(f'REDDIT_PASSWORD={password}\n')
        elif line.startswith('REDDIT_USER_AGENT='):
            new_lines.append(f'REDDIT_USER_AGENT=ChancifyAI/1.0 (by u/{username})\n')
        else:
            new_lines.append(line)
    
    # If no Reddit section found, add it
    if not updated:
        new_lines.insert(0, "# Reddit API Credentials\n")
        new_lines.insert(1, f"REDDIT_CLIENT_ID={client_id}\n")
        new_lines.insert(2, f"REDDIT_CLIENT_SECRET={client_secret}\n")
        new_lines.insert(3, f"REDDIT_USERNAME={username}\n")
        new_lines.insert(4, f"REDDIT_PASSWORD={password}\n")
        new_lines.insert(5, f"REDDIT_USER_AGENT=ChancifyAI/1.0 (by u/{username})\n")
        new_lines.insert(6, "\n")
    
    # Write updated .env
    with open(ENV_FILE, 'w') as f:
        f.writelines(new_lines)
    
    print("\n" + "="*60)
    print("CREDENTIALS UPDATED!")
    print("="*60)
    print(f"Updated: {ENV_FILE}")
    print()
    print("Testing connection...")
    print()
    
    # Test connection
    import os
    from dotenv import load_dotenv
    import praw
    
    load_dotenv(override=True)
    
    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            username=username,
            password=password,
            user_agent=f"ChancifyAI/1.0 (by u/{username})"
        )
        
        user = reddit.user.me()
        print(f"✓ SUCCESS! Connected as u/{user.name}")
        print()
        print("You can now run:")
        print("  python scripts/reddit_scraper.py")
        
    except Exception as e:
        print(f"✗ ERROR: {e}")
        print("\nPlease verify:")
        print("  1. Reddit app is created (https://www.reddit.com/prefs/apps)")
        print("  2. App type is 'script' (not 'web app')")
        print("  3. Client ID and Secret are correct")
        print("  4. Username and password are correct")


if __name__ == "__main__":
    update_credentials()

