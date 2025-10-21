'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Float, Stars, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function DataPipelineTunnel() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.2
    }
  })
  
  // Reduce items for better performance and professionalism
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const items = Array.from({ length: isMobile ? 4 : 6 })
  
  return (
    <group ref={group}>
      {items.map((_, i) => (
        <Float key={i} speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={[Math.sin(i) * 2.2, Math.cos(i * 1.3) * 0.9, -i * 2.2]}>
            <torusKnotGeometry args={isMobile ? [0.35, 0.12, 60, 8] : [0.35, 0.12, 120, 16]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#ffffff' : '#f59e0b'} // Golden yellow and white colors
              metalness={0.65} 
              roughness={0.25} 
              emissive={i % 3 === 0 ? '#3d2914' : i % 3 === 1 ? '#1a1a1a' : '#3d2914'} 
              emissiveIntensity={0.35} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function DataPipelineScrollTunnel() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  return (
    <div className="relative h-[120vh] bg-black text-white">
      <Canvas 
        className="sticky top-0 h-screen" 
        camera={{ position: [0, 0, 4], fov: 62 }}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.4} />
        <directionalLight intensity={1.4} position={[4, 3, 5]} />
        <pointLight position={[-3, -2, 2]} color="#fbbf24" intensity={0.8} />
        <pointLight position={[3, 2, -2]} color="#ffffff" intensity={0.6} />
        <Environment preset="city" />
        <Stars radius={60} depth={40} count={isMobile ? 600 : 1000} factor={3} fade speed={1} />

        <ScrollControls pages={2} damping={0.18}>
          {/* 3D content follows the scroll */}
          <Scroll>
            <DataPipelineTunnel />
          </Scroll>

          {/* HTML overlays per section */}
          <Scroll html>
            <section className="h-screen grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-8 py-6 bg-black/60 max-w-4xl mx-auto"
              >
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-4">
                  Our <span className="text-yellow-400">Data Pipeline</span>
                </h1>
                <p className="text-gray-300 text-center text-lg max-w-3xl mx-auto">
                  Comprehensive data collection from Reddit, IPEDS, and machine learning processing for accurate college admission predictions.
                </p>
              </motion.div>
            </section>
            <section className="h-screen grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="text-center backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-8 py-6 bg-black/60 max-w-4xl mx-auto"
              >
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                  <span className="text-yellow-400">5,000+</span> Real Stories
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                  Authentic admission experiences from Reddit, processed through custom Python scrapers and machine learning models.
                </p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">2,847</div>
                    <div className="text-gray-400 text-sm">Colleges</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">12,847</div>
                    <div className="text-gray-400 text-sm">Profiles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">94.3%</div>
                    <div className="text-gray-400 text-sm">Accuracy</div>
                  </div>
                </div>
              </motion.div>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
