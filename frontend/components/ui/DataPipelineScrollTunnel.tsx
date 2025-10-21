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
  
  const items = Array.from({ length: 14 })
  
  return (
    <group ref={group}>
      {items.map((_, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={[Math.sin(i) * 2.2, Math.cos(i * 1.3) * 0.9, -i * 2.2]}>
            <torusKnotGeometry args={[0.35, 0.12, 120, 16]} />
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
  return (
    <div className="relative h-[220vh] bg-black text-white">
      <Canvas className="sticky top-0 h-screen" camera={{ position: [0, 0, 4], fov: 62 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.4} />
        <directionalLight intensity={1.4} position={[4, 3, 5]} />
        <pointLight position={[-3, -2, 2]} color="#fbbf24" intensity={0.8} />
        <pointLight position={[3, 2, -2]} color="#ffffff" intensity={0.6} />
        <Environment preset="city" />
        <Stars radius={60} depth={40} count={1500} factor={3} fade speed={1} />

        <ScrollControls pages={3} damping={0.18}>
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
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-2xl px-6 py-4 bg-black/50"
              >
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
                  Our <span className="text-yellow-400">Data Pipeline</span>
                </h1>
                <p className="text-gray-300 mt-2">Scroll to explore our comprehensive data collection and processing system.</p>
              </motion.div>
            </section>
            <section className="h-screen grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="text-center backdrop-blur-md/30 border border-yellow-400/20 rounded-2xl px-6 py-4 bg-black/50"
              >
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                  <span className="text-yellow-400">Reddit Scraper</span> Revolution
                </h2>
                <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                  5,000+ authentic admission stories from r/ApplyingToCollege and r/chanceme, processed through our custom Python scraper with BeautifulSoup and Selenium.
                </p>
              </motion.div>
            </section>
            <section className="h-screen grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="text-center backdrop-blur-md/30 border border-yellow-400/20 rounded-2xl px-6 py-4 bg-black/50"
              >
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                  <span className="text-yellow-400">94.3%</span> ML Accuracy
                </h2>
                <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                  Machine learning models using Random Forest, XGBoost, and neural networks processing 12,847 student profiles across 2,847 colleges.
                </p>
              </motion.div>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
