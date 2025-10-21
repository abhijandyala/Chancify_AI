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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

        {/* Mouse-following elements */}
        <motion.div
          className="absolute w-4 h-4 bg-yellow-400/30 rounded-full blur-sm"
          style={{
            x: mousePosition.x * 100 - 50,
            y: mousePosition.y * 100 - 50,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />

        <motion.div
          className="absolute w-2 h-2 bg-blue-400/40 rounded-full blur-sm"
          style={{
            x: mousePosition.x * 80 - 40,
            y: mousePosition.y * 80 - 40,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
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
            <span className="text-yellow-400 text-sm font-medium">Floating Elements</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Subtle <span className="text-yellow-400">Parallax Effects</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Background elements that float and respond to scroll and mouse movement
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <div className="text-2xl mb-4">🌊</div>
            <h3 className="text-white font-semibold mb-2">Scroll Parallax</h3>
            <p className="text-gray-400 text-sm">Elements move at different speeds based on scroll</p>
          </div>
          
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <div className="text-2xl mb-4">🖱️</div>
            <h3 className="text-white font-semibold mb-2">Mouse Following</h3>
            <p className="text-gray-400 text-sm">Subtle elements that follow your cursor</p>
          </div>
          
          <div className="p-6 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20">
            <div className="text-2xl mb-4">✨</div>
            <h3 className="text-white font-semibold mb-2">Blur Effects</h3>
            <p className="text-gray-400 text-sm">Soft, blurred shapes for depth</p>
          </div>
        </motion.div>

        {/* Interactive demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-16 p-8 border border-gray-800/50 rounded-xl backdrop-blur-sm bg-gray-900/20"
        >
          <h4 className="text-white font-semibold mb-4">Interactive Demo</h4>
          <p className="text-gray-400 text-sm mb-4">
            Move your mouse around and scroll to see the parallax effects in action
          </p>
          <div className="text-yellow-400 text-sm">
            Mouse Position: ({Math.round(mousePosition.x * 100)}%, {Math.round(mousePosition.y * 100)}%)
          </div>
        </motion.div>
      </div>
    </div>
  );
}
