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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleSettingsEvent = () => {
      setIsSettingsOpen(true)
    }

    window.addEventListener('open-settings', handleSettingsEvent)
    return () => window.removeEventListener('open-settings', handleSettingsEvent)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Complex Square Star Pattern Background */}
      <div className="absolute inset-0 opacity-30 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }} />
        {/* Star pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px, 200px 200px, 100px 100px'
        }} />
      </div>

      {/* ROX-style ambient background gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[620px] w-[980px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(closest-side,rgba(245,200,75,.35),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full blur-2xl opacity-15 bg-[radial-gradient(closest-side,rgba(103,232,249,.25),transparent_70%)]" />
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div className={`relative z-10 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-0' : 'ml-64'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Header />
          
          <main className="space-y-8 relative z-10">
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

