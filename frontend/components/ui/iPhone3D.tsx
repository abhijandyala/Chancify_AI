'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface iPhone3DProps {
  showControls?: boolean;
}

// Realistic iPhone 15 Pro Max dimensions
const iPhoneDimensions = {
  width: 0.77, // ~77mm
  height: 1.6, // ~160mm  
  depth: 0.083, // ~8.3mm
  cornerRadius: 0.12, // More rounded corners like real iPhone
  screenWidth: 0.72,
  screenHeight: 1.52,
  dynamicIslandWidth: 0.18,
  dynamicIslandHeight: 0.035,
  bezelWidth: 0.025, // Screen bezel
}

// Create realistic materials
const createMaterials = () => {
  // Titanium body material (iPhone 15 Pro Max)
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#2C2C2E'), // Space Black
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1,
    reflectivity: 0.8,
  })

  // Ceramic Shield screen material
  const screenMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#000000'),
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.95,
    transparent: true,
    opacity: 0.9,
    ior: 1.52, // Glass IOR
    thickness: 0.001,
  })

  // Camera module material
  const cameraMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#1A1A1A'),
    roughness: 0.3,
    metalness: 0.95,
    clearcoat: 0.1,
  })

  // Camera lens material
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#000000'),
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.9,
    transparent: true,
    opacity: 0.8,
    ior: 1.5,
  })

  // Button material
  const buttonMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#4A4A4C'),
    roughness: 0.4,
    metalness: 0.8,
  })

  return { bodyMaterial, screenMaterial, cameraMaterial, lensMaterial, buttonMaterial }
}

// Realistic iPhone Body Component
function IPhoneBody({ materials }: { materials: ReturnType<typeof createMaterials> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Subtle breathing animation
      const time = Date.now() * 0.0005
      const breathe = Math.sin(time * 0.3) * 0.0005 + 1
      meshRef.current.scale.setScalar(breathe)
    }
  })

  return (
    <group>
      {/* Main Body */}
      <RoundedBox
        ref={meshRef}
        args={[iPhoneDimensions.width, iPhoneDimensions.height, iPhoneDimensions.depth, iPhoneDimensions.cornerRadius, 20]}
        material={materials.bodyMaterial}
      />

      {/* Camera Module */}
      <group position={[0.25, 0.55, iPhoneDimensions.depth / 2 + 0.01]}>
        {/* Camera Bump */}
        <RoundedBox
          args={[0.35, 0.35, 0.025, 0.08, 15]}
          material={materials.cameraMaterial}
        />
        
        {/* Main Camera Lens */}
        <mesh position={[-0.1, 0.1, 0.015]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
          <primitive object={materials.lensMaterial} />
        </mesh>
        
        {/* Ultra Wide Camera */}
        <mesh position={[0.1, 0.1, 0.015]}>
          <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
          <primitive object={materials.lensMaterial} />
        </mesh>
        
        {/* Telephoto Camera */}
        <mesh position={[0, -0.1, 0.015]}>
          <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
          <primitive object={materials.lensMaterial} />
        </mesh>
        
        {/* LiDAR Scanner */}
        <mesh position={[-0.15, -0.1, 0.015]}>
          <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
          <meshBasicMaterial color="#FF6B6B" />
        </mesh>
        
        {/* Flash */}
        <mesh position={[0.15, -0.1, 0.015]}>
          <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Volume Buttons */}
      <RoundedBox
        args={[0.04, 0.25, 0.015, 0.01, 8]}
        position={[-iPhoneDimensions.width / 2 - 0.015, 0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.buttonMaterial}
      />
      <RoundedBox
        args={[0.04, 0.15, 0.015, 0.01, 8]}
        position={[-iPhoneDimensions.width / 2 - 0.015, -0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.buttonMaterial}
      />
      
      {/* Power Button */}
      <RoundedBox
        args={[0.04, 0.3, 0.015, 0.01, 8]}
        position={[iPhoneDimensions.width / 2 + 0.015, 0.25, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.buttonMaterial}
      />
      
      {/* Action Button */}
      <RoundedBox
        args={[0.04, 0.15, 0.015, 0.01, 8]}
        position={[iPhoneDimensions.width / 2 + 0.015, -0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.buttonMaterial}
      />
    </group>
  )
}

// Realistic iPhone Screen Component
function IPhoneScreen({ materials }: { materials: ReturnType<typeof createMaterials> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Subtle screen glow animation
      const time = Date.now() * 0.0008
      const glow = Math.sin(time * 0.4) * 0.002 + 1
      meshRef.current.scale.setScalar(glow)
    }
  })

  return (
    <group>
      {/* Screen Surface */}
      <mesh ref={meshRef} position={[0, 0, iPhoneDimensions.depth / 2 + 0.001]}>
        <planeGeometry args={[iPhoneDimensions.screenWidth, iPhoneDimensions.screenHeight]} />
        <primitive object={materials.screenMaterial} />
      </mesh>

      {/* Dynamic Island */}
      <mesh position={[0, iPhoneDimensions.screenHeight / 2 - iPhoneDimensions.dynamicIslandHeight / 2 - 0.05, iPhoneDimensions.depth / 2 + 0.002]}>
        <RoundedBox args={[iPhoneDimensions.dynamicIslandWidth, iPhoneDimensions.dynamicIslandHeight, 0.001, 0.02, 8]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Screen Content - Blank with subtle gradient */}
      <mesh position={[0, 0, iPhoneDimensions.depth / 2 + 0.003]}>
        <planeGeometry args={[iPhoneDimensions.screenWidth - 0.01, iPhoneDimensions.screenHeight - 0.01]} />
        <meshBasicMaterial>
          <gradientTexture
            attach="map"
            stops={[0, 0.3, 0.7, 1]}
            colors={['#1a1a2e', '#16213e', '#0f3460', '#533483']} // Dark gradient
            rotation={Math.PI / 2}
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  )
}

// Auto-return controls with smooth animation
function AutoReturnControls({ children, showControls }: { children: React.ReactNode, showControls: boolean }) {
  const controlsRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [returnTimeout, setReturnTimeout] = useState<NodeJS.Timeout | null>(null)

  const defaultPosition = {
    azimuth: -0.3, // Left rotation
    polar: 0.4,    // Forward tilt
    distance: 6    // Distance from center
  }

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleStart = () => {
      setIsUserInteracting(true)
      if (returnTimeout) {
        clearTimeout(returnTimeout)
        setReturnTimeout(null)
      }
    }

    const handleEnd = () => {
      setIsUserInteracting(false)
      
      // Start return timer
      const timeout = setTimeout(() => {
        if (!isUserInteracting) {
          // Smooth return to default position
          const startAzimuth = controls.getAzimuthalAngle()
          const startPolar = controls.getPolarAngle()
          const startDistance = controls.getDistance()
          
          const duration = 1200 // 1.2 seconds
          const startTime = Date.now()
          
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Smooth easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            
            controls.setAzimuthalAngle(
              startAzimuth + (defaultPosition.azimuth - startAzimuth) * easeOutCubic
            )
            controls.setPolarAngle(
              startPolar + (defaultPosition.polar - startPolar) * easeOutCubic
            )
            controls.setDistance(
              startDistance + (defaultPosition.distance - startDistance) * easeOutCubic
            )
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          animate()
        }
      }, 2500) // 2.5 second delay
      
      setReturnTimeout(timeout)
    }

    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)

    return () => {
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
      if (returnTimeout) {
        clearTimeout(returnTimeout)
      }
    }
  }, [isUserInteracting, returnTimeout, defaultPosition.azimuth, defaultPosition.polar, defaultPosition.distance])

  return (
    <>
      {children}
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={1.0}
        autoRotate={false}
      />
    </>
  )
}

// Main iPhone3D Component
export default function Phone3D({ 
  className = "",
  showControls = true
}: { 
  className?: string
  showControls?: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const materials = createMaterials()

  return (
    <div className={`w-full h-64 sm:h-80 lg:h-96 relative ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 30,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Professional lighting setup */}
        <Environment preset="studio" />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.6}
        />
        <pointLight position={[0, 0, 10]} intensity={0.8} />

        <AutoReturnControls showControls={showControls}>
          <group
            rotation={[0.4, -0.3, 0]} // Exact tilt angle from your image
          >
            <IPhoneBody materials={materials} />
            <IPhoneScreen materials={materials} />
          </group>
        </AutoReturnControls>
      </Canvas>
    </div>
  )
}