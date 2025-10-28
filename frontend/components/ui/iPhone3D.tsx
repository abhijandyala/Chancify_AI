'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// iPhone dimensions (iPhone 14 Pro proportions)
const IPHONE_WIDTH = 2.8
const IPHONE_HEIGHT = 6.1
const IPHONE_DEPTH = 0.3
const SCREEN_WIDTH = 2.6
const SCREEN_HEIGHT = 5.7
const DYNAMIC_ISLAND_WIDTH = 0.4
const DYNAMIC_ISLAND_HEIGHT = 0.12

// Auto-return to static position after interaction
function AutoReturnControls() {
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
      if (timeSinceLastInteraction > 3000) { // 3 seconds
        // Smoothly return to default position
        const targetAzimuthalAngle = 0
        const targetPolarAngle = Math.PI / 2.2
        
        controlsRef.current.setAzimuthalAngle(
          THREE.MathUtils.lerp(controlsRef.current.getAzimuthalAngle(), targetAzimuthalAngle, 0.02)
        )
        controlsRef.current.setPolarAngle(
          THREE.MathUtils.lerp(controlsRef.current.getPolarAngle(), targetPolarAngle, 0.02)
        )
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.5}
      minAzimuthAngle={-Math.PI / 3}
      maxAzimuthAngle={Math.PI / 3}
      enableDamping
      dampingFactor={0.05}
    />
  )
}

// Materials (created outside components for performance)
const screenMaterial = new THREE.MeshPhysicalMaterial({
  color: '#000000',
  metalness: 0.1,
  roughness: 0.1,
  transmission: 0.9,
  thickness: 0.1,
  ior: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
})

const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: '#1a1a1a',
  metalness: 0.9,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1,
})

const buttonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#2a2a2a',
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
})

const islandMaterial = new THREE.MeshPhysicalMaterial({
  color: '#000000',
  metalness: 0.8,
  roughness: 0.2,
  transmission: 0.1,
  thickness: 0.05,
  ior: 1.5,
})

// iPhone Screen Component
function IPhoneScreen() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[0, 0, IPHONE_DEPTH / 2 + 0.001]}>
      <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
      <primitive object={screenMaterial} />
    </mesh>
  )
}

// Dynamic Island Component
function DynamicIsland() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[0, SCREEN_HEIGHT / 2 - 0.3, IPHONE_DEPTH / 2 + 0.002]}>
      <planeGeometry args={[DYNAMIC_ISLAND_WIDTH, DYNAMIC_ISLAND_HEIGHT]} />
      <primitive object={islandMaterial} />
    </mesh>
  )
}

// iPhone Body Component
function IPhoneBody() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[IPHONE_WIDTH, IPHONE_HEIGHT, IPHONE_DEPTH]} radius={0.1} />
      <primitive object={bodyMaterial} />
    </mesh>
  )
}

// Volume Buttons Component
function VolumeButtons() {
  const upButtonRef = useRef<THREE.Mesh>(null)
  const downButtonRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      {/* Volume Up Button */}
      <mesh ref={upButtonRef} position={[-IPHONE_WIDTH / 2 - 0.01, 0.8, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.15]} />
        <primitive object={buttonMaterial} />
      </mesh>
      
      {/* Volume Down Button */}
      <mesh ref={downButtonRef} position={[-IPHONE_WIDTH / 2 - 0.01, 0.2, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.15]} />
        <primitive object={buttonMaterial} />
      </mesh>
    </group>
  )
}

// Mute Switch Component
function MuteSwitch() {
  const switchRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={switchRef} position={[-IPHONE_WIDTH / 2 - 0.01, 1.4, 0]}>
      <boxGeometry args={[0.05, 0.15, 0.1]} />
      <primitive object={buttonMaterial} />
    </mesh>
  )
}

// Main iPhone Component
function IPhone() {
  return (
    <group>
      <IPhoneBody />
      <IPhoneScreen />
      <DynamicIsland />
      <VolumeButtons />
      <MuteSwitch />
    </group>
  )
}

// Lighting Setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, -5, 5]} intensity={0.5} />
    </>
  )
}

// Main 3D iPhone Component
export default function iPhone3D() {
  return (
    <div className="w-full h-[600px] bg-black">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 50,
        }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Lighting />
        <Environment preset="studio" />
        <IPhone />
        <AutoReturnControls />
      </Canvas>
    </div>
  )
}
