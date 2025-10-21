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

    // Set initial positions - all cards stacked in center
    gsap.set(cards, {
      transformOrigin: 'center center',
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      opacity: 1,
      zIndex: (i: number) => 10 - i
    })

    // Create ultra-smooth timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=4000',
        scrub: 0.1, // Ultra smooth scrub
        pin: true,
        anticipatePin: 1
      }
    })

    // Phase 1: Smooth fan out with zoom effect
    tl.to(cards, {
      z: (i: number) => -i * 120,
      y: (i: number) => (i - 2) * -30 + 50, // Move cards lower
      x: (i: number) => (i - 2) * 15,
      rotationY: (i: number) => (i - 2) * 6,
      rotationX: (i: number) => -2 + i * 1,
      scale: 0.9, // Make cards smaller
      opacity: 1, // Keep fully opaque
      duration: 2,
      ease: 'power2.out'
    })

    // Phase 2: Zoom into each card individually
    cards.forEach((card, i) => {
      const startTime = 2.5 + i * 1.5
      
      // Zoom into this specific card
      tl.to(card, {
        z: 150, // Bring to front
        scale: 1.1, // Smaller zoom in
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 20, // Keep cards lower
        opacity: 1, // Keep fully opaque
        duration: 1,
        ease: 'power2.inOut'
      }, startTime)
      
      // Move other cards back but keep them visible
      tl.to(cards.filter((_, j) => j !== i), {
        z: (j: number) => -j * 120 - 80,
        scale: 0.7,
        opacity: 0.6, // Less dimming
        duration: 1,
        ease: 'power2.inOut'
      }, startTime)
      
      // Hold the zoom for a moment
      tl.to({}, { duration: 0.8 }, startTime + 1)
      
      // Reset all cards smoothly
      tl.to(cards, {
        z: (j: number) => -j * 120,
        scale: 0.9,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, startTime + 1.8)
    })

    // Phase 3: Final smooth settle
    tl.to(cards, {
      z: (i: number) => -i * 80,
      y: (i: number) => (i - 2) * -15 + 40, // Keep cards lower
      x: (i: number) => (i - 2) * 8,
      rotationY: (i: number) => (i - 2) * 4,
      rotationX: (i: number) => -1 + i * 0.5,
      scale: 0.85, // Keep cards smaller
      opacity: 1, // Keep fully opaque
      duration: 1.5,
      ease: 'power2.out'
    })

    // Ultra-smooth mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY
      
      gsap.to(container, {
        rotationY: deltaX * 2,
        rotationX: -deltaY * 1.5,
        duration: 1.2,
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
      className="relative h-[300vh] bg-black"
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
              className="absolute inset-0 bg-gray-800 border border-gray-600 rounded-2xl p-8 shadow-2xl transform-style-preserve-3d opacity-100"
              style={{ 
                transformStyle: 'preserve-3d',
                zIndex: 10 - index,
                backgroundColor: '#1f2937',
                opacity: 1
              }}
            >
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 bg-yellow-400/20 text-yellow-300 text-xs font-bold tracking-widest uppercase rounded-full border border-yellow-400/30">
                    {card.title}
                  </span>
                </div>
                <div className="flex-1 text-white text-base leading-relaxed">
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