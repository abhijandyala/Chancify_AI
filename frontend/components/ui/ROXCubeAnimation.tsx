'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Reveal from './Reveal'

// Our data matching ROX's structure exactly
const cubeData = [
  {
    id: 'application',
    title: 'Chancify AI Application',
    subtitle: 'Student Profile Analysis',
    icon: '🎓',
    stats: [
      { label: 'Student Profiles', value: '12,847', suffix: '+' },
      { label: 'Processing Time', value: '2.3', suffix: 's' },
      { label: 'Data Points', value: '847', suffix: 'K' }
    ]
  },
  {
    id: 'ai-swarm',
    title: 'AI Analysis Engine',
    subtitle: 'Machine Learning Models',
    icon: '🧠',
    stats: [
      { label: 'Prediction Accuracy', value: '94.3', suffix: '%' },
      { label: 'Neural Networks', value: '50', suffix: '+' },
      { label: 'Models Trained', value: '15', suffix: 'K' }
    ]
  },
  {
    id: 'college-db',
    title: 'College Database System',
    subtitle: 'Institutional Context',
    icon: '🏛️',
    stats: [
      { label: 'US Colleges', value: '2,847', suffix: '+' },
      { label: 'Programs Tracked', value: '12', suffix: 'K' },
      { label: 'Historical Data', value: '10', suffix: 'Y' }
    ]
  },
  {
    id: 'data-integration',
    title: 'Data Integration Hub',
    subtitle: 'Multi-Source Processing',
    icon: '🔗',
    stats: [
      { label: 'Data Sources', value: '25', suffix: '+' },
      { label: 'API Integrations', value: '15', suffix: '+' },
      { label: 'Real-time Updates', value: '24', suffix: '/7' }
    ]
  }
]

export default function ROXCubeAnimation() {
  const [activeCube, setActiveCube] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" })

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveCube((prev) => (prev + 1) % cubeData.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView])

  const currentData = cubeData[activeCube]

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

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - 3D Cube Animation */}
        <Reveal delay={0.1}>
          <div className="relative flex justify-center items-center h-[500px]">
            {/* 3D Cube Container */}
            <div className="relative w-64 h-64 perspective-1000">
              {/* Cube Faces */}
              <div className={`
                relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ease-in-out
                ${isAnimating ? 'rotate-y-180' : 'rotate-y-0'}
              `}>
                {/* Front Face */}
                <div className="absolute inset-0 bg-background-subtle border border-border rounded-2xl p-8 backface-hidden">
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-4">{currentData.icon}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{currentData.title}</h3>
                    <p className="text-foreground/70">{currentData.subtitle}</p>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 bg-background-subtle border border-border rounded-2xl p-8 backface-hidden transform rotate-y-180">
                  <div className="flex flex-col justify-center h-full">
                    <h3 className="text-xl font-bold text-foreground mb-6">{currentData.title}</h3>
                    <div className="space-y-4">
                      {currentData.stats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-foreground/70">{stat.label}</span>
                          <span className="text-2xl font-bold text-primary">
                            {stat.value}{stat.suffix}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {cubeData.map((_, index) => (
                <div
                  key={index}
                  className={`
                    absolute w-3 h-3 bg-primary rounded-full transition-all duration-500
                    ${index === activeCube ? 'opacity-100 scale-150' : 'opacity-30 scale-100'}
                  `}
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${10 + index * 5}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right side - Info Panel */}
        <Reveal delay={0.2}>
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">{currentData.title}</h3>
              <p className="text-foreground/70 text-lg mb-6">{currentData.subtitle}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {currentData.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-background-subtle border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Cube Navigation */}
            <div className="flex gap-2">
              {cubeData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCube(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index === activeCube ? 'bg-primary scale-125' : 'bg-foreground/30 hover:bg-foreground/50'}
                  `}
                />
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 p-6 rounded-xl bg-background-subtle border border-border">
              <p className="text-foreground/80 leading-relaxed">
                {activeCube === 0 && "Our application layer processes student profiles with comprehensive academic and extracurricular data analysis."}
                {activeCube === 1 && "Advanced AI models analyze patterns and predict admission chances with 94.3% accuracy using neural networks."}
                {activeCube === 2 && "Comprehensive database of US colleges with real-time admission data and historical trend analysis."}
                {activeCube === 3 && "Seamless integration with multiple data sources for complete student profile analysis."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
