'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function AdmissionTrendsPage() {
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Admission <span className="text-yellow-400">Trends</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Understanding the current state of college admissions, rolling decisions, and how the landscape is changing for students today.
          </p>
        </motion.div>

        {/* Main Content - Layout 2 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                The Admission <span className="text-yellow-400">Crisis</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                College admissions have become increasingly competitive and unpredictable. Acceptance rates are dropping, application numbers are soaring, and students face more uncertainty than ever before. Our data reveals the real trends behind these changes.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">-15%</div>
                  <div className="text-gray-400">Average acceptance rate decline</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">+40%</div>
                  <div className="text-gray-400">Increase in applications per student</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">$2.1B</div>
                  <div className="text-gray-400">Annual spending on college prep</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Cards Section - Layout 3 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Declining Acceptance Rates</h3>
            <p className="text-gray-300">
              Top universities have seen acceptance rates drop from 20% to under 5% in the past decade. Even state schools are becoming more selective as application volumes increase.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Rolling Admissions Impact</h3>
            <p className="text-gray-300">
              Rolling admissions create a "first-come, first-served" environment where early applicants have significant advantages. Our data shows 30% better outcomes for early applicants.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Application Inflation</h3>
            <p className="text-gray-300">
              Students are applying to more schools than ever, with the average student submitting 8-12 applications. This creates a feedback loop of increased competition and uncertainty.
            </p>
          </div>
        </motion.div>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Key Insights from Our Data</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Geographic Trends</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Students from certain states have 15% higher acceptance rates</li>
                <li>• Rural students face unique challenges in the process</li>
                <li>• International student acceptance rates vary significantly</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Academic Factors</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Test-optional policies have changed the landscape</li>
                <li>• GPA trends show grade inflation impact</li>
                <li>• Extracurriculars matter more than ever</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Stay Ahead of the <span className="text-yellow-400">Trends</span>
          </h3>
          <p className="text-gray-400 mb-8">
            Get personalized insights based on the latest admission trends and data.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
            Get Your Analysis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
