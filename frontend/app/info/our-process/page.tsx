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

        {/* Process Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Process <span className="text-yellow-400">Performance</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Real metrics from our data processing and analysis pipeline
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">2.3s</div>
              <div className="text-gray-300 text-sm">Analysis Time</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">47</div>
              <div className="text-gray-300 text-sm">Data Points</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">99.7%</div>
              <div className="text-gray-300 text-sm">Uptime</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Processing</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Deep Dive Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Technical <span className="text-yellow-400">Deep Dive</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">Data Ingestion Pipeline</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Real-time Reddit Monitoring</div>
                    <div className="text-gray-400 text-sm">Continuous scraping of admission-related posts</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">IPEDS Data Integration</div>
                    <div className="text-gray-400 text-sm">Official college statistics and demographics</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Historical Data Processing</div>
                    <div className="text-gray-400 text-sm">5+ years of admission trends and patterns</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Quality Assurance</div>
                    <div className="text-gray-400 text-sm">Automated validation and error checking</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 4.0 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">AI Analysis Engine</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Multi-Model Ensemble</div>
                    <div className="text-gray-400 text-sm">Random Forest, XGBoost, and Neural Networks</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Feature Engineering</div>
                    <div className="text-gray-400 text-sm">47 optimized data points per student</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Cross-Validation</div>
                    <div className="text-gray-400 text-sm">94.3% accuracy with 5-fold validation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Real-time Processing</div>
                    <div className="text-gray-400 text-sm">2.3 second average analysis time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Process Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Process <span className="text-yellow-400">Flow</span>
            </h3>
            <p className="text-gray-400 text-lg">
              How your data flows through our comprehensive analysis system
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Data Collection</h4>
              <p className="text-gray-300 text-sm mb-4">
                Gather comprehensive student profile data from multiple sources
              </p>
              <div className="text-yellow-400 text-sm font-medium">Step 1</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.6 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">AI Analysis</h4>
              <p className="text-gray-300 text-sm mb-4">
                Process through ensemble machine learning models for prediction
              </p>
              <div className="text-yellow-400 text-sm font-medium">Step 2</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Personalization</h4>
              <p className="text-gray-300 text-sm mb-4">
                Generate tailored insights and recommendations for each student
              </p>
              <div className="text-yellow-400 text-sm font-medium">Step 3</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 5.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Strategic Guidance</h4>
              <p className="text-gray-300 text-sm mb-4">
                Provide actionable strategies and timeline recommendations
              </p>
              <div className="text-yellow-400 text-sm font-medium">Step 4</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
