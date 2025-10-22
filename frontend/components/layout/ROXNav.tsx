'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import MobileMenu from '@/components/ui/MobileMenu'

export default function ROXNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight text-base sm:text-lg text-foreground">
          Chancify AI
        </Link>
        
        
        <div className="flex items-center gap-1 sm:gap-2">
          <MobileMenu />
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
          <Link href="/auth">
            <Button className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
              <span className="hidden sm:inline">Log In</span>
              <span className="sm:hidden">Login</span>
            </Button>
          </Link>
          <Link href="/home">
            <Button variant="ghost" className="text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
              <span className="hidden sm:inline">Try for now</span>
              <span className="sm:hidden">Try Now</span>
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
