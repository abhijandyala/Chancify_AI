'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Sparkles, Zap } from 'lucide-react'
import MobileiPhone3D from './MobileiPhone3D'

interface MobileiPhoneShowcaseProps {
  title?: string
  subtitle?: string
  showTitle?: boolean
  className?: string
  variant?: 'default' | 'compact' | 'featured'
}

export default function MobileiPhoneShowcase({
  title = "Interactive 3D iPhone",
  subtitle = "Experience our mobile interface in stunning 3D",
  showTitle = true,
  className = "",
  variant = 'default'
}: MobileiPhoneShowcaseProps) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: "p-4",
          title: "text-lg",
          subtitle: "text-sm",
          height: "h-[250px]"
        }
      case 'featured':
        return {
          container: "p-6 lg:p-8",
          title: "text-xl lg:text-2xl",
          subtitle: "text-base lg:text-lg",
          height: "h-[350px] lg:h-[400px]"
        }
      default:
        return {
          container: "p-4 sm:p-6",
          title: "text-lg sm:text-xl",
          subtitle: "text-sm sm:text-base",
          height: "h-[300px] sm:h-[350px]"
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      className={`rox-card ${styles.container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {/* Header */}
      {showTitle && (
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 mb-4 backdrop-blur-sm">
            <Smartphone className="w-4 h-4" />
            <span className="text-xs font-medium">3D Experience</span>
          </div>
          <h3 className={`${styles.title} font-bold text-white mb-2`}>
            {title}
          </h3>
          <p className={`${styles.subtitle} text-gray-300 max-w-md mx-auto`}>
            {subtitle}
          </p>
        </motion.div>
      )}

      {/* 3D iPhone Container */}
      <motion.div 
        className={`relative ${styles.height} rounded-2xl overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MobileiPhone3D 
          className="w-full h-full"
          showControls={variant !== 'compact'}
        />
        
        {/* Mobile interaction overlay */}
        {isMobile && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-white/80">Interactive</span>
            </div>
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-white/80">Touch to rotate</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile-specific features */}
      {isMobile && variant === 'featured' && (
        <motion.div 
          className="mt-4 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-yellow-400 font-bold text-lg">60fps</div>
            <div className="text-xs text-gray-400">Smooth Animation</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-yellow-400 font-bold text-lg">4K</div>
            <div className="text-xs text-gray-400">High Quality</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
