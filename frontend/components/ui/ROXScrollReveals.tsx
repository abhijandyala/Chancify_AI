'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ROX-inspired scroll reveal data
const SCROLL_REVEAL_DATA = [
  {
    id: 'data-sources',
    title: 'Data Sources',
    subtitle: 'Multi-source Integration',
    description: 'We aggregate data from 25+ sources including IPEDS, College Board, and real-time admission data to ensure comprehensive coverage.',
    stats: '25+ Sources',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'college-db',
    title: 'College Database',
    subtitle: 'Comprehensive Coverage',
    description: 'Our database contains detailed information on over 2,800 colleges with historical admission data spanning multiple years.',
    stats: '2,847 Colleges',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'ai-engine',
    title: 'AI Analysis Engine',
    subtitle: 'Machine Learning',
    description: 'Our proprietary AI engine uses advanced machine learning algorithms to analyze student profiles and predict admission chances.',
    stats: '94.3% Accuracy',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'application',
    title: 'Chancify AI',
    subtitle: 'Student Analysis',
    description: 'The final application layer that provides students with personalized insights and actionable recommendations.',
    stats: '12,847 Students',
    color: 'from-green-500 to-green-600'
  }
];

// ROX-style scroll reveal component
const ScrollRevealItem = ({ data, index }: { data: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl border border-gray-800/50 backdrop-blur-md bg-gradient-to-br from-gray-900/50 to-black/50 hover:border-gray-700/50 transition-all duration-300">
        {/* Gradient accent */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${data.color} rounded-t-2xl`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Stats badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className={`inline-block px-3 py-1 bg-gradient-to-r ${data.color} rounded-full mb-4`}
          >
            <span className="text-white text-sm font-semibold">{data.stats}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {data.title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="text-yellow-400 font-semibold mb-4"
          >
            {data.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="text-gray-300 text-sm leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>

        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${data.color} blur-xl`}
        />
      </div>
    </motion.div>
  );
};

// Main component
export default function ROXScrollReveals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={containerRef}
      className="relative bg-black py-24"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full mb-6">
            <span className="text-yellow-400 text-sm font-medium">Chancify AI</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">AI Architecture</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Scroll to discover how our multi-layered system processes and analyzes your data
          </p>
        </motion.div>

        {/* Scroll reveal items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SCROLL_REVEAL_DATA.map((data, index) => (
            <ScrollRevealItem key={data.id} data={data} index={index} />
          ))}
        </div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
          <div className="flex justify-center gap-2">
            {SCROLL_REVEAL_DATA.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="w-2 h-2 bg-yellow-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
