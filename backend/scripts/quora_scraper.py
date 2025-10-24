#!/usr/bin/env python3
"""
Quora Scraper for College Admission Data
Scrapes Quora posts about college admissions to gather real insights about
what it takes to get into elite universities.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import quote_plus
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QuoraAdmissionScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.base_url = "https://www.quora.com"
        
    def search_college_admissions(self, college_name, max_posts=50):
        """
        Search for Quora posts about getting into a specific college
        """
        logger.info(f"Searching Quora for {college_name} admission posts...")
        
        # Search queries for different aspects of college admissions
        search_queries = [
            f"how to get into {college_name}",
            f"{college_name} admission requirements",
            f"{college_name} acceptance rate",
            f"what GPA do you need for {college_name}",
            f"{college_name} SAT ACT scores",
            f"{college_name} extracurricular activities",
            f"{college_name} admission tips"
        ]
        
        all_posts = []
        
        for query in search_queries:
            try:
                posts = self._search_quora(query, max_posts // len(search_queries))
                all_posts.extend(posts)
                time.sleep(2)  # Be respectful to Quora
            except Exception as e:
                logger.error(f"Error searching for '{query}': {e}")
                continue
                
        return all_posts
    
    def _search_quora(self, query, max_posts=10):
        """
        Search Quora for a specific query
        """
        search_url = f"{self.base_url}/search?q={quote_plus(query)}"
        
        try:
            response = self.session.get(search_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            posts = []
            
            # Find question/answer elements (Quora's structure may vary)
            question_elements = soup.find_all(['div'], class_=re.compile(r'.*question.*|.*answer.*'))
            
            for element in question_elements[:max_posts]:
                post_data = self._extract_post_data(element)
                if post_data:
                    posts.append(post_data)
                    
            return posts
            
        except Exception as e:
            logger.error(f"Error scraping Quora search: {e}")
            return []
    
    def _extract_post_data(self, element):
        """
        Extract relevant data from a Quora post element
        """
        try:
            # Extract question/title
            title_element = element.find(['h1', 'h2', 'h3'], class_=re.compile(r'.*title.*|.*question.*'))
            title = title_element.get_text(strip=True) if title_element else "No title"
            
            # Extract answer content
            content_element = element.find(['div', 'p'], class_=re.compile(r'.*answer.*|.*content.*'))
            content = content_element.get_text(strip=True) if content_element else "No content"
            
            # Extract metrics (GPA, SAT, ACT, etc.)
            metrics = self._extract_metrics(content)
            
            # Extract advice/tips
            advice = self._extract_advice(content)
            
            return {
                'title': title,
                'content': content[:500] + "..." if len(content) > 500 else content,
                'metrics': metrics,
                'advice': advice,
                'source': 'quora'
            }
            
        except Exception as e:
            logger.error(f"Error extracting post data: {e}")
            return None
    
    def _extract_metrics(self, text):
        """
        Extract numerical metrics from text (GPA, SAT, ACT, etc.)
        """
        metrics = {}
        
        # GPA patterns
        gpa_patterns = [
            r'GPA[:\s]*(\d+\.?\d*)',
            r'grade point average[:\s]*(\d+\.?\d*)',
            r'(\d+\.?\d*)\s*GPA',
            r'(\d+\.?\d*)\s*out of 4\.0'
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
            r'(\d{3,4})\s*SAT'
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
            r'(\d{1,2})\s*ACT'
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
            r'admitted[:\s]*(\d+\.?\d*)%?'
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
    
    def _extract_advice(self, text):
        """
        Extract key advice and tips from the text
        """
        advice_keywords = [
            'extracurricular', 'leadership', 'volunteer', 'research',
            'essay', 'recommendation', 'interview', 'portfolio',
            'awards', 'honors', 'community service', 'sports',
            'music', 'art', 'debate', 'science fair'
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
    
    def scrape_elite_colleges(self):
        """
        Scrape admission data for elite colleges
        """
        elite_colleges = [
            "MIT", "Harvard", "Stanford", "Yale", "Princeton",
            "Columbia", "University of Pennsylvania", "Dartmouth",
            "Brown", "Cornell", "Duke", "Northwestern", "Vanderbilt",
            "Rice", "Emory", "Georgetown", "Carnegie Mellon",
            "New York University", "University of Chicago"
        ]
        
        all_data = {}
        
        for college in elite_colleges:
            logger.info(f"Scraping data for {college}...")
            posts = self.search_college_admissions(college, max_posts=30)
            all_data[college] = posts
            time.sleep(3)  # Be respectful to Quora
        
        return all_data
    
    def save_data(self, data, filename="quora_admission_data.json"):
        """
        Save scraped data to JSON file
        """
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        logger.info(f"Data saved to {filename}")

def main():
    """
    Main function to run the Quora scraper
    """
    scraper = QuoraAdmissionScraper()
    
    # Scrape data for elite colleges
    logger.info("Starting Quora scraping for elite college admission data...")
    data = scraper.scrape_elite_colleges()
    
    # Save the data
    scraper.save_data(data, "backend/data/raw/quora_admission_data.json")
    
    # Print summary
    total_posts = sum(len(posts) for posts in data.values())
    logger.info(f"Scraping complete! Collected {total_posts} posts across {len(data)} colleges.")
    
    # Print sample data for MIT
    if "MIT" in data and data["MIT"]:
        logger.info(f"\nSample MIT data:")
        sample_post = data["MIT"][0]
        logger.info(f"Title: {sample_post['title']}")
        logger.info(f"Metrics: {sample_post['metrics']}")
        logger.info(f"Advice: {sample_post['advice'][:2]}")

if __name__ == "__main__":
    main()
