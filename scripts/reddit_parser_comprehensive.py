"""
COMPREHENSIVE Reddit Parser

Extracts EVERYTHING:
- All 20 admission factors
- Detailed EC breakdowns
- Specific awards and competitions
- Research/internships
- Sports achievements
- Volunteer work
- Summer programs
- Essay topics
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Optional
import pandas as pd
from tqdm import tqdm

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_FILE = PROJECT_ROOT / "backend" / "data" / "raw" / "reddit" / "reddit_comprehensive.jsonl"
OUT_DIR = PROJECT_ROOT / "backend" / "data" / "processed" / "reddit"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ============================================
# COMPREHENSIVE REGEX PATTERNS
# ============================================

# ACADEMICS
RE_GPA_UW = re.compile(r"(?:unweighted|UW|u/w)\s+GPA[:\s]*([0-4]\.\d{1,2})", re.I)
RE_GPA_W = re.compile(r"(?:weighted|W)\s+GPA[:\s]*([0-5]\.\d{1,2})", re.I)
RE_GPA = re.compile(r"GPA[:\s]*([0-5]\.\d{1,2})", re.I)
RE_SAT = re.compile(r"SAT[:\s]*(\d{3,4})", re.I)
RE_ACT = re.compile(r"ACT[:\s]*(\d{1,2})", re.I)
RE_AP = re.compile(r"(\d{1,2})\s*APs?", re.I)
RE_IB = re.compile(r"IB\s+(?:diploma|programme)", re.I)
RE_IB_SCORE = re.compile(r"IB[:\s]*(\d{1,2})\s*points?", re.I)

# CLASS RANK
RE_RANK = re.compile(r"(?:rank|ranked)\s+#?(\d+)\s*/\s*(\d+)", re.I)
RE_TOP_PERCENT = re.compile(r"top\s+(\d+(?:\.\d+)?)%", re.I)
RE_VALEDICTORIAN = re.compile(r"valedictorian", re.I)
RE_SALUTATORIAN = re.compile(r"salutatorian", re.I)

# EXTRACURRICULARS - LEADERSHIP
RE_PRESIDENT = re.compile(r"president\s+of\s+([^,\n]{3,50})", re.I)
RE_FOUNDER = re.compile(r"(?:founder|founded|started)\s+(?:of\s+)?([^,\n]{3,50})", re.I)
RE_CAPTAIN = re.compile(r"captain\s+(?:of\s+)?([^,\n]{3,50})", re.I)
RE_DIRECTOR = re.compile(r"director\s+(?:of\s+)?([^,\n]{3,50})", re.I)
RE_CHAIR = re.compile(r"chair(?:man|person|)\s+(?:of\s+)?([^,\n]{3,50})", re.I)
RE_LEADER = re.compile(r"leader\s+(?:of\s+)?([^,\n]{3,50})", re.I)

# EXTRACURRICULARS - ACTIVITIES
RE_VARSITY = re.compile(r"varsity\s+([^,\n]{3,30})", re.I)
RE_JV = re.compile(r"JV\s+([^,\n]{3,30})", re.I)
RE_CLUB_MEMBER = re.compile(r"member\s+of\s+([^,\n]{3,50})", re.I)
RE_DEBATE = re.compile(r"debate|speech|forensics", re.I)
RE_STEM_CLUB = re.compile(r"(?:robotics|coding|science|math)\s+(?:team|club)", re.I)
RE_MUSIC = re.compile(r"(?:band|orchestra|choir|music|piano|violin|guitar)", re.I)
RE_ART = re.compile(r"(?:art|painting|drawing|sculpture|portfolio)", re.I)

# AWARDS & COMPETITIONS
RE_USAMO = re.compile(r"USAMO|USA(?:J)?MO", re.I)
RE_AIME = re.compile(r"AIME", re.I)
RE_ISEF = re.compile(r"ISEF|Intel|Regeneron", re.I)
RE_SCIENCE_OLYMPIAD = re.compile(r"science olympiad", re.I)
RE_NATIONAL_MERIT = re.compile(r"national\s+merit|NMSF|NMF", re.I)
RE_AP_SCHOLAR = re.compile(r"AP\s+scholar", re.I)
RE_STATE_CHAMPION = re.compile(r"state\s+champion", re.I)
RE_ALL_STATE = re.compile(r"all[-\s]?state", re.I)
RE_PRESIDENTIAL_SCHOLAR = re.compile(r"presidential\s+scholar", re.I)

# RESEARCH
RE_RESEARCH_INTERN = re.compile(r"research\s+(?:intern|assistant)", re.I)
RE_PUBLICATION = re.compile(r"published|publication|paper\s+accepted", re.I)
RE_LAB_WORK = re.compile(r"lab\s+(?:research|work)|university\s+lab", re.I)
RE_FIRST_AUTHOR = re.compile(r"first\s+author", re.I)

# VOLUNTEERING
RE_VOLUNTEER_HOURS = re.compile(r"(\d{2,4})\+?\s*(?:hours?\s+of\s+)?(?:volunteer|community\s+service)", re.I)
RE_HOSPITAL_VOLUNTEER = re.compile(r"hospital\s+volunteer", re.I)
RE_TUTORING = re.compile(r"tutor(?:ing)?", re.I)

# SUMMER PROGRAMS (Elite)
RE_RSI = re.compile(r"\bRSI\b", re.I)
RE_TASP = re.compile(r"\bTASP\b", re.I)
RE_SSP = re.compile(r"\bSSP\b", re.I)
RE_GARCIA = re.compile(r"Garcia|PRIMES", re.I)
RE_SUMMER_COLLEGE = re.compile(r"(?:Harvard|Yale|Stanford|MIT)\s+summer", re.I)

# WORK EXPERIENCE
RE_INTERNSHIP = re.compile(r"internship|intern\s+at", re.I)
RE_JOB = re.compile(r"(?:part[-\s]?time\s+)?(?:job|work(?:ed)?)\s+at", re.I)

# DEMOGRAPHICS
RE_FIRST_GEN = re.compile(r"first[-\s]?gen(?:eration)?|1st\s+gen", re.I)
RE_LOW_INCOME = re.compile(r"low[-\s]?income|QuestBridge|Posse", re.I)
RE_URM = re.compile(r"\b(?:URM|underrepresented)\b", re.I)
RE_ASIAN = re.compile(r"\b(?:Asian|Chinese|Indian|Korean|Japanese)\b", re.I)
RE_HISPANIC = re.compile(r"\b(?:Hispanic|Latino|Latina|Latinx)\b", re.I)
RE_BLACK = re.compile(r"\b(?:Black|African[-\s]?American)\b", re.I)
RE_NATIVE = re.compile(r"\b(?:Native\s+American|Indigenous)\b", re.I)
RE_INTERNATIONAL = re.compile(r"\b(?:International|non[-\s]?US)\b", re.I)
RE_LEGACY = re.compile(r"legacy", re.I)

# ESSAY TOPICS
RE_ESSAY_TOPIC = re.compile(r"essay\s+(?:about|on|topic)[:\s]*([^.\n]{10,100})", re.I)
RE_COMMON_APP = re.compile(r"common\s+app\s+essay", re.I)
RE_SUPPLEMENTAL = re.compile(r"supplemental\s+essay|why\s+(?:college|major)", re.I)

# COLLEGES & DECISIONS
RE_DECISION = re.compile(r"^\s*([A-Za-z0-9&\.\-' ]{3,60})\s*[-:–]\s*(accepted|rejected|waitlisted|deferred)", re.I | re.M)
RE_ED = re.compile(r"\bED\s*[I12]?|Early\s+Decision", re.I)
RE_EA = re.compile(r"\bEA|Early\s+Action|REA", re.I)
RE_RD = re.compile(r"\bRD|Regular\s+Decision", re.I)


class ComprehensiveParser:
    """Extracts ALL admission factors from Reddit posts."""
    
    @staticmethod
    def extract_academics(text: str) -> Dict:
        """Extract all academic metrics."""
        
        # GPA
        gpa_uw_match = RE_GPA_UW.search(text)
        gpa_w_match = RE_GPA_W.search(text)
        gpa_match = RE_GPA.search(text)
        
        gpa_uw = float(gpa_uw_match.group(1)) if gpa_uw_match else None
        gpa_w = float(gpa_w_match.group(1)) if gpa_w_match else None
        
        if not gpa_uw and not gpa_w and gpa_match:
            gpa_val = float(gpa_match.group(1))
            if gpa_val <= 4.0:
                gpa_uw = gpa_val
            else:
                gpa_w = gpa_val
        
        # Test scores
        sat = RE_SAT.search(text)
        act = RE_ACT.search(text)
        
        # Course rigor
        ap_match = RE_AP.search(text)
        ib_match = RE_IB.search(text)
        ib_score_match = RE_IB_SCORE.search(text)
        
        # Class rank
        rank_match = RE_RANK.search(text)
        top_pct_match = RE_TOP_PERCENT.search(text)
        is_val = bool(RE_VALEDICTORIAN.search(text))
        is_sal = bool(RE_SALUTATORIAN.search(text))
        
        return {
            'gpa_unweighted': gpa_uw,
            'gpa_weighted': gpa_w,
            'sat_total': int(sat.group(1)) if sat else None,
            'act_composite': int(act.group(1)) if act else None,
            'ap_count': int(ap_match.group(1)) if ap_match else None,
            'is_ib': bool(ib_match),
            'ib_score': int(ib_score_match.group(1)) if ib_score_match else None,
            'class_rank': int(rank_match.group(1)) if rank_match else None,
            'class_size': int(rank_match.group(2)) if rank_match else None,
            'top_percent': float(top_pct_match.group(1)) if top_pct_match else None,
            'is_valedictorian': is_val,
            'is_salutatorian': is_sal,
        }
    
    @staticmethod
    def extract_leadership(text: str) -> Dict:
        """Extract leadership positions."""
        
        presidents = RE_PRESIDENT.findall(text)
        founders = RE_FOUNDER.findall(text)
        captains = RE_CAPTAIN.findall(text)
        directors = RE_DIRECTOR.findall(text)
        chairs = RE_CHAIR.findall(text)
        leaders = RE_LEADER.findall(text)
        
        return {
            'president_of': presidents,
            'founder_of': founders,
            'captain_of': captains,
            'director_of': directors,
            'chair_of': chairs,
            'leader_of': leaders,
            'total_leadership_positions': len(presidents) + len(founders) + len(captains) + len(directors) + len(chairs),
            'leadership_count': len(presidents + founders + captains + directors + chairs + leaders)
        }
    
    @staticmethod
    def extract_activities(text: str) -> Dict:
        """Extract activity participation."""
        
        varsity_sports = RE_VARSITY.findall(text)
        jv_sports = RE_JV.findall(text)
        club_memberships = RE_CLUB_MEMBER.findall(text)
        
        return {
            'varsity_sports': varsity_sports,
            'jv_sports': jv_sports,
            'club_memberships': club_memberships,
            'has_debate': bool(RE_DEBATE.search(text)),
            'has_stem_club': bool(RE_STEM_CLUB.search(text)),
            'has_music': bool(RE_MUSIC.search(text)),
            'has_art': bool(RE_ART.search(text)),
            'sports_count': len(varsity_sports) + len(jv_sports),
            'club_count': len(club_memberships)
        }
    
    @staticmethod
    def extract_awards(text: str) -> Dict:
        """Extract awards and recognitions."""
        
        awards = {
            'has_usamo': bool(RE_USAMO.search(text)),
            'has_aime': bool(RE_AIME.search(text)),
            'has_isef': bool(RE_ISEF.search(text)),
            'has_science_olympiad': bool(RE_SCIENCE_OLYMPIAD.search(text)),
            'has_national_merit': bool(RE_NATIONAL_MERIT.search(text)),
            'has_ap_scholar': bool(RE_AP_SCHOLAR.search(text)),
            'has_state_champion': bool(RE_STATE_CHAMPION.search(text)),
            'has_all_state': bool(RE_ALL_STATE.search(text)),
            'has_presidential_scholar': bool(RE_PRESIDENTIAL_SCHOLAR.search(text)),
        }
        
        # Count national-level awards
        national_awards = sum([
            awards['has_usamo'],
            awards['has_isef'],
            awards['has_national_merit'],
            awards['has_presidential_scholar']
        ])
        
        # Count state/regional awards  
        regional_awards = sum([
            awards['has_state_champion'],
            awards['has_all_state'],
            awards['has_science_olympiad']
        ])
        
        awards['national_awards_count'] = national_awards
        awards['regional_awards_count'] = regional_awards
        awards['total_awards_count'] = national_awards + regional_awards + awards['has_aime'] + awards['has_ap_scholar']
        
        return awards
    
    @staticmethod
    def extract_research(text: str) -> Dict:
        """Extract research experience."""
        
        return {
            'has_research_intern': bool(RE_RESEARCH_INTERN.search(text)),
            'has_publication': bool(RE_PUBLICATION.search(text)),
            'has_lab_work': bool(RE_LAB_WORK.search(text)),
            'is_first_author': bool(RE_FIRST_AUTHOR.search(text)),
            'research_score': sum([
                bool(RE_RESEARCH_INTERN.search(text)),
                bool(RE_PUBLICATION.search(text)) * 2,
                bool(RE_LAB_WORK.search(text)),
                bool(RE_FIRST_AUTHOR.search(text)) * 2
            ])
        }
    
    @staticmethod
    def extract_volunteering(text: str) -> Dict:
        """Extract volunteer work."""
        
        hours_match = RE_VOLUNTEER_HOURS.search(text)
        volunteer_hours = int(hours_match.group(1)) if hours_match else None
        
        return {
            'volunteer_hours': volunteer_hours,
            'has_hospital_volunteer': bool(RE_HOSPITAL_VOLUNTEER.search(text)),
            'has_tutoring': bool(RE_TUTORING.search(text)),
            'volunteer_score': min(10, (volunteer_hours // 50) if volunteer_hours else 0)
        }
    
    @staticmethod
    def extract_summer_programs(text: str) -> Dict:
        """Extract selective summer programs."""
        
        programs = {
            'has_rsi': bool(RE_RSI.search(text)),
            'has_tasp': bool(RE_TASP.search(text)),
            'has_ssp': bool(RE_SSP.search(text)),
            'has_garcia_primes': bool(RE_GARCIA.search(text)),
            'has_summer_college': bool(RE_SUMMER_COLLEGE.search(text)),
        }
        
        # Count elite programs
        elite_programs = sum([
            programs['has_rsi'] * 2,  # RSI is most selective
            programs['has_tasp'] * 2,
            programs['has_ssp'],
            programs['has_garcia_primes'],
        ])
        
        programs['elite_summer_programs_count'] = elite_programs
        programs['summer_program_score'] = min(10, elite_programs * 2)
        
        return programs
    
    @staticmethod
    def extract_work_experience(text: str) -> Dict:
        """Extract work/internship experience."""
        
        internships = len(RE_INTERNSHIP.findall(text))
        jobs = len(RE_JOB.findall(text))
        
        return {
            'internship_count': internships,
            'job_count': jobs,
            'work_experience_score': min(10, (internships * 2 + jobs) * 1.5)
        }
    
    @staticmethod
    def extract_demographics(text: str) -> Dict:
        """Extract comprehensive demographics."""
        
        return {
            'first_generation': bool(RE_FIRST_GEN.search(text)),
            'low_income': bool(RE_LOW_INCOME.search(text)),
            'is_urm': bool(RE_URM.search(text)),
            'is_asian': bool(RE_ASIAN.search(text)),
            'is_hispanic': bool(RE_HISPANIC.search(text)),
            'is_black': bool(RE_BLACK.search(text)),
            'is_native': bool(RE_NATIVE.search(text)),
            'is_international': bool(RE_INTERNATIONAL.search(text)),
            'has_legacy': bool(RE_LEGACY.search(text)),
        }
    
    @staticmethod
    def extract_essays(text: str) -> Dict:
        """Extract essay information."""
        
        essay_topic = RE_ESSAY_TOPIC.search(text)
        
        return {
            'essay_topic': essay_topic.group(1).strip() if essay_topic else None,
            'has_common_app_essay': bool(RE_COMMON_APP.search(text)),
            'has_supplemental_essays': bool(RE_SUPPLEMENTAL.search(text)),
        }
    
    @staticmethod
    def extract_decisions(text: str) -> List[Dict]:
        """Extract all college decisions."""
        
        decisions = []
        
        for match in RE_DECISION.finditer(text):
            school = match.group(1).strip()
            status = match.group(2).lower()
            
            decisions.append({
                'school': school,
                'status': status,
                'round': 'ED' if RE_ED.search(text) else ('EA' if RE_EA.search(text) else 'RD')
            })
        
        return decisions
    
    @classmethod
    def parse_comprehensive(cls, post: Dict) -> Dict:
        """
        Comprehensive parsing of all factors.
        
        Extracts 100+ data points per post!
        """
        text = f"{post.get('title', '')}\n{post.get('selftext', '')}"
        
        # Extract all categories
        academics = cls.extract_academics(text)
        leadership = cls.extract_leadership(text)
        activities = cls.extract_activities(text)
        awards = cls.extract_awards(text)
        research = cls.extract_research(text)
        volunteering = cls.extract_volunteering(text)
        summer_programs = cls.extract_summer_programs(text)
        work = cls.extract_work_experience(text)
        demographics = cls.extract_demographics(text)
        essays = cls.extract_essays(text)
        decisions = cls.extract_decisions(text)
        
        # Compile comprehensive result
        result = {
            'post_id': post['id'],
            'subreddit': post['subreddit'],
            'author': post['author'],
            'created_utc': post['created_utc'],
            'title': post['title'],
            'url': post['permalink'],
            'query_matched': post.get('query_matched'),
        }
        
        # Add all extracted data
        result.update(academics)
        result.update(leadership)
        result.update(activities)
        result.update(awards)
        result.update(research)
        result.update(volunteering)
        result.update(summer_programs)
        result.update(work)
        result.update(demographics)
        result.update(essays)
        
        # Decisions
        result['decisions'] = json.dumps(decisions)
        result['num_decisions'] = len(decisions)
        result['has_decisions'] = len(decisions) > 0
        
        # Overall quality scores
        result['has_academics'] = academics['gpa_unweighted'] is not None or academics['sat_total'] is not None
        result['has_ecs'] = leadership['leadership_count'] > 0 or activities['club_count'] > 0
        result['has_awards'] = awards['total_awards_count'] > 0
        result['has_research'] = research['research_score'] > 0
        
        result['data_richness'] = sum([
            result['has_academics'],
            result['has_ecs'],
            result['has_awards'],
            result['has_research'],
            result['has_decisions']
        ])
        
        return result


def parse_all():
    """Parse all posts comprehensively."""
    
    print("="*60)
    print("COMPREHENSIVE REDDIT PARSER")
    print("="*60)
    print(f"Input: {RAW_FILE}")
    print()
    
    if not RAW_FILE.exists():
        print(f"File not found. Run reddit_scraper_comprehensive.py first.")
        return
    
    # Load posts
    posts = []
    with open(RAW_FILE, "r", encoding="utf-8") as f:
        for line in f:
            try:
                posts.append(json.loads(line))
            except:
                pass
    
    print(f"Loaded {len(posts)} posts\n")
    
    # Parse
    print("Parsing comprehensively...")
    parsed = []
    
    for post in tqdm(posts, desc="Parsing", unit="post"):
        try:
            result = ComprehensiveParser.parse_comprehensive(post)
            parsed.append(result)
        except Exception as e:
            continue
    
    df = pd.DataFrame(parsed)
    
    # Save
    out_csv = OUT_DIR / "reddit_comprehensive.csv"
    out_parquet = OUT_DIR / "reddit_comprehensive.parquet"
    
    df.to_csv(out_csv, index=False)
    df.to_parquet(out_parquet, index=False)
    
    # Stats
    print("\n" + "="*60)
    print("COMPREHENSIVE PARSING COMPLETE!")
    print("="*60)
    print(f"Total posts: {len(df)}")
    print(f"\nData richness:")
    print(f"  Academics: {df['has_academics'].sum()} ({df['has_academics'].mean():.1%})")
    print(f"  ECs/Leadership: {df['has_ecs'].sum()} ({df['has_ecs'].mean():.1%})")
    print(f"  Awards: {df['has_awards'].sum()} ({df['has_awards'].mean():.1%})")
    print(f"  Research: {df['has_research'].sum()} ({df['has_research'].mean():.1%})")
    print(f"  Decisions: {df['has_decisions'].sum()} ({df['has_decisions'].mean():.1%})")
    
    print(f"\nLeadership positions: {df['total_leadership_positions'].sum()}")
    print(f"National awards: {df['national_awards_count'].sum()}")
    print(f"Elite summer programs: {df['elite_summer_programs_count'].sum()}")
    
    print(f"\nSaved to:")
    print(f"  {out_csv}")
    print(f"  {out_parquet}")


if __name__ == "__main__":
    parse_all()

