'use client'

import { useEffect, useRef, useState } from 'react'

function useCount(to: number, duration = 1600) {
  const [n, setN] = useState(0)
  const ref = useRef<number>()
  
  useEffect(() => {
    const start = performance.now()
    
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.floor(p * to))
      if (p < 1) {
        ref.current = requestAnimationFrame(tick)
      }
    }
    
    ref.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ref.current!)
  }, [to, duration])
  
  return n
}

export default function ROXCounters() {
  const accuracy = useCount(85)
  const students = useCount(12000)
  const colleges = useCount(2500)
  
  const stats = [
    { value: accuracy, suffix: "%", label: "Prediction Accuracy" },
    { value: students, suffix: "+", label: "Students Helped" },
    { value: colleges, suffix: "+", label: "Colleges Analyzed" }
  ]
  
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="rounded-2xl border border-border p-8 bg-background-subtle text-center hover:border-primary/40 transition-colors"
          >
            <div className="text-5xl font-black text-primary mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-foreground/70 text-lg">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
