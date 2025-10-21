'use client'

import React from 'react';

export default function SophisticatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        fill="none"
      >
        {/* Base Grid */}
        <defs>
          <pattern
            id="baseGrid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
          </pattern>
          
          {/* Star Pattern */}
          <pattern
            id="starPattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Central Star */}
            <g transform="translate(100, 100)">
              {/* Outer star lines */}
              <path
                d="M 0 -60 L 20 -20 L 60 0 L 20 20 L 0 60 L -20 20 L -60 0 L -20 -20 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
              {/* Inner star lines */}
              <path
                d="M 0 -40 L 15 -15 L 40 0 L 15 15 L 0 40 L -15 15 L -40 0 L -15 -15 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.10)"
                strokeWidth="1.0"
              />
              {/* Center dot */}
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="rgba(255, 255, 255, 0.08)"
              />
            </g>
          </pattern>

          {/* Intricate Design Pattern */}
          <pattern
            id="intricatePattern"
            x="0"
            y="0"
            width="300"
            height="300"
            patternUnits="userSpaceOnUse"
          >
            {/* Large curved lines creating organic shapes */}
            <path
              d="M 0 150 Q 75 50 150 150 T 300 150"
              fill="none"
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="1.2"
            />
            <path
              d="M 0 150 Q 75 250 150 150 T 300 150"
              fill="none"
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="1.2"
            />
            <path
              d="M 150 0 Q 50 75 150 150 T 150 300"
              fill="none"
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="1.2"
            />
            <path
              d="M 150 0 Q 250 75 150 150 T 150 300"
              fill="none"
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="1.2"
            />
            
            {/* Diamond/Leaf shapes */}
            <g transform="translate(75, 75)">
              <path
                d="M 0 -20 L 20 0 L 0 20 L -20 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.0"
              />
            </g>
            <g transform="translate(225, 75)">
              <path
                d="M 0 -20 L 20 0 L 0 20 L -20 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.0"
              />
            </g>
            <g transform="translate(75, 225)">
              <path
                d="M 0 -20 L 20 0 L 0 20 L -20 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.0"
              />
            </g>
            <g transform="translate(225, 225)">
              <path
                d="M 0 -20 L 20 0 L 0 20 L -20 0 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.0"
              />
            </g>
          </pattern>

          {/* Corner Star Patterns */}
          <pattern
            id="cornerStars"
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            {/* Top-left star */}
            <g transform="translate(50, 50)">
              <path
                d="M 0 -30 L 10 -10 L 30 0 L 10 10 L 0 30 L -10 10 L -30 0 L -10 -10 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
            </g>
            {/* Top-right star */}
            <g transform="translate(350, 50)">
              <path
                d="M 0 -30 L 10 -10 L 30 0 L 10 10 L 0 30 L -10 10 L -30 0 L -10 -10 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
            </g>
            {/* Bottom-left star */}
            <g transform="translate(50, 350)">
              <path
                d="M 0 -30 L 10 -10 L 30 0 L 10 10 L 0 30 L -10 10 L -30 0 L -10 -10 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
            </g>
            {/* Bottom-right star */}
            <g transform="translate(350, 350)">
              <path
                d="M 0 -30 L 10 -10 L 30 0 L 10 10 L 0 30 L -10 10 L -30 0 L -10 -10 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
            </g>
          </pattern>
        </defs>

        {/* Apply patterns */}
        <rect width="100%" height="100%" fill="url(#baseGrid)" />
        <rect width="100%" height="100%" fill="url(#starPattern)" />
        <rect width="100%" height="100%" fill="url(#intricatePattern)" />
        <rect width="100%" height="100%" fill="url(#cornerStars)" />
      </svg>

      {/* Additional floating geometric elements */}
      <div className="absolute inset-0">
        {/* Floating squares */}
        <div className="absolute top-20 left-20 w-4 h-4 border border-white/25 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating diamonds */}
        <div className="absolute top-60 left-60 w-3 h-3 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-80 right-60 w-4 h-4 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 left-80 w-2 h-2 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-80 right-80 w-3 h-3 border border-white/25 rotate-45 animate-pulse" style={{ animationDelay: '3.5s' }}></div>
      </div>
    </div>
  );
}
