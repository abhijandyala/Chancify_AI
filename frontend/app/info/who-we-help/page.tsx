'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, Heart, Target } from 'lucide-react';
import Link from 'next/link';

export default function WhoWeHelpPage() {
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
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Empowering students and families with data-driven insights to make informed college decisions and maximize admission chances.
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
              <p className="text-lg text-gray-300 leading-relaxed">
                We serve high school students, their families, and college counselors who need accurate, data-driven insights to navigate the complex college admission process. Our platform democratizes access to admission intelligence that was previously only available to the privileged few.
              </p>
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
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  Juniors and seniors who need realistic college lists, admission probability assessments, and strategic guidance for their applications. Our platform helps them understand their chances and make informed decisions about where to apply.
                </p>
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
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  Families navigating the college admission process for the first time or seeking better outcomes for subsequent children. We provide transparency and peace of mind during this stressful and expensive process.
                </p>
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
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  High school counselors and independent college consultants who need data-driven tools to better serve their students. Our platform enhances their ability to provide accurate guidance and realistic expectations.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
