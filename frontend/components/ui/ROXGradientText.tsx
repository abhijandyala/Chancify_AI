'use client'

import React from 'react';
import { motion } from 'framer-motion';

// ROX-style gradient text component
const GradientText = ({ 
  children, 
  className = '',
  animate = true,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  [key: string]: any;
}) => {
  if (!animate) {
    return (
      <span 
        className={`bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ROX-style gradient text showcase component
export default function ROXGradientText() {
  return (
    <div className="relative bg-black py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full mb-6">
            <span className="text-yellow-400 text-sm font-medium">Animated Text</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            <GradientText className="text-6xl">
              Chancify AI
            </GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Smooth gradient text animations that shift colors seamlessly
          </p>
        </motion.div>

        {/* Gradient text examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Large heading */}
          <div>
            <h3 className="text-4xl font-bold mb-4">
              <GradientText className="text-5xl">
                Revenue Agents for Students
              </GradientText>
            </h3>
            <p className="text-gray-400 text-lg">
              AI-powered college admission predictions
            </p>
          </div>

          {/* Medium heading */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">
              <GradientText className="text-3xl">
                Fastest Time-to-ROI
              </GradientText>
            </h4>
            <p className="text-gray-400">
              Get results in minutes, not months
            </p>
          </div>

          {/* Small heading */}
          <div>
            <h5 className="text-xl font-medium mb-4">
              <GradientText className="text-2xl">
                Enterprise Ready
              </GradientText>
            </h5>
            <p className="text-gray-400 text-sm">
              Built for scale and security
            </p>
          </div>
        </motion.div>

        {/* Static vs Animated comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="text-center p-6 border border-gray-800 rounded-xl">
            <h6 className="text-lg font-semibold text-white mb-4">Static Gradient</h6>
            <GradientText animate={false} className="text-2xl">
              Static Text
            </GradientText>
          </div>
          
          <div className="text-center p-6 border border-gray-800 rounded-xl">
            <h6 className="text-lg font-semibold text-white mb-4">Animated Gradient</h6>
            <GradientText animate={true} className="text-2xl">
              Animated Text
            </GradientText>
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🌈</div>
            <h3 className="text-white font-semibold mb-2">Smooth Transitions</h3>
            <p className="text-gray-400 text-sm">3-second color cycling</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="text-white font-semibold mb-2">Custom Gradients</h3>
            <p className="text-gray-400 text-sm">Yellow to gold spectrum</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-2">Performance</h3>
            <p className="text-gray-400 text-sm">Hardware-accelerated</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
