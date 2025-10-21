'use client'

import { motion } from 'framer-motion'

const logos = [
  "Stanford", "MIT", "Harvard", "Yale", "Princeton", "Columbia", "UChicago", "Penn", 
  "Duke", "Northwestern", "Brown", "Cornell", "Rice", "Vanderbilt", "Emory"
]

export default function ROXClientMarquee() {
  return (
    <div className="border-y border-border bg-background-subtle py-8">
      <div className="text-center mb-6">
        <h3 className="text-foreground/60 text-sm font-medium tracking-wide uppercase">
          AI Transformation Partner to the Best
        </h3>
      </div>
      
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {logos.concat(logos).map((logo, i) => (
            <div key={i} className="flex-shrink-0 text-foreground/40 text-lg font-semibold whitespace-nowrap">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
