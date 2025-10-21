'use client'

import Reveal from './Reveal'
import { Button } from '@/components/ui/Button'

export default function ROXHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            AI-powered college admissions predictor
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-4 text-foreground/70 max-w-2xl text-lg">
            The only AI that considers your unique story - not just numbers. 
            Get personalized admission chances based on holistic factors that matter.
          </p>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button className="btn-primary text-lg px-8 py-4">
              Calculate My Chances
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-border bg-background-subtle p-2">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">85.51%</div>
                <div className="text-foreground/70">ROC-AUC Score</div>
                <div className="text-sm text-foreground/50 mt-2">Powered by AI</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-48 right-0 h-96 w-96 bg-primary/10 blur-3xl rounded-full"
      />
    </section>
  )
}
