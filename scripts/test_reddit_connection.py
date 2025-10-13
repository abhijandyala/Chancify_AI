"""
Test Reddit API connection.
"""

import os
from dotenv import load_dotenv
import praw

def test_connection():
    """Test Reddit API credentials."""
    
    print("="*60)
    print("TESTING REDDIT API CONNECTION")
    print("="*60)
    print()
    
    # Load environment variables
    load_dotenv()
    
    client_id = os.getenv("REDDIT_CLIENT_ID")
    client_secret = os.getenv("REDDIT_CLIENT_SECRET")
    username = os.getenv("REDDIT_USERNAME")
    password = os.getenv("REDDIT_PASSWORD")
    user_agent = os.getenv("REDDIT_USER_AGENT", "ChancifyAI/1.0")
    
    # Check if credentials exist
    print("Checking credentials...")
    if not client_id:
        print("ERROR: REDDIT_CLIENT_ID not found in .env")
        return False
    print(f"  Client ID: {client_id[:10]}...")
    
    if not client_secret:
        print("ERROR: REDDIT_CLIENT_SECRET not found in .env")
        return False
    print(f"  Client Secret: {client_secret[:10]}...")
    
    if not username:
        print("ERROR: REDDIT_USERNAME not found in .env")
        return False
    print(f"  Username: {username}")
    
    if not password:
        print("ERROR: REDDIT_PASSWORD not found in .env")
        return False
    print(f"  Password: {'*' * len(password)}")
    
    print(f"  User Agent: {user_agent}")
    print()
    
    # Try to connect
    print("Attempting to connect to Reddit API...")
    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            username=username,
            password=password,
            user_agent=user_agent
        )
        
        # Test by getting current user
        user = reddit.user.me()
        
        print(f"\n SUCCESS! Connected as u/{user.name}")
        print(f"  Karma: {user.link_karma + user.comment_karma}")
        print(f"  Account created: {user.created_utc}")
        print()
        
        # Test subreddit access
        print("Testing subreddit access...")
        test_sub = reddit.subreddit("collegeresults")
        print(f"  r/collegeresults: {test_sub.display_name} ({test_sub.subscribers:,} subscribers)")
        
        # Get a sample post
        print("\nFetching sample post...")
        for post in test_sub.hot(limit=1):
            print(f"  Sample: '{post.title[:60]}...'")
        
        print("\n" + "="*60)
        print("CONNECTION TEST PASSED!")
        print("="*60)
        print("\nYou're ready to run: python scripts/reddit_scraper.py")
        
        return True
        
    except Exception as e:
        print(f"\n ERROR: {e}")
        print("\n" + "="*60)
        print("CONNECTION FAILED")
        print("="*60)
        print("\nPossible issues:")
        print("  1. Wrong client ID/secret")
        print("  2. Wrong username/password")
        print("  3. Reddit app not created correctly")
        print("  4. App type should be 'script' not 'web app'")
        print("\nPlease check your Reddit app settings at:")
        print("  https://www.reddit.com/prefs/apps")
        
        return False


if __name__ == "__main__":
    test_connection()

