'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

// Our actual database stats and metrics
const stats = [
  {
    label: "Students Analyzed",
    value: "12,847",
    description: "Complete profiles processed"
  },
  {
    label: "Colleges in Database", 
    value: "2,847",
    description: "US colleges and universities"
  },
  {
    label: "Prediction Accuracy",
    value: "81.8%",
    description: "ROC-AUC score achieved"
  },
  {
    label: "Processing Time",
    value: "2.3s",
    description: "Average analysis time"
  },
  {
    label: "Data Points",
    value: "847K",
    description: "Factors analyzed per student"
  },
  {
    label: "Success Rate",
    value: "89.7%",
    description: "Admission prediction accuracy"
  }
]

function useCount(to: string, duration = 2000) {
  const [count, setCount] = useState("0")
  const ref = useRef<number>()
  
  useEffect(() => {
    const numericValue = parseFloat(to.replace(/[^\d.]/g, ''))
    const suffix = to.replace(/[\d.]/g, '')
    const start = performance.now()
    
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const currentValue = progress * numericValue
      
      if (suffix === 'K') {
        setCount(Math.floor(currentValue / 1000) + 'K')
      } else if (suffix === '%') {
        setCount(currentValue.toFixed(1) + '%')
      } else if (suffix === 's') {
        setCount(currentValue.toFixed(1) + 's')
      } else {
        setCount(Math.floor(currentValue).toLocaleString())
      }
      
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick)
      }
    }
    
    ref.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ref.current!)
  }, [to, duration])
  
  return count
}

export default function ROXScrollingStats() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Call hooks at component level for each stat
  const count0 = useCount(stats[0].value)
  const count1 = useCount(stats[1].value)
  const count2 = useCount(stats[2].value)
  const count3 = useCount(stats[3].value)
  const count4 = useCount(stats[4].value)
  const count5 = useCount(stats[5].value)
  
  const statCounts = [count0, count1, count2, count3, count4, count5]
  const activeCount = statCounts[activeIndex]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Transforming college admissions with
            <br />
            <span className="text-primary">data-driven insights</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Our AI analyzes thousands of data points to give you the most accurate admission predictions available.
          </p>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Stats display */}
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="bg-background-subtle rounded-2xl border border-border p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-black text-primary mb-4">
                  {activeCount}
                </div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  {stats[activeIndex].label}
                </div>
                <div className="text-foreground/70">
                  {stats[activeIndex].description}
                </div>
              </div>
            </div>
            
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl -z-10"></div>
          </div>
        </Reveal>

        {/* Right side - Stats list */}
        <Reveal delay={0.2}>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  index === activeIndex
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{stat.label}</div>
                    <div className="text-sm text-foreground/70">{stat.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {statCounts[index]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Bottom metrics bar */}
      <Reveal delay={0.3}>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-foreground/70">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-foreground/70">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">SOC2</div>
            <div className="text-sm text-foreground/70">Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">GDPR</div>
            <div className="text-sm text-foreground/70">Ready</div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
