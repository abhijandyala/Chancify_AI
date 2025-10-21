'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OurUniquenessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
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
            Our <span className="text-yellow-400">Uniqueness</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            What makes our approach different and why we're revolutionizing college admission predictions with unprecedented accuracy and transparency.
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
              Beyond Traditional <span className="text-yellow-400">Predictions</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              While others rely on limited data and outdated methods, we've built the most comprehensive college admission prediction system using real student outcomes, advanced machine learning, and unprecedented data access.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="text-center">
              <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">What Sets Us Apart</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">94.3%</div>
                  <div className="text-gray-400">Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">5,000+</div>
                  <div className="text-gray-400">Real Student Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">2,847</div>
                  <div className="text-gray-400">Colleges Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Cards Section - Layout 2 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8 mb-16"
        >
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <Zap className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Real-World Data Advantage</h3>
                <p className="text-gray-300">
                  Unlike traditional college counselors who rely on limited experience, we analyze thousands of real admission outcomes from Reddit, providing insights based on actual student results rather than assumptions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <Shield className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Transparent Methodology</h3>
                <p className="text-gray-300">
                  We provide detailed explanations of our predictions, showing exactly how we arrived at each assessment. No black box algorithms - just clear, data-driven insights you can trust and understand.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <Star className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-gray-300">
                  Our models continuously improve as we collect more data and outcomes. Every new admission result makes our predictions more accurate, creating a self-improving system that gets better over time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Competitive Advantage Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Why We're Different</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Traditional Counselors</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Limited to personal experience</li>
                <li>• Expensive ($200-500/hour)</li>
                <li>• Subjective assessments</li>
                <li>• No data validation</li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Online Calculators</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Basic GPA/test score only</li>
                <li>• No extracurricular analysis</li>
                <li>• Outdated data</li>
                <li>• No personalization</li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Chancify AI</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 5,000+ real outcomes</li>
                <li>• Comprehensive analysis</li>
                <li>• 94.3% accuracy</li>
                <li>• Affordable & accessible</li>
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
            Experience the <span className="text-yellow-400">Difference</span>
          </h3>
          <p className="text-gray-400 mb-8">
            See why thousands of students trust our data-driven approach to college admissions.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
            Try Chancify AI
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
