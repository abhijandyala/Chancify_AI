'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Brain, Target, TrendingUp, Users, BookOpen, BarChart3 } from 'lucide-react'
import Reveal from './Reveal'

const workflows = [
  {
    icon: Brain,
    title: "Monitor",
    desc: "Proactive admission risks and insights",
    action: "Watch Demo"
  },
  {
    icon: Target,
    title: "Research", 
    desc: "Scale your college research",
    action: "Watch Demo"
  },
  {
    icon: TrendingUp,
    title: "Plays",
    desc: "Run application strategies", 
    action: "Watch Demo"
  },
  {
    icon: Users,
    title: "Outreach",
    desc: "Launch automated campaigns",
    action: "Watch Demo"
  },
  {
    icon: BookOpen,
    title: "Meet",
    desc: "Full application assistance",
    action: "Watch Demo"
  },
  {
    icon: BarChart3,
    title: "Opportunity Management",
    desc: "Encode admission processes",
    action: "Watch Demo"
  }
]

export default function ROXAgenticWorkflows() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Agents that Run Your Entire<br />
            <span className="text-primary">Application Journey</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Legacy college prep becomes invisible. AI Agents run in your workflow and do the work that supercharges your application.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
          Agentic Workflows
        </h3>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow, i) => (
          <Reveal key={workflow.title} delay={0.1 + (i * 0.05)}>
            <GlassCard className="p-6 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
              <div className="flex flex-col items-start h-full">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <workflow.icon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {workflow.title}
                  </h4>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                    {workflow.desc}
                  </p>
                </div>
                
                <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors group-hover:underline">
                  {workflow.action}
                </button>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
