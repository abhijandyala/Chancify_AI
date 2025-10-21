'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Shield, Zap, Users } from 'lucide-react'
import Reveal from './Reveal'

const enterpriseFeatures = [
  {
    number: "01",
    icon: Zap,
    title: "Integrates with your existing stack",
    desc: "Works seamlessly with your tools"
  },
  {
    number: "02", 
    icon: Shield,
    title: "Compliant with Security Standards",
    desc: "Security and standards built-in."
  },
  {
    number: "03",
    icon: Users,
    title: "Enterprise Deployment & Training On Us",
    desc: "Onboarding and support included."
  }
]

export default function ROXEnterprise() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Enterprise Ready
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Built for enterprise-grade performance, security, and compliance.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {enterpriseFeatures.map((feature, i) => (
          <Reveal key={feature.number} delay={0.1 + (i * 0.1)}>
            <div className="text-center">
              <div className="text-6xl font-black text-primary/20 mb-4">{feature.number}</div>
              
              <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/70">
                {feature.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
