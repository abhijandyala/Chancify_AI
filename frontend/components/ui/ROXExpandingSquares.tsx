'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Reveal from './Reveal'

// Our actual data layers instead of random data
const dataLayers = [
  {
    id: 'application',
    title: 'Chancify AI Application',
    subtitle: 'Student Profile Analysis',
    data: [
      '12,847 Student Profiles',
      'Academic Performance Data',
      'Extracurricular Activities',
      'Leadership Experience',
      'Research Projects',
      'Awards & Recognition'
    ]
  },
  {
    id: 'ai-swarm',
    title: 'AI Analysis Engine',
    subtitle: 'Machine Learning Models',
    data: [
      '94.3% Prediction Accuracy',
      'Neural Network Processing',
      'Pattern Recognition',
      'Holistic Factor Analysis',
      'Real-time Calculations',
      'Continuous Learning'
    ]
  },
  {
    id: 'context-system',
    title: 'College Database System',
    subtitle: 'Institutional Context',
    data: [
      '2,847 US Colleges',
      'Admission Requirements',
      'Historical Data Trends',
      'Acceptance Rate Patterns',
      'Program Specializations',
      'Financial Aid Data'
    ]
  },
  {
    id: 'data-sources',
    title: 'Data Integration Hub',
    subtitle: 'Multi-Source Processing',
    data: [
      'College Board Integration',
      'Common Application Data',
      'High School Transcripts',
      'Standardized Test Scores',
      'Recommendation Letters',
      'Portfolio Submissions'
    ]
  }
]

export default function ROXExpandingSquares() {
  const [expandedLayers, setExpandedLayers] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-20% 0px" })

  useEffect(() => {
    if (!isInView) return

    const timeouts = dataLayers.map((_, index) => 
      setTimeout(() => {
        setExpandedLayers(prev => [...prev, index])
      }, index * 800)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [isInView])

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Our AI Architecture
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Multi-layered system processing your data through advanced AI models to deliver accurate admission predictions.
          </p>
        </div>
      </Reveal>

      <div className="relative flex flex-col items-center space-y-8">
        {dataLayers.map((layer, index) => (
          <Reveal key={layer.id} delay={index * 0.2}>
            <div 
              className={`
                relative w-full max-w-2xl
                transition-all duration-1000 ease-out
                ${expandedLayers.includes(index) 
                  ? 'transform scale-105 opacity-100' 
                  : 'transform scale-95 opacity-70'
                }
                ${index === 0 ? 'z-40' : 
                  index === 1 ? 'z-30' : 
                  index === 2 ? 'z-20' : 'z-10'
                }
              `}
              style={{
                transform: expandedLayers.includes(index) 
                  ? `translateY(${index * -20}px) scale(${1 + index * 0.05})` 
                  : `translateY(${index * 10}px) scale(1)`
              }}
            >
              {/* Square Layer */}
              <div className="relative bg-background-subtle border border-border rounded-2xl p-8 shadow-lg">
                {/* Glow effect for active layer */}
                {expandedLayers.includes(index) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl -z-10"></div>
                )}
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{layer.title}</h3>
                    <p className="text-foreground/70">{layer.subtitle}</p>
                  </div>
                  
                  {/* Status indicator */}
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    expandedLayers.includes(index) 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-foreground/30'
                  }`}></div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {layer.data.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`
                        p-3 rounded-xl border transition-all duration-700
                        ${expandedLayers.includes(index)
                          ? 'border-primary/30 bg-primary/5'
                          : 'border-border bg-background-raised'
                        }
                      `}
                      style={{
                        animationDelay: `${(itemIndex * 100) + (index * 200)}ms`
                      }}
                    >
                      <div className="text-sm font-medium text-foreground">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connection lines to next layer */}
                {index < dataLayers.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom summary */}
      <Reveal delay={0.8}>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-primary font-medium">Processing 847K+ data points per student</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
