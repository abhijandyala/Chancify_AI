"""
Reddit Public Scraper (No Authentication Required)

Uses Reddit's public JSON API to collect data without authentication.
This is slower but doesn't require Reddit app setup.
"""

import requests
import json
import time
from pathlib import Path
from tqdm import tqdm

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit"
RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = RAW_DIR / "reddit_posts.jsonl"

# Configuration
SUBREDDITS = [
    "collegeresults",
    "chanceme",
    "ApplyingToCollege"
]

LIMIT = 100  # Posts per subreddit per sort method
SORT_METHODS = ["new", "top"]  # Focus on new and top (skip hot - too many duplicates)
USER_AGENT = "ChancifyAI/1.0 Data Collection Bot"


def fetch_subreddit_posts(subreddit: str, sort: str = "new", limit: int = 100, after: str = None):
    """
    Fetch posts from subreddit using public JSON API.
    
    Args:
        subreddit: Subreddit name
        sort: Sort method (new, hot, top)
        limit: Number of posts to fetch
        after: Pagination token
        
    Returns:
        List of post dictionaries
    """
    url = f"https://www.reddit.com/r/{subreddit}/{sort}.json"
    
    params = {
        "limit": min(limit, 100),  # Reddit max is 100 per request
        "raw_json": 1
    }
    
    if after:
        params["after"] = after
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            posts = data.get("data", {}).get("children", [])
            after_token = data.get("data", {}).get("after")
            
            return [post["data"] for post in posts], after_token
        else:
            print(f"  Error {response.status_code}: {response.text[:100]}")
            return [], None
            
    except Exception as e:
        print(f"  Error fetching: {e}")
        return [], None


def scrape_public():
    """Scrape Reddit using public API (no auth required)."""
    
    print("="*60)
    print("REDDIT PUBLIC API SCRAPER")
    print("="*60)
    print("No authentication required!")
    print(f"Target: {', '.join(SUBREDDITS)}")
    print(f"Output: {OUT_FILE}")
    print()
    
    # Load existing posts
    seen_ids = set()
    if OUT_FILE.exists():
        with open(OUT_FILE, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    post = json.loads(line)
                    seen_ids.add(post.get("id"))
                except:
                    pass
    
    print(f"Already scraped: {len(seen_ids)} posts")
    print()
    
    new_count = 0
    
    with open(OUT_FILE, "a", encoding="utf-8") as outfile:
        for subreddit in SUBREDDITS:
            print(f"\n{'='*60}")
            print(f"Scraping r/{subreddit}")
            print(f"{'='*60}")
            
            for sort_method in SORT_METHODS:
                print(f"\nFetching '{sort_method}' posts...")
                
                fetched = 0
                after = None
                
                # Fetch multiple pages
                for page in range(25):  # Max 25 pages = 2500 posts (collect MORE!)
                    posts, after = fetch_subreddit_posts(
                        subreddit, 
                        sort=sort_method, 
                        limit=100,
                        after=after
                    )
                    
                    if not posts:
                        break
                    
                    for post in posts:
                        post_id = post.get("id")
                        
                        if post_id in seen_ids:
                            continue
                        
                        # Create simplified record
                        record = {
                            "id": post_id,
                            "subreddit": post.get("subreddit"),
                            "author": post.get("author"),
                            "created_utc": post.get("created_utc"),
                            "title": post.get("title", ""),
                            "selftext": post.get("selftext", ""),
                            "url": post.get("url"),
                            "permalink": f"https://www.reddit.com{post.get('permalink', '')}",
                            "upvotes": post.get("score", 0),
                            "num_comments": post.get("num_comments", 0),
                            "flair": post.get("link_flair_text"),
                            "is_self": post.get("is_self", False),
                            "edited": post.get("edited", False)
                        }
                        
                        outfile.write(json.dumps(record, ensure_ascii=False) + "\n")
                        outfile.flush()
                        
                        seen_ids.add(post_id)
                        new_count += 1
                        fetched += 1
                    
                    print(f"  Page {page + 1}: {len(posts)} posts ({fetched} new)")
                    
                    # Stop if no more pages
                    if not after:
                        break
                    
                    # Rate limiting - be nice!
                    time.sleep(2)
                
                print(f"  Total from '{sort_method}': {fetched} new posts")
                
                # Pause between sort methods
                time.sleep(3)
            
            # Pause between subreddits
            print(f"\nPausing 10 seconds before next subreddit...")
            time.sleep(10)
    
    # Summary
    print("\n" + "="*60)
    print("SCRAPING COMPLETE!")
    print("="*60)
    print(f"New posts collected: {new_count}")
    print(f"Total posts in file: {len(seen_ids)}")
    print(f"Output: {OUT_FILE}")
    print()
    print("Next: python scripts/reddit_parser.py")


if __name__ == "__main__":
    scrape_public()

