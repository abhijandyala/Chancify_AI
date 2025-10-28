'use client'

import iPhone3D from '@/components/ui/iPhone3D'
import React from 'react'

export default function iPhoneTestPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">3D iPhone Model Test</h1>
        <p className="text-white/70">Drag to rotate • Auto-returns to position after 3 seconds</p>
      </div>
      
      <div className="w-full max-w-4xl">
        {React.createElement(iPhone3D)}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-white/50 text-sm">
          iPhone 14 Pro Model • 4K Quality Screen • Realistic Materials
        </p>
      </div>
    </div>
  )
}