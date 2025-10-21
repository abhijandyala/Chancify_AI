'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Code, BarChart3, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';
import DataPipelineScrollTunnel from '@/components/ui/DataPipelineScrollTunnel';

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

        {/* 3D Data Pipeline Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-16"
        >
          <DataPipelineScrollTunnel />
        </motion.div>
      </div>
    </div>
  );
}
