'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Brain, Target, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI Analysis",
    desc: "Advanced machine learning models analyze your complete profile, not just test scores."
  },
  {
    icon: Target,
    title: "Holistic Factors",
    desc: "Consider leadership, research, awards, passion projects, and unique experiences."
  },
  {
    icon: TrendingUp,
    title: "Real-time Updates",
    desc: "Get updated predictions as you improve your profile and add achievements."
  },
  {
    icon: Users,
    title: "Community Insights",
    desc: "Learn from successful applicants and discover what makes profiles stand out."
  }
]

export default function ROXFeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <GlassCard 
            key={feature.title} 
            className="p-6 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className="flex flex-col items-start">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
