'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Heart, Target } from 'lucide-react';
import Link from 'next/link';

export default function WhoWeHelpPage() {
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
            Who We <span className="text-yellow-400">Help</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering students and families with data-driven insights to make informed college decisions and maximize admission chances.
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
                Students and Families <span className="text-yellow-400">Deserve Better</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We serve high school students, their families, and college counselors who need accurate, data-driven insights to navigate the complex college admission process. Our platform democratizes access to admission intelligence that was previously only available to the privileged few.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-center">
                <Users className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Our Community</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">12,847</div>
                    <div className="text-gray-400">Students Helped</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">94.3%</div>
                    <div className="text-gray-400">Accuracy Rate</div>
                  </div>
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
          className="space-y-8"
        >
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <GraduationCap className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">High School Students</h3>
                <p className="text-gray-300">
                  Juniors and seniors who need realistic college lists, admission probability assessments, and strategic guidance for their applications. Our platform helps them understand their chances and make informed decisions about where to apply.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <Heart className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Parents and Families</h3>
                <p className="text-gray-300">
                  Families navigating the college admission process for the first time or seeking better outcomes for subsequent children. We provide transparency and peace of mind during this stressful and expensive process.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-6">
              <Target className="h-8 w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">College Counselors</h3>
                <p className="text-gray-300">
                  High school counselors and independent college consultants who need data-driven tools to better serve their students. Our platform enhances their ability to provide accurate guidance and realistic expectations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
