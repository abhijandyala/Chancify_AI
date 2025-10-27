import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'accent' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'accent',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props 
}: ButtonProps) {
  const variantClasses = {
    accent: 'btn-accent',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 sm:px-6 py-3 text-sm sm:text-base min-h-[48px]',
    lg: 'px-6 sm:px-8 py-4 text-base sm:text-lg min-h-[52px]',
  }

  return (
    <button
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
}
