'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function ROXNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight text-lg text-foreground">
          Chancify AI
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-foreground/80">
          <Link href="/discover" className="link-underline hover:text-foreground transition-colors">
            Discover
          </Link>
          <Link href="/watchlist" className="link-underline hover:text-foreground transition-colors">
            Watchlist
          </Link>
          <Link href="/sat" className="link-underline hover:text-foreground transition-colors">
            SAT Prep
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button className="btn-primary">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
