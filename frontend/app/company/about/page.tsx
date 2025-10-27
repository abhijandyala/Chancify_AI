'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, Code, Target, School, Calendar, Zap, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-black" />
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Navigation */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link href="/" className="font-black text-xl text-white">
              Chancify AI
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Company
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            About Chancify AI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/70 leading-relaxed mb-8"
          >
            Built by passionate 10th graders at Marvin Ridge High School, Chancify AI democratizes college admissions through advanced AI-powered prediction tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/home">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full">
                Try Our Platform
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">3</div>
            <div className="text-white/60 text-sm font-medium">Core Team Members</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">6 Months</div>
            <div className="text-white/60 text-sm font-medium">Development Time</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">10th Grade</div>
            <div className="text-white/60 text-sm font-medium">Marvin Ridge High School</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-white/60 text-sm font-medium">Free Platform</div>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Chancify AI was born from a simple observation: college admissions felt like a black box. As 10th graders at Marvin Ridge High School, we saw our peers struggling to understand their chances of getting into their dream schools. The process seemed unfair, opaque, and stressful.
            </p>
            <p>
              We decided to change that. Over six months, we built an AI-powered platform that uses real college admission data to predict admission chances with 85% accuracy. Our hybrid machine learning model combines traditional formula-based calculations with advanced algorithms trained on thousands of real admission outcomes.
            </p>
            <p>
              What started as a school project has grown into a comprehensive platform that helps students build stronger profiles, find better college matches, and navigate the complex world of college admissions with confidence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-white/70 text-lg">Three passionate students making college admissions accessible to everyone</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Abhi Jandyala</h3>
            <p className="text-white/70">Lead Developer & AI Engineer</p>
            <p className="text-white/60 text-sm mt-4">Passionate about machine learning and building scalable web applications. Leads the backend development and AI model training.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Rahul Vuta</h3>
            <p className="text-white/70">Frontend Developer & UI/UX Designer</p>
            <p className="text-white/60 text-sm mt-4">Specializes in creating beautiful, responsive user interfaces and ensuring the best user experience across all devices.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Bhanu Vanukuri</h3>
            <p className="text-white/70">Data Scientist & Product Manager</p>
            <p className="text-white/60 text-sm mt-4">Focuses on data analysis, college admission research, and ensuring our predictions are accurate and helpful for students.</p>
          </motion.div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Technology</h2>
          <p className="text-white/70 text-lg">Built with modern tools and cutting-edge AI</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Next.js & React</h3>
            <p className="text-white/60 text-sm">Modern frontend framework for fast, responsive user interfaces</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Python & FastAPI</h3>
            <p className="text-white/60 text-sm">High-performance backend API with machine learning capabilities</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Machine Learning</h3>
            <p className="text-white/60 text-sm">Scikit-learn models trained on real college admission data</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <School className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real Data</h3>
            <p className="text-white/60 text-sm">IPEDS 2023 data and College Scorecard integration</p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center">
            <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              To level the playing field in college admissions by providing every student with access to advanced AI-powered tools and insights. We believe that every student deserves to understand their chances and make informed decisions about their educational future, regardless of their background or access to expensive college counseling services.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Chancify AI. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
