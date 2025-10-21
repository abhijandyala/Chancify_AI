'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, Heart, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function WhoWeHelpPage() {
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
            Who We <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Help</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            We serve students, families, and counselors with comprehensive data-driven insights to make informed college decisions. Our platform democratizes access to admission intelligence that was previously only available to the privileged few.
          </motion.p>
        </motion.div>

        {/* Main Content - Layout 2 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Students and Families <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Deserve Better</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We serve high school students, their families, and college counselors who need accurate, data-driven insights to navigate the complex college admission process. Our platform democratizes access to admission intelligence that was previously only available to the privileged few.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Students from all backgrounds seeking realistic college admission assessments</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Families navigating the complex and expensive college application process</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Counselors and advisors who need data-driven tools to better serve their students</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Our Community</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="text-3xl font-bold text-yellow-400">12,847</div>
                    <div className="text-gray-300">Students Helped</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    <div className="text-3xl font-bold text-yellow-400">94.3%</div>
                    <div className="text-gray-300">Accuracy Rate</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Three Cards Section - Layout 2 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="h-8 w-8 text-yellow-400 mt-1 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">High School Students</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
                  Juniors and seniors who need realistic college lists, admission probability assessments, and strategic guidance for their applications. Our platform helps them understand their chances and make informed decisions about where to apply.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Realistic college list building</div>
                  <div>• Admission probability assessments</div>
                  <div>• Strategic application guidance</div>
                  <div>• Scholarship opportunity identification</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="h-8 w-8 text-yellow-400 mt-1 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Parents and Families</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
                  Families navigating the college admission process for the first time or seeking better outcomes for subsequent children. We provide transparency and peace of mind during this stressful and expensive process.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Financial planning and cost analysis</div>
                  <div>• Timeline and deadline management</div>
                  <div>• Application strategy optimization</div>
                  <div>• Stress reduction through transparency</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Target className="h-8 w-8 text-yellow-400 mt-1 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">College Counselors</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
                  High school counselors and independent college consultants who need data-driven tools to better serve their students. Our platform enhances their ability to provide accurate guidance and realistic expectations.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Data-driven student assessments</div>
                  <div>• College fit analysis tools</div>
                  <div>• Trend analysis and reporting</div>
                  <div>• Professional development resources</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Impact Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our <span className="text-yellow-400">Impact</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Real results from students and families who have used our platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">$2.3M</div>
              <div className="text-gray-300 text-sm">Scholarships Found</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">1,247</div>
              <div className="text-gray-300 text-sm">Students Helped</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 text-center"
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</div>
              <div className="text-gray-300 text-sm">User Rating</div>
            </motion.div>
          </div>
        </motion.div>

        {/* User Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Success <span className="text-yellow-400">Stories</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 3.8 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Sarah, High School Senior</h4>
              <p className="text-gray-300 text-sm mb-4">
                "Chancify helped me find 8 perfect-fit colleges I never considered. Got into my dream school with a full scholarship!"
              </p>
              <div className="text-yellow-400 text-sm font-medium">Accepted to Stanford</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">The Johnson Family</h4>
              <p className="text-gray-300 text-sm mb-4">
                "As first-generation college parents, we were lost. Chancify gave us clarity and saved us $15,000 in application fees."
              </p>
              <div className="text-yellow-400 text-sm font-medium">Saved $15,000</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 4.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Ms. Rodriguez, Counselor</h4>
              <p className="text-gray-300 text-sm mb-4">
                "This tool has revolutionized how I help my students. The data is incredibly accurate and saves me hours of research."
              </p>
              <div className="text-yellow-400 text-sm font-medium">200+ Students Helped</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Services Breakdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              What We <span className="text-yellow-400">Provide</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Comprehensive services tailored to each user group's unique needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 4.6 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">For Students</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Personalized College Lists</div>
                    <div className="text-gray-400 text-sm">AI-generated recommendations based on your profile</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Admission Probability Calculator</div>
                    <div className="text-gray-400 text-sm">Real-time chances for each college</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Scholarship Matching</div>
                    <div className="text-gray-400 text-sm">Find opportunities you qualify for</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Application Timeline</div>
                    <div className="text-gray-400 text-sm">Personalized deadlines and milestones</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 4.8 }}
            >
              <h4 className="text-xl font-semibold text-yellow-400 mb-6">For Families & Counselors</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Financial Planning Tools</div>
                    <div className="text-gray-400 text-sm">Cost analysis and aid estimation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Progress Tracking</div>
                    <div className="text-gray-400 text-sm">Monitor application status and deadlines</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Data-Driven Insights</div>
                    <div className="text-gray-400 text-sm">Trends and patterns in admissions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Professional Resources</div>
                    <div className="text-gray-400 text-sm">Training and support materials</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
