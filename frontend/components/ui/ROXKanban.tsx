'use client'

import { GlassCard } from '@/components/ui/GlassCard'

interface Card {
  id: string
  title: string
  college: string
  chance: string
}

const initial = {
  'Reach Schools': [
    { id: 'c1', title: 'Stanford Application', college: 'Stanford University', chance: '85%' },
    { id: 'c2', title: 'MIT Application', college: 'MIT', chance: '78%' },
  ],
  'Target Schools': [
    { id: 'c3', title: 'UC Berkeley App', college: 'UC Berkeley', chance: '92%' },
    { id: 'c4', title: 'UCLA Application', college: 'UCLA', chance: '89%' },
  ],
  'Safety Schools': [
    { id: 'c5', title: 'State University', college: 'State University', chance: '95%' },
  ],
}

export default function ROXKanban() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {Object.entries(initial).map(([stage, cards]) => (
        <div key={stage} className="rounded-2xl border border-border p-4 bg-background-subtle">
          <div className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            {stage}
          </div>
          <div className="space-y-3">
            {cards.map((card) => (
              <GlassCard 
                key={card.id} 
                className="p-4 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">{card.title}</div>
                  <div className="text-xs text-foreground/70">{card.college}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary">{card.chance}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/30" />
                    <span className="text-xs text-foreground/50">chance</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
