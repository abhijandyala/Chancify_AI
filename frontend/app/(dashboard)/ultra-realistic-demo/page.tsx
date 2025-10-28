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
  RotateCcw,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Bell,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react'
import UltraRealisticiPhone3D from '@/components/ui/UltraRealisticiPhone3D'

export default function UltraRealisticDemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const features = [
    {
      icon: Sparkles,
      title: "4K Ultra-Realistic Materials",
      description: "Titanium frame, glass panels, and camera lenses with photorealistic textures",
      color: "text-yellow-400",
      details: [
        "PBR (Physically Based Rendering) materials",
        "Real-time reflections and refractions", 
        "Dynamic lighting and shadows",
        "4K texture resolution"
      ]
    },
    {
      icon: Camera,
      title: "Triple Camera System",
      description: "Ultra-wide, main, and telephoto lenses with LiDAR scanner",
      color: "text-blue-400",
      details: [
        "Ultra-wide camera lens",
        "Main camera with optical zoom",
        "Telephoto lens for portraits",
        "LiDAR scanner for depth sensing",
        "Flash with realistic lighting"
      ]
    },
    {
      icon: Zap,
      title: "Dynamic Island",
      description: "Interactive Dynamic Island with pulsing animations and notifications",
      color: "text-purple-400",
      details: [
        "Realistic pulsing animations",
        "Notification indicators",
        "Interactive touch responses",
        "Dynamic color changes"
      ]
    },
    {
      icon: Smartphone,
      title: "Realistic Screen Content",
      description: "Actual iPhone interface with lock screen, home screen, and apps",
      color: "text-green-400",
      details: [
        "Lock screen with time and date",
        "Home screen with app icons",
        "Chancify AI app interface",
        "Camera app simulation",
        "Settings and notifications"
      ]
    },
    {
      icon: Star,
      title: "Haptic Feedback",
      description: "Realistic button presses with vibration and visual feedback",
      color: "text-red-400",
      details: [
        "Volume button interactions",
        "Power button responses",
        "Visual feedback animations",
        "Realistic button physics"
      ]
    },
    {
      icon: Award,
      title: "Advanced Lighting",
      description: "Studio-quality lighting with dynamic shadows and reflections",
      color: "text-orange-400",
      details: [
        "Directional lighting system",
        "Point light sources",
        "Spotlight effects",
        "Rim lighting for depth",
        "Dynamic color temperature"
      ]
    }
  ]

  const currentFeatureData = features[currentFeature]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <motion.div 
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">4K Ultra-Realistic iPhone</h1>
                <p className="text-sm text-gray-400">Phase 4 Deep Dive Demo</p>
              </div>
            </div>
            
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
              
              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-white" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* iPhone Display */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`${isFullscreen ? 'h-[80vh]' : 'h-[600px]'} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden`}>
              <UltraRealisticiPhone3D 
                showControls={true}
                isFullscreen={isFullscreen}
                enableSound={isPlaying}
              />
            </div>
          </motion.div>

          {/* Features Panel */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            
            {/* Feature Navigation */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold text-white mb-4">4K Features</h3>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
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
            </div>

            {/* Current Feature Details */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white/10 ${currentFeatureData.color}`}>
                  <currentFeatureData.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold text-white">{currentFeatureData.title}</h4>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{currentFeatureData.description}</p>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-white">Technical Details:</h5>
                <ul className="space-y-1">
                  {currentFeatureData.details.map((detail, index) => (
                    <li key={index} className="text-xs text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              <h4 className="text-sm font-medium text-white mb-3">4K Technical Specifications</h4>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-yellow-400">4K Ultra HD</span>
                </div>
                <div className="flex justify-between">
                  <span>Materials:</span>
                  <span className="text-yellow-400">PBR Textures</span>
                </div>
                <div className="flex justify-between">
                  <span>Lighting:</span>
                  <span className="text-yellow-400">Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Shadows:</span>
                  <span className="text-yellow-400">Dynamic</span>
                </div>
                <div className="flex justify-between">
                  <span>Reflections:</span>
                  <span className="text-yellow-400">Screen Space</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance:</span>
                  <span className="text-yellow-400">60fps</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm p-6">
              <h4 className="text-sm font-medium text-white mb-3">Interactive Controls</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div>• Click and drag to rotate iPhone</div>
                <div>• Use controls to unlock device</div>
                <div>• Toggle notifications and sounds</div>
                <div>• Experience haptic feedback</div>
                <div>• Watch realistic animations</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Auto Mode Instructions */}
        {isAutoMode && (
          <motion.div 
            className="mt-8 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Auto Mode Active</h4>
            </div>
            <p className="text-gray-300 text-sm">
              The iPhone will automatically cycle through different features and animations. 
              Watch as it demonstrates lock screen, home screen, app interfaces, and camera effects.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
