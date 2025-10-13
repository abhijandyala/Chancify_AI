"""
Reddit Post Parser

Extracts structured admissions data from Reddit posts:
- GPA, SAT, ACT scores
- AP/IB courses
- Extracurriculars
- College decisions (Accepted/Rejected/Waitlisted)
- Demographics

Uses regex and NLP to parse messy self-reported text.
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Optional, Tuple
import pandas as pd
from tqdm import tqdm

# Paths
PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_FILE = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit" / "reddit_posts.jsonl"
OUT_DIR = PROJECT_ROOT / "backend" / "data" / "processed" / "reddit"
OUT_DIR.mkdir(parents=True, exist_ok=True)


# ============================================================
# REGEX PATTERNS FOR DATA EXTRACTION
# ============================================================

# Academic metrics
RE_GPA_UNWEIGHTED = re.compile(r"\b(?:unweighted\s+)?GPA[:\s]*([0-4]\.\d{1,2})\b", re.IGNORECASE)
RE_GPA_WEIGHTED = re.compile(r"\bweighted\s+GPA[:\s]*([0-5]\.\d{1,2})\b", re.IGNORECASE)
RE_GPA_GENERIC = re.compile(r"\bGPA[:\s]*([0-5]\.\d{1,2})\b", re.IGNORECASE)

RE_SAT_TOTAL = re.compile(r"\bSAT[:\s]*(\d{3,4})\b", re.IGNORECASE)
RE_SAT_MATH = re.compile(r"\b(?:SAT\s+)?Math[:\s]*(\d{3})\b", re.IGNORECASE)
RE_SAT_READING = re.compile(r"\b(?:SAT\s+)?(?:Reading|EBRW|ERW)[:\s]*(\d{3})\b", re.IGNORECASE)

RE_ACT = re.compile(r"\bACT[:\s]*(\d{1,2})\b", re.IGNORECASE)

# Course rigor
RE_AP_COUNT = re.compile(r"\b(\d{1,2})\s*AP(?:\s+classes|\s+courses)?\b", re.IGNORECASE)
RE_AP_CLASSES = re.compile(r"\bAP[:\s]*(\d{1,2})\b", re.IGNORECASE)
RE_IB = re.compile(r"\b(IB|International\s+Baccalaureate)\b", re.IGNORECASE)
RE_IB_SCORE = re.compile(r"\bIB[:\s]*(\d{1,2})\s*(?:points?)?\b", re.IGNORECASE)

# Class rank
RE_CLASS_RANK = re.compile(r"\brank[:\s]*(\d+)\s*/\s*(\d+)\b", re.IGNORECASE)
RE_CLASS_RANK_TOP = re.compile(r"\btop\s+(\d+)%", re.IGNORECASE)

# Demographics
RE_GENDER = re.compile(r"\b(male|female|M|F|non-?binary)\b", re.IGNORECASE)
RE_ETHNICITY = re.compile(r"\b(Asian|White|Black|Hispanic|Latino|Native American|Pacific Islander|International|ORM|URM)\b", re.IGNORECASE)
RE_FIRST_GEN = re.compile(r"\b(first\s+gen(?:eration)?|1st\s+gen)\b", re.IGNORECASE)
RE_STATE = re.compile(r"\b([A-Z]{2})\b")  # State abbreviations

# Extracurriculars (loose patterns)
RE_LEADERSHIP = re.compile(r"\b(president|founder|captain|leader|chair|director|head)\b", re.IGNORECASE)
RE_SPORTS = re.compile(r"\b(varsity|JV|sport|team|athlete)\b", re.IGNORECASE)
RE_CLUBS = re.compile(r"\b(club|society|organization)\b", re.IGNORECASE)

# Major
RE_MAJOR = re.compile(r"\b(?:intended\s+)?major[:\s]*([A-Za-z0-9 &\-/]{3,40})\b", re.IGNORECASE)
RE_STEM_MAJORS = re.compile(r"\b(computer science|CS|engineering|mathematics|physics|biology|chemistry|pre-?med)\b", re.IGNORECASE)

# College decisions
STATUS_WORDS = r"(accepted|admitted|rejected|denied|waitlisted|wl|deferred|withdrawn)"
RE_DECISION_LINE = re.compile(
    r"^\s*([A-Za-z0-9&\.\-'' ]{3,70})\s*[-:–—]\s*(" + STATUS_WORDS + r")\b",
    re.IGNORECASE | re.MULTILINE
)
RE_DECISION_BULLET = re.compile(
    r"^[\*\-•]\s*([A-Za-z0-9&\.\-'' ]{3,70})\s*[-:–—]\s*(" + STATUS_WORDS + r")\b",
    re.IGNORECASE | re.MULTILINE
)

# Application round
RE_ED = re.compile(r"\b(ED|Early\s+Decision|ED\s*[I12])\b", re.IGNORECASE)
RE_EA = re.compile(r"\b(EA|Early\s+Action|REA|Restrictive\s+Early\s+Action)\b", re.IGNORECASE)
RE_RD = re.compile(r"\b(RD|Regular\s+Decision)\b", re.IGNORECASE)


class RedditPostParser:
    """Parses Reddit posts to extract structured admissions data."""
    
    @staticmethod
    def extract_gpa(text: str) -> Tuple[Optional[float], Optional[float]]:
        """Extract unweighted and weighted GPA."""
        uw = RE_GPA_UNWEIGHTED.search(text)
        w = RE_GPA_WEIGHTED.search(text)
        
        uw_gpa = float(uw.group(1)) if uw else None
        w_gpa = float(w.group(1)) if w else None
        
        # If only generic GPA found, try to determine type
        if not uw_gpa and not w_gpa:
            generic = RE_GPA_GENERIC.search(text)
            if generic:
                gpa_val = float(generic.group(1))
                if gpa_val <= 4.0:
                    uw_gpa = gpa_val
                else:
                    w_gpa = gpa_val
        
        return uw_gpa, w_gpa
    
    @staticmethod
    def extract_test_scores(text: str) -> Dict[str, Optional[int]]:
        """Extract SAT and ACT scores."""
        sat_total_match = RE_SAT_TOTAL.search(text)
        sat_math_match = RE_SAT_MATH.search(text)
        sat_reading_match = RE_SAT_READING.search(text)
        act_match = RE_ACT.search(text)
        
        return {
            'sat_total': int(sat_total_match.group(1)) if sat_total_match else None,
            'sat_math': int(sat_math_match.group(1)) if sat_math_match else None,
            'sat_reading': int(sat_reading_match.group(1)) if sat_reading_match else None,
            'act': int(act_match.group(1)) if act_match else None,
        }
    
    @staticmethod
    def extract_course_rigor(text: str) -> Dict[str, any]:
        """Extract AP/IB course information."""
        ap_count_match = RE_AP_COUNT.search(text)
        if not ap_count_match:
            ap_count_match = RE_AP_CLASSES.search(text)
        
        ib_match = RE_IB.search(text)
        ib_score_match = RE_IB_SCORE.search(text)
        
        return {
            'ap_count': int(ap_count_match.group(1)) if ap_count_match else None,
            'is_ib': bool(ib_match),
            'ib_score': int(ib_score_match.group(1)) if ib_score_match else None,
        }
    
    @staticmethod
    def extract_class_rank(text: str) -> Dict[str, any]:
        """Extract class rank information."""
        rank_match = RE_CLASS_RANK.search(text)
        top_percent_match = RE_CLASS_RANK_TOP.search(text)
        
        rank = None
        class_size = None
        percentile = None
        
        if rank_match:
            rank = int(rank_match.group(1))
            class_size = int(rank_match.group(2))
            percentile = (rank / class_size) * 100 if class_size > 0 else None
        elif top_percent_match:
            percentile = float(top_percent_match.group(1))
        
        return {
            'class_rank': rank,
            'class_size': class_size,
            'class_rank_percentile': percentile
        }
    
    @staticmethod
    def extract_demographics(text: str) -> Dict[str, any]:
        """Extract demographic information."""
        gender_match = RE_GENDER.search(text)
        ethnicity_match = RE_ETHNICITY.search(text)
        first_gen_match = RE_FIRST_GEN.search(text)
        state_matches = RE_STATE.findall(text)
        
        # Filter state matches (avoid random abbreviations)
        valid_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                       'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
        
        state = next((s for s in state_matches if s in valid_states), None)
        
        return {
            'gender': gender_match.group(1) if gender_match else None,
            'ethnicity': ethnicity_match.group(1) if ethnicity_match else None,
            'first_generation': bool(first_gen_match),
            'state': state
        }
    
    @staticmethod
    def extract_ecs(text: str) -> Dict[str, any]:
        """Extract extracurricular activity indicators."""
        leadership_count = len(RE_LEADERSHIP.findall(text))
        sports_mentioned = bool(RE_SPORTS.search(text))
        clubs_count = len(RE_CLUBS.findall(text))
        
        return {
            'leadership_mentions': leadership_count,
            'sports_participant': sports_mentioned,
            'clubs_count': clubs_count
        }
    
    @staticmethod
    def extract_major(text: str) -> Optional[str]:
        """Extract intended major."""
        major_match = RE_MAJOR.search(text)
        if major_match:
            major = major_match.group(1).strip()
            return major if len(major) > 2 else None
        
        # Check for common STEM majors
        stem_match = RE_STEM_MAJORS.search(text)
        if stem_match:
            return stem_match.group(1)
        
        return None
    
    @staticmethod
    def extract_decisions(text: str) -> List[Dict[str, str]]:
        """Extract college decisions."""
        decisions = []
        
        # Try standard format first
        for match in RE_DECISION_LINE.finditer(text):
            school = match.group(1).strip()
            status = match.group(2).lower()
            
            # Normalize status
            status = status.replace('admitted', 'accepted')
            status = status.replace('denied', 'rejected')
            status = status.replace('wl', 'waitlisted')
            
            decisions.append({
                'school': school,
                'status': status
            })
        
        # Try bullet format
        for match in RE_DECISION_BULLET.finditer(text):
            school = match.group(1).strip()
            status = match.group(2).lower()
            
            status = status.replace('admitted', 'accepted')
            status = status.replace('denied', 'rejected')
            status = status.replace('wl', 'waitlisted')
            
            # Avoid duplicates
            if not any(d['school'] == school for d in decisions):
                decisions.append({
                    'school': school,
                    'status': status
                })
        
        return decisions
    
    @staticmethod
    def extract_application_round(text: str) -> Optional[str]:
        """Extract application round (ED/EA/RD)."""
        if RE_ED.search(text):
            return 'ED'
        elif RE_EA.search(text):
            return 'EA'
        elif RE_RD.search(text):
            return 'RD'
        return None
    
    @classmethod
    def parse_post(cls, post: Dict) -> Dict:
        """
        Parse a Reddit post and extract all structured data.
        
        Args:
            post: Raw post dictionary
            
        Returns:
            Parsed data dictionary
        """
        # Combine title and selftext
        text = f"{post.get('title', '')}\\n{post.get('selftext', '')}"
        
        # Extract all data
        gpa_uw, gpa_w = cls.extract_gpa(text)
        test_scores = cls.extract_test_scores(text)
        rigor = cls.extract_course_rigor(text)
        rank = cls.extract_class_rank(text)
        demographics = cls.extract_demographics(text)
        ecs = cls.extract_ecs(text)
        major = cls.extract_major(text)
        decisions = cls.extract_decisions(text)
        app_round = cls.extract_application_round(text)
        
        # Compile result
        result = {
            # Metadata
            'post_id': post['id'],
            'subreddit': post['subreddit'],
            'author': post['author'],
            'created_utc': post['created_utc'],
            'title': post['title'],
            'url': post['permalink'],
            'upvotes': post.get('upvotes', 0),
            'num_comments': post.get('num_comments', 0),
            'flair': post.get('flair'),
            
            # Academic
            'gpa_unweighted': gpa_uw,
            'gpa_weighted': gpa_w,
            'sat_total': test_scores['sat_total'],
            'sat_math': test_scores['sat_math'],
            'sat_reading': test_scores['sat_reading'],
            'act_composite': test_scores['act'],
            
            # Rigor
            'ap_count': rigor['ap_count'],
            'is_ib': rigor['is_ib'],
            'ib_score': rigor['ib_score'],
            
            # Rank
            'class_rank': rank['class_rank'],
            'class_size': rank['class_size'],
            'class_rank_percentile': rank['class_rank_percentile'],
            
            # Demographics
            'gender': demographics['gender'],
            'ethnicity': demographics['ethnicity'],
            'first_generation': demographics['first_generation'],
            'state': demographics['state'],
            
            # ECs
            'leadership_mentions': ecs['leadership_mentions'],
            'sports_participant': ecs['sports_participant'],
            'clubs_count': ecs['clubs_count'],
            
            # Application
            'intended_major': major,
            'application_round': app_round,
            
            # Decisions
            'num_decisions': len(decisions),
            'decisions_json': json.dumps(decisions) if decisions else None,
            'has_acceptances': any(d['status'] == 'accepted' for d in decisions),
            'has_rejections': any(d['status'] == 'rejected' for d in decisions),
            'has_waitlists': any(d['status'] == 'waitlisted' for d in decisions),
            
            # Quality metrics
            'text_length': len(text),
            'has_gpa': gpa_uw is not None or gpa_w is not None,
            'has_test_scores': test_scores['sat_total'] is not None or test_scores['act'] is not None,
            'has_rigor': rigor['ap_count'] is not None or rigor['is_ib'],
            'has_decisions': len(decisions) > 0,
            'data_completeness': sum([
                gpa_uw is not None or gpa_w is not None,
                test_scores['sat_total'] is not None or test_scores['act'] is not None,
                rigor['ap_count'] is not None or rigor['is_ib'],
                len(decisions) > 0
            ])
        }
        
        return result


def parse_reddit_posts():
    """
    Parse all Reddit posts and create structured dataset.
    """
    print("="*60)
    print("REDDIT POST PARSER")
    print("="*60)
    print(f"Input: {RAW_FILE}")
    print(f"Output: {OUT_DIR}")
    print()
    
    # Check if input exists
    if not RAW_FILE.exists():
        print(f"ERROR: {RAW_FILE} not found!")
        print("Run reddit_scraper.py first to collect posts.")
        return
    
    # Load posts
    print("Loading posts...")
    posts = []
    with open(RAW_FILE, "r", encoding="utf-8") as f:
        for line in f:
            try:
                posts.append(json.loads(line))
            except:
                pass
    
    print(f"Loaded {len(posts)} posts")
    
    # Parse each post
    print("\nParsing posts...")
    parsed_data = []
    
    for post in tqdm(posts, desc="Parsing", unit="post"):
        try:
            parsed = RedditPostParser.parse_post(post)
            parsed_data.append(parsed)
        except Exception as e:
            print(f"Warning: Error parsing post {post.get('id')}: {e}")
            continue
    
    # Create DataFrame
    df = pd.DataFrame(parsed_data)
    
    # Clean data
    print("\nCleaning data...")
    
    # GPA bounds
    if 'gpa_unweighted' in df.columns:
        df.loc[(df['gpa_unweighted'] < 0) | (df['gpa_unweighted'] > 4.5), 'gpa_unweighted'] = None
    if 'gpa_weighted' in df.columns:
        df.loc[(df['gpa_weighted'] < 0) | (df['gpa_weighted'] > 6.0), 'gpa_weighted'] = None
    
    # SAT bounds
    if 'sat_total' in df.columns:
        df.loc[(df['sat_total'] < 400) | (df['sat_total'] > 1600), 'sat_total'] = None
    if 'sat_math' in df.columns:
        df.loc[(df['sat_math'] < 200) | (df['sat_math'] > 800), 'sat_math'] = None
    
    # ACT bounds
    if 'act_composite' in df.columns:
        df.loc[(df['act_composite'] < 1) | (df['act_composite'] > 36), 'act_composite'] = None
    
    # AP bounds
    if 'ap_count' in df.columns:
        df.loc[(df['ap_count'] < 0) | (df['ap_count'] > 20), 'ap_count'] = None
    
    # Save results
    output_parquet = OUT_DIR / "reddit_parsed.parquet"
    output_csv = OUT_DIR / "reddit_parsed.csv"
    
    df.to_parquet(output_parquet, index=False)
    df.to_csv(output_csv, index=False)
    
    # Statistics
    print("\n" + "="*60)
    print("PARSING COMPLETE!")
    print("="*60)
    print(f"Total posts parsed: {len(df)}")
    print(f"\nData quality:")
    print(f"  Posts with GPA: {df['has_gpa'].sum()} ({df['has_gpa'].mean():.1%})")
    print(f"  Posts with test scores: {df['has_test_scores'].sum()} ({df['has_test_scores'].mean():.1%})")
    print(f"  Posts with AP/IB: {df['has_rigor'].sum()} ({df['has_rigor'].mean():.1%})")
    print(f"  Posts with decisions: {df['has_decisions'].sum()} ({df['has_decisions'].mean():.1%})")
    
    print(f"\nData completeness:")
    print(df['data_completeness'].value_counts().sort_index(ascending=False))
    
    print(f"\nDecision outcomes:")
    print(f"  Posts with acceptances: {df['has_acceptances'].sum()}")
    print(f"  Posts with rejections: {df['has_rejections'].sum()}")
    print(f"  Posts with waitlists: {df['has_waitlists'].sum()}")
    print(f"  Total decisions: {df['num_decisions'].sum()}")
    
    print(f"\nTest score statistics:")
    if df['sat_total'].notna().sum() > 0:
        print(f"  SAT (n={df['sat_total'].notna().sum()}): {df['sat_total'].mean():.0f} ± {df['sat_total'].std():.0f}")
    if df['act_composite'].notna().sum() > 0:
        print(f"  ACT (n={df['act_composite'].notna().sum()}): {df['act_composite'].mean():.1f} ± {df['act_composite'].std():.1f}")
    if df['gpa_unweighted'].notna().sum() > 0:
        print(f"  GPA (n={df['gpa_unweighted'].notna().sum()}): {df['gpa_unweighted'].mean():.2f} ± {df['gpa_unweighted'].std():.2f}")
    
    print(f"\nSaved to:")
    print(f"  {output_parquet}")
    print(f"  {output_csv}")
    
    print("\n" + "="*60)
    print("Next: Extract individual decisions for ML training")
    print("="*60)


if __name__ == "__main__":
    parse_reddit_posts()

