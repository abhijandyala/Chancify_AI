#!/usr/bin/env python3
"""
Wayback Machine Quora Scraper for College Admission Data
Uses the Internet Archive's Wayback Machine to legally access historical Quora pages.
"""

import requests
import json
import time
import re
from urllib.parse import quote_plus, urljoin
import logging
from typing import Dict, List, Optional
from bs4 import BeautifulSoup

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class WaybackQuoraScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.cdx_api = "http://web.archive.org/cdx/search/cdx"
        self.scraped_data = {}
        
    def search_wayback_snapshots(self, college_name: str, max_snapshots: int = 20) -> List[Dict]:
        """
        Search for Wayback Machine snapshots of Quora pages about college admissions
        """
        logger.info(f"🔍 Searching Wayback Machine for {college_name} admission pages...")
        
        # Search queries for different aspects of college admissions
        search_queries = [
            f"site:quora.com {college_name} admission",
            f"site:quora.com {college_name} acceptance rate",
            f"site:quora.com {college_name} GPA SAT",
            f"site:quora.com how to get into {college_name}",
            f"site:quora.com {college_name} requirements"
        ]
        
        all_snapshots = []
        
        for query in search_queries:
            try:
                logger.info(f"  📝 Query: '{query}'")
                snapshots = self._get_wayback_snapshots(query, max_snapshots // len(search_queries))
                all_snapshots.extend(snapshots)
                time.sleep(1)  # Be respectful to Wayback Machine
                
            except Exception as e:
                logger.error(f"  ❌ Error searching for '{query}': {e}")
                continue
        
        # Remove duplicates and limit
        unique_snapshots = self._remove_duplicate_snapshots(all_snapshots)
        return unique_snapshots[:max_snapshots]
    
    def _get_wayback_snapshots(self, query: str, max_snapshots: int = 10) -> List[Dict]:
        """
        Get Wayback Machine snapshots for a search query
        """
        snapshots = []
        
        # Use Wayback Machine CDX API to find snapshots
        params = {
            "url": f"quora.com/*{query.replace('site:quora.com ', '')}*",
            "output": "json",
            "fl": "timestamp,original,statuscode",
            "filter": "statuscode:200",
            "limit": max_snapshots * 2  # Get more to filter
        }
        
        try:
            response = self.session.get(self.cdx_api, params=params, timeout=30)
            response.raise_for_status()
            results = response.json()
            
            if len(results) > 1:  # Skip header row
                for row in results[1:max_snapshots + 1]:
                    timestamp, original_url, status_code = row
                    
                    # Only include successful snapshots
                    if status_code == "200":
                        snapshot_data = {
                            'timestamp': timestamp,
                            'original_url': original_url,
                            'snapshot_url': f"https://web.archive.org/web/{timestamp}/{original_url}",
                            'query': query
                        }
                        snapshots.append(snapshot_data)
            
        except Exception as e:
            logger.error(f"    ❌ Error getting snapshots for '{query}': {e}")
        
        return snapshots
    
    def scrape_snapshot_content(self, snapshot_data: Dict) -> Optional[Dict]:
        """
        Scrape content from a Wayback Machine snapshot
        """
        try:
            response = self.session.get(snapshot_data['snapshot_url'], timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract content from the snapshot
            content_data = self._extract_quora_content(soup, snapshot_data)
            
            if content_data:
                content_data['snapshot_timestamp'] = snapshot_data['timestamp']
                content_data['original_url'] = snapshot_data['original_url']
                content_data['source'] = 'wayback_machine'
            
            return content_data
            
        except Exception as e:
            logger.error(f"    ❌ Error scraping snapshot {snapshot_data['snapshot_url']}: {e}")
            return None
    
    def _extract_quora_content(self, soup: BeautifulSoup, snapshot_data: Dict) -> Optional[Dict]:
        """
        Extract Quora content from a BeautifulSoup object
        """
        try:
            # Look for Quora question/answer content
            # Quora's structure may vary, so try multiple selectors
            
            # Try to find question title
            title_selectors = [
                'h1[data-testid="question"]',
                '.qu-title',
                'h1',
                '.question_text',
                '[class*="question"]'
            ]
            
            title = None
            for selector in title_selectors:
                title_elem = soup.select_one(selector)
                if title_elem:
                    title = title_elem.get_text(strip=True)
                    break
            
            if not title:
                title = "College Admission Question"
            
            # Try to find answer content
            content_selectors = [
                '.qu-answer',
                '.Answer',
                '[class*="answer"]',
                '.answer_text',
                'div[class*="content"]'
            ]
            
            content = None
            for selector in content_selectors:
                content_elem = soup.select_one(selector)
                if content_elem:
                    content = content_elem.get_text(strip=True)
                    break
            
            if not content:
                # Fallback: get all text content
                content = soup.get_text(strip=True)
            
            # Clean up content
            content = re.sub(r'\s+', ' ', content).strip()
            if len(content) > 2000:
                content = content[:2000] + "..."
            
            # Extract metrics and advice
            metrics = self._extract_metrics_enhanced(content)
            advice = self._extract_advice_enhanced(content)
            
            return {
                'title': title,
                'content': content,
                'metrics': metrics,
                'advice': advice,
                'snapshot_timestamp': snapshot_data['timestamp'],
                'original_url': snapshot_data['original_url']
            }
            
        except Exception as e:
            logger.error(f"    ❌ Error extracting content: {e}")
            return None
    
    def _extract_metrics_enhanced(self, text: str) -> Dict:
        """
        Enhanced metric extraction with more patterns
        """
        metrics = {}
        
        # GPA patterns
        gpa_patterns = [
            r'GPA[:\s]*(\d+\.?\d*)',
            r'grade point average[:\s]*(\d+\.?\d*)',
            r'(\d+\.?\d*)\s*GPA',
            r'(\d+\.?\d*)\s*out of 4\.0',
            r'(\d+\.?\d*)\s*unweighted',
            r'(\d+\.?\d*)\s*weighted'
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
        
        # SAT patterns
        sat_patterns = [
            r'SAT[:\s]*(\d{3,4})',
            r'SAT score[:\s]*(\d{3,4})',
            r'(\d{3,4})\s*SAT',
            r'SAT total[:\s]*(\d{3,4})'
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
            r'(\d+\.?\d*)%?\s*of applicants'
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
        Enhanced advice extraction
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
                sentences = re.split(r'[.!?]+', text)
                for sentence in sentences:
                    if keyword in sentence.lower() and len(sentence.strip()) > 20:
                        advice.append(sentence.strip())
                        break
        
        return advice[:5]
    
    def _remove_duplicate_snapshots(self, snapshots: List[Dict]) -> List[Dict]:
        """
        Remove duplicate snapshots based on original URL
        """
        seen_urls = set()
        unique_snapshots = []
        
        for snapshot in snapshots:
            if snapshot['original_url'] not in seen_urls:
                seen_urls.add(snapshot['original_url'])
                unique_snapshots.append(snapshot)
        
        return unique_snapshots
    
    def scrape_college_admission_data(self, college_name: str, max_snapshots: int = 20) -> List[Dict]:
        """
        Scrape admission data for a specific college from Wayback Machine
        """
        logger.info(f"🎓 Scraping {college_name} admission data from Wayback Machine...")
        
        # Get snapshots
        snapshots = self.search_wayback_snapshots(college_name, max_snapshots)
        logger.info(f"  📸 Found {len(snapshots)} snapshots")
        
        # Scrape content from snapshots
        scraped_content = []
        for i, snapshot in enumerate(snapshots):
            logger.info(f"  📄 Scraping snapshot {i+1}/{len(snapshots)}: {snapshot['timestamp']}")
            
            content = self.scrape_snapshot_content(snapshot)
            if content:
                scraped_content.append(content)
            
            time.sleep(1)  # Be respectful to Wayback Machine
        
        logger.info(f"  ✅ Successfully scraped {len(scraped_content)} pages for {college_name}")
        return scraped_content
    
    def scrape_all_elite_colleges(self) -> Dict:
        """
        Scrape admission data for all elite colleges from Wayback Machine
        """
        elite_colleges = [
            "MIT", "Harvard", "Stanford", "Yale", "Princeton",
            "Columbia", "University of Pennsylvania", "Dartmouth",
            "Brown", "Cornell", "Duke", "Northwestern", "Vanderbilt",
            "Rice", "Emory", "Georgetown", "Carnegie Mellon",
            "New York University", "University of Chicago"
        ]
        
        logger.info(f"🚀 Starting Wayback Machine scraping for {len(elite_colleges)} elite colleges...")
        logger.info(f"📊 Target: 20 snapshots per college = {len(elite_colleges) * 20} total snapshots")
        
        all_data = {}
        total_pages = 0
        
        for i, college in enumerate(elite_colleges):
            logger.info(f"\n{'='*60}")
            logger.info(f"🎓 College {i+1}/{len(elite_colleges)}: {college}")
            logger.info(f"{'='*60}")
            
            try:
                pages = self.scrape_college_admission_data(college, max_snapshots=20)
                all_data[college] = pages
                total_pages += len(pages)
                
                logger.info(f"✅ {college}: {len(pages)} pages collected")
                logger.info(f"📈 Total pages so far: {total_pages}")
                
                # Delay between colleges
                if i < len(elite_colleges) - 1:
                    delay = 3
                    logger.info(f"⏳ Waiting {delay}s before next college...")
                    time.sleep(delay)
                
            except Exception as e:
                logger.error(f"❌ Failed to scrape {college}: {e}")
                all_data[college] = []
                continue
        
        logger.info(f"\n🎉 WAYBACK SCRAPING COMPLETE!")
        logger.info(f"📊 Total pages collected: {total_pages}")
        logger.info(f"🏫 Colleges processed: {len(elite_colleges)}")
        
        return all_data
    
    def save_data(self, data: Dict, filename: str = "backend/data/raw/wayback_quora_data.json"):
        """
        Save scraped data to JSON file
        """
        import os
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"💾 Data saved to {filename}")
        
        # Save summary
        summary = {}
        for college, pages in data.items():
            summary[college] = {
                'page_count': len(pages),
                'metrics_found': sum(1 for page in pages if page.get('metrics')),
                'advice_found': sum(1 for page in pages if page.get('advice')),
                'snapshots_used': len(set(page.get('snapshot_timestamp', '') for page in pages))
            }
        
        summary_file = filename.replace('.json', '_summary.json')
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        
        logger.info(f"📋 Summary saved to {summary_file}")

def main():
    """
    Main function to run the Wayback Machine Quora scraper
    """
    scraper = WaybackQuoraScraper()
    
    # Scrape data for all elite colleges
    logger.info("🚀 Starting Wayback Machine Quora scraping...")
    data = scraper.scrape_all_elite_colleges()
    
    # Save the data
    scraper.save_data(data, "backend/data/raw/wayback_quora_data.json")
    
    # Print final summary
    total_pages = sum(len(pages) for pages in data.values())
    colleges_with_data = sum(1 for pages in data.values() if pages)
    
    logger.info(f"\n🎯 FINAL RESULTS:")
    logger.info(f"📊 Total pages: {total_pages}")
    logger.info(f"🏫 Colleges with data: {colleges_with_data}")
    logger.info(f"📈 Average pages per college: {total_pages/colleges_with_data:.1f}")
    
    # Show sample data for MIT
    if "MIT" in data and data["MIT"]:
        logger.info(f"\n📝 Sample MIT data:")
        sample_page = data["MIT"][0]
        logger.info(f"Title: {sample_page['title']}")
        logger.info(f"Metrics: {sample_page['metrics']}")
        logger.info(f"Advice: {sample_page['advice'][:2]}")

if __name__ == "__main__":
    main()
