'use client';

import React, { useState, useEffect } from 'react';

interface LoaderProps {
  onComplete: () => void;
  duration?: number; // in seconds
}

export default function Loader({ onComplete, duration = 5 }: LoaderProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Start fade out animation
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onComplete();
            }, 300); // Wait for fade out to complete
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Loader text with shimmer effect */}
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-pulse">
            LOADING
          </h1>
          {/* Shimmer overlay */}
          <div className="absolute inset-0 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer">
            LOADING
          </div>
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-yellow-300/20 border-t-yellow-300 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="text-2xl font-mono text-amber-400 mb-2">
            {timeLeft}
          </div>
          <div className="text-sm text-neutral-400">
            Calculating your chances...
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((duration - timeLeft) / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
