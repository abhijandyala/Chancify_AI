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
  const layersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const stack = stackRef.current
    const layers = layersRef.current
    if (!stack || !layers.length) return

    // Base transform for all layers (isometric)
    gsap.set(stack, { 
      transformPerspective: 1200, 
      transformOrigin: '50% 50%' 
    })

    layers.forEach((el, i) => {
      const order = i // 0 = top, increases downward
      gsap.set(el, {
        z: -order * 30,           // collapsed stack spacing (starting state)
        y: order * 6,             // tiny offset
        rotateX: 0, 
        rotateY: 0,               // we'll add small rotations later
        opacity: 0.85
      })
    })

    // Timeline tied to the entire section height
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2400',        // scroll length for the sequence
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    })

    // Phase 1 — fan open
    tl.to(layers, {
      z: (_, i) => -i * 140,      // push deeper into scene
      y: (_, i) => i * -20,       // stagger upward
      duration: 1
    }, 0)
    .to(layers, {
      rotateY: (_, i) => (i - (layers.length/2)) * 2.2, // slight yaw
      rotateX: (_, i) => (-4 + i * 0.8),                // slight pitch differences
      boxShadow: '0 40px 120px rgba(0,0,0,.55)',
      duration: 1
    }, 0)

    // Phase 2 — spotlight each layer one-by-one
    layers.forEach((el, i) => {
      // bring selected card forward & brighten, dim others slightly
      tl.to(el, {
        z: -i * 140 + 240,     // pull toward viewer
        scale: 1.02,
        opacity: 1,
        duration: 0.7
      }, 0.9 + i * 0.6)

      tl.to(layers.filter((_, j) => j !== i), {
        opacity: 0.55,
        duration: 0.7
      }, 0.9 + i * 0.6)

      // restore all to expanded state before next spotlight
      tl.to(layers, {
        opacity: 0.9,
        z: (_, j) => -j * 140,
        scale: 1,
        duration: 0.5
      }, 1.45 + i * 0.6)
    })

    // Phase 3 — graceful settle
    tl.to(layers, {
      y: (_, i) => i * -8,
      rotateY: 0,
      rotateX: -2,
      duration: 0.6
    })

    // Mouse parallax (subtle)
    const center = () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const rx = gsap.quickTo(stack, "rotationX", { duration: 0.4, ease: "power2.out" })
    const ry = gsap.quickTo(stack, "rotationY", { duration: 0.4, ease: "power2.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const c = center()
      const dx = (e.clientX - c.x) / c.x // -1..1
      const dy = (e.clientY - c.y) / c.y // -1..1
      ry(dx * 6)
      rx(-dy * 4)
    }

    window.addEventListener('pointermove', handleMouseMove, { passive: true })

    // Resize safety: recalc ScrollTrigger positions
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-[300vh] bg-black"
      id="data-pipeline-3d"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 grid place-items-center perspective-1200 bg-gradient-to-b from-black via-gray-900 to-black">
          {/* Title overlay (accessible, not part of the 3D transforms) */}
          <div className="absolute inset-0 grid place-items-start place-content-center pointer-events-none pt-16 md:pt-24">
            <div className="text-center">
              <div className="inline-block px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-4">
                <span className="text-yellow-400 text-sm font-semibold tracking-wide">Data Pipeline</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                Our <span className="text-yellow-400">Data Pipeline</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Real data sources, machine learning, and probability calculations
              </p>
            </div>
          </div>

          {/* 3D stack (each .layer is one 'card' in the stack) */}
          <div 
            ref={stackRef}
            className="relative w-full max-w-5xl h-[70vh] transform-style-preserve-3d transform rotate-x-55 rotate-z-neg-35 translate-z-0 will-change-transform"
            style={{
              transform: 'rotateX(55deg) rotateZ(-35deg) translateZ(0)'
            }}
          >
            {/* Top layer - Database Architecture */}
            <article 
              ref={el => el && (layersRef.current[0] = el)}
              className="absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d will-change-transform"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)), color-mix(in oklab, #0f1520, #0a0f18 30%)',
                boxShadow: '0 30px 80px rgba(0,0,0,.45)'
              }}
            >
              <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-400 border border-white/8">
                    Database Architecture
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  PostgreSQL with <strong className="text-white">2,847</strong> college records, <strong className="text-white">12,847</strong> student profiles, and 5+ years of historical admissions data.
                </p>
              </div>
            </article>

            {/* Layer 2 - Reddit Scraper */}
            <article 
              ref={el => el && (layersRef.current[1] = el)}
              className="absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d will-change-transform"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)), color-mix(in oklab, #0f1520, #0a0f18 30%)',
                boxShadow: '0 30px 80px rgba(0,0,0,.45)'
              }}
            >
              <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-400 border border-white/8">
                    Reddit Scraper
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Custom Python scraper pulling real outcomes + stats from r/ApplyingToCollege and r/chanceme.
                </p>
              </div>
            </article>

            {/* Layer 3 - Probability Engine */}
            <article 
              ref={el => el && (layersRef.current[2] = el)}
              className="absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d will-change-transform"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)), color-mix(in oklab, #0f1520, #0a0f18 30%)',
                boxShadow: '0 30px 80px rgba(0,0,0,.45)'
              }}
            >
              <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-400 border border-white/8">
                    Probability Engine
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  ML models (Random Forest, XGBoost, small NNs) powering predictions and scenario testing.
                </p>
              </div>
            </article>

            {/* Layer 4 - Real Data Sources */}
            <article 
              ref={el => el && (layersRef.current[3] = el)}
              className="absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d will-change-transform"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)), color-mix(in oklab, #0f1520, #0a0f18 30%)',
                boxShadow: '0 30px 80px rgba(0,0,0,.45)'
              }}
            >
              <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-400 border border-white/8">
                    Real Data Sources
                  </span>
                </h3>
                <ul className="text-gray-400 text-sm md:text-base space-y-2">
                  <li>• IPEDS College Database (2,847 institutions)</li>
                  <li>• College Board SAT/ACT data</li>
                  <li>• Reddit admission stories (5,000+ posts)</li>
                  <li>• Historical admission rates (2018–2023)</li>
                </ul>
              </div>
            </article>

            {/* Layer 5 - ML Pipeline */}
            <article 
              ref={el => el && (layersRef.current[4] = el)}
              className="absolute inset-0 grid place-items-center p-6 rounded-3xl bg-gradient-to-b from-white/4 to-white/2 border border-white/8 shadow-2xl transform-style-preserve-3d will-change-transform"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)), color-mix(in oklab, #0f1520, #0a0f18 30%)',
                boxShadow: '0 30px 80px rgba(0,0,0,.45)'
              }}
            >
              <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3 bg-gradient-to-b from-white/2 to-transparent rounded-2xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full bg-yellow-400/12 text-yellow-400 border border-white/8">
                    ML Pipeline
                  </span>
                </h3>
                <ul className="text-gray-400 text-sm md:text-base space-y-2">
                  <li>• Feature engineering (GPA, tests, ECs)</li>
                  <li>• Ensemble methods (RF + XGB)</li>
                  <li>• Neural networks for complex patterns</li>
                  <li>• Cross-validation accuracy: 94.3%</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
