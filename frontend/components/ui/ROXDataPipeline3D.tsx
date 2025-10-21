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
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Guard: prevent double init (React/Next navigations, HMR)
    const stack = stackRef.current
    if (!stack || stack.dataset.bound === '1') { return }
    stack.dataset.bound = '1'

    gsap.registerPlugin(ScrollTrigger)

    const layers = gsap.utils.toArray('#dpStack .layer')
    const EXPANDED_SPACING = 220   // spacing when fanned open (Z)
    const COLLAPSED_SPACING = 90   // spacing at rest (Z)
    const SPOTLIGHT_PULL = 420     // how far a card jumps toward camera when highlighted

    // Initial state — collapsed stack
    gsap.set(layers, {
      transformOrigin: '50% 50% -1px', 
      force3D: true,
      z: (i: number) => -i * COLLAPSED_SPACING,
      y: (i: number) => i * 6,
      rotateX: 0, 
      rotateY: 0, 
      opacity: 0.92
    })

    // Main timeline
    const tl = gsap.timeline({
      id: 'dp3d-timeline',
      defaults: { ease: 'none', force3D: true },
      scrollTrigger: {
        id: 'dp3d-st',
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2600', // total scroll travel
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      }
    })

    // Phase 1: fan open
    tl.to(layers, {
      z: (i: number) => -i * EXPANDED_SPACING,
      y: (i: number) => i * -18,
      duration: 1
    }, 0)
    .to(layers, {
      rotateY: (i: number) => (i - (layers.length/2)) * 2.0,
      rotateX: (i: number) => (-3 + i * 0.7),
      boxShadow: '0 50px 140px rgba(0,0,0,.55)',
      duration: 1
    }, 0)

    // Phase 2: spotlight each card
    layers.forEach((el: any, i: number) => {
      const t0 = 0.95 + i * 0.65
      tl.to(el, {
        z: -i * EXPANDED_SPACING + SPOTLIGHT_PULL,
        scale: 1.03,
        opacity: 1,
        duration: 0.6
      }, t0)
      tl.to(layers.filter((_: any, j: number) => j !== i), { 
        opacity: 0.55, 
        duration: 0.6 
      }, t0)
      tl.to(layers, {
        opacity: 0.9,
        z: (j: number) => -j * EXPANDED_SPACING,
        scale: 1,
        duration: 0.45
      }, t0 + 0.6)
    })

    // Phase 3: settle
    tl.to(layers, {
      y: (i: number) => i * -10,
      rotateY: 0,
      rotateX: -2,
      duration: 0.5
    })

    // Pointer parallax (paused while scrolling for stability)
    const rx = gsap.quickTo(stack, 'rotationX', { duration: 0.35, ease: 'power2.out' })
    const ry = gsap.quickTo(stack, 'rotationY', { duration: 0.35, ease: 'power2.out' })
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max))
    let scrolling = false
    ScrollTrigger.addEventListener('scrollStart', () => scrolling = true)
    ScrollTrigger.addEventListener('scrollEnd', () => scrolling = false)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (scrolling) return
      const cx = window.innerWidth/2, cy = window.innerHeight/2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      ry(clamp(dx * 6, -6, 6))
      rx(clamp(-dy * 4, -4, 4))
    }
    
    window.addEventListener('pointermove', handleMouseMove, { passive: true })

    // Keep ST positions correct on font/image load & resize
    const refreshScrollTrigger = () => ScrollTrigger.refresh()
    const fontReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
    fontReady.then(refreshScrollTrigger)
    
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(refreshScrollTrigger, 120)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getById('dp3d-st')?.kill()
      gsap.globalTimeline.getChildren().forEach((t: any) => 
        t.vars.id === 'dp3d-timeline' && t.kill()
      )
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-[320vh] bg-black"
      id="data-pipeline-3d"
    >
      <div className="sticky top-0 h-screen overflow-clip">
        <div className="absolute inset-0 grid place-items-center isolation-isolate perspective-1400 transform-style-preserve-3d bg-gradient-to-b from-black via-gray-900 to-black">
          {/* Title overlay (not transformed) */}
          <div className="absolute inset-0 grid place-items-start place-content-center pointer-events-none pt-14 md:pt-24">
            <div className="text-center">
              <div className="pointer-events-auto bg-yellow-400/10 border border-white/8 text-yellow-300 px-3 py-1.5 rounded-full font-bold text-sm tracking-wide">
                Data Pipeline
              </div>
              <h2 className="mt-3 mb-1.5 text-4xl md:text-6xl font-bold text-white tracking-tight">
                Our Data Pipeline
              </h2>
              <p className="text-gray-400 text-center">
                Real data sources, machine learning, and probability calculations
              </p>
            </div>
          </div>

          {/* 3D STACK */}
          <div 
            ref={stackRef}
            id="dpStack"
            className="relative w-full max-w-5xl h-[72vh] min-h-[560px] max-h-[760px] transform-style-preserve-3d will-change-transform transform-origin-center contain-layout-paint mobile-stack"
            style={{
              transform: 'rotateX(50deg) rotateZ(-30deg) translateZ(0)'
            }}
          >
            <article className="layer absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d backface-hidden will-change-transform overflow-visible" data-depth="0">
              <div className="card w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6 overflow-auto webkit-overflow-scrolling-touch">
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-300 border border-white/8">
                    Database Architecture
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed m-0">
                  PostgreSQL with <strong className="text-white">2,847</strong> college records, <strong className="text-white">12,847</strong> student profiles, and 5+ years of historical admissions data.
                </p>
              </div>
            </article>

            <article className="layer absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d backface-hidden will-change-transform overflow-visible" data-depth="1">
              <div className="card w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6 overflow-auto webkit-overflow-scrolling-touch">
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-300 border border-white/8">
                    Reddit Scraper
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed m-0">
                  Custom Python scraper pulling real outcomes + stats from r/ApplyingToCollege and r/chanceme.
                </p>
              </div>
            </article>

            <article className="layer absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d backface-hidden will-change-transform overflow-visible" data-depth="2">
              <div className="card w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6 overflow-auto webkit-overflow-scrolling-touch">
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-300 border border-white/8">
                    Probability Engine
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed m-0">
                  ML models (Random Forest, XGBoost, small NNs) powering predictions and scenario testing.
                </p>
              </div>
            </article>

            <article className="layer absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d backface-hidden will-change-transform overflow-visible" data-depth="3">
              <div className="card w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6 overflow-auto webkit-overflow-scrolling-touch">
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-300 border border-white/8">
                    Real Data Sources
                  </span>
                </h3>
                <ul className="text-gray-400 text-sm md:text-base space-y-1.5 m-0 pl-4">
                  <li>IPEDS College Database (2,847 institutions)</li>
                  <li>College Board SAT/ACT data</li>
                  <li>Reddit admission stories (5,000+ posts)</li>
                  <li>Historical admission rates (2018–2023)</li>
                </ul>
              </div>
            </article>

            <article className="layer absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d backface-hidden will-change-transform overflow-visible" data-depth="4">
              <div className="card w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6 overflow-auto webkit-overflow-scrolling-touch">
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  <span className="inline-block text-xs font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-300 border border-white/8">
                    ML Pipeline
                  </span>
                </h3>
                <ul className="text-gray-400 text-sm md:text-base space-y-1.5 m-0 pl-4">
                  <li>Feature engineering (GPA, tests, ECs)</li>
                  <li>Ensemble methods (RF + XGB)</li>
                  <li>Neural networks for complex patterns</li>
                  <li>Cross-validation accuracy: 94.3%</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}