'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Zap, 
  Hand, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Settings,
  Eye,
  Smartphone,
  ArrowLeft,
  RotateCcw
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import AdvancedMobileiPhone3D from '@/components/ui/AdvancedMobileiPhone3D'
import AdvancediPhoneShowcase from '@/components/ui/AdvancediPhoneShowcase'

export default function AdvancedDemoPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
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

  const features = [
    {
      name: "Gesture Controls",
      description: "Touch, swipe, and spin interactions with momentum",
      icon: Hand,
      color: "text-blue-400",
      details: [
        "Touch and drag to rotate",
        "Swipe to spin with physics",
        "Auto-return to position",
        "Momentum-based movement"
      ]
    },
    {
      name: "Physics Animations",
      description: "Realistic motion and material interactions",
      icon: Zap,
      color: "text-yellow-400",
      details: [
        "Breathing animation",
        "Hover effects",
        "Button press animations",
        "Dynamic lighting"
      ]
    },
    {
      name: "Interactive Elements",
      description: "Clickable buttons with haptic feedback",
      icon: Smartphone,
      color: "text-green-400",
      details: [
        "Volume button interactions",
        "Haptic feedback simulation",
        "Visual button press effects",
        "Cursor changes on hover"
      ]
    },
    {
      name: "Particle Effects",
      description: "Dynamic visual enhancements and atmosphere",
      icon: Sparkles,
      color: "text-purple-400",
      details: [
        "Golden particle system",
        "Animated sparkles",
        "Dynamic lighting colors",
        "Environmental effects"
      ]
    }
  ]

  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  return (
    <div className="rox-container">
      <div className="rox-section">
        {/* Header */}
        <motion.div {...enter} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Advanced 3D Demo</span>
          </div>
          <h1 className="rox-heading-1 mb-6 text-white">
            Phase 3: Advanced Interactions
          </h1>
          <p className="rox-text-large max-w-3xl mx-auto">
            Experience the next generation of 3D iPhone interactions with gesture controls, physics animations, and immersive effects
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div {...enter} className="mb-8">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </motion.button>
        </motion.div>

        {/* Control Panel */}
        <motion.div {...enter} className="mb-8">
          <div className="rox-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-400" />
              Demo Controls
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.button
                onClick={() => setShowDemo(!showDemo)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  showDemo 
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="font-medium">
                  {showDemo ? 'Stop Demo' : 'Start Demo'}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setIsActive(!isActive)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isActive 
                    ? 'bg-green-400/20 border-green-400/50 text-green-400' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4" />
                <span className="font-medium">
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  soundEnabled 
                    ? 'bg-blue-400/20 border-blue-400/50 text-blue-400' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="font-medium">
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main 3D Demo */}
        <motion.div {...enter} className="mb-8">
          <AdvancediPhoneShowcase 
            title="Interactive 3D iPhone"
            subtitle="Experience advanced gesture controls and physics animations"
            variant="demo"
          />
        </motion.div>

        {/* Feature Details */}
        <motion.div {...enter} className="mb-8">
          <div className="rox-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-yellow-400" />
              Feature Details
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isActive = showDemo && currentFeature === index
                
                return (
                  <motion.div 
                    key={feature.name}
                    className={`p-6 rounded-lg border transition-all duration-300 ${
                      isActive 
                        ? 'bg-yellow-400/20 border-yellow-400/50' 
                        : 'bg-white/5 border-white/10'
                    }`}
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`w-6 h-6 ${isActive ? feature.color : 'text-gray-400'}`} />
                      <h3 className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {feature.name}
                      </h3>
                    </div>
                    
                    <p className={`text-sm mb-4 ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className={`text-xs flex items-center gap-2 ${
                          isActive ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-yellow-400' : 'bg-gray-500'}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div {...enter} className="mb-8">
          <div className="rox-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-400" />
              Technical Specifications
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-yellow-400 font-bold text-2xl">60fps</div>
                <div className="text-sm text-gray-400">Frame Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-yellow-400 font-bold text-2xl">4K</div>
                <div className="text-sm text-gray-400">Quality</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-yellow-400 font-bold text-2xl">Physics</div>
                <div className="text-sm text-gray-400">Engine</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-yellow-400 font-bold text-2xl">Haptic</div>
                <div className="text-sm text-gray-400">Feedback</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
