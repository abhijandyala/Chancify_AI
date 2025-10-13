"""
COMPREHENSIVE Reddit Scraper - Extract ALL Admission Factors

Extracts:
- Academics (GPA, SAT, ACT, AP, IB, class rank)
- Extracurriculars (leadership, depth, impact, hours)
- Awards (national, state, regional, school-level)
- Sports (varsity, JV, recruiting, championships)
- Research (publications, projects, mentors)
- Volunteering (hours, impact, leadership)
- Work experience
- Summer programs (RSI, TASP, etc.)
- Essays topics/quality indicators
- Demographics (first-gen, URM, geographic, legacy)
- College decisions with round (ED/EA/RD)
"""

import requests
import json
import time
import re
from pathlib import Path
from tqdm import tqdm

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit"
RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = RAW_DIR / "reddit_comprehensive.jsonl"

# Target subreddits
SUBREDDITS = {
    "collegeresults": 50,      # PRIMARY - actual results
    "chanceme": 50,            # Profile reviews
    "ApplyingToCollege": 30,   # General discussions
    "ApplyingToCollege": 20,   # Megathreads
    "ECAdvice": 10,            # EC-specific discussions
}

# Comprehensive search queries for ALL factors
SEARCH_QUERIES = {
    # Results posts
    "results": 100,
    "decision": 100,
    "got into": 50,
    "got accepted": 50,
    "2024 results": 50,
    "2025 results": 50,
    "ED results": 50,
    "EA results": 50,
    "RD results": 50,
    "decisions megathread": 100,
    
    # Profile posts
    "chance me": 50,
    "profile review": 30,
    "reverse chance": 30,
    
    # EC-focused
    "extracurriculars": 30,
    "ECs": 30,
    "leadership": 20,
    "president": 20,
    "founder": 20,
    "varsity": 20,
    "research": 30,
    "internship": 20,
    "volunteer": 20,
    
    # Awards
    "USAMO": 10,
    "ISEF": 10,
    "national merit": 20,
    "ap scholar": 10,
    "science olympiad": 10,
    "debate tournament": 10,
    "state champion": 10,
    
    # Summer programs
    "RSI": 10,
    "TASP": 10,
    "SSP": 10,
    "summer program": 20,
    
    # Stats-focused
    "1600 SAT": 10,
    "36 ACT": 10,
    "4.0 GPA": 20,
    "perfect GPA": 10,
}

USER_AGENT = "ChancifyAI/2.0 Comprehensive Data Collector"


def fetch_posts(subreddit: str, query: str, limit: int = 100):
    """Fetch posts for a specific query."""
    
    all_posts = []
    after = None
    
    for page in range((limit // 100) + 1):
        url = f"https://www.reddit.com/r/{subreddit}/search.json"
        
        params = {
            "q": query,
            "limit": min(100, limit - len(all_posts)),
            "restrict_sr": "on",  # Search only this subreddit
            "sort": "new",
            "t": "all",  # All time
            "raw_json": 1
        }
        
        if after:
            params["after"] = after
        
        headers = {"User-Agent": USER_AGENT}
        
        try:
            response = requests.get(url, params=params, headers=headers, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                posts = data.get("data", {}).get("children", [])
                
                if not posts:
                    break
                
                all_posts.extend([p["data"] for p in posts])
                after = data.get("data", {}).get("after")
                
                if not after or len(all_posts) >= limit:
                    break
                    
            elif response.status_code == 429:
                # Rate limited - wait longer
                print("    Rate limited, waiting 60s...")
                time.sleep(60)
                continue
            else:
                break
                
        except Exception as e:
            print(f"    Error: {e}")
            break
        
        # Rate limiting
        time.sleep(3)
    
    return all_posts


def scrape_comprehensive():
    """Comprehensive scraping of all admission factors."""
    
    print("="*60)
    print("COMPREHENSIVE REDDIT DATA COLLECTION")
    print("="*60)
    print("Collecting ALL admission factors:")
    print("  - Academics, ECs, Awards, Sports")
    print("  - Research, Volunteering, Summer programs")
    print("  - Demographics, Essays, Decisions")
    print()
    print(f"Target queries: {len(SEARCH_QUERIES)}")
    print(f"Estimated time: 30-45 minutes")
    print(f"Output: {OUT_FILE}")
    print()
    
    # Load existing
    seen_ids = set()
    if OUT_FILE.exists():
        with open(OUT_FILE, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    post = json.loads(line)
                    seen_ids.add(post.get("id"))
                except:
                    pass
    
    print(f"Already collected: {len(seen_ids)} posts\n")
    
    new_count = 0
    total_requested = sum(SEARCH_QUERIES.values())
    
    with open(OUT_FILE, "a", encoding="utf-8") as outfile:
        # Focus on r/collegeresults (best quality)
        subreddit = "collegeresults"
        
        with tqdm(total=total_requested, desc="Overall Progress", unit="post") as pbar:
            for query, limit in SEARCH_QUERIES.items():
                print(f"\nSearching '{query}' (limit: {limit})...")
                
                posts = fetch_posts(subreddit, query, limit=limit)
                
                query_new = 0
                for post in posts:
                    if post.get("id") in seen_ids:
                        continue
                    
                    # Create comprehensive record
                    record = {
                        "id": post.get("id"),
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
                        "query_matched": query,  # Track which query found this
                    }
                    
                    outfile.write(json.dumps(record, ensure_ascii=False) + "\n")
                    outfile.flush()
                    
                    seen_ids.add(post.get("id"))
                    new_count += 1
                    query_new += 1
                
                pbar.update(limit)
                print(f"  Found {query_new} new posts")
                
                # Pause between queries
                time.sleep(2)
    
    print("\n" + "="*60)
    print("COMPREHENSIVE SCRAPING COMPLETE!")
    print("="*60)
    print(f"New posts: {new_count}")
    print(f"Total posts: {len(seen_ids)}")
    print(f"\nNext: python scripts/reddit_parser_comprehensive.py")


if __name__ == "__main__":
    scrape_comprehensive()

