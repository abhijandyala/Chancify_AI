'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SophisticatedBackground from '@/components/ui/SophisticatedBackground';

export default function WhyThisMattersPage() {
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
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Why This <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Matters</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            College admissions have become increasingly opaque, expensive, and unfair. We're revolutionizing the system with data-driven transparency, making admission intelligence accessible to all students regardless of their background or financial resources.
          </motion.p>
        </motion.div>

        {/* Main Content - Layout 3 Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                The College Admission <span className="text-yellow-400">Crisis</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                College admissions have become increasingly opaque, expensive, and unfair. Students spend thousands on consultants and still face rejection from schools they could have gotten into. We're changing that with data-driven transparency.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold">Rising Costs</div>
                    <div className="text-gray-400 text-sm">$50B+ spent annually on college prep</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="h-6 w-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold">Lack of Transparency</div>
                    <div className="text-gray-400 text-sm">Admission criteria often unclear</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold">Inequality</div>
                    <div className="text-gray-400 text-sm">Advantage for wealthy families</div>
                  </div>
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
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Democratize Access</h3>
            <p className="text-gray-300">
              Make college admission intelligence accessible to all students, regardless of their family's financial resources or connections.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Increase Transparency</h3>
            <p className="text-gray-300">
              Provide clear, data-driven insights into admission chances and help students make informed decisions about their college applications.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Reduce Stress</h3>
            <p className="text-gray-300">
              Eliminate the guesswork and anxiety from college applications by providing accurate probability assessments and strategic guidance.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold mb-4">
            Join the <span className="text-yellow-400">Revolution</span>
          </h3>
          <p className="text-gray-400 mb-8">
            Be part of the movement to make college admissions fair, transparent, and accessible for everyone.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
