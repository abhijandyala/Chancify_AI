'use client'

import { useState } from 'react'
import Link from 'next/link'
import TermsOfServiceModal from './TermsOfServiceModal'

export default function ROXMegaFooter() {
  const [showTermsModal, setShowTermsModal] = useState(false)
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
              <button 
                onClick={() => setShowTermsModal(true)}
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="hover:text-foreground transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terms of Service Modal */}
      <TermsOfServiceModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </footer>
  )
}
