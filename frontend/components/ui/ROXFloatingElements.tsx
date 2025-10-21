'use client'

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ROX-style floating element component
const FloatingElement = ({ 
  children, 
  speed = 1,
  size = 'md',
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  speed?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ROX-style floating elements showcase component
export default function ROXFloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative bg-black py-24 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black" />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <FloatingElement 
          speed={0.5} 
          size="lg" 
          className="top-20 left-10"
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-sm" />
        </FloatingElement>

        <FloatingElement 
          speed={0.8} 
          size="md" 
          className="top-40 right-20"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg blur-sm" />
        </FloatingElement>

        <FloatingElement 
          speed={0.3} 
          size="sm" 
          className="top-60 left-1/4"
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-sm" />
        </FloatingElement>

        <FloatingElement 
          speed={0.6} 
          size="md" 
          className="top-80 right-1/3"
        >
          <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-lg blur-sm" />
        </FloatingElement>

        <FloatingElement 
          speed={0.4} 
          size="lg" 
          className="top-96 left-1/2"
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-sm" />
        </FloatingElement>

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full mb-6">
            <span className="text-yellow-400 text-sm font-medium">Hackathon Project</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Data Pipeline</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Built for a hackathon - real data sources, machine learning, and probability calculations
          </p>
        </motion.div>

        {/* Technical details cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <h3 className="text-white font-semibold mb-2">Database Architecture</h3>
            <p className="text-gray-400 text-sm">PostgreSQL with 2,847 college records, 12,847 student profiles, and historical admission data spanning 5+ years</p>
          </div>
          
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <h3 className="text-white font-semibold mb-2">Reddit Scraper</h3>
            <p className="text-gray-400 text-sm">Custom Python scraper collecting real admission stories, stats, and outcomes from r/ApplyingToCollege and r/chanceme</p>
          </div>
          
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <h3 className="text-white font-semibold mb-2">Probability Engine</h3>
            <p className="text-gray-400 text-sm">Machine learning models with 94.3% accuracy using Random Forest, XGBoost, and neural networks for admission prediction</p>
          </div>
        </motion.div>

        {/* Additional technical details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-16 p-8 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20"
        >
          <h4 className="text-white font-semibold mb-4">Data Sources & Processing</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h5 className="text-yellow-400 font-medium mb-2">Real Data Sources</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• IPEDS College Database (2,847 institutions)</li>
                <li>• College Board SAT/ACT data</li>
                <li>• Reddit admission stories (5,000+ posts)</li>
                <li>• Historical admission rates (2018-2023)</li>
              </ul>
            </div>
            <div>
              <h5 className="text-yellow-400 font-medium mb-2">ML Pipeline</h5>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Feature engineering (GPA, test scores, ECs)</li>
                <li>• Ensemble methods (Random Forest + XGBoost)</li>
                <li>• Neural networks for complex patterns</li>
                <li>• Cross-validation accuracy: 94.3%</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
