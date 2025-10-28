'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Zap, 
  Camera, 
  Smartphone, 
  Star,
  Award,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import UltraRealisticiPhone3D from './UltraRealisticiPhone3D'

interface UltraRealisticShowcaseProps {
  title?: string
  subtitle?: string
  variant?: 'default' | 'compact' | 'featured' | 'demo'
  showTitle?: boolean
  className?: string
}

export default function UltraRealisticShowcase({ 
  title = "4K Ultra-Realistic iPhone Experience",
  subtitle = "Experience the most realistic iPhone model with stunning 4K quality",
  variant = 'default',
  showTitle = true,
  className = ""
}: UltraRealisticShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isAutoMode, setIsAutoMode] = useState(false)

  const features = [
    {
      icon: Sparkles,
      title: "4K Ultra-Realistic Materials",
      description: "Titanium frame, glass panels, and camera lenses with photorealistic textures",
      color: "text-yellow-400"
    },
    {
      icon: Camera,
      title: "Triple Camera System",
      description: "Ultra-wide, main, and telephoto lenses with LiDAR scanner",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Dynamic Island",
      description: "Interactive Dynamic Island with pulsing animations and notifications",
      color: "text-purple-400"
    },
    {
      icon: Smartphone,
      title: "Realistic Screen Content",
      description: "Actual iPhone interface with lock screen, home screen, and apps",
      color: "text-green-400"
    },
    {
      icon: Star,
      title: "Haptic Feedback",
      description: "Realistic button presses with vibration and visual feedback",
      color: "text-red-400"
    },
    {
      icon: Award,
      title: "Advanced Lighting",
      description: "Studio-quality lighting with dynamic shadows and reflections",
      color: "text-orange-400"
    }
  ]

  const getContainerClasses = () => {
    switch (variant) {
      case 'compact':
        return "w-full max-w-md mx-auto"
      case 'featured':
        return "w-full max-w-4xl mx-auto"
      case 'demo':
        return "w-full h-screen"
      default:
        return "w-full max-w-2xl mx-auto"
    }
  }

  const getIPhoneSize = () => {
    switch (variant) {
      case 'compact':
        return "h-[250px]"
      case 'featured':
        return "h-[500px]"
      case 'demo':
        return "h-[calc(100vh-200px)]"
      default:
        return "h-[400px]"
    }
  }

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {/* Header */}
      {showTitle && (
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-sm max-w-md mx-auto">{subtitle}</p>
        </motion.div>
      )}

      {/* Main Content */}
      <div className={`grid ${variant === 'featured' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 items-center`}>
        
        {/* iPhone Display */}
        <motion.div 
          className={`${variant === 'featured' ? 'order-1' : ''}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`${getIPhoneSize()} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden`}>
            <UltraRealisticiPhone3D 
              showControls={variant !== 'compact'}
              isFullscreen={variant === 'demo'}
              enableSound={isPlaying}
            />
          </div>
        </motion.div>

        {/* Features Panel */}
        {variant !== 'compact' && (
          <motion.div 
            className={`${variant === 'featured' ? 'order-2' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              
              {/* Control Panel */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">4K Features</h3>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsAutoMode(!isAutoMode)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      isAutoMode 
                        ? 'bg-yellow-400/20 border-yellow-400/50' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className={`w-4 h-4 ${isAutoMode ? 'text-yellow-400' : 'text-white'}`} />
                  </motion.button>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                      currentFeature === index 
                        ? 'bg-white/10 border border-white/20' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg bg-white/10 ${feature.color}`}>
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                    {currentFeature === index && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Technical Specs */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-white mb-3">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div>• 4K Resolution Materials</div>
                  <div>• PBR Textures</div>
                  <div>• Real-time Shadows</div>
                  <div>• Dynamic Lighting</div>
                  <div>• Haptic Feedback</div>
                  <div>• 60fps Animations</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Compact Features for compact variant */}
      {variant === 'compact' && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>4K Quality</span>
            </div>
            <div className="flex items-center gap-1">
              <Camera className="w-3 h-3 text-blue-400" />
              <span>Triple Camera</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-purple-400" />
              <span>Dynamic Island</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Demo Mode Instructions */}
      {variant === 'demo' && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h4 className="text-sm font-medium text-white mb-2">4K Demo Mode</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <div>• Use controls to unlock iPhone and toggle notifications</div>
            <div>• Click side buttons for haptic feedback</div>
            <div>• Watch realistic screen content cycling</div>
            <div>• Experience ultra-realistic materials and lighting</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
