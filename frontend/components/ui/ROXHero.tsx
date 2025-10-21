'use client'

import Reveal from './Reveal'
import { Button } from '@/components/ui/Button'

export default function ROXHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <Reveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              Chancify AI is now generally available!
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground text-center leading-tight">
            College Admissions<br />
            <span className="text-primary">AI Predictor</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-6 text-foreground/70 max-w-3xl text-xl text-center mx-auto leading-relaxed">
            Fastest time-to-insight | Holistic analysis | Full-service deployment
          </p>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary text-lg px-8 py-4">
              Sign In
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4 border border-border">
              Try for Now
            </Button>
          </div>
        </Reveal>
      </div>
      
      {/* Background Elements */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-48 right-0 h-96 w-96 bg-primary/10 blur-3xl rounded-full"
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-48 left-0 h-96 w-96 bg-accent/5 blur-3xl rounded-full"
      />
    </section>
  )
}
