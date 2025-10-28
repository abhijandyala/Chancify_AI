'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface iPhone3DProps {
  showControls?: boolean;
}

// Main iPhone3D Component using Sketchfab
export default function Phone3D({ 
  className = "",
  showControls = true
}: { 
  className?: string
  showControls?: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use the iPhone 16 Pro Black model from Sketchfab (most realistic)
  const sketchfabUrl = "https://sketchfab.com/models/5cb0778041a34f09b409a38c687bb1d4/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_theme=dark&camera=0&ui_hint=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_help=0"

  return (
    <div className={`w-full h-64 sm:h-80 lg:h-96 relative ${className}`}>
      <motion.div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden rounded-lg"
        style={{
          transform: 'perspective(1000px) rotateX(15deg) rotateY(-15deg)', // Exact tilt angle
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        whileHover={showControls ? { 
          scale: 1.05,
          transition: { duration: 0.3 }
        } : {}}
      >
        {/* Sketchfab iPhone Model */}
        <iframe
          ref={iframeRef}
          title="iPhone 16 Pro Black - Realistic 3D Model"
          src={sketchfabUrl}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          style={{
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Overlay for interaction feedback */}
        {showControls && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Drag to rotate
            </div>
          </motion.div>
        )}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
               mixBlendMode: 'overlay'
             }}
        />
      </motion.div>
      
      {/* Auto-return functionality simulation */}
      {showControls && (
        <AutoReturnIndicator />
      )}
    </div>
  )
}

// Auto-return indicator component
function AutoReturnIndicator() {
  const [isReturning, setIsReturning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseLeave = () => {
      // Start return timer when mouse leaves
      timeoutRef.current = setTimeout(() => {
        setIsReturning(true)
        // Reset after animation
        setTimeout(() => setIsReturning(false), 1000)
      }, 2000)
    }

    const handleMouseEnter = () => {
      // Cancel return timer when mouse enters
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const container = document.querySelector('[data-iphone-container]')
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave)
      container.addEventListener('mouseenter', handleMouseEnter)
      
      return () => {
        container.removeEventListener('mouseleave', handleMouseLeave)
        container.removeEventListener('mouseenter', handleMouseEnter)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [])

  return (
    <motion.div
      className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      animate={isReturning ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
        Auto-returning to position...
      </div>
    </motion.div>
  )
}