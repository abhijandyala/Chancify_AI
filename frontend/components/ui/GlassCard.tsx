import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'strong'
  hover?: boolean
}

export function GlassCard({ 
  children, 
  variant = 'default',
  hover = false,
  className,
  ...props 
}: GlassCardProps) {
  const baseClasses = variant === 'strong' ? 'glass-panel' : 'glass-card'
  
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer' 
    : ''

  return (
    <div
      className={cn(baseClasses, hoverClasses, 'animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  )
}
