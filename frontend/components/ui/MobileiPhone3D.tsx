'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Smartphone, RotateCcw, Maximize2, Minimize2, X } from 'lucide-react'

// Responsive iPhone dimensions based on screen size
const getIPhoneDimensions = (isMobile: boolean) => {
  if (isMobile) {
    return {
      width: 1.8,
      height: 3.9,
      depth: 0.2,
      screenWidth: 1.6,
      screenHeight: 3.5,
      dynamicIslandWidth: 0.25,
      dynamicIslandHeight: 0.08
    }
  }
  return {
    width: 2.8,
    height: 6.1,
    depth: 0.3,
    screenWidth: 2.6,
    screenHeight: 5.7,
    dynamicIslandWidth: 0.4,
    dynamicIslandHeight: 0.12
  }
}

// Mobile-optimized auto-return controls
function MobileAutoReturnControls() {
  const controlsRef = useRef<any>()
  const [isInteracting, setIsInteracting] = useState(false)
  const [lastInteraction, setLastInteraction] = useState(Date.now())

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleInteractionStart = () => {
      setIsInteracting(true)
      setLastInteraction(Date.now())
    }

    const handleInteractionEnd = () => {
      setIsInteracting(false)
      setLastInteraction(Date.now())
    }

    controls.addEventListener('start', handleInteractionStart)
    controls.addEventListener('end', handleInteractionEnd)

    return () => {
      controls.removeEventListener('start', handleInteractionStart)
      controls.removeEventListener('end', handleInteractionEnd)
    }
  }, [])

  useFrame(() => {
    if (controlsRef.current && !isInteracting) {
      const timeSinceLastInteraction = Date.now() - lastInteraction
      if (timeSinceLastInteraction > 2000) { // 2 seconds for mobile
        // Smoothly return to default position
        const targetPosition = { x: 0, y: 0 }
        const currentPosition = controlsRef.current.getAzimuthalAngle()
        
        if (Math.abs(currentPosition - targetPosition.x) > 0.01) {
          controlsRef.current.setAzimuthalAngle(
            THREE.MathUtils.lerp(currentPosition, targetPosition.x, 0.02)
          )
        }
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.2}
      minAzimuthAngle={-Math.PI / 2}
      maxAzimuthAngle={Math.PI / 2}
      enableDamping
      dampingFactor={0.05}
    />
  )
}

// Materials optimized for mobile performance
const createMaterials = (isMobile: boolean) => {
  const quality = isMobile ? 0.5 : 1.0
  
  return {
    screenMaterial: new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.1 * quality,
      thickness: 0.05,
      ior: 1.5,
    }),
    bodyMaterial: new THREE.MeshPhysicalMaterial({
      color: '#1a1a1a',
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    }),
    buttonMaterial: new THREE.MeshPhysicalMaterial({
      color: '#2a2a2a',
      metalness: 0.6,
      roughness: 0.3,
    }),
    islandMaterial: new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.9,
      roughness: 0.1,
    })
  }
}

// iPhone Screen Component
function IPhoneScreen({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[0, 0, dimensions.depth / 2 + 0.001]}>
      <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
      <primitive object={createMaterials(false).screenMaterial} />
    </mesh>
  )
}

// Dynamic Island Component
function DynamicIsland({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[0, dimensions.screenHeight / 2 - 0.3, dimensions.depth / 2 + 0.002]}>
      <RoundedBox args={[dimensions.dynamicIslandWidth, dimensions.dynamicIslandHeight, 0.02]} radius={0.01} />
      <primitive object={createMaterials(false).islandMaterial} />
    </mesh>
  )
}

// iPhone Body Component
function IPhoneBody({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[dimensions.width, dimensions.height, dimensions.depth]} radius={0.1} />
      <primitive object={createMaterials(false).bodyMaterial} />
    </mesh>
  )
}

// Volume Buttons Component
function VolumeButtons({ dimensions }: { dimensions: any }) {
  const upButtonRef = useRef<THREE.Mesh>(null)
  const downButtonRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={upButtonRef} position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.3, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.05]} />
        <primitive object={createMaterials(false).buttonMaterial} />
      </mesh>
      <mesh ref={downButtonRef} position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.15, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.05]} />
        <primitive object={createMaterials(false).buttonMaterial} />
      </mesh>
    </group>
  )
}

// Mute Switch Component
function MuteSwitch({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.45, 0]}>
      <boxGeometry args={[0.02, 0.08, 0.05]} />
      <primitive object={createMaterials(false).buttonMaterial} />
    </mesh>
  )
}

// Main iPhone Component
function IPhone({ dimensions }: { dimensions: any }) {
  return (
    <group>
      <IPhoneBody dimensions={dimensions} />
      <IPhoneScreen dimensions={dimensions} />
      <DynamicIsland dimensions={dimensions} />
      <VolumeButtons dimensions={dimensions} />
      <MuteSwitch dimensions={dimensions} />
    </group>
  )
}

// Mobile-optimized lighting
function MobileLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, -5, 5]} intensity={0.3} />
    </>
  )
}

// Main Mobile-Optimized iPhone3D Component
export default function MobileiPhone3D({ 
  className = "",
  showControls = true,
  isFullscreen = false 
}: { 
  className?: string
  showControls?: boolean
  isFullscreen?: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const dimensions = useMemo(() => getIPhoneDimensions(isMobile), [isMobile])
  const materials = useMemo(() => createMaterials(isMobile), [isMobile])

  const containerClasses = isFullscreenMode 
    ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
    : `w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`

  return (
    <div className={containerClasses}>
      {/* Header with controls */}
      {showControls && (
        <motion.div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">3D iPhone Model</span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsFullscreenMode(!isFullscreenMode)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFullscreenMode ? (
                <Minimize2 className="w-4 h-4 text-white" />
              ) : (
                <Maximize2 className="w-4 h-4 text-white" />
              )}
            </motion.button>
            
            <motion.button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 3D Canvas */}
      <div className={`${isFullscreenMode ? 'h-[calc(100vh-80px)]' : 'h-full'} relative`}>
        <Canvas
          camera={{
            position: isMobile ? [0, 0, 6] : [0, 0, 8],
            fov: isMobile ? 60 : 50,
          }}
          shadows
          gl={{ 
            antialias: !isMobile, // Disable antialias on mobile for performance
            alpha: true,
            powerPreference: isMobile ? "low-power" : "high-performance"
          }}
        >
          <MobileLighting />
          <Environment preset="studio" />
          <IPhone dimensions={dimensions} />
          <MobileAutoReturnControls />
        </Canvas>

        {/* Mobile interaction hint */}
        {isMobile && (
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs text-white/70">Touch and drag to rotate</span>
          </motion.div>
        )}
      </div>

      {/* Fullscreen overlay close button */}
      {isFullscreenMode && (
        <motion.button
          onClick={() => setIsFullscreenMode(false)}
          className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all duration-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </div>
  )
}
