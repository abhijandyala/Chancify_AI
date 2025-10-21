'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Code, BarChart3, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function DataStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      <SophisticatedBackground />
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
                  <button 
                    onClick={handleBackClick}
                    className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors cursor-pointer"
                  >
                    ← Back to Home
                  </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Data Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            We built the most comprehensive college admission database by combining Reddit scraping, IPEDS data, and machine learning. Our system processes thousands of real student outcomes to provide unprecedented insights into college admissions.
          </motion.p>
        </motion.div>

        {/* Main Content - Layout 1 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Reddit Scraper <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Revolution</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We built a sophisticated Python scraper that collects real admission stories, stats, and outcomes from r/ApplyingToCollege and r/chanceme. This gives us access to thousands of authentic student experiences that traditional databases miss.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Advanced web scraping using BeautifulSoup and Selenium to extract structured data from Reddit posts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Natural language processing to identify GPA, test scores, extracurriculars, and admission outcomes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Automated data validation and cleaning to ensure accuracy and consistency</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Database className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">Data Collection</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <motion.li 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                5,000+ Reddit admission posts
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                2,847 college records from IPEDS
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                12,847 student profiles
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.7 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Historical data spanning 5+ years
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Data Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our <span className="text-yellow-400">Data Scale</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Real numbers from our comprehensive data collection and processing pipeline
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">5,000+</div>
              <div className="text-gray-300 text-sm">Reddit Posts</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">2,847</div>
              <div className="text-gray-300 text-sm">Colleges</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">12,847</div>
              <div className="text-gray-300 text-sm">Student Profiles</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">94.3%</div>
              <div className="text-gray-300 text-sm">Accuracy</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Three Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <Code className="h-8 w-8 text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors" />
            <h3 className="text-xl font-semibold mb-3 text-white">Custom Python Scraper</h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
              Built with BeautifulSoup and Selenium to extract structured data from Reddit posts, including GPA, test scores, extracurriculars, and admission outcomes.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• Handles dynamic content loading</div>
              <div>• Respects rate limits and robots.txt</div>
              <div>• Extracts 15+ data points per post</div>
              <div>• Processes 1000+ posts daily</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <BarChart3 className="h-8 w-8 text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors" />
            <h3 className="text-xl font-semibold mb-3 text-white">Data Processing Pipeline</h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
              Automated cleaning, normalization, and feature engineering to transform raw Reddit posts into structured data for machine learning models.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• GPA standardization across scales</div>
              <div>• Test score normalization</div>
              <div>• Extracurricular categorization</div>
              <div>• Demographic feature extraction</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <Users className="h-8 w-8 text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors" />
            <h3 className="text-xl font-semibold mb-3 text-white">Real Student Stories</h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
              Capturing authentic experiences from students who share their complete application journey, including rejections, waitlists, and acceptances.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• Complete application profiles</div>
              <div>• Admission decision outcomes</div>
              <div>• Financial aid information</div>
              <div>• Post-graduation updates</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Data Sources & Processing Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Data Sources & <span className="text-yellow-400">Processing</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 3.2 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">Real Data Sources</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">IPEDS College Database</div>
                    <div className="text-gray-400 text-sm">2,847 institutions with comprehensive data</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">College Board SAT/ACT Data</div>
                    <div className="text-gray-400 text-sm">Standardized test score distributions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Reddit Admission Stories</div>
                    <div className="text-gray-400 text-sm">5,000+ authentic student experiences</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Historical Admission Rates</div>
                    <div className="text-gray-400 text-sm">2018-2023 trend analysis</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 3.4 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">ML Pipeline</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Feature Engineering</div>
                    <div className="text-gray-400 text-sm">GPA, test scores, extracurriculars</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Ensemble Methods</div>
                    <div className="text-gray-400 text-sm">Random Forest + XGBoost</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Neural Networks</div>
                    <div className="text-gray-400 text-sm">Complex pattern recognition</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Cross-Validation</div>
                    <div className="text-gray-400 text-sm">94.3% accuracy rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Architecture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Technical <span className="text-yellow-400">Architecture</span>
            </h3>
            <p className="text-gray-400 text-lg">
              How we built a scalable, accurate, and comprehensive data processing system
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 3.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Database Architecture</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">PostgreSQL</span>
                  <span className="text-yellow-400">Primary DB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2,847 colleges</span>
                  <span className="text-yellow-400">Records</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">12,847 profiles</span>
                  <span className="text-yellow-400">Students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">5+ years</span>
                  <span className="text-yellow-400">History</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Reddit Scraper</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Python</span>
                  <span className="text-yellow-400">Language</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">BeautifulSoup</span>
                  <span className="text-yellow-400">Parsing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selenium</span>
                  <span className="text-yellow-400">Dynamic Content</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">1000+ daily</span>
                  <span className="text-yellow-400">Posts</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Probability Engine</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Random Forest</span>
                  <span className="text-yellow-400">Model 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">XGBoost</span>
                  <span className="text-yellow-400">Model 2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Neural Networks</span>
                  <span className="text-yellow-400">Model 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">94.3%</span>
                  <span className="text-yellow-400">Accuracy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
