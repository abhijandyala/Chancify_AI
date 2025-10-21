'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const items = ['Discover', 'Watchlist', 'SAT Prep']

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg border border-border text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-background-raised border-r border-border p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-black text-lg text-foreground">Chancify AI</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-foreground/70 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="grid gap-3 mb-8">
              {items.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="p-3 rounded-xl border border-border text-foreground hover:border-primary/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            
            <div className="space-y-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="btn-primary w-full">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">Try for now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
