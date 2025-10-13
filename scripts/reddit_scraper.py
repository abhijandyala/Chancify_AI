"""
Reddit Scraper for College Admissions Data

Scrapes r/collegeresults, r/chanceme, r/ApplyingToCollege for:
- Student stats (GPA, SAT, ACT, ECs)
- College decisions (Accepted/Rejected/Waitlisted)
- Real admission outcomes

This is the KEY to improving ML accuracy to 85%+!
"""

import os
import time
import json
from pathlib import Path
from typing import Dict, Set
from dotenv import load_dotenv
from tqdm import tqdm
import praw

# Paths
PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit"
RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = RAW_DIR / "reddit_posts.jsonl"

# Configuration
SUBREDDITS = [
    "collegeresults",        # PRIMARY: Real decision results
    "chanceme",              # Profile reviews with stats
    "ApplyingToCollege",     # General admissions discussions
    "A2C_circlejerk",        # Sometimes has real stats
]

SEARCH_QUERIES = [
    "results", "decision", "decisions megathread",
    "stats", "chance me", "profile review",
    "admitted", "accepted", "rejected", "waitlisted",
    "ED results", "EA results", "RD results",
    "got into", "got accepted",
    "application results", "college results"
]

TIME_FILTER = "year"         # "day", "week", "month", "year", "all"
LIMIT_PER_QUERY = 1000        # Maximum posts per query
SORT_BY = "new"               # "new", "hot", "top", "relevance"


def init_reddit():
    """
    Initialize Reddit API connection.
    
    Requires .env file with Reddit credentials.
    """
    load_dotenv()
    
    client_id = os.getenv("REDDIT_CLIENT_ID")
    client_secret = os.getenv("REDDIT_CLIENT_SECRET")
    username = os.getenv("REDDIT_USERNAME")
    password = os.getenv("REDDIT_PASSWORD")
    user_agent = os.getenv("REDDIT_USER_AGENT", "ChancifyAI/1.0")
    
    if not all([client_id, client_secret, username, password]):
        print("ERROR: Reddit credentials not found in .env file!")
        print("\nPlease create a .env file with:")
        print("  REDDIT_CLIENT_ID=...")
        print("  REDDIT_CLIENT_SECRET=...")
        print("  REDDIT_USERNAME=...")
        print("  REDDIT_PASSWORD=...")
        print("  REDDIT_USER_AGENT=ChancifyAI/1.0")
        return None
    
    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            username=username,
            password=password,
            user_agent=user_agent
        )
        
        # Test connection
        user = reddit.user.me()
        print(f"Connected as u/{user.name}")
        return reddit
        
    except Exception as e:
        print(f"ERROR connecting to Reddit: {e}")
        return None


def load_seen_post_ids(filepath: Path) -> Set[str]:
    """Load already-scraped post IDs to avoid duplicates."""
    seen = set()
    
    if filepath.exists():
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    post = json.loads(line)
                    seen.add(post.get("id"))
                except:
                    pass
    
    return seen


def post_to_record(post) -> Dict:
    """Convert Reddit post object to dictionary."""
    return {
        "id": post.id,
        "subreddit": str(post.subreddit),
        "author": str(post.author) if post.author else "[deleted]",
        "created_utc": int(post.created_utc),
        "title": post.title or "",
        "selftext": post.selftext or "",
        "url": post.url,
        "permalink": f"https://www.reddit.com{post.permalink}",
        "upvotes": int(post.score) if post.score is not None else 0,
        "num_comments": int(post.num_comments) if post.num_comments is not None else 0,
        "flair": post.link_flair_text or None,
        "is_self": post.is_self,
        "edited": bool(post.edited),
    }


def scrape_reddit():
    """
    Main scraping function.
    
    Scrapes posts from college admissions subreddits and saves to JSONL.
    """
    print("="*60)
    print("REDDIT COLLEGE ADMISSIONS SCRAPER")
    print("="*60)
    print(f"Target subreddits: {', '.join(SUBREDDITS)}")
    print(f"Search queries: {len(SEARCH_QUERIES)}")
    print(f"Time filter: {TIME_FILTER}")
    print(f"Limit per query: {LIMIT_PER_QUERY}")
    print(f"Output: {OUT_FILE}")
    print()
    
    # Initialize Reddit
    reddit = init_reddit()
    if reddit is None:
        return
    
    # Load already-seen posts
    seen_ids = load_seen_post_ids(OUT_FILE)
    print(f"Already scraped: {len(seen_ids)} posts")
    print()
    
    # Scrape
    new_posts_count = 0
    total_api_calls = 0
    
    with open(OUT_FILE, "a", encoding="utf-8") as outfile:
        for subreddit_name in SUBREDDITS:
            print(f"\n{'='*60}")
            print(f"SCRAPING r/{subreddit_name}")
            print(f"{'='*60}")
            
            try:
                subreddit = reddit.subreddit(subreddit_name)
                
                for query in SEARCH_QUERIES:
                    # Search subreddit
                    search_results = subreddit.search(
                        query,
                        limit=LIMIT_PER_QUERY,
                        time_filter=TIME_FILTER,
                        sort=SORT_BY
                    )
                    
                    query_posts = 0
                    query_new = 0
                    
                    for post in tqdm(search_results, desc=f"  Query: '{query[:30]}'", unit="post"):
                        query_posts += 1
                        total_api_calls += 1
                        
                        # Skip if already scraped
                        if post.id in seen_ids:
                            continue
                        
                        # Convert to record and save
                        record = post_to_record(post)
                        outfile.write(json.dumps(record, ensure_ascii=False) + "\n")
                        outfile.flush()  # Write immediately
                        
                        seen_ids.add(post.id)
                        new_posts_count += 1
                        query_new += 1
                    
                    if query_new > 0:
                        print(f"    Found {query_new} new posts")
                    
                    # Rate limiting - be nice to Reddit!
                    time.sleep(2)  # 2 second pause between queries
                
                # Longer pause between subreddits
                print(f"\n  Subreddit done. Pausing 5 seconds...")
                time.sleep(5)
                
            except Exception as e:
                print(f"  ERROR scraping r/{subreddit_name}: {e}")
                continue
    
    # Summary
    print("\n" + "="*60)
    print("SCRAPING COMPLETE!")
    print("="*60)
    print(f"New posts scraped: {new_posts_count}")
    print(f"Total posts in file: {len(seen_ids)}")
    print(f"API calls made: {total_api_calls}")
    print(f"Output file: {OUT_FILE}")
    print()
    print("Next step: Run reddit_parser.py to extract structured data")


if __name__ == "__main__":
    scrape_reddit()

