'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

function HoverBox({ children, text }: { children?: React.ReactNode; text?: string }) {
  return (
    <motion.div
      className="border-r border-zinc-800 p-6 flex items-center justify-center relative overflow-hidden cursor-pointer group"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle dot pattern that becomes more visible on hover */}
      <motion.div
        className="absolute inset-0 opacity-5 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '12px 12px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      {/* Subtle background overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {text ? (
        <motion.span 
          className="text-2xl font-medium tracking-wide relative z-10 group-hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {text}
        </motion.span>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </motion.div>
  );
}

export default function ROXTestimonialSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Company Logos Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.3 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Marvin Box */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer overflow-hidden"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">Marvin</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">AI Assistant</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                Intelligent college admission guidance powered by advanced AI algorithms.
              </p>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </motion.div>

          {/* Help Box */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer overflow-hidden"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-green-300 transition-colors duration-300">Help</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Support System</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                Comprehensive support and guidance throughout your college application journey.
              </p>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </motion.div>

          {/* AI Box */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer overflow-hidden"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">AI</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-yellow-300 transition-colors duration-300">AI</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Machine Learning</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                Advanced machine learning models trained on real admission data for accurate predictions.
              </p>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ amount: 0.3 }}
            className="space-y-8"
          >
            {/* Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ amount: 0.3 }}
              className="text-yellow-400 text-lg font-semibold"
            >
              85% prediction accuracy
            </motion.div>

            {/* Main Quote */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ amount: 0.3 }}
              className="text-3xl lg:text-5xl font-bold text-white leading-tight"
            >
              I get more accurate predictions when I use{' '}
              <span className="text-yellow-400">Chancify AI</span>. That's the bottom line.
            </motion.h2>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ amount: 0.3 }}
              className="space-y-1"
            >
              <div className="text-white text-lg font-medium">Student Success Story</div>
              <div className="text-gray-400 text-sm">College Admissions</div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ amount: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 border border-white/20 hover:border-white/40 rounded-full text-white hover:text-yellow-400 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">Read The Full Case Study</span>
              <motion.div
                className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-zinc-500 transition-all"
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="translate-x-[-1px]">
                  <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ amount: 0.3 }}
            className="relative"
          >
            {/* Dramatic Lighting Effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {/* Diagonal light streaks */}
              <motion.div
                className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-yellow-600/10 to-transparent rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-bl from-yellow-500/15 via-yellow-400/5 to-transparent rounded-full blur-2xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-yellow-600/10 via-yellow-400/5 to-transparent rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50">
              {/* YouTube Embed */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/wh2SWrGRpko"
                title="Chancify's impacts in the Real World"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Premium Play Button Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/5 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                >
                  {/* Outer ring */}
                  <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-yellow-400/60 transition-colors duration-300">
                    {/* Inner play button */}
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/30 transition-colors duration-300" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/5 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </section>
  )
}
