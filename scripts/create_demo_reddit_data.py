"""
Create demo Reddit data to show what scraper would collect.

This simulates realistic Reddit posts with college decisions.
Use this while setting up Reddit API credentials.
"""

import json
import random
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit"
RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = RAW_DIR / "reddit_posts.jsonl"

# Sample colleges
COLLEGES = [
    "Harvard", "Stanford", "MIT", "Yale", "Princeton",
    "Columbia", "UPenn", "Brown", "Dartmouth", "Cornell",
    "UC Berkeley", "UCLA", "USC", "NYU", "Northwestern",
    "University of Michigan", "Georgia Tech", "Carnegie Mellon",
    "Duke", "Vanderbilt", "Rice", "Notre Dame",
    "UNC Chapel Hill", "University of Virginia", "Boston College",
    "University of Texas Austin", "Penn State", "Ohio State"
]

def generate_demo_post(index: int) -> Dict:
    """Generate a realistic demo Reddit post."""
    
    # Generate realistic stats
    gpa_uw = round(random.uniform(3.3, 4.0), 2)
    gpa_w = round(gpa_uw + random.uniform(0.2, 0.6), 2)
    sat = random.choice([None, random.randint(1200, 1600)])
    act = random.choice([None, random.randint(28, 36)])
    ap_count = random.randint(3, 15)
    
    # Generate profile type
    if gpa_uw >= 3.85 and (sat and sat >= 1500 or act and act >= 34):
        profile_type = "strong"
    elif gpa_uw >= 3.6 and (sat and sat >= 1350 or act and act >= 30):
        profile_type = "average"
    else:
        profile_type = "weak"
    
    # Generate decisions based on profile
    num_schools = random.randint(5, 15)
    applied_schools = random.sample(COLLEGES, min(num_schools, len(COLLEGES)))
    
    decisions = []
    for school in applied_schools:
        # Determine outcome based on profile and school selectivity
        is_elite = school in ["Harvard", "Stanford", "MIT", "Yale", "Princeton"]
        
        if is_elite:
            if profile_type == "strong":
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.35, 0.50, 0.15])[0]
            elif profile_type == "average":
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.10, 0.75, 0.15])[0]
            else:
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.02, 0.95, 0.03])[0]
        else:
            if profile_type == "strong":
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.75, 0.15, 0.10])[0]
            elif profile_type == "average":
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.50, 0.40, 0.10])[0]
            else:
                outcome = random.choices(["accepted", "rejected", "waitlisted"], weights=[0.25, 0.65, 0.10])[0]
        
        decisions.append(f"{school} - {outcome.capitalize()}")
    
    # Generate realistic post text
    test_str = f"SAT: {sat}" if sat else (f"ACT: {act}" if act else "Test-optional")
    
    title = f"College Results - {profile_type.capitalize()} Profile"
    
    selftext = f"""**Stats:**
- GPA: {gpa_uw} UW / {gpa_w} W
- {test_str}
- APs: {ap_count}
- Demographics: {random.choice(['Asian Male', 'White Female', 'Hispanic Male', 'Black Female', 'Asian Female', 'White Male'])}
- State: {random.choice(['CA', 'NY', 'TX', 'FL', 'MA', 'IL', 'PA', 'OH', 'GA', 'NC'])}
- Income: {random.choice(['<60k', '60-100k', '100-200k', '>200k'])}

**ECs:**
{random.choice(['Math team captain', 'Debate president', 'Robotics founder', 'Varsity sports', 'Student government'])}
{random.choice(['Research intern', 'Hospital volunteer', 'Coding projects', 'Music performance', 'Community service 200+ hrs'])}
{random.choice(['National competition finalist', 'State awards', 'Regional recognition', 'School awards'])}

**Results:**
{chr(10).join(decisions)}

**Attending:** {random.choice(applied_schools)}
"""
    
    # Create post record
    created_time = datetime.now() - timedelta(days=random.randint(1, 365))
    
    return {
        "id": f"demo_{index:06d}",
        "subreddit": "collegeresults",
        "author": f"Student{random.randint(1000, 9999)}",
        "created_utc": int(created_time.timestamp()),
        "title": title,
        "selftext": selftext,
        "url": f"https://reddit.com/r/collegeresults/comments/demo_{index}",
        "permalink": f"/r/collegeresults/comments/demo_{index}",
        "upvotes": random.randint(5, 500),
        "num_comments": random.randint(10, 200),
        "flair": random.choice(["Results", "Discussion", None]),
        "is_self": True,
        "edited": False
    }


def main():
    """Generate demo Reddit data."""
    
    print("="*60)
    print("GENERATING DEMO REDDIT DATA")
    print("="*60)
    print("This simulates what the scraper would collect")
    print()
    
    # Generate 500 demo posts
    num_posts = 500
    
    print(f"Generating {num_posts} realistic demo posts...")
    
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        for i in range(num_posts):
            post = generate_demo_post(i)
            f.write(json.dumps(post, ensure_ascii=False) + "\n")
    
    print(f"\n SUCCESS! Created {num_posts} demo posts")
    print(f"Saved to: {OUT_FILE}")
    print()
    print("Next step: Run reddit_parser.py to extract structured data")
    print()
    print("="*60)
    print("NOTE: This is DEMO DATA")
    print("="*60)
    print("For real data with actual outcomes:")
    print("  1. Create Reddit app at https://www.reddit.com/prefs/apps")
    print("  2. Update .env with real credentials")
    print("  3. Run python scripts/reddit_scraper.py")
    print()
    print("Demo data will give you ~2,500 decision outcomes to train on!")


if __name__ == "__main__":
    main()

