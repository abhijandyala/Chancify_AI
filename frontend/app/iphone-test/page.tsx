'use client'

import iPhone3DComponent from '@/components/ui/iPhone3D'

export default function iPhoneTestPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">3D iPhone Model Test</h1>
        <p className="text-white/70">Drag to rotate • Auto-returns to position after 3 seconds</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <iPhone3DComponent />
      </div>
      
      <div className="text-center mt-8">
        <p className="text-white/50 text-sm">
          iPhone 14 Pro Model • 4K Quality Screen • Realistic Materials
        </p>
      </div>
    </div>
  )
}
