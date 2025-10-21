'use client'

import { Button } from '@/components/ui/Button'
import Reveal from './Reveal'

export default function ROXPricingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
            No need to wait.
          </h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Plans designed to match the unique needs of high-performing students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary text-lg px-8 py-4">
              Contact Sales
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4 border border-border">
              See Pricing
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
