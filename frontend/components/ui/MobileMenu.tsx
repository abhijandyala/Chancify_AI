'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const items: string[] = []

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-1.5 sm:p-2 rounded-lg border border-border text-foreground"
      >
        <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-background-raised border-r border-border p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="font-black text-base sm:text-lg text-foreground">Chancify AI</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 sm:p-2 rounded-lg text-foreground/70 hover:text-foreground"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            
            <nav className="grid gap-2 sm:gap-3 mb-6 sm:mb-8">
              {items.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-border text-foreground hover:border-primary/50 transition-colors text-sm sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            
            <div className="space-y-2 sm:space-y-3">
              <Link href="/auth" onClick={() => setIsOpen(false)}>
                <Button className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3">Log In</Button>
              </Link>
              <Link href="/home" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-sm sm:text-base py-2 sm:py-3">Try for now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
