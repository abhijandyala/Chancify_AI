'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import Reveal from './Reveal'

export default function ROXTestimonial() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="space-y-8">
            <div className="text-6xl font-black text-primary">90%</div>
            <div className="text-foreground/70 text-lg">reduction in application prep time</div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="p-8">
            <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground mb-6">
              "I get into better colleges when I use <span className="text-primary">Chancify AI</span>. That's the bottom line."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">MF</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Max Freeman</div>
                <div className="text-foreground/70">High School Student</div>
              </div>
            </div>
            <button className="mt-6 text-primary hover:text-primary/80 transition-colors font-medium">
              Read the full case study →
            </button>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
