'use client'

import React from 'react';
import { motion } from 'framer-motion';

// ROX-inspired logo data
const LOGO_DATA = [
  { name: 'Harvard', logo: '🎓' },
  { name: 'MIT', logo: '🔬' },
  { name: 'Stanford', logo: '🌲' },
  { name: 'Yale', logo: '📚' },
  { name: 'Princeton', logo: '🐅' },
  { name: 'Columbia', logo: '🦁' },
  { name: 'Caltech', logo: '🚀' },
  { name: 'Duke', logo: '🏀' },
  { name: 'Northwestern', logo: '💜' },
  { name: 'Cornell', logo: '🌽' },
  { name: 'Brown', logo: '🐻' },
  { name: 'Dartmouth', logo: '🌿' }
];

// ROX-style logo marquee component
export default function ROXLogoMarquee() {
  return (
    <div className="relative bg-black py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-black to-gray-900/50" />
      
      {/* Marquee container */}
      <div className="relative">
        {/* First marquee */}
        <motion.div
          animate={{ x: [0, -100 * LOGO_DATA.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-16 whitespace-nowrap"
        >
          {LOGO_DATA.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            >
              <span className="text-2xl">{logo.logo}</span>
              <span className="text-lg font-semibold">{logo.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Second marquee (reverse direction) */}
        <motion.div
          animate={{ x: [-100 * LOGO_DATA.length, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-16 whitespace-nowrap mt-8"
        >
          {LOGO_DATA.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            >
              <span className="text-2xl">{logo.logo}</span>
              <span className="text-lg font-semibold">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Overlay gradients for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
}
