'use client'

import { useEffect, useRef } from 'react'
import Reveal from './Reveal'

export default function ROXVideoDemo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current!
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="rounded-2xl border border-border bg-background-subtle p-2">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
            <video
              ref={ref}
              playsInline
              muted
              loop
              controls={false}
              className="w-full h-full object-cover rounded-xl"
              poster="/api/placeholder/1200/675"
            >
              <source src="/demo.mp4" type="video/mp4" />
              <source src="/demo.webm" type="video/webm" />
            </video>
            
            {/* Fallback content when video doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">AI in Action</h3>
                <p className="text-foreground/70">See how Chancify AI analyzes your profile</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
