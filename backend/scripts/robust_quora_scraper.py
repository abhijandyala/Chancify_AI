#!/usr/bin/env python3
"""
Robust Quora Scraper for College Admission Data
Enhanced version that can handle Quora's current structure and gather real insights.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import quote_plus, urljoin
import logging
from typing import Dict, List, Optional
import random

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class RobustQuoraScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        self.base_url = "https://www.quora.com"
        self.scraped_data = {}
        
    def search_college_admissions(self, college_name: str, max_posts: int = 100) -> List[Dict]:
        """
        Search for Quora posts about getting into a specific college
        """
        logger.info(f"🔍 Searching Quora for {college_name} admission posts...")
        
        # Search queries for different aspects of college admissions
        search_queries = [
            f"how to get into {college_name}",
            f"{college_name} admission requirements",
            f"{college_name} acceptance rate",
            f"what GPA do you need for {college_name}",
            f"{college_name} SAT ACT scores",
            f"{college_name} extracurricular activities",
            f"{college_name} admission tips",
            f"{college_name} application advice",
            f"getting accepted to {college_name}",
            f"{college_name} admission statistics"
        ]
        
        all_posts = []
        posts_per_query = max_posts // len(search_queries)
        
        for i, query in enumerate(search_queries):
            try:
                logger.info(f"  📝 Query {i+1}/{len(search_queries)}: '{query}'")
                posts = self._search_quora_robust(query, posts_per_query)
                all_posts.extend(posts)
                
                # Be respectful to Quora - random delay between queries
                delay = random.uniform(2, 4)
                logger.info(f"  ⏳ Waiting {delay:.1f}s before next query...")
                time.sleep(delay)
                
            except Exception as e:
                logger.error(f"  ❌ Error searching for '{query}': {e}")
                continue
        
        # Remove duplicates and limit to max_posts
        unique_posts = self._remove_duplicates(all_posts)
        final_posts = unique_posts[:max_posts]
        
        logger.info(f"  ✅ Collected {len(final_posts)} unique posts for {college_name}")
        return final_posts
    
    def _search_quora_robust(self, query: str, max_posts: int = 10) -> List[Dict]:
        """
        Robust search of Quora with multiple fallback strategies
        """
        posts = []
        
        # Strategy 1: Direct search URL
        search_url = f"{self.base_url}/search?q={quote_plus(query)}"
        posts.extend(self._scrape_search_page(search_url, max_posts))
        
        # Strategy 2: Try different search formats
        if len(posts) < max_posts // 2:
            search_url2 = f"{self.base_url}/search?q={quote_plus(query)}&type=question"
            posts.extend(self._scrape_search_page(search_url2, max_posts - len(posts)))
        
        return posts[:max_posts]
    
    def _scrape_search_page(self, url: str, max_posts: int) -> List[Dict]:
        """
        Scrape a single Quora search page
        """
        posts = []
        
        try:
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Look for different possible selectors (Quora changes their structure)
            selectors = [
                'div[data-testid="question"]',
                'div.qu-answer',
                'div.Answer',
                'div[class*="question"]',
                'div[class*="answer"]',
                'div[class*="post"]',
                'div[class*="content"]'
            ]
            
            for selector in selectors:
                elements = soup.select(selector)
                if elements:
                    logger.info(f"    📄 Found {len(elements)} elements with selector: {selector}")
                    for element in elements[:max_posts]:
                        post_data = self._extract_post_data_robust(element)
                        if post_data:
                            posts.append(post_data)
                    break
            
            # If no specific selectors work, try to find any text content
            if not posts:
                posts = self._extract_fallback_content(soup, max_posts)
            
        except Exception as e:
            logger.error(f"    ❌ Error scraping {url}: {e}")
        
        return posts
    
    def _extract_post_data_robust(self, element) -> Optional[Dict]:
        """
        Robust extraction of post data with multiple fallback strategies
        """
        try:
            # Try multiple title selectors
            title_selectors = [
                'h1', 'h2', 'h3', 'h4',
                '[class*="title"]', '[class*="question"]',
                '[data-testid="question"]', '.qu-title'
            ]
            
            title = None
            for selector in title_selectors:
                title_elem = element.select_one(selector)
                if title_elem:
                    title = title_elem.get_text(strip=True)
                    break
            
            if not title:
                title = "Admission Question"
            
            # Try multiple content selectors
            content_selectors = [
                'div[class*="answer"]', 'div[class*="content"]',
                'div[class*="text"]', 'p', 'div[class*="post"]',
                '.qu-answer', '.Answer'
            ]
            
            content = None
            for selector in content_selectors:
                content_elem = element.select_one(selector)
                if content_elem:
                    content = content_elem.get_text(strip=True)
                    break
            
            if not content:
                content = element.get_text(strip=True)
            
            # Clean up content
            content = re.sub(r'\s+', ' ', content).strip()
            if len(content) > 1000:
                content = content[:1000] + "..."
            
            # Extract metrics and advice
            metrics = self._extract_metrics_enhanced(content)
            advice = self._extract_advice_enhanced(content)
            
            return {
                'title': title,
                'content': content,
                'metrics': metrics,
                'advice': advice,
                'source': 'quora',
                'timestamp': time.time()
            }
            
        except Exception as e:
            logger.error(f"    ❌ Error extracting post data: {e}")
            return None
    
    def _extract_fallback_content(self, soup: BeautifulSoup, max_posts: int) -> List[Dict]:
        """
        Fallback method to extract any relevant content from the page
        """
        posts = []
        
        # Look for any text that mentions college admissions
        text_elements = soup.find_all(text=True)
        admission_keywords = ['admission', 'acceptance', 'GPA', 'SAT', 'ACT', 'college', 'university']
        
        relevant_texts = []
        for text in text_elements:
            if any(keyword.lower() in text.lower() for keyword in admission_keywords):
                if len(text.strip()) > 50:  # Only meaningful text
                    relevant_texts.append(text.strip())
        
        # Create posts from relevant text
        for i, text in enumerate(relevant_texts[:max_posts]):
            posts.append({
                'title': f"Admission Information {i+1}",
                'content': text,
                'metrics': self._extract_metrics_enhanced(text),
                'advice': self._extract_advice_enhanced(text),
                'source': 'quora_fallback',
                'timestamp': time.time()
            })
        
        return posts
    
    def _extract_metrics_enhanced(self, text: str) -> Dict:
        """
        Enhanced metric extraction with more patterns
        """
        metrics = {}
        
        # GPA patterns (more comprehensive)
        gpa_patterns = [
            r'GPA[:\s]*(\d+\.?\d*)',
            r'grade point average[:\s]*(\d+\.?\d*)',
            r'(\d+\.?\d*)\s*GPA',
            r'(\d+\.?\d*)\s*out of 4\.0',
            r'(\d+\.?\d*)\s*unweighted',
            r'(\d+\.?\d*)\s*weighted',
            r'(\d+\.?\d*)\s*overall'
        ]
        
        for pattern in gpa_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                try:
                    gpa = float(matches[0])
                    if 0 <= gpa <= 4.0:
                        metrics['gpa'] = gpa
                        break
                except ValueError:
                    continue
        
        # SAT patterns (more comprehensive)
        sat_patterns = [
            r'SAT[:\s]*(\d{3,4})',
            r'SAT score[:\s]*(\d{3,4})',
            r'(\d{3,4})\s*SAT',
            r'SAT total[:\s]*(\d{3,4})',
            r'(\d{3,4})\s*on the SAT'
        ]
        
        for pattern in sat_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                try:
                    sat = int(matches[0])
                    if 400 <= sat <= 1600:
                        metrics['sat'] = sat
                        break
                except ValueError:
                    continue
        
        # ACT patterns
        act_patterns = [
            r'ACT[:\s]*(\d{1,2})',
            r'ACT score[:\s]*(\d{1,2})',
            r'(\d{1,2})\s*ACT',
            r'ACT composite[:\s]*(\d{1,2})'
        ]
        
        for pattern in act_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                try:
                    act = int(matches[0])
                    if 1 <= act <= 36:
                        metrics['act'] = act
                        break
                except ValueError:
                    continue
        
        # Acceptance rate patterns
        acceptance_patterns = [
            r'acceptance rate[:\s]*(\d+\.?\d*)%?',
            r'(\d+\.?\d*)%?\s*acceptance',
            r'admitted[:\s]*(\d+\.?\d*)%?',
            r'(\d+\.?\d*)%?\s*of applicants',
            r'(\d+\.?\d*)%?\s*get in'
        ]
        
        for pattern in acceptance_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                try:
                    rate = float(matches[0])
                    if 0 <= rate <= 100:
                        metrics['acceptance_rate'] = rate / 100 if rate > 1 else rate
                        break
                except ValueError:
                    continue
        
        return metrics
    
    def _extract_advice_enhanced(self, text: str) -> List[str]:
        """
        Enhanced advice extraction with more keywords
        """
        advice_keywords = [
            'extracurricular', 'leadership', 'volunteer', 'research',
            'essay', 'recommendation', 'interview', 'portfolio',
            'awards', 'honors', 'community service', 'sports',
            'music', 'art', 'debate', 'science fair', 'internship',
            'summer program', 'academic', 'challenge', 'rigor',
            'passion', 'unique', 'stand out', 'differentiate'
        ]
        
        advice = []
        text_lower = text.lower()
        
        for keyword in advice_keywords:
            if keyword in text_lower:
                # Find sentences containing the keyword
                sentences = re.split(r'[.!?]+', text)
                for sentence in sentences:
                    if keyword in sentence.lower() and len(sentence.strip()) > 20:
                        advice.append(sentence.strip())
                        break
        
        return advice[:5]  # Limit to 5 pieces of advice
    
    def _remove_duplicates(self, posts: List[Dict]) -> List[Dict]:
        """
        Remove duplicate posts based on content similarity
        """
        unique_posts = []
        seen_content = set()
        
        for post in posts:
            content_hash = hash(post['content'][:100])  # Use first 100 chars as hash
            if content_hash not in seen_content:
                seen_content.add(content_hash)
                unique_posts.append(post)
        
        return unique_posts
    
    def scrape_all_elite_colleges(self) -> Dict:
        """
        Scrape admission data for all elite colleges
        """
        elite_colleges = [
            "MIT", "Harvard", "Stanford", "Yale", "Princeton",
            "Columbia", "University of Pennsylvania", "Dartmouth",
            "Brown", "Cornell", "Duke", "Northwestern", "Vanderbilt",
            "Rice", "Emory", "Georgetown", "Carnegie Mellon",
            "New York University", "University of Chicago"
        ]
        
        logger.info(f"🚀 Starting comprehensive Quora scraping for {len(elite_colleges)} elite colleges...")
        logger.info(f"📊 Target: 100 posts per college = {len(elite_colleges) * 100} total posts")
        
        all_data = {}
        total_posts = 0
        
        for i, college in enumerate(elite_colleges):
            logger.info(f"\n{'='*60}")
            logger.info(f"🎓 College {i+1}/{len(elite_colleges)}: {college}")
            logger.info(f"{'='*60}")
            
            try:
                posts = self.search_college_admissions(college, max_posts=100)
                all_data[college] = posts
                total_posts += len(posts)
                
                logger.info(f"✅ {college}: {len(posts)} posts collected")
                logger.info(f"📈 Total posts so far: {total_posts}")
                
                # Longer delay between colleges to be respectful
                if i < len(elite_colleges) - 1:  # Don't wait after the last college
                    delay = random.uniform(5, 8)
                    logger.info(f"⏳ Waiting {delay:.1f}s before next college...")
                    time.sleep(delay)
                
            except Exception as e:
                logger.error(f"❌ Failed to scrape {college}: {e}")
                all_data[college] = []
                continue
        
        logger.info(f"\n🎉 SCRAPING COMPLETE!")
        logger.info(f"📊 Total posts collected: {total_posts}")
        logger.info(f"🏫 Colleges processed: {len(elite_colleges)}")
        
        return all_data
    
    def save_data(self, data: Dict, filename: str = "backend/data/raw/quora_admission_data.json"):
        """
        Save scraped data to JSON file
        """
        # Create directory if it doesn't exist
        import os
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"💾 Data saved to {filename}")
        
        # Also save a summary
        summary = {}
        for college, posts in data.items():
            summary[college] = {
                'post_count': len(posts),
                'metrics_found': sum(1 for post in posts if post.get('metrics')),
                'advice_found': sum(1 for post in posts if post.get('advice'))
            }
        
        summary_file = filename.replace('.json', '_summary.json')
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        
        logger.info(f"📋 Summary saved to {summary_file}")

def main():
    """
    Main function to run the comprehensive Quora scraper
    """
    scraper = RobustQuoraScraper()
    
    # Scrape data for all elite colleges
    logger.info("🚀 Starting comprehensive Quora scraping...")
    data = scraper.scrape_all_elite_colleges()
    
    # Save the data
    scraper.save_data(data, "backend/data/raw/quora_admission_data.json")
    
    # Print final summary
    total_posts = sum(len(posts) for posts in data.values())
    colleges_with_data = sum(1 for posts in data.values() if posts)
    
    logger.info(f"\n🎯 FINAL RESULTS:")
    logger.info(f"📊 Total posts: {total_posts}")
    logger.info(f"🏫 Colleges with data: {colleges_with_data}")
    logger.info(f"📈 Average posts per college: {total_posts/colleges_with_data:.1f}")
    
    # Show sample data for MIT
    if "MIT" in data and data["MIT"]:
        logger.info(f"\n📝 Sample MIT data:")
        sample_post = data["MIT"][0]
        logger.info(f"Title: {sample_post['title']}")
        logger.info(f"Metrics: {sample_post['metrics']}")
        logger.info(f"Advice: {sample_post['advice'][:2]}")

if __name__ == "__main__":
    main()
