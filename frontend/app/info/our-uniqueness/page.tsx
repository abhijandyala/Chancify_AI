'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function OurUniquenessPage() {
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
                  <div className="text-2xl font-bold text-yellow-400">81.8%</div>
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
                <li>• 81.8% ROC-AUC accuracy</li>
                <li>• Affordable & accessible</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Competitive Advantage Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our <span className="text-yellow-400">Advantage</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Key metrics that set us apart from traditional college counseling
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">10x</div>
              <div className="text-gray-300 text-sm">More Data</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-300 text-sm">Cost Savings</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Availability</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
              <div className="text-gray-300 text-sm">Scalability</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Innovation Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Innovation <span className="text-yellow-400">Deep Dive</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">Reddit Data Advantage</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Real Student Outcomes</div>
                    <div className="text-gray-400 text-sm">5,000+ authentic admission stories with complete profiles</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Unfiltered Truth</div>
                    <div className="text-gray-400 text-sm">Students share honest experiences, including rejections and waitlists</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Recent Data</div>
                    <div className="text-gray-400 text-sm">Continuously updated with current admission cycles</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Diverse Perspectives</div>
                    <div className="text-gray-400 text-sm">Students from all backgrounds and geographic locations</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 4.0 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">Advanced AI Models</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Ensemble Learning</div>
                    <div className="text-gray-400 text-sm">Multiple models working together for maximum accuracy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Feature Engineering</div>
                    <div className="text-gray-400 text-sm">47 optimized data points per student profile</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Continuous Learning</div>
                    <div className="text-gray-400 text-sm">Models improve with each new data point</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Real-time Processing</div>
                    <div className="text-gray-400 text-sm">Instant analysis and personalized recommendations</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Unique Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Unique <span className="text-yellow-400">Features</span>
            </h3>
            <p className="text-gray-400 text-lg">
              What makes our approach fundamentally different and more effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Reddit Data Advantage</h4>
              <p className="text-gray-300 text-sm mb-4">
                The only platform using real student outcomes from Reddit to provide authentic, unfiltered admission insights.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Exclusive Data Source</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.6 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Advanced AI Models</h4>
              <p className="text-gray-300 text-sm mb-4">
                Ensemble machine learning with 81.8% ROC-AUC, combining Random Forest, XGBoost, and Neural Networks.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Cutting-Edge Technology</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Personalized Strategy</h4>
              <p className="text-gray-300 text-sm mb-4">
                Tailored recommendations based on your unique profile, not generic advice that applies to everyone.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Individual Focus</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
