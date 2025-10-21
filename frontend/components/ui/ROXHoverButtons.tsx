'use client'

import React from 'react';
import { motion } from 'framer-motion';

// ROX-style hover button component
const HoverButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border border-yellow-400/50",
    secondary: "bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gray-700/50",
    outline: "bg-transparent text-yellow-400 border border-yellow-400/50 hover:bg-yellow-400/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      {...props}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

// ROX-style button showcase component
export default function ROXHoverButtons() {
  return (
    <div className="relative bg-black py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full mb-6">
            <span className="text-yellow-400 text-sm font-medium">Interactive Elements</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            ROX-Style <span className="text-yellow-400">Hover Effects</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Precise hover animations with scale, glow, and shine effects
          </p>
        </motion.div>

        {/* Button showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center gap-6"
        >
          <HoverButton variant="primary" size="lg">
            Get Started
          </HoverButton>
          
          <HoverButton variant="secondary" size="md">
            Learn More
          </HoverButton>
          
          <HoverButton variant="outline" size="md">
            Contact Sales
          </HoverButton>
          
          <HoverButton variant="primary" size="sm">
            Try Demo
          </HoverButton>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-white font-semibold mb-2">Precise Scale</h3>
            <p className="text-gray-400 text-sm">Smooth 1.05x scale on hover</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="text-white font-semibold mb-2">Glow Effects</h3>
            <p className="text-gray-400 text-sm">Subtle glow with gradient overlay</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">💫</div>
            <h3 className="text-white font-semibold mb-2">Shine Animation</h3>
            <p className="text-gray-400 text-sm">Sweeping shine effect on hover</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
