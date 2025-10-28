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
  Center,
  Html,
  useProgress
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
  VolumeX,
  Camera,
  Flashlight,
  Bell,
  Lock,
  Unlock,
  Wifi,
  Battery,
  Signal
} from 'lucide-react'

// 4K Ultra-Realistic iPhone dimensions (iPhone 15 Pro Max)
const getUltraRealisticDimensions = (isMobile: boolean) => {
  if (isMobile) {
    return {
      width: 2.0,
      height: 4.3,
      depth: 0.25,
      screenWidth: 1.8,
      screenHeight: 3.9,
      dynamicIslandWidth: 0.3,
      dynamicIslandHeight: 0.1,
      notchWidth: 0.0, // No notch on 15 Pro
      notchHeight: 0.0,
      cameraBumpWidth: 0.4,
      cameraBumpHeight: 0.4,
      cameraBumpDepth: 0.08,
      sideButtonWidth: 0.02,
      sideButtonHeight: 0.2,
      sideButtonDepth: 0.05
    }
  }
  return {
    width: 3.0,
    height: 6.5,
    depth: 0.3,
    screenWidth: 2.7,
    screenHeight: 5.8,
    dynamicIslandWidth: 0.4,
    dynamicIslandHeight: 0.12,
    notchWidth: 0.0,
    notchHeight: 0.0,
    cameraBumpWidth: 0.5,
    cameraBumpHeight: 0.5,
    cameraBumpDepth: 0.1,
    sideButtonWidth: 0.025,
    sideButtonHeight: 0.25,
    sideButtonDepth: 0.06
  }
}

// 4K Materials with ultra-realistic properties
const createUltraRealisticMaterials = (isMobile: boolean) => {
  const quality = isMobile ? 0.8 : 1.0 // Higher quality for desktop
  
  return {
    // Ultra-realistic screen material
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
    
    // Ultra-realistic titanium frame
    frameMaterial: new THREE.MeshPhysicalMaterial({
      color: '#8B8B8B',
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 3.0,
      reflectivity: 0.98
    }),
    
    // Ultra-realistic back glass
    backGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: '#1A1A1A',
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.8 * quality,
      thickness: 0.001,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 2.5
    }),
    
    // Ultra-realistic camera lens
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
    
    // Ultra-realistic button material
    buttonMaterial: new THREE.MeshPhysicalMaterial({
      color: '#2A2A2A',
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2.0
    }),
    
    // Ultra-realistic Dynamic Island
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

// Ultra-realistic screen content with actual iPhone interface
function UltraRealisticScreen({ dimensions, isUnlocked }: { dimensions: any, isUnlocked: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [screenContent, setScreenContent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Subtle screen breathing animation
      const breathe = Math.sin(time * 0.5) * 0.001 + 1
      meshRef.current.scale.setScalar(breathe)
      
      // Screen content cycling
      if (Math.floor(time) % 8 === 0 && !isAnimating) {
        setScreenContent(Math.floor(time) % 8)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1500)
      }
    }
  })

  const screenTextures = [
    // Lock Screen
    {
      background: '#000000',
      elements: [
        { type: 'time', text: '9:41', position: [0, 0.8, 0.001], color: '#FFFFFF', size: 0.3 },
        { type: 'date', text: 'Monday, January 15', position: [0, 0.6, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'lock', icon: Lock, position: [0, 0.2, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'status', text: '📶 🔋', position: [0, 0.9, 0.001], color: '#FFFFFF', size: 0.06 }
      ]
    },
    // Home Screen
    {
      background: '#1A1A1A',
      elements: [
        { type: 'app', text: '📱', position: [-0.4, 0.4, 0.001], color: '#007AFF', size: 0.08 },
        { type: 'app', text: '📧', position: [-0.2, 0.4, 0.001], color: '#34C759', size: 0.08 },
        { type: 'app', text: '📷', position: [0, 0.4, 0.001], color: '#FF9500', size: 0.08 },
        { type: 'app', text: '🎵', position: [0.2, 0.4, 0.001], color: '#FF3B30', size: 0.08 },
        { type: 'app', text: 'Chancify AI', position: [-0.3, 0.2, 0.001], color: '#FFD700', size: 0.06 },
        { type: 'app', text: 'Safari', position: [0, 0.2, 0.001], color: '#007AFF', size: 0.06 },
        { type: 'app', text: 'Messages', position: [0.3, 0.2, 0.001], color: '#34C759', size: 0.06 },
        { type: 'dock', text: 'Dock', position: [0, -0.7, 0.001], color: '#FFFFFF', size: 0.05 }
      ]
    },
    // Chancify AI App
    {
      background: '#000000',
      elements: [
        { type: 'header', text: 'Chancify AI', position: [0, 0.8, 0.001], color: '#FFD700', size: 0.1 },
        { type: 'stats', text: 'Admission Chance: 78%', position: [0, 0.4, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'chart', text: '📊', position: [0, 0, 0.001], color: '#FFD700', size: 0.2 },
        { type: 'button', text: 'Calculate', position: [0, -0.4, 0.001], color: '#FFD700', size: 0.08 },
        { type: 'progress', text: 'Progress: 85%', position: [0, -0.6, 0.001], color: '#34C759', size: 0.06 }
      ]
    },
    // Camera App
    {
      background: '#000000',
      elements: [
        { type: 'viewfinder', text: '📷', position: [0, 0, 0.001], color: '#FFFFFF', size: 0.3 },
        { type: 'controls', text: '⚪', position: [0, -0.6, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'flash', text: '⚡', position: [-0.6, 0.6, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'mode', text: 'PHOTO', position: [0, 0.7, 0.001], color: '#FFFFFF', size: 0.06 }
      ]
    },
    // Settings App
    {
      background: '#000000',
      elements: [
        { type: 'header', text: 'Settings', position: [0, 0.8, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'setting', text: '📶 Wi-Fi', position: [0, 0.4, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'setting', text: '🔵 Bluetooth', position: [0, 0.2, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'setting', text: '🔋 Battery', position: [0, 0, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'setting', text: '🔔 Notifications', position: [0, -0.2, 0.001], color: '#FFFFFF', size: 0.08 }
      ]
    },
    // Messages App
    {
      background: '#000000',
      elements: [
        { type: 'header', text: 'Messages', position: [0, 0.8, 0.001], color: '#34C759', size: 0.1 },
        { type: 'contact', text: '👤 John Doe', position: [0, 0.4, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'message', text: 'Hey! How are you?', position: [0, 0.2, 0.001], color: '#34C759', size: 0.06 },
        { type: 'contact', text: '👤 Jane Smith', position: [0, 0, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'message', text: 'See you tomorrow!', position: [0, -0.2, 0.001], color: '#34C759', size: 0.06 }
      ]
    },
    // Photos App
    {
      background: '#000000',
      elements: [
        { type: 'header', text: 'Photos', position: [0, 0.8, 0.001], color: '#FF3B30', size: 0.1 },
        { type: 'photo', text: '📸', position: [-0.2, 0.3, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'photo', text: '📸', position: [0, 0.3, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'photo', text: '📸', position: [0.2, 0.3, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'photo', text: '📸', position: [-0.2, 0.1, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'photo', text: '📸', position: [0, 0.1, 0.001], color: '#FFFFFF', size: 0.1 },
        { type: 'photo', text: '📸', position: [0.2, 0.1, 0.001], color: '#FFFFFF', size: 0.1 }
      ]
    },
    // Notification Screen
    {
      background: '#000000',
      elements: [
        { type: 'notification', text: '🔔 New Message', position: [0, 0.4, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'notification', text: '📧 Email Received', position: [0, 0.2, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'notification', text: '📱 App Update', position: [0, 0, 0.001], color: '#FFFFFF', size: 0.08 },
        { type: 'notification', text: '📅 Calendar Event', position: [0, -0.2, 0.001], color: '#FFFFFF', size: 0.08 }
      ]
    }
  ]

  const currentScreen = screenTextures[screenContent]

  return (
    <group>
      {/* Screen Background */}
      <mesh ref={meshRef} position={[0, 0, dimensions.depth / 2 + 0.001]}>
        <planeGeometry args={[dimensions.screenWidth, dimensions.screenHeight]} />
        <primitive object={createUltraRealisticMaterials(false).screenMaterial} />
      </mesh>
      
      {/* Screen Content */}
      {currentScreen.elements.map((element, index) => (
        <Html
          key={index}
          position={element.position}
          center
          style={{
            fontSize: `${element.size * 100}px`,
            color: element.color,
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            textShadow: '0 0 10px rgba(255,255,255,0.3)'
          }}
        >
          {element.type === 'icon' && element.icon ? (
            <element.icon size={element.size * 100} />
          ) : (
            element.text
          )}
        </Html>
      ))}
    </group>
  )
}

// Ultra-realistic Dynamic Island with pulsing and notifications
function UltraRealisticDynamicIsland({ dimensions, hasNotification }: { dimensions: any, hasNotification: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isPulsing, setIsPulsing] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Realistic pulsing animation
      const pulse = Math.sin(time * 2) * 0.02 + 1
      meshRef.current.scale.setScalar(pulse)
      
      // Color animation for notifications
      if (hasNotification) {
        const colorIntensity = Math.sin(time * 3) * 0.2 + 0.8
        if (meshRef.current.material && 'color' in meshRef.current.material) {
          (meshRef.current.material as THREE.MeshPhysicalMaterial).color.setRGB(colorIntensity, colorIntensity, colorIntensity)
        }
      }
    }
  })

  return (
    <group>
      {/* Dynamic Island */}
      <mesh ref={meshRef} position={[0, dimensions.screenHeight / 2 - 0.3, dimensions.depth / 2 + 0.002]}>
        <RoundedBox args={[dimensions.dynamicIslandWidth, dimensions.dynamicIslandHeight, 0.02]} radius={0.01} />
        <primitive object={createUltraRealisticMaterials(false).dynamicIslandMaterial} />
      </mesh>
      
      {/* Notification indicator */}
      {hasNotification && (
        <Html
          position={[0, dimensions.screenHeight / 2 - 0.3, dimensions.depth / 2 + 0.003]}
          center
          style={{
            fontSize: '12px',
            color: '#FF3B30',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          🔔
        </Html>
      )}
    </group>
  )
}

// Ultra-realistic camera bump with multiple lenses
function UltraRealisticCameraBump({ dimensions }: { dimensions: any }) {
  const cameraRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (cameraRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Subtle camera movement
      cameraRef.current.rotation.z = Math.sin(time * 0.3) * 0.01
    }
  })

  return (
    <group ref={cameraRef} position={[0, -dimensions.screenHeight / 2 + 0.4, dimensions.depth / 2 + 0.01]}>
      {/* Camera bump base */}
      <mesh>
        <RoundedBox args={[dimensions.cameraBumpWidth, dimensions.cameraBumpHeight, dimensions.cameraBumpDepth]} radius={0.05} />
        <primitive object={createUltraRealisticMaterials(false).frameMaterial} />
      </mesh>
      
      {/* Main camera lens */}
      <mesh position={[0, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.08, 32]} />
        <primitive object={createUltraRealisticMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* Ultra-wide lens */}
      <mesh position={[-0.12, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.06, 32]} />
        <primitive object={createUltraRealisticMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* Telephoto lens */}
      <mesh position={[0.12, 0, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.06, 32]} />
        <primitive object={createUltraRealisticMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* LiDAR scanner */}
      <mesh position={[0, -0.08, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <circleGeometry args={[0.03, 32]} />
        <primitive object={createUltraRealisticMaterials(false).cameraLensMaterial} />
      </mesh>
      
      {/* Flash */}
      <mesh position={[0, 0.08, dimensions.cameraBumpDepth / 2 + 0.001]}>
        <RoundedBox args={[0.04, 0.02, 0.01]} radius={0.01} />
        <meshPhysicalMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Ultra-realistic side buttons with haptic feedback
function UltraRealisticSideButtons({ dimensions }: { dimensions: any }) {
  const volumeUpRef = useRef<THREE.Mesh>(null)
  const volumeDownRef = useRef<THREE.Mesh>(null)
  const powerButtonRef = useRef<THREE.Mesh>(null)
  const [pressedButton, setPressedButton] = useState<string | null>(null)
  
  const handleButtonPress = (button: string) => {
    setPressedButton(button)
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50])
    }
    
    // Reset after animation
    setTimeout(() => setPressedButton(null), 200)
  }

  useFrame(() => {
    // Button press animations
    if (volumeUpRef.current && pressedButton === 'volumeUp') {
      volumeUpRef.current.position.x = -dimensions.width / 2 - 0.02
    } else if (volumeUpRef.current) {
      volumeUpRef.current.position.x = -dimensions.width / 2 - 0.01
    }
    
    if (volumeDownRef.current && pressedButton === 'volumeDown') {
      volumeDownRef.current.position.x = -dimensions.width / 2 - 0.02
    } else if (volumeDownRef.current) {
      volumeDownRef.current.position.x = -dimensions.width / 2 - 0.01
    }
    
    if (powerButtonRef.current && pressedButton === 'power') {
      powerButtonRef.current.position.x = dimensions.width / 2 + 0.02
    } else if (powerButtonRef.current) {
      powerButtonRef.current.position.x = dimensions.width / 2 + 0.01
    }
  })

  return (
    <group>
      {/* Volume Up Button */}
      <mesh 
        ref={volumeUpRef} 
        position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.3, 0]}
        onClick={() => handleButtonPress('volumeUp')}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[dimensions.sideButtonWidth, dimensions.sideButtonHeight, dimensions.sideButtonDepth]} />
        <meshPhysicalMaterial
          color="#2A2A2A"
          metalness={0.8}
          roughness={0.2}
          emissive={pressedButton === 'volumeUp' ? "#444444" : "#000000"}
          emissiveIntensity={pressedButton === 'volumeUp' ? 0.3 : 0}
        />
      </mesh>
      
      {/* Volume Down Button */}
      <mesh 
        ref={volumeDownRef} 
        position={[-dimensions.width / 2 - 0.01, dimensions.height * 0.15, 0]}
        onClick={() => handleButtonPress('volumeDown')}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[dimensions.sideButtonWidth, dimensions.sideButtonHeight, dimensions.sideButtonDepth]} />
        <meshPhysicalMaterial
          color="#2A2A2A"
          metalness={0.8}
          roughness={0.2}
          emissive={pressedButton === 'volumeDown' ? "#444444" : "#000000"}
          emissiveIntensity={pressedButton === 'volumeDown' ? 0.3 : 0}
        />
      </mesh>
      
      {/* Power Button */}
      <mesh 
        ref={powerButtonRef} 
        position={[dimensions.width / 2 + 0.01, dimensions.height * 0.4, 0]}
        onClick={() => handleButtonPress('power')}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[dimensions.sideButtonWidth, dimensions.sideButtonHeight * 0.8, dimensions.sideButtonDepth]} />
        <meshPhysicalMaterial
          color="#2A2A2A"
          metalness={0.8}
          roughness={0.2}
          emissive={pressedButton === 'power' ? "#444444" : "#000000"}
          emissiveIntensity={pressedButton === 'power' ? 0.3 : 0}
        />
      </mesh>
    </group>
  )
}

// Ultra-realistic iPhone body with titanium frame
function UltraRealisticIPhoneBody({ dimensions }: { dimensions: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Ultra-subtle breathing animation
      const breathe = Math.sin(time * 0.8) * 0.0005 + 1
      meshRef.current.scale.setScalar(breathe)
      
      // Hover effect
      if (isHovered) {
        meshRef.current.position.y = Math.sin(time * 15) * 0.005
      }
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
      <group>
        {/* Main iPhone body */}
        <mesh 
          ref={meshRef}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <RoundedBox args={[dimensions.width, dimensions.height, dimensions.depth]} radius={0.1} />
          <primitive object={createUltraRealisticMaterials(false).frameMaterial} />
        </mesh>
        
        {/* Back glass panel */}
        <mesh position={[0, 0, -dimensions.depth / 2 - 0.001]}>
          <RoundedBox args={[dimensions.width * 0.95, dimensions.height * 0.95, 0.001]} radius={0.1} />
          <primitive object={createUltraRealisticMaterials(false).backGlassMaterial} />
        </mesh>
      </group>
    </Float>
  )
}

// Ultra-realistic lighting system
function UltraRealisticLighting({ isActive }: { isActive: boolean }) {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  
  useFrame((state) => {
    if (lightRef.current && pointLightRef.current && spotLightRef.current && isActive) {
      const time = state.clock.getElapsedTime()
      
      // Ultra-realistic light movement
      lightRef.current.position.x = Math.sin(time * 0.3) * 8
      lightRef.current.position.z = Math.cos(time * 0.3) * 8
      
      // Dynamic color temperature
      const temperature = Math.sin(time * 0.2) * 0.1 + 0.9
      pointLightRef.current.color.setRGB(temperature, temperature * 0.95, temperature * 0.9)
      
      // Spotlight animation
      spotLightRef.current.position.y = 10 + Math.sin(time * 0.5) * 2
    }
  })

  return (
    <>
      {/* Ultra-realistic ambient lighting */}
      <ambientLight intensity={0.3} color="#FFFFFF" />
      
      {/* Main directional light */}
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Ultra-realistic point light */}
      <pointLight 
        ref={pointLightRef}
        position={[-5, -5, 5]} 
        intensity={0.4}
        distance={30}
        decay={2}
        color="#FFFFFF"
      />
      
      {/* Ultra-realistic spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={0.5}
        intensity={0.3}
        castShadow
        color="#FFFFFF"
      />
      
      {/* Rim lighting */}
      <directionalLight
        position={[-5, 0, -5]}
        intensity={0.2}
        color="#FFFFFF"
      />
    </>
  )
}

// Main Ultra-Realistic iPhone Component
function UltraRealisticIPhone({ dimensions, isUnlocked, hasNotification }: { 
  dimensions: any, 
  isUnlocked: boolean, 
  hasNotification: boolean 
}) {
  return (
    <group>
      <UltraRealisticIPhoneBody dimensions={dimensions} />
      <UltraRealisticScreen dimensions={dimensions} isUnlocked={isUnlocked} />
      <UltraRealisticDynamicIsland dimensions={dimensions} hasNotification={hasNotification} />
      <UltraRealisticCameraBump dimensions={dimensions} />
      <UltraRealisticSideButtons dimensions={dimensions} />
    </group>
  )
}

// Main Ultra-Realistic iPhone3D Component
export default function UltraRealisticiPhone3D({ 
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
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [showLoading, setShowLoading] = useState(true)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Simulate unlock animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUnlocked(true)
      setShowLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  const dimensions = useMemo(() => getUltraRealisticDimensions(isMobile), [isMobile])

  const containerClasses = isFullscreenMode 
    ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
    : `w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'} bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-white/10 backdrop-blur-sm ${className}`

  return (
    <div className={containerClasses}>
      {/* Ultra-Realistic Header with controls */}
      {showControls && (
        <motion.div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">4K Ultra-Realistic iPhone</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-400">4K Quality</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsUnlocked(!isUnlocked)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUnlocked ? (
                <Unlock className="w-4 h-4 text-green-400" />
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setHasNotification(!hasNotification)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className={`w-4 h-4 ${hasNotification ? 'text-red-400' : 'text-gray-400'}`} />
            </motion.button>
            
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

      {/* Ultra-Realistic 4K Canvas */}
      <div className={`${isFullscreenMode ? 'h-[calc(100vh-80px)]' : 'h-full'} relative`}>
        <Canvas
          camera={{
            position: isMobile ? [0, 0, 6] : [0, 0, 8],
            fov: isMobile ? 60 : 50,
          }}
          shadows
          gl={{ 
            antialias: true, // Enable antialias for 4K quality
            alpha: true,
            powerPreference: "high-performance",
            precision: "highp",
            logarithmicDepthBuffer: true
          }}
        >
          <UltraRealisticLighting isActive={isActive} />
          <Environment preset="studio" />
          <Stars radius={100} depth={50} count={8000} factor={6} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={15} size={8} speed={0.6} />
          <UltraRealisticIPhone 
            dimensions={dimensions} 
            isUnlocked={isUnlocked}
            hasNotification={hasNotification}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.2}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={1.0}
            autoRotate={false}
          />
        </Canvas>

        {/* Ultra-realistic interaction hints */}
        {isMobile && (
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 text-xs text-white/80">
              <SparklesIcon className="w-3 h-3 text-yellow-400" />
              <span>4K Quality • Touch to rotate • Tap buttons</span>
            </div>
          </motion.div>
        )}
        
        {/* Loading overlay */}
        {showLoading && (
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="text-center">
              <div className="text-yellow-400 text-lg font-bold mb-2">Loading 4K iPhone...</div>
              <div className="text-white/70 text-sm">Ultra-realistic materials and textures</div>
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
