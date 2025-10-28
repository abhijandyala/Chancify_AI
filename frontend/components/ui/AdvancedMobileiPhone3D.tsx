'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  RoundedBox, 
  useTexture,
  Stars,
  Sparkles,
  Trail,
  Float,
  Text3D,
  Center
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Smartphone, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  X, 
  Zap, 
  Sparkles as SparklesIcon,
  Volume2,
  VolumeX
} from 'lucide-react'

// Advanced iPhone dimensions with physics properties
const getAdvancedIPhoneDimensions = (isMobile: boolean) => {
  const base = isMobile ? {
    width: 1.8,
    height: 3.9,
    depth: 0.2,
    screenWidth: 1.6,
    screenHeight: 3.5,
    dynamicIslandWidth: 0.25,
    dynamicIslandHeight: 0.08,
    mass: 0.5,
    friction: 0.8,
    restitution: 0.3
  } : {
    width: 2.8,
    height: 6.1,
    depth: 0.3,
    screenWidth: 2.6,
    screenHeight: 5.7,
    dynamicIslandWidth: 0.4,
    dynamicIslandHeight: 0.12,
    mass: 1.0,
    friction: 0.7,
    restitution: 0.4
  }
  
  return base
}

// Advanced gesture controls with physics
function AdvancedGestureControls() {
  const controlsRef = useRef<any>()
  const [isInteracting, setIsInteracting] = useState(false)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const [gestureVelocity, setGestureVelocity] = useState({ x: 0, y: 0 })
  const [isSpinning, setIsSpinning] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleInteractionStart = () => {
      setIsInteracting(true)
      setLastInteraction(Date.now())
      setIsSpinning(false)
    }

    const handleInteractionEnd = () => {
      setIsInteracting(false)
      setLastInteraction(Date.now())
      
      // Detect spin gesture
      const velocity = controls.getAzimuthalAngle()
      if (Math.abs(velocity) > 0.1) {
        setIsSpinning(true)
        // Apply momentum
        controls.setAzimuthalAngle(velocity * 1.5)
      }
    }

    const handleChange = () => {
      if (controls) {
        const azimuthal = controls.getAzimuthalAngle()
        const polar = controls.getPolarAngle()
        
        mouseX.set(azimuthal)
        mouseY.set(polar)
        
        setGestureVelocity({
          x: azimuthal,
          y: polar
        })
      }
    }

    controls.addEventListener('start', handleInteractionStart)
    controls.addEventListener('end', handleInteractionEnd)
    controls.addEventListener('change', handleChange)

    return () => {
      controls.removeEventListener('start', handleInteractionStart)
      controls.removeEventListener('end', handleInteractionEnd)
      controls.removeEventListener('change', handleChange)
    }
  }, [])

  useFrame(() => {
    if (controlsRef.current && !isInteracting) {
      const timeSinceLastInteraction = Date.now() - lastInteraction
      
      if (isSpinning && timeSinceLastInteraction > 1000) {
        // Apply friction to spinning
        const currentAngle = controlsRef.current.getAzimuthalAngle()
        controlsRef.current.setAzimuthalAngle(currentAngle * 0.95)
        
        if (Math.abs(currentAngle) < 0.01) {
          setIsSpinning(false)
        }
      } else if (!isSpinning && timeSinceLastInteraction > 2000) {
        // Smooth return to default position
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
      rotateSpeed={1.2}
      autoRotate={false}
    />
  )
}

// Interactive screen content with animations
function InteractiveScreen({ dimensions, isActive }: { dimensions: any, isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [screenContent, setScreenContent] = useState(0)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Animate screen content
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.02
      
      // Cycle through different screen contents
      if (Math.floor(time) % 3 === 0) {
        setScreenContent(Math.floor(time) % 4)
      }
    }
  })

  const screenMaterials = [
    new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.1,
      thickness: 0.05,
      ior: 1.5,
    }),
    new THREE.MeshPhysicalMaterial({
      color: '#1a1a1a',
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.2,
      thickness: 0.05,
      ior: 1.5,
    }),
    new THREE.MeshPhysicalMaterial({
      color: '#2a2a2a',
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.15,
      thickness: 0.05,
      ior: 1.5,
    }),
    new THREE.MeshPhysicalMaterial({
      color: '#000000',
      metalness: 0.05,
      roughness: 0.15,
      transmission: 0.25,
      thickness: 0.05,
      ior: 1.5,
    })
  ]

  return (
    <mesh ref={meshRef} position={[0, 0, dimensions.depth / 2 + 0.001]}>
      <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
      <primitive object={screenMaterials[screenContent]} />
    </mesh>
  )
}

// Animated Dynamic Island with pulsing effect
function AnimatedDynamicIsland({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isPulsing, setIsPulsing] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Pulsing animation
      const pulse = Math.sin(time * 2) * 0.02 + 1
      meshRef.current.scale.setScalar(pulse)
      
      // Color animation
      const colorIntensity = Math.sin(time * 1.5) * 0.1 + 0.9
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        (meshRef.current.material as THREE.MeshPhysicalMaterial).color.setRGB(colorIntensity, colorIntensity, colorIntensity)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, dimensions.screenHeight / 2 - 0.3, dimensions.depth / 2 + 0.002]}>
      <RoundedBox args={[dimensions.dynamicIslandWidth, dimensions.dynamicIslandHeight, 0.02]} radius={0.01} />
      <meshPhysicalMaterial
        color="#000000"
        metalness={0.9}
        roughness={0.1}
        emissive="#000000"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Physics-based iPhone body with realistic materials
function PhysicsIPhoneBody({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Subtle breathing animation
      const breathe = Math.sin(time * 0.8) * 0.001 + 1
      meshRef.current.scale.setScalar(breathe)
      
      // Hover effect
      if (isHovered) {
        meshRef.current.position.y = Math.sin(time * 10) * 0.01
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
      <mesh 
        ref={meshRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <RoundedBox args={[dimensions.width, dimensions.height, dimensions.depth]} radius={0.1} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.0}
        />
      </mesh>
    </Float>
  )
}

// Interactive volume buttons with haptic feedback simulation
function InteractiveVolumeButtons({ dimensions }: { dimensions: any }) {
  const upButtonRef = useRef<THREE.Mesh>(null)
  const downButtonRef = useRef<THREE.Mesh>(null)
  const [pressedButton, setPressedButton] = useState<string | null>(null)
  
  const handleButtonPress = (button: string) => {
    setPressedButton(button)
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
    
    // Reset after animation
    setTimeout(() => setPressedButton(null), 200)
  }

  useFrame(() => {
    if (upButtonRef.current && pressedButton === 'up') {
      upButtonRef.current.position.x = -dimensions.width / 2 - 0.015
    } else if (upButtonRef.current) {
      upButtonRef.current.position.x = -dimensions.width / 2 - 0.01
    }
    
    if (downButtonRef.current && pressedButton === 'down') {
      downButtonRef.current.position.x = -dimensions.width / 2 - 0.015
    } else if (downButtonRef.current) {
      downButtonRef.current.position.x = -dimensions.width / 2 - 0.01
    }
  })

  return (
    <group>
      <mesh 
        ref={upButtonRef} 
        position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.3, 0]}
        onClick={() => handleButtonPress('up')}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[0.02, 0.15, 0.05]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={0.6}
          roughness={0.3}
          emissive={pressedButton === 'up' ? "#444444" : "#000000"}
          emissiveIntensity={pressedButton === 'up' ? 0.2 : 0}
        />
      </mesh>
      <mesh 
        ref={downButtonRef} 
        position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.15, 0]}
        onClick={() => handleButtonPress('down')}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[0.02, 0.15, 0.05]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={0.6}
          roughness={0.3}
          emissive={pressedButton === 'down' ? "#444444" : "#000000"}
          emissiveIntensity={pressedButton === 'down' ? 0.2 : 0}
        />
      </mesh>
    </group>
  )
}

// Particle effects system
function ParticleEffects({ isActive }: { isActive: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      // Golden particles
      colors[i * 3] = 1.0 // R
      colors[i * 3 + 1] = 0.8 // G
      colors[i * 3 + 2] = 0.0 // B
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current && isActive) {
      const time = state.clock.getElapsedTime()
      particlesRef.current.rotation.y = time * 0.1
      particlesRef.current.rotation.x = time * 0.05
    }
  })

  if (!isActive) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Dynamic lighting system
function DynamicLighting({ isActive }: { isActive: boolean }) {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current && pointLightRef.current && isActive) {
      const time = state.clock.getElapsedTime()
      
      // Animate directional light
      lightRef.current.position.x = Math.sin(time * 0.5) * 5
      lightRef.current.position.z = Math.cos(time * 0.5) * 5
      
      // Animate point light color
      const hue = (time * 0.1) % 1
      pointLightRef.current.color.setHSL(hue, 0.8, 0.6)
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight 
        ref={pointLightRef}
        position={[-5, -5, 5]} 
        intensity={0.3}
        distance={20}
        decay={2}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.2}
        castShadow
      />
    </>
  )
}

// Main Advanced iPhone Component
function AdvancedIPhone({ dimensions, isActive }: { dimensions: any, isActive: boolean }) {
  return (
    <group>
      <PhysicsIPhoneBody dimensions={dimensions} />
      <InteractiveScreen dimensions={dimensions} isActive={isActive} />
      <AnimatedDynamicIsland dimensions={dimensions} />
      <InteractiveVolumeButtons dimensions={dimensions} />
      <ParticleEffects isActive={isActive} />
    </group>
  )
}

// Main Advanced Mobile iPhone3D Component
export default function AdvancedMobileiPhone3D({ 
  className = "",
  showControls = true,
  isFullscreen = false,
  enableSound = false
}: { 
  className?: string
  showControls?: boolean
  isFullscreen?: boolean
  enableSound?: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen)
  const [isActive, setIsActive] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(enableSound)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const dimensions = useMemo(() => getAdvancedIPhoneDimensions(isMobile), [isMobile])

  const containerClasses = isFullscreenMode 
    ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
    : `w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`

  return (
    <div className={containerClasses}>
      {/* Advanced Header with controls */}
      {showControls && (
        <motion.div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Advanced 3D iPhone</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-400">Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsActive(!isActive)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className={`w-4 h-4 ${isActive ? 'text-yellow-400' : 'text-gray-400'}`} />
            </motion.button>
            
            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-white" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
            
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

      {/* Advanced 3D Canvas */}
      <div className={`${isFullscreenMode ? 'h-[calc(100vh-80px)]' : 'h-full'} relative`}>
        <Canvas
          camera={{
            position: isMobile ? [0, 0, 6] : [0, 0, 8],
            fov: isMobile ? 60 : 50,
          }}
          shadows
          gl={{ 
            antialias: !isMobile,
            alpha: true,
            powerPreference: isMobile ? "low-power" : "high-performance"
          }}
        >
          <DynamicLighting isActive={isActive} />
          <Environment preset="studio" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={10} size={6} speed={0.4} />
          <AdvancedIPhone dimensions={dimensions} isActive={isActive} />
          <AdvancedGestureControls />
        </Canvas>

        {/* Advanced interaction hints */}
        {isMobile && (
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 text-xs text-white/80">
              <SparklesIcon className="w-3 h-3 text-yellow-400" />
              <span>Touch to rotate • Tap buttons • Swipe to spin</span>
            </div>
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
