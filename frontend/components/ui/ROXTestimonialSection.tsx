'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

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
  const [isVideoLoading, setIsVideoLoading] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Marvin Box */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="group relative bg-black border border-white/10 rounded-xl p-8 cursor-pointer overflow-hidden"
          >
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                  <span className="text-black font-bold text-xl">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl group-hover:text-yellow-400 transition-colors duration-300">Marvin</h3>
                  <p className="text-white/60 text-sm">AI Assistant</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Intelligent college admission guidance powered by advanced AI algorithms.
              </p>
            </div>
          </motion.div>

          {/* Help Box */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="group relative bg-black border border-white/10 rounded-xl p-8 cursor-pointer overflow-hidden"
          >
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                  <span className="text-black font-bold text-xl">H</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl group-hover:text-yellow-400 transition-colors duration-300">Help</h3>
                  <p className="text-white/60 text-sm">Support System</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Comprehensive support and guidance throughout your college application journey.
              </p>
            </div>
          </motion.div>

          {/* AI Box */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="group relative bg-black border border-white/10 rounded-xl p-8 cursor-pointer overflow-hidden"
          >
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <span className="text-black font-bold text-xl">AI</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl group-hover:text-yellow-400 transition-colors duration-300">AI</h3>
                  <p className="text-white/60 text-sm">Machine Learning</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Advanced machine learning models trained on real admission data for accurate predictions.
              </p>
            </div>
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

            {/* Video Thumbnail Container */}
            <motion.div 
              className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsVideoLoading(true);
                setShowVideo(true);
                // Reset loading state after a brief delay
                setTimeout(() => setIsVideoLoading(false), 1000);
              }}
            >
              {/* Static Thumbnail Image */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
                {/* Placeholder for video thumbnail - you can replace this with actual thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-gray-800/20 to-black/40" />
                
                {/* Video thumbnail content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="text-white text-lg font-semibold">Chancify AI Interview</div>
                  </div>
                </div>
              </div>

              {/* Premium Play Button Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
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

              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/10 rounded-full blur-xl"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"
        animate={{
          y: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            {/* Blurred Background */}
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-black/60"
            />

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Loading State */}
              {isVideoLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black"
                >
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <div className="text-white/80 text-sm">Loading video...</div>
                  </div>
                </motion.div>
              )}

              {/* YouTube Embed */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/wh2SWrGRpko?autoplay=1&rel=0"
                title="Chancify AI Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsVideoLoading(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
