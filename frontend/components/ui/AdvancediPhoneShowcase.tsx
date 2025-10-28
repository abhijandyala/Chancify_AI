'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, 
  Sparkles, 
  Zap, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  RotateCcw,
  Settings,
  Eye,
  Hand
} from 'lucide-react'
import AdvancedMobileiPhone3D from './AdvancedMobileiPhone3D'

interface AdvancediPhoneShowcaseProps {
  title?: string
  subtitle?: string
  showTitle?: boolean
  className?: string
  variant?: 'default' | 'compact' | 'featured' | 'demo'
}

export default function AdvancediPhoneShowcase({
  title = "Advanced 3D iPhone Experience",
  subtitle = "Gesture controls, physics animations, and immersive interactions",
  showTitle = true,
  className = "",
  variant = 'default'
}: AdvancediPhoneShowcaseProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cycle through features for demo mode
  useEffect(() => {
    if (showDemo) {
      const interval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % 4)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [showDemo])

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: "p-4",
          title: "text-lg",
          subtitle: "text-sm",
          height: "h-[250px]",
          showControls: false
        }
      case 'featured':
        return {
          container: "p-6 lg:p-8",
          title: "text-xl lg:text-2xl",
          subtitle: "text-base lg:text-lg",
          height: "h-[350px] lg:h-[400px]",
          showControls: true
        }
      case 'demo':
        return {
          container: "p-6 lg:p-8",
          title: "text-xl lg:text-2xl",
          subtitle: "text-base lg:text-lg",
          height: "h-[400px] lg:h-[500px]",
          showControls: true
        }
      default:
        return {
          container: "p-4 sm:p-6",
          title: "text-lg sm:text-xl",
          subtitle: "text-sm sm:text-base",
          height: "h-[300px] sm:h-[350px]",
          showControls: true
        }
    }
  }

  const styles = getVariantStyles()

  const features = [
    {
      name: "Gesture Controls",
      description: "Touch, swipe, and spin interactions",
      icon: Hand,
      color: "text-blue-400"
    },
    {
      name: "Physics Animations",
      description: "Realistic motion and momentum",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      name: "Interactive Elements",
      description: "Clickable buttons with haptic feedback",
      icon: Smartphone,
      color: "text-green-400"
    },
    {
      name: "Particle Effects",
      description: "Dynamic visual enhancements",
      icon: Sparkles,
      color: "text-purple-400"
    }
  ]

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
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium">Advanced 3D Experience</span>
          </div>
          <h3 className={`${styles.title} font-bold text-white mb-2`}>
            {title}
          </h3>
          <p className={`${styles.subtitle} text-gray-300 max-w-md mx-auto`}>
            {subtitle}
          </p>
        </motion.div>
      )}

      {/* Feature Controls */}
      {variant === 'demo' && (
        <motion.div 
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setShowDemo(!showDemo)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              showDemo 
                ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {showDemo ? 'Stop Demo' : 'Start Demo'}
            </span>
          </motion.button>

          <motion.button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              isActive 
                ? 'bg-green-400/20 border-green-400/50 text-green-400' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </motion.button>

          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              soundEnabled 
                ? 'bg-blue-400/20 border-blue-400/50 text-blue-400' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* 3D iPhone Container */}
      <motion.div 
        className={`relative ${styles.height} rounded-2xl overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AdvancedMobileiPhone3D 
          className="w-full h-full"
          showControls={styles.showControls}
          enableSound={soundEnabled}
        />
        
        {/* Feature indicators for demo mode */}
        {variant === 'demo' && showDemo && (
          <motion.div 
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Eye className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white">
              {features[currentFeature].name}
            </span>
          </motion.div>
        )}
        
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
              <span className="text-xs text-white/80">Advanced</span>
            </div>
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
              <Hand className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-white/80">Touch & interact</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Feature showcase for demo mode */}
      {variant === 'demo' && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = showDemo && currentFeature === index
              
              return (
                <motion.div 
                  key={feature.name}
                  className={`text-center p-3 rounded-lg border transition-all duration-300 ${
                    isActive 
                      ? 'bg-yellow-400/20 border-yellow-400/50' 
                      : 'bg-white/5 border-white/10'
                  }`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${isActive ? feature.color : 'text-gray-400'}`} />
                  <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {feature.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {feature.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

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
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-yellow-400 font-bold text-lg">Physics</div>
            <div className="text-xs text-gray-400">Realistic Motion</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-yellow-400 font-bold text-lg">Haptic</div>
            <div className="text-xs text-gray-400">Touch Feedback</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
