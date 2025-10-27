'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'

interface VideoShowcaseProps {
  videoSrc?: string
  testimonial?: string
  attribution?: string
  title?: string
  highlight?: string
  ctaText?: string
}

export default function ROXVideoShowcase({
  videoSrc = "https://www.youtube.com/embed/wh2SWrGRpko",
  testimonial = "I get more accurate predictions when I use Chancify AI. That's the bottom line.",
  attribution = "Student Success Story",
  title = "VP of Admissions",
  highlight = "85% prediction accuracy",
  ctaText = "Read The Full Case Study"
}: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Company Logos Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="flex items-center justify-center space-x-8 text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            <span className="text-sm font-medium">ChancifyAI</span>
          </div>
          <div className="w-px h-4 bg-gray-600"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            <span className="text-sm font-medium">Education</span>
          </div>
          <div className="w-px h-4 bg-gray-600"></div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            <span className="text-sm font-medium">AI</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-yellow-400 text-lg font-semibold"
            >
              {highlight}
            </motion.div>

            {/* Main Quote */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl lg:text-5xl font-bold text-white leading-tight"
            >
              {testimonial}
            </motion.h2>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-1"
            >
              <div className="text-white text-lg font-medium">{attribution}</div>
              <div className="text-gray-400 text-sm">{title}</div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 border border-white/20 hover:border-white/40 rounded-full text-white hover:text-yellow-400 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Dramatic Lighting Effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {/* Diagonal light streaks */}
              <motion.div
                style={{ y }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-yellow-600/10 to-transparent rounded-full blur-3xl"
              />
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
                className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-bl from-yellow-500/15 via-yellow-400/5 to-transparent rounded-full blur-2xl"
              />
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
                className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-yellow-600/10 via-yellow-400/5 to-transparent rounded-full blur-2xl"
              />
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50">
              {/* YouTube Embed */}
              <iframe
                className="w-full h-full"
                src={videoSrc}
                title="Chancify AI Demo"
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
        style={{ y }}
        className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/5 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"
      />
    </section>
  )
}
