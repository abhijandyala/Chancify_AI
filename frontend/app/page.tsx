'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Logo Bar with Borders */}
      <div className="grid grid-cols-4 border-b border-zinc-800">
        {/* Logo Section */}
        <motion.div 
          className="border-r border-zinc-800 p-6 flex items-center justify-center bg-black"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-0">
              <motion.span 
                className="text-5xl font-bold tracking-tight" 
                style={{ fontFamily: 'Arial, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CA
              </motion.span>
              <motion.div 
                className="w-3 h-14 bg-yellow-400 ml-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </div>
            <motion.span 
              className="text-xs font-bold tracking-widest" 
              style={{ fontFamily: 'Arial, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              CHANCIFY AI
            </motion.span>
          </div>
        </motion.div>

        <HoverBox text="AI" />
        <HoverBox text="Helper" />
        <HoverBox text="Interview" />
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Content */}
        <motion.div 
          className="border-r border-zinc-800 p-12 lg:p-16 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-md">
            <motion.p 
              className="text-amber-600 text-sm mb-8 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              85% prediction accuracy
            </motion.p>

            <motion.h1 
              className="text-4xl lg:text-5xl font-serif mb-12 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I get more accurate predictions when I use{' '}
              <span className="text-yellow-400">Chancify AI</span>. That's the bottom line.
            </motion.h1>

            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <p className="text-xl font-medium mb-1">Student Success Story</p>
              <p className="text-zinc-400 text-sm">College Admissions</p>
            </motion.div>

            <motion.button 
              className="group flex items-center gap-3 px-6 py-3 border border-zinc-700 rounded-full hover:border-zinc-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm tracking-wide">Read The Full Case Study</span>
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
          </div>
        </motion.div>

        {/* Right Video Section */}
        <motion.div 
          className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-zinc-900/50"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(180, 83, 9, 0.2) 0%, transparent 50%, rgba(24, 24, 27, 0.5) 100%)',
                'linear-gradient(135deg, rgba(180, 83, 9, 0.3) 0%, transparent 50%, rgba(24, 24, 27, 0.3) 100%)',
                'linear-gradient(135deg, rgba(180, 83, 9, 0.2) 0%, transparent 50%, rgba(24, 24, 27, 0.5) 100%)',
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {!showVideo ? (
            <>
              {/* Play Button */}
              <motion.button
                onClick={() => setShowVideo(true)}
                className="relative z-10 w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-all duration-300 backdrop-blur-sm bg-black/20"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 28 28" 
                  fill="none" 
                  className="translate-x-[2px]"
                  whileHover={{ scale: 1.1 }}
                >
                  <path d="M8 6L22 14L8 22V6Z" fill="white" fillOpacity="0.9"/>
                </motion.svg>
              </motion.button>
            </>
          ) : (
            <motion.iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/wh2SWrGRpko?autoplay=1"
              title="Chancify's impacts in the Real World"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}