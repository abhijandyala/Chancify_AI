'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  y?: number
  delay?: number
  className?: string
}

export default function Reveal({ children, y = 20, delay = 0, className }: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-10% 0px" })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
