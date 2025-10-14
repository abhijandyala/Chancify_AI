"""
Setup script for Reddit scraper.

Creates .env file with your Reddit API credentials.
"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = PROJECT_ROOT / ".env"

def create_env_file():
    """Create .env file with Reddit credentials."""
    
    print("="*60)
    print("REDDIT SCRAPER SETUP")
    print("="*60)
    print()
    print("This will create a .env file with your Reddit API credentials.")
    print()
    
    # Use the credentials provided
    env_content = """# Reddit API Credentials
REDDIT_CLIENT_ID=o28Ahxhcj35zQgFuM_YUrQ
REDDIT_CLIENT_SECRET=tbGJDi_y9_3u9wS0fbDyT9Cl_GKf2g
REDDIT_USERNAME=Scraper_TestBot123
REDDIT_PASSWORD=Abhi1104
REDDIT_USER_AGENT=ChancifyAI/1.0 (by u/Scraper_TestBot123)

# Supabase Configuration
SUPABASE_URL=https://vwvqfellrhxznesaifwe.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dnFmZWxscmh4em5lc2FpZndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzU2NjQsImV4cCI6MjA3NTg1MTY2NH0.TBYg6XEy1cmsPePkT2Q5tSSDcEqi0AWNCTt7pGT2ZBc
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dnFmZWxscmh4em5lc2FpZndlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3NTY2NCwiZXhwIjoyMDc1ODUxNjY0fQ.zVtdMf9Z5gklqfmkjUdMeALE3AGqVlGz1efoNHqSiK4

# Database
DATABASE_URL=postgresql://postgres:Chanifcy123%23%40%21@db.vwvqfellrhxznesaifwe.supabase.co:5432/postgres

# Security
SECRET_KEY=chancify-ai-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
"""
    
    # Write file
    with open(ENV_FILE, "w") as f:
        f.write(env_content)
    
    print(f"Created: {ENV_FILE}")
    print("\n" + "="*60)
    print("SETUP COMPLETE!")
    print("="*60)
    print("\nYou can now run:")
    print("  python scripts/reddit_scraper.py")
    print("\nThis will start collecting real admission data from Reddit!")


if __name__ == "__main__":
    create_env_file()

