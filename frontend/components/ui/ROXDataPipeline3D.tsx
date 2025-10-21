'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ROXDataPipeline3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    const cards = cardsRef.current.filter(Boolean)
    
    if (!container || cards.length === 0) return

    // Set initial positions
    gsap.set(cards, {
      transformOrigin: 'center center',
      z: (i: number) => -i * 100,
      y: (i: number) => i * 20,
      rotationX: 0,
      rotationY: 0,
      opacity: 0.8
    })

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    })

    // Phase 1: Fan out the cards
    tl.to(cards, {
      z: (i: number) => -i * 200,
      y: (i: number) => i * -30,
      rotationY: (i: number) => (i - 2) * 10,
      rotationX: (i: number) => -5 + i * 2,
      opacity: 0.9,
      duration: 1
    })

    // Phase 2: Spotlight each card
    cards.forEach((card, i) => {
      const startTime = 1.2 + i * 0.8
      
      // Bring this card forward
      tl.to(card, {
        z: -i * 200 + 300,
        scale: 1.05,
        opacity: 1,
        duration: 0.6
      }, startTime)
      
      // Dim other cards
      tl.to(cards.filter((_, j) => j !== i), {
        opacity: 0.4,
        duration: 0.6
      }, startTime)
      
      // Reset all cards
      tl.to(cards, {
        z: (j: number) => -j * 200,
        scale: 1,
        opacity: 0.9,
        duration: 0.4
      }, startTime + 0.6)
    })

    // Phase 3: Final settle
    tl.to(cards, {
      y: (i: number) => i * -15,
      rotationY: 0,
      rotationX: -2,
      duration: 0.5
    })

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY
      
      gsap.to(container, {
        rotationY: deltaX * 5,
        rotationX: -deltaY * 3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const cardData = [
    {
      title: 'Database Architecture',
      content: 'PostgreSQL with 2,847 college records, 12,847 student profiles, and 5+ years of historical admissions data.'
    },
    {
      title: 'Reddit Scraper',
      content: 'Custom Python scraper pulling real outcomes + stats from r/ApplyingToCollege and r/chanceme.'
    },
    {
      title: 'Probability Engine',
      content: 'ML models (Random Forest, XGBoost, small NNs) powering predictions and scenario testing.'
    },
    {
      title: 'Real Data Sources',
      content: (
        <ul className="space-y-2 text-sm">
          <li>• IPEDS College Database (2,847 institutions)</li>
          <li>• College Board SAT/ACT data</li>
          <li>• Reddit admission stories (5,000+ posts)</li>
          <li>• Historical admission rates (2018–2023)</li>
        </ul>
      )
    },
    {
      title: 'ML Pipeline',
      content: (
        <ul className="space-y-2 text-sm">
          <li>• Feature engineering (GPA, tests, ECs)</li>
          <li>• Ensemble methods (RF + XGB)</li>
          <li>• Neural networks for complex patterns</li>
          <li>• Cross-validation accuracy: 94.3%</li>
        </ul>
      )
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative h-[200vh] bg-black"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Title overlay */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-4">
            <span className="text-yellow-400 text-sm font-semibold tracking-wide">Data Pipeline</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Our <span className="text-yellow-400">Data Pipeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Real data sources, machine learning, and probability calculations
          </p>
        </div>

        {/* 3D Card Stack */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-4xl h-[60vh] perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 shadow-2xl transform-style-preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 bg-yellow-400/12 text-yellow-300 text-xs font-bold tracking-widest uppercase rounded-full border border-white/8">
                    {card.title}
                  </span>
                </div>
                <div className="flex-1 text-gray-300 text-base leading-relaxed">
                  {card.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}