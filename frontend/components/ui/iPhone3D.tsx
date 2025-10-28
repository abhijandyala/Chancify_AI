'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  RoundedBox, 
  useTexture,
  Stars,
  Sparkles
} from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// iPhone dimensions based on iPhone 15 Pro Max
const getIPhoneDimensions = (isMobile: boolean) => {
  if (isMobile) {
    return {
      width: 1.8,
      height: 3.9,
      depth: 0.25,
      screenWidth: 1.6,
      screenHeight: 3.5,
      dynamicIslandWidth: 0.3,
      dynamicIslandHeight: 0.1,
      cameraBumpWidth: 0.4,
      cameraBumpHeight: 0.4,
      cameraBumpDepth: 0.08
    }
  }
  return {
    width: 2.2,
    height: 4.7,
    depth: 0.3,
    screenWidth: 2.0,
    screenHeight: 4.3,
    dynamicIslandWidth: 0.35,
    dynamicIslandHeight: 0.12,
    cameraBumpWidth: 0.5,
    cameraBumpHeight: 0.5,
    cameraBumpDepth: 0.1
  }
}

// Materials matching the image
const createIPhoneMaterials = (isMobile: boolean) => {
  const quality = isMobile ? 0.8 : 1.0
  
  return {
    // Screen material with gradient
    screenMaterial: new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.95 * quality,
      thickness: 0.001,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 2.0,
      reflectivity: 0.9
    }),
    
    // Frame material - dark gray/black
    frameMaterial: new THREE.MeshPhysicalMaterial({
      color: '#1C1C1E',
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2.0,
      reflectivity: 0.95
    }),
    
    // Back glass material
    backGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: '#1C1C1E',
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.8 * quality,
      thickness: 0.001,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 2.5
    }),
    
    // Camera lens material
    cameraLensMaterial: new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.9,
      thickness: 0.002,
      ior: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 1.5
    }),
    
    // Dynamic Island material
    dynamicIslandMaterial: new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.1,
      thickness: 0.001,
      ior: 1.52,
      emissive: '#000000',
      emissiveIntensity: 0.1
    })
  }
}

// Screen with gradient (purple to blue as shown in image)
function IPHoneScreen({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Subtle breathing animation
      const breathe = Math.sin(time * 0.5) * 0.001 + 1
      meshRef.current.scale.setScalar(breathe)
    }
  })

  return (
    <group>
      {/* Screen Background */}
      <mesh ref={meshRef} position={[0, 0, dimensions.depth / 2 + 0.001]}>
        <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
        <primitive object={createIPhoneMaterials(false).screenMaterial} />
      </mesh>
      
      {/* Gradient overlay */}
      <mesh position={[0, 0, dimensions.depth / 2 + 0.002]}>
        <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Dynamic Island
function DynamicIsland({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Subtle pulsing animation
      const pulse = Math.sin(time * 2) * 0.02 + 1
      meshRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, dimensions.screenHeight / 2 - 0.3, dimensions.depth / 2 + 0.002]}>
      <RoundedBox args={[dimensions.dynamicIslandWidth, dimensions.dynamicIslandHeight, 0.02]} radius={0.01} />
      <primitive object={createIPhoneMaterials(false).dynamicIslandMaterial} />
    </mesh>
  )
}

// Camera bump
function CameraBump({ dimensions }: { dimensions: any }) {
  return (
    <group position={[0, -dimensions.screenHeight / 2 + 0.4, dimensions.depth / 2 + 0.01]}>
      {/* Camera bump base */}
      <mesh>
        <RoundedBox args={[dimensions.cameraBumpWidth, dimensions.cameraBumpHeight, dimensions.cameraBumpDepth]} radius={0.05} />
        <primitive object={createIPhoneMaterials(false).frameMaterial} />
      </mesh>
      
      {/* Main camera lens */}
      <mesh position={[0, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.08, 32]} />
        <primitive object={createIPhoneMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* Ultra-wide lens */}
      <mesh position={[-0.12, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.06, 32]} />
        <primitive object={createIPhoneMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* Telephoto lens */}
      <mesh position={[0.12, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.06, 32]} />
        <primitive object={createIPhoneMaterials(false).cameraLensMaterial} />
      </mesh>
    </group>
  )
}

// Main iPhone body
function IPHoneBody({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Ultra-subtle breathing animation
      const breathe = Math.sin(time * 0.8) * 0.0005 + 1
      meshRef.current.scale.setScalar(breathe)
    }
  })

  return (
    <group>
      {/* Main iPhone body */}
      <mesh ref={meshRef}>
        <RoundedBox args={[dimensions.width, dimensions.height, dimensions.depth]} radius={0.1} />
        <primitive object={createIPhoneMaterials(false).frameMaterial} />
      </mesh>
      
      {/* Back glass panel */}
      <mesh position={[0, 0, -dimensions.depth / 2 - 0.001]}>
        <RoundedBox args={[dimensions.width * 0.95, dimensions.height * 0.95, 0.001]} radius={0.1} />
        <primitive object={createIPhoneMaterials(false).backGlassMaterial} />
      </mesh>
    </group>
  )
}

// Auto-return controls
function AutoReturnControls({ children }: { children: React.ReactNode }) {
  const controlsRef = useRef<any>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [returnTimeout, setReturnTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // Default position matching the image (tilted angle)
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
          
          const duration = 1000 // 1 second
          const startTime = Date.now()
          
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function
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
      }, 2000) // 2 second delay
      
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
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={1.0}
        autoRotate={false}
        // Set initial position to match the image
        azimuthAngle={defaultPosition.azimuth}
        polarAngle={defaultPosition.polar}
        distance={defaultPosition.distance}
      />
    </>
  )
}

// Main iPhone component
function IPHone({ dimensions }: { dimensions: any }) {
  return (
    <group>
      <IPHoneBody dimensions={dimensions} />
      <IPHoneScreen dimensions={dimensions} />
      <DynamicIsland dimensions={dimensions} />
      <CameraBump dimensions={dimensions} />
    </group>
  )
}

// Main iPhone3D Component
export default function iPhone3DComponent({ 
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

  const dimensions = getIPhoneDimensions(isMobile)

  return (
    <div className={`w-full ${isMobile ? 'h-[200px]' : 'h-[300px]'} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden ${className}`}>
      <Canvas
        camera={{
          position: isMobile ? [0, 0, 5] : [0, 0, 6],
          fov: isMobile ? 60 : 50,
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Environment preset="studio" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#FFFFFF" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, -5, 5]} intensity={0.3} distance={30} decay={2} />
        
        <AutoReturnControls>
          <IPHone dimensions={dimensions} />
        </AutoReturnControls>
      </Canvas>
    </div>
  )
}
