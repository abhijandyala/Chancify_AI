'use client'

import Reveal from './Reveal'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ROXHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-16 sm:py-20 md:py-24">
        <Reveal>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="hidden sm:inline">Chancify AI is now generally available!</span>
              <span className="sm:hidden">Now Available!</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground text-center leading-tight px-2">
            College Admissions<br />
            <span className="text-primary">AI Predictor</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-4 sm:mt-6 text-foreground/70 max-w-xs sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-center mx-auto leading-relaxed px-2">
            <span className="hidden sm:inline">Fastest time-to-insight | Holistic analysis | Full-service deployment</span>
            <span className="sm:hidden">Fastest insights | Holistic analysis | Full deployment</span>
          </p>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <span className="hidden sm:inline">Log In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
            <Link href="/home" className="w-full sm:w-auto">
              <Button 
                variant="ghost" 
                className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 border border-border w-full sm:w-auto"
                onClick={() => {
                  // Set trial mode flag when clicking "Try for Now"
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('trial_mode', 'true')
                    localStorage.removeItem('auth_token') // Remove any existing auth token
                    // Trigger a custom event to notify header of trial mode change
                    window.dispatchEvent(new CustomEvent('trialModeChanged'))
                  }
                }}
              >
                <span className="hidden sm:inline">Try for Now</span>
                <span className="sm:hidden">Try Now</span>
              </Button>
            </Link>
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
