'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Suspense } from 'react'
import StackScene from './StackScene'

export default function StackSection() {
  return (
    <section className="relative h-[400vh] bg-background">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="bg-transparent"
        >
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.1}>
              <StackScene />
              <Scroll html>
                {/* Left Text Rail */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-md">
                  <div className="space-y-8">
                    <div className="text-primary font-semibold text-lg">Chancify AI</div>
                    <div className="text-foreground/80 space-y-4">
                      <div className="text-2xl font-bold">Application</div>
                      <div className="text-2xl font-bold text-primary">AI Analysis Engine</div>
                      <div className="text-2xl font-bold">College Database</div>
                      <div className="text-2xl font-bold">Data Sources</div>
                    </div>
                  </div>
                </div>

                {/* Right Text Rail */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 max-w-md text-right">
                  <div className="space-y-8">
                    <div className="text-primary font-semibold text-lg">Processing Power</div>
                    <div className="text-foreground/80 space-y-4">
                      <div className="text-lg">Multi-layered AI system</div>
                      <div className="text-lg">Advanced neural networks</div>
                      <div className="text-lg">Real-time data processing</div>
                      <div className="text-lg">Holistic analysis engine</div>
                    </div>
                  </div>
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
