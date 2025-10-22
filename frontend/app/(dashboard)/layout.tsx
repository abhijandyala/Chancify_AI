'use client'

import { useState, Suspense, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { SettingsPanel } from '@/components/layout/SettingsPanel'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const handleSettingsEvent = () => {
      setIsSettingsOpen(true)
    }

    window.addEventListener('open-settings', handleSettingsEvent)
    return () => window.removeEventListener('open-settings', handleSettingsEvent)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* ROX-style ambient background gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[620px] w-[980px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(closest-side,rgba(245,200,75,.35),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full blur-2xl opacity-15 bg-[radial-gradient(closest-side,rgba(103,232,249,.25),transparent_70%)]" />
      </div>

      <Sidebar />
      
      <div className="ml-64 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Header />
          
          <main className="space-y-8">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading...</p>
                </div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>

      <Suspense fallback={null}>
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </Suspense>
    </div>
  )
}

