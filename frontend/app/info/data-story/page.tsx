'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Code, BarChart3, Users } from 'lucide-react';
import Link from 'next/link';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function DataStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
          <Link href="/" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
            ← Back to Home
          </Link>
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
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            How we built a comprehensive database using Reddit scraping, machine learning, and real-world admission data to revolutionize college predictions.
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
            <p className="text-lg text-gray-300 leading-relaxed">
              We built a sophisticated Python scraper that collects real admission stories, stats, and outcomes from r/ApplyingToCollege and r/chanceme. This gives us access to thousands of authentic student experiences that traditional databases miss.
            </p>
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

        {/* Three Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid md:grid-cols-3 gap-8"
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
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
              Built with BeautifulSoup and Selenium to extract structured data from Reddit posts, including GPA, test scores, extracurriculars, and admission outcomes.
            </p>
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
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
              Automated cleaning, normalization, and feature engineering to transform raw Reddit posts into structured data for machine learning models.
            </p>
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
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
              Capturing authentic experiences from students who share their complete application journey, including rejections, waitlists, and acceptances.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
