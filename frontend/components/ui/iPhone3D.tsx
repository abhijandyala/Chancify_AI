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

  // Use the iPhone 16 Pro Black model from Sketchfab (NO UI ELEMENTS)
  const sketchfabUrl = "https://sketchfab.com/models/5cb0778041a34f09b409a38c687bb1d4/embed?autospin=0&autostart=1&preload=1&transparent=1&ui_theme=dark&camera=0&ui_hint=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_fullscreen=0&ui_vr=0&ui_annotations=0&ui_controls=0&ui_inspector=0&ui_loading=0&ui_ar=0&ui_share=0&ui_viewer_controls=0&orbit_controls=0&ui_watermark=0&ui_logo=0&ui_branding=0"

  return (
    <div className={`w-full h-64 sm:h-80 lg:h-96 relative ${className}`}>
      <motion.div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden rounded-lg"
        data-iphone-container
        style={{
          transform: 'perspective(1000px) rotateX(20deg) rotateY(-25deg)', // Exact angle from image
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
        <div className="relative w-full h-full">
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
          {/* CSS to hide Sketchfab UI elements */}
          <style jsx global>{`
            iframe[src*="sketchfab"] {
              position: relative;
            }
            iframe[src*="sketchfab"]::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: transparent;
              pointer-events: none;
              z-index: 10;
            }
            /* Hide Sketchfab UI elements */
            iframe[src*="sketchfab"] * {
              display: none !important;
            }
            iframe[src*="sketchfab"] canvas {
              display: block !important;
            }
          `}</style>
        </div>
        
        {/* Overlay for interaction feedback */}
        {showControls && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Drag to rotate • Auto-returns
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
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMouseLeave = () => {
      if (!isUserInteracting) {
        // Start return timer when mouse leaves
        timeoutRef.current = setTimeout(() => {
          setIsReturning(true)
          // Reset after animation
          setTimeout(() => setIsReturning(false), 1500)
        }, 3000) // 3 second delay
      }
    }

    const handleMouseEnter = () => {
      // Cancel return timer when mouse enters
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setIsUserInteracting(false)
    }

    const handleMouseDown = () => {
      setIsUserInteracting(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const handleMouseUp = () => {
      // Start timer after user stops interacting
      timeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false)
        setIsReturning(true)
        setTimeout(() => setIsReturning(false), 1500)
      }, 2000) // 2 second delay after mouse up
    }

    const container = document.querySelector('[data-iphone-container]')
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mousedown', handleMouseDown)
      container.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        container.removeEventListener('mouseleave', handleMouseLeave)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mousedown', handleMouseDown)
        container.removeEventListener('mouseup', handleMouseUp)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [isUserInteracting])

  return (
    <motion.div
      className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      animate={isReturning ? { 
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      } : {}}
      transition={{ duration: 0.8, repeat: isReturning ? Infinity : 0 }}
    >
      <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
        Returning to original position...
      </div>
    </motion.div>
  )
}
