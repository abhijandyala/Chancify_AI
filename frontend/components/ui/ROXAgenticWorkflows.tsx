'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Database, Users, TrendingUp, FileText, BarChart3, Lightbulb } from 'lucide-react'
import Reveal from './Reveal'
import Link from 'next/link'

const infoSections = [
  {
    icon: Database,
    title: "Our Data Story",
    desc: "Learn about our Reddit scraper and comprehensive data collection",
    action: "View Info",
    href: "/info/data-story"
  },
  {
    icon: Users,
    title: "Who We Help", 
    desc: "Discover the students and families we serve",
    action: "View Info",
    href: "/info/who-we-help"
  },
  {
    icon: TrendingUp,
    title: "Why This Matters",
    desc: "Understand the impact on college admissions", 
    action: "View Info",
    href: "/info/why-this-matters"
  },
  {
    icon: FileText,
    title: "Our Process",
    desc: "How we analyze and predict admission chances",
    action: "View Info",
    href: "/info/our-process"
  },
  {
    icon: BarChart3,
    title: "Admission Trends",
    desc: "Current state of college admissions and rolling decisions",
    action: "View Info",
    href: "/info/admission-trends"
  },
  {
    icon: Lightbulb,
    title: "Our Uniqueness",
    desc: "What makes our approach different and effective",
    action: "View Info",
    href: "/info/our-uniqueness"
  }
]

export default function ROXAgenticWorkflows() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Learn About Our<br />
            <span className="text-primary">College Admission Platform</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Discover our data-driven approach, comprehensive research, and innovative solutions for college admissions.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
          Information Center
        </h3>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoSections.map((section, i) => (
          <Reveal key={section.title} delay={0.1 + (i * 0.05)}>
            <Link href={section.href}>
              <GlassCard className="p-6 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
                <div className="flex flex-col items-start h-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {section.title}
                    </h4>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {section.desc}
                    </p>
                  </div>
                  
                  <span className="text-primary text-sm font-medium hover:text-primary/80 transition-colors group-hover:underline">
                    {section.action}
                  </span>
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
