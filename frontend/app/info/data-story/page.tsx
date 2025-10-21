'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code, BarChart3, Users } from 'lucide-react';
import Link from 'next/link';

export default function DataStoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-yellow-400 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-yellow-400">Data Story</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            How we built a comprehensive database using Reddit scraping, machine learning, and real-world admission data to revolutionize college predictions.
          </p>
        </motion.div>

        {/* Main Content - Layout 1 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Reddit Scraper <span className="text-yellow-400">Revolution</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We built a sophisticated Python scraper that collects real admission stories, stats, and outcomes from r/ApplyingToCollege and r/chanceme. This gives us access to thousands of authentic student experiences that traditional databases miss.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <Database className="h-8 w-8 text-yellow-400" />
              <h3 className="text-xl font-semibold">Data Collection</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li>• 5,000+ Reddit admission posts</li>
              <li>• 2,847 college records from IPEDS</li>
              <li>• 12,847 student profiles</li>
              <li>• Historical data spanning 5+ years</li>
            </ul>
          </div>
        </motion.div>

        {/* Three Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <Code className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Custom Python Scraper</h3>
            <p className="text-gray-300">
              Built with BeautifulSoup and Selenium to extract structured data from Reddit posts, including GPA, test scores, extracurriculars, and admission outcomes.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <BarChart3 className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Data Processing Pipeline</h3>
            <p className="text-gray-300">
              Automated cleaning, normalization, and feature engineering to transform raw Reddit posts into structured data for machine learning models.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <Users className="h-8 w-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Real Student Stories</h3>
            <p className="text-gray-300">
              Capturing authentic experiences from students who share their complete application journey, including rejections, waitlists, and acceptances.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
