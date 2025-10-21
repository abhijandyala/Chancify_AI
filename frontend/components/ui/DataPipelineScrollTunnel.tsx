'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Float, Stars, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Database, Code, BarChart3, Users } from 'lucide-react'

function DataPipelineTunnel() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      // Much slower rotation for subtle movement
      group.current.rotation.y = t * 0.05
    }
  })
  
  // More items spread diagonally
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const items = Array.from({ length: isMobile ? 6 : 10 })
  
  return (
    <group ref={group}>
      {items.map((_, i) => {
        // Create diagonal spread as you scroll down
        const diagonalOffset = i * 0.8
        const xOffset = Math.sin(i * 0.8) * (2.5 + diagonalOffset * 0.3)
        const yOffset = Math.cos(i * 0.6) * (1.2 + diagonalOffset * 0.2)
        const zOffset = -i * 1.8 - diagonalOffset * 0.5
        
        return (
          <Float key={i} speed={0.3} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh position={[xOffset, yOffset, zOffset]}>
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
        )
      })}
    </group>
  )
}

export default function DataPipelineScrollTunnel() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  return (
    <div className="relative h-[220vh] bg-black text-white">
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

        <ScrollControls pages={5.5} damping={0.18}>
          {/* 3D content follows the scroll */}
          <Scroll>
            <DataPipelineTunnel />
          </Scroll>

          {/* HTML overlays per section */}
          <Scroll html>
            {/* Intro section - much shorter */}
            <section className="h-[30vh] grid place-items-center">
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
            
            {/* Card 1 - Left side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto ml-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Database className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">Database Architecture</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">PostgreSQL</span>
                    <span className="text-yellow-400">Primary DB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">2,847 colleges</span>
                    <span className="text-yellow-400">Records</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">12,847 profiles</span>
                    <span className="text-yellow-400">Students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">5+ years</span>
                    <span className="text-yellow-400">History</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Card 2 - Right side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto mr-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Code className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">Reddit Scraper</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Python</span>
                    <span className="text-yellow-400">Language</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">BeautifulSoup</span>
                    <span className="text-yellow-400">Parsing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Selenium</span>
                    <span className="text-yellow-400">Dynamic Content</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">1000+ daily</span>
                    <span className="text-yellow-400">Posts</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Card 3 - Left side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto ml-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <BarChart3 className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">Probability Engine</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Random Forest</span>
                    <span className="text-yellow-400">Model 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">XGBoost</span>
                    <span className="text-yellow-400">Model 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Neural Networks</span>
                    <span className="text-yellow-400">Model 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">94.3%</span>
                    <span className="text-yellow-400">Accuracy</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Card 4 - Right side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto mr-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Users className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">Data Processing</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPA Standardization</span>
                    <span className="text-yellow-400">4.0 Scale</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Test Score Norm</span>
                    <span className="text-yellow-400">Percentile</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">EC Categorization</span>
                    <span className="text-yellow-400">15+ Types</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Feature Engineering</span>
                    <span className="text-yellow-400">50+ Features</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Card 5 - Left side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto ml-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                  >
                    <Database className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">Data Sources</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">IPEDS Database</span>
                    <span className="text-yellow-400">2,847 Colleges</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">College Board</span>
                    <span className="text-yellow-400">SAT/ACT Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reddit Stories</span>
                    <span className="text-yellow-400">5,000+ Posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Historical Rates</span>
                    <span className="text-yellow-400">2018-2023</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Card 6 - Right side */}
            <section className="h-[50vh] grid place-items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ amount: 0.6 }} 
                className="backdrop-blur-md/30 border border-yellow-400/20 rounded-xl px-6 py-4 bg-black/60 max-w-sm mx-auto mr-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <BarChart3 className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">ML Pipeline</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Feature Engineering</span>
                    <span className="text-yellow-400">Automated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ensemble Methods</span>
                    <span className="text-yellow-400">3 Models</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cross-Validation</span>
                    <span className="text-yellow-400">5-Fold</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model Accuracy</span>
                    <span className="text-yellow-400">94.3%</span>
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
