'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ROX-inspired hover card data
const HOVER_CARDS_DATA = [
  {
    id: 'data-sources',
    title: 'Data Sources',
    subtitle: 'Multi-source Integration',
    description: '25+ Sources, Real-time Sync, API Integrations',
    details: 'We aggregate data from multiple sources including IPEDS, College Board, and real-time admission data to ensure comprehensive coverage.',
    icon: '📊',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20'
  },
  {
    id: 'college-db',
    title: 'College Database',
    subtitle: 'Comprehensive Data',
    description: '2,847 Colleges, Historical Data, Admission Trends',
    details: 'Our database contains detailed information on over 2,800 colleges with historical admission data spanning multiple years.',
    icon: '🏛️',
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20'
  },
  {
    id: 'ai-engine',
    title: 'AI Analysis Engine',
    subtitle: 'Machine Learning',
    description: '94.3% Accuracy, Neural Networks, Pattern Recognition',
    details: 'Our proprietary AI engine uses advanced machine learning algorithms to analyze student profiles and predict admission chances.',
    icon: '🤖',
    color: 'from-yellow-500/20 to-yellow-600/20',
    borderColor: 'border-yellow-500/30',
    glowColor: 'shadow-yellow-500/20'
  },
  {
    id: 'application',
    title: 'Chancify AI',
    subtitle: 'Student Analysis',
    description: '12,847 Students, Holistic Analysis, Real-time Results',
    details: 'The final application layer that provides students with personalized insights and actionable recommendations.',
    icon: '🎓',
    color: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-500/30',
    glowColor: 'shadow-green-500/20'
  }
];

// ROX-inspired hover card component
const HoverCard = ({ data, index }: { data: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // ROX-style motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ROX-style 3D transform container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Main card */}
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`
            relative p-8 rounded-2xl border backdrop-blur-md
            bg-gradient-to-br ${data.color}
            ${data.borderColor}
            ${isHovered ? `shadow-2xl ${data.glowColor}` : 'shadow-lg'}
            transition-all duration-300 ease-out
            cursor-pointer
            overflow-hidden
          `}
        >
          {/* ROX-style background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="text-4xl mb-4"
            >
              {data.icon}
            </motion.div>

            {/* Title */}
            <motion.h3
              animate={{
                color: isHovered ? '#D4AF37' : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold mb-2"
            >
              {data.title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
              className="text-yellow-400 font-semibold mb-3"
            >
              {data.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 text-sm mb-4"
            >
              {data.description}
            </motion.p>

            {/* Details (appears on hover) */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                {data.details}
              </p>
            </motion.div>

            {/* ROX-style hover indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 origin-left"
              style={{ width: '100%' }}
            />
          </div>

          {/* ROX-style glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0,
              scale: isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${data.color} blur-xl`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main component
export default function ROXHoverCards() {
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
            Hover over each component to explore how our multi-layered system processes and analyzes your data
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOVER_CARDS_DATA.map((data, index) => (
            <HoverCard key={data.id} data={data} index={index} />
          ))}
        </div>

        {/* ROX-style bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="text-gray-400 text-sm mb-2">Hover to explore</div>
          <div className="flex justify-center gap-2">
            {HOVER_CARDS_DATA.map((_, index) => (
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
