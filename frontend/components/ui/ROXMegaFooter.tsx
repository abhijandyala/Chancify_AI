'use client'

import Link from 'next/link'

export default function ROXMegaFooter() {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-foreground/60 text-sm">
              Copyright © {new Date().getFullYear()} Chancify AI. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-foreground/60">
              <Link href="/company/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/company/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/company/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/company/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/company/privacy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
