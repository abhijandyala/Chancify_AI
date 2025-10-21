'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import MobileMenu from '@/components/ui/MobileMenu'

export default function ROXNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight text-lg text-foreground">
          Chancify AI
        </Link>
        
        
        <div className="flex items-center gap-2">
          <MobileMenu />
          <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button className="btn-primary">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost">Try for now</Button>
          </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
