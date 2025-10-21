'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function AdmissionTrendsPage() {
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

        {/* Trend Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Current <span className="text-yellow-400">Trends</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Key statistics and patterns in college admissions today
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">-23%</div>
              <div className="text-gray-300 text-sm">Acceptance Rate Drop</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">67%</div>
              <div className="text-gray-300 text-sm">Test Optional</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">+45%</div>
              <div className="text-gray-300 text-sm">Application Volume</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">$89B</div>
              <div className="text-gray-300 text-sm">Total Applications</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Rolling Admissions Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Rolling Admissions <span className="text-yellow-400">Explained</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">How Rolling Admissions Work</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Continuous Review</div>
                    <div className="text-gray-400 text-sm">Applications reviewed as they arrive, not in batches</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">First-Come Advantage</div>
                    <div className="text-gray-400 text-sm">Earlier applications have better chances</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Space Availability</div>
                    <div className="text-gray-400 text-sm">Acceptance rates decrease as spots fill up</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Faster Decisions</div>
                    <div className="text-gray-400 text-sm">2-8 week response times vs months</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 4.0 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">Strategic Timing</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Early Fall Advantage</div>
                    <div className="text-gray-400 text-sm">September applications have 40% higher acceptance rates</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Deadline Pressure</div>
                    <div className="text-gray-400 text-sm">Last-minute applications face stiffer competition</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Quality vs Speed</div>
                    <div className="text-gray-400 text-sm">Balance application timing with preparation quality</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Multiple Cycles</div>
                    <div className="text-gray-400 text-sm">Some schools have multiple rolling periods</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trend Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trend <span className="text-yellow-400">Analysis</span>
            </h3>
            <p className="text-gray-400 text-lg">
              What the data tells us about the future of college admissions
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
                <TrendingDown className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Acceptance Rate Declines</h4>
              <p className="text-gray-300 text-sm mb-4">
                Top-tier schools have seen 23% average decline in acceptance rates over the past 5 years, with some reaching single digits.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Trend: Downward</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.6 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Early Decision Impact</h4>
              <p className="text-gray-300 text-sm mb-4">
                Early decision applications have increased 45%, with acceptance rates 2-3x higher than regular decision pools.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Trend: Upward</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Holistic Review Trends</h4>
              <p className="text-gray-300 text-sm mb-4">
                Schools are placing greater emphasis on essays, extracurriculars, and personal qualities over pure academic metrics.
              </p>
              <div className="text-yellow-400 text-sm font-medium">Trend: Evolving</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
