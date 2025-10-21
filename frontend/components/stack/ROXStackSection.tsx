'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Suspense, useState } from 'react'
import ROXStackAnimation from './ROXStackAnimation'
import Reveal from '../ui/Reveal'

const layers = [
  {
    id: 'data-sources',
    name: 'Data Sources',
    description: 'Multi-source data integration',
    details: [
      '25+ External APIs integrated',
      'Real-time data synchronization',
      'College Board, Common App, SAT data',
      'High school transcript processing',
      'Standardized test score analysis'
    ],
    icon: '🔗'
  },
  {
    id: 'college-db',
    name: 'College Database',
    description: 'Comprehensive college data',
    details: [
      '2,847 US colleges and universities',
      '10+ years of historical admission data',
      'Real-time acceptance rate tracking',
      'Program-specific requirements',
      'Financial aid and scholarship data'
    ],
    icon: '🏛️'
  },
  {
    id: 'ai-engine',
    name: 'AI Analysis Engine',
    description: 'Advanced machine learning',
    details: [
      '94.3% prediction accuracy (ROC-AUC)',
      'Neural network architecture',
      'Pattern recognition algorithms',
      'Holistic factor analysis',
      'Continuous learning and improvement'
    ],
    icon: '🧠'
  },
  {
    id: 'application',
    name: 'Chancify AI',
    description: 'Student profile analysis',
    details: [
      '12,847+ student profiles analyzed',
      '2.3 second average processing time',
      '847K+ data points per student',
      'Real-time admission predictions',
      'Personalized recommendations'
    ],
    icon: '🎓'
  }
]

export default function ROXStackSection() {
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section className="relative h-[400vh] bg-background">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="bg-transparent"
          shadows
        >
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.1}>
              <ROXStackAnimation />
              
              <Scroll html>
                {/* Left Information Panel */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-md">
                  <div className="space-y-8">
                    <Reveal>
                      <div className="text-primary font-semibold text-lg">Chancify AI Architecture</div>
                    </Reveal>
                    
                    <div className="space-y-6">
                      {layers.map((layer, index) => (
                        <Reveal key={layer.id} delay={index * 0.1}>
                          <div className={`
                            transition-all duration-500 cursor-pointer
                            ${activeLayer === index 
                              ? 'text-primary scale-105' 
                              : 'text-foreground/70 hover:text-foreground'
                            }
                          `}
                          onClick={() => setActiveLayer(index)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{layer.icon}</span>
                              <div className="text-xl font-bold">{layer.name}</div>
                            </div>
                            <div className="text-sm text-foreground/60 ml-8">
                              {layer.description}
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Information Panel */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 max-w-lg">
                  <div className="space-y-8">
                    <Reveal>
                      <div className="text-primary font-semibold text-lg">System Overview</div>
                    </Reveal>
                    
                    <Reveal delay={0.1}>
                      <div className="bg-background-subtle rounded-2xl border border-border p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{layers[activeLayer].icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {layers[activeLayer].name}
                            </h3>
                            <p className="text-foreground/70">
                              {layers[activeLayer].description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {layers[activeLayer].details.map((detail, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span className="text-foreground/80 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>

                    {/* Stats */}
                    <Reveal delay={0.2}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background-subtle rounded-xl border border-border p-4 text-center">
                          <div className="text-2xl font-bold text-primary mb-1">94.3%</div>
                          <div className="text-xs text-foreground/70">Accuracy</div>
                        </div>
                        <div className="bg-background-subtle rounded-xl border border-border p-4 text-center">
                          <div className="text-2xl font-bold text-primary mb-1">2.3s</div>
                          <div className="text-xs text-foreground/70">Processing</div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary font-medium">Processing 847K+ data points per student</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
