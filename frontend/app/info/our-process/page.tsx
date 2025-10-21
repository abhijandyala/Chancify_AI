'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Database, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function OurProcessPage() {
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
            Our <span className="text-yellow-400">Process</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            How we analyze student profiles and predict admission chances using advanced machine learning and comprehensive data analysis.
          </p>
        </motion.div>

        {/* Main Content - Mixed Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Data-Driven <span className="text-yellow-400">Analysis</span>
            </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our proprietary AI engine processes thousands of data points to provide accurate admission predictions. We combine traditional metrics with real-world outcomes from Reddit, IPEDS data, and historical patterns to give you the most reliable assessment possible.
          </p>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8 mb-16"
        >
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Data Collection & Processing</h3>
                <p className="text-gray-300 mb-4">
                  We gather comprehensive data from multiple sources including Reddit posts, IPEDS database, and historical admission records. Our automated pipeline processes and cleans this data to ensure accuracy.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• GPA and test score normalization</li>
                  <li>• Extracurricular activity categorization</li>
                  <li>• Demographic and geographic factors</li>
                  <li>• Historical admission pattern analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Machine Learning Analysis</h3>
                <p className="text-gray-300 mb-4">
                  Our ensemble of machine learning models analyzes your profile against thousands of similar students to predict admission outcomes. We use Random Forest, XGBoost, and neural networks for maximum accuracy.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• 94.3% cross-validation accuracy</li>
                  <li>• Ensemble method for robust predictions</li>
                  <li>• Feature importance analysis</li>
                  <li>• Confidence interval calculations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Personalized Recommendations</h3>
                <p className="text-gray-300 mb-4">
                  Based on your analysis, we provide actionable recommendations to improve your admission chances, including strategic college list building and application optimization.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Reach, match, and safety school recommendations</li>
                  <li>• Application strategy optimization</li>
                  <li>• Timeline and deadline management</li>
                  <li>• Scholarship and financial aid insights</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Get Your <span className="text-yellow-400">Analysis?</span>
          </h3>
          <p className="text-gray-400 mb-8">
            See how our process can help you make informed college decisions.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
            Start Analysis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
