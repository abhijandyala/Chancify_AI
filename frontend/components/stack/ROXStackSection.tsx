'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import ROXStackAnimation from './ROXStackAnimation'

// Our AI architecture layers with proper content
const layers = [
  {
    id: 'data-sources',
    name: 'Data Sources',
    description: 'Multi-source data integration',
    stats: ['25+ Sources', 'Real-time Sync', 'API Integrations'],
    details: 'We aggregate data from multiple sources including IPEDS, College Board, and real-time admission data to ensure comprehensive coverage.'
  },
  {
    id: 'college-db',
    name: 'College Database',
    description: 'Comprehensive college data',
    stats: ['2,847 Colleges', 'Historical Data', 'Admission Trends'],
    details: 'Our database contains detailed information on over 2,800 colleges with historical admission data spanning multiple years.'
  },
  {
    id: 'ai-engine',
    name: 'AI Analysis Engine',
    description: 'Advanced machine learning',
    stats: ['94.3% Accuracy', 'Neural Networks', 'Pattern Recognition'],
    details: 'Our proprietary AI engine uses advanced machine learning algorithms to analyze student profiles and predict admission chances.'
  },
  {
    id: 'application',
    name: 'Chancify AI',
    description: 'Student profile analysis',
    stats: ['12,847 Students', 'Holistic Analysis', 'Real-time Results'],
    details: 'The final application layer that provides students with personalized insights and actionable recommendations.'
  }
]

export default function ROXStackSection() {
  const [activeLayer, setActiveLayer] = useState(0)

  // EXTREME FIX: Much better scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Find the section element
      const section = document.querySelector('[data-section="stack"]') as HTMLElement
      if (!section) return
      
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      
      // Calculate progress within the section
      const sectionProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight))
      
      // EXTREME FIX: Much better active layer calculation
      const newActiveLayer = Math.floor(sectionProgress * layers.length * 2)
      setActiveLayer(Math.min(newActiveLayer, layers.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      data-section="stack"
      className="relative h-[400vh] bg-black overflow-hidden"
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen">
        <div className="relative h-full">
          {/* 3D Canvas - EXTREME FIX: More pages for much longer scroll */}
          <Canvas
            shadows
            camera={{ position: [0, 1.5, 4], fov: 60 }}
            className="absolute inset-0"
          >
            <Suspense fallback={null}>
              <ScrollControls pages={4} damping={0.05}>
                <ROXStackAnimation />
              </ScrollControls>
            </Suspense>
          </Canvas>

          {/* Left Text Rail */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 max-w-md">
            <div className="space-y-8">
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`transition-all duration-700 ${
                    activeLayer === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-30 scale-90'
                  }`}
                >
                  <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{layer.description}</p>
                    
                    <div className="space-y-2">
                      {layer.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          <span className="text-yellow-400 text-sm font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Text Rail */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 max-w-md">
            <div className="space-y-8">
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`transition-all duration-700 ${
                    activeLayer === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-30 scale-90'
                  }`}
                >
                  <div className="bg-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">Technical Details</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {layer.details}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs font-medium">Live System</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Title */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-yellow-400">AI Architecture</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Scroll to explore how we process your data through our advanced AI pipeline
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-2">
              {layers.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeLayer === index
                      ? 'bg-yellow-400 scale-125'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}