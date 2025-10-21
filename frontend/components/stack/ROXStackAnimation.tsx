'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Our AI architecture layers - smaller and more precise
const layers = [
  {
    id: 'data-sources',
    name: 'Data Sources',
    color: '#1A1F2E',
    description: 'Multi-source data integration',
    stats: ['25+ Sources', 'Real-time Sync', 'API Integrations'],
    icon: '🔗'
  },
  {
    id: 'college-db',
    name: 'College Database',
    color: '#1E252B', 
    description: 'Comprehensive college data',
    stats: ['2,847 Colleges', 'Historical Data', 'Admission Trends'],
    icon: '🏛️'
  },
  {
    id: 'ai-engine',
    name: 'AI Analysis Engine',
    color: '#212730',
    description: 'Advanced machine learning',
    stats: ['94.3% Accuracy', 'Neural Networks', 'Pattern Recognition'],
    icon: '🧠'
  },
  {
    id: 'application',
    name: 'Chancify AI',
    color: '#252A35',
    description: 'Student profile analysis',
    stats: ['12,847 Students', 'Holistic Analysis', 'Real-time Results'],
    icon: '🎓'
  }
]

// 3D Layer Component - much smaller and more precise like ROX
function Layer({ layer, index, position, isActive, scrollProgress }: any) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Create much smaller, precise geometry like ROX
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 0.6 // Much smaller - like ROX
    const radius = 0.05
    
    // Create precise rounded rectangle
    shape.moveTo(-size + radius, -size)
    shape.lineTo(size - radius, -size)
    shape.quadraticCurveTo(size, -size, size, -size + radius)
    shape.lineTo(size, size - radius)
    shape.quadraticCurveTo(size, size, size - radius, size)
    shape.lineTo(-size + radius, size)
    shape.quadraticCurveTo(-size, size, -size, size - radius)
    shape.lineTo(-size, -size + radius)
    shape.quadraticCurveTo(-size, -size, -size + radius, -size)

    const extrudeSettings = {
      depth: 0.04, // Thinner
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 1
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: isActive ? '#D4AF37' : layer.color,
    metalness: 0.1,
    roughness: 0.9,
    emissive: isActive ? new THREE.Color('#D4AF37') : new THREE.Color('#000000'),
    emissiveIntensity: isActive ? 0.15 : 0.02
  }), [layer.color, isActive])

  // Smaller screw geometry
  const screwGeometry = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, 0.03, 6), [])
  const screwMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2A2E36',
    metalness: 0.7,
    roughness: 0.3
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      // Perfect isometric rotation like ROX
      meshRef.current.rotation.x = -Math.PI / 6
      meshRef.current.rotation.y = Math.PI / 4
      
      // FIXED: Better scroll-based separation animation
      const baseY = position[1]
      const separationDistance = 0.2
      const maxSeparation = 1.5
      
      // Calculate separation based on scroll progress
      const separationProgress = Math.min(scrollProgress * 2, 1) // Extend scroll range
      const targetY = baseY + (separationProgress * separationDistance * (index + 1))
      
      // Smooth lerp animation
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y, 
        targetY, 
        0.1
      )
      
      // Subtle hover animation
      if (hovered) {
        meshRef.current.scale.setScalar(1.02)
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.005
      } else {
        meshRef.current.scale.setScalar(1.0)
        meshRef.current.rotation.z = 0
      }
      
      // Active layer glow
      if (isActive) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01
      }
    }
  })

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main layer */}
      <mesh geometry={geometry} material={material} castShadow receiveShadow />

      {/* Corner screws - smaller and more precise */}
      {[[-0.45, 0.45], [0.45, 0.45], [-0.45, -0.45], [0.45, -0.45]].map(([x, z], i) => (
        <mesh
          key={i}
          geometry={screwGeometry}
          material={screwMaterial}
          rotation={[Math.PI / 2, 0, 0]}
          position={[x, 0.02, z]}
        />
      ))}

      {/* Center logo - smaller and more precise */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 12]} />
        <meshStandardMaterial 
          color={isActive ? '#D4AF37' : '#2F343C'} 
          metalness={0.4} 
          roughness={0.6} 
        />
      </mesh>

      {/* Subtle texture overlay */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent 
          opacity={isActive ? 0.3 : 0.1} 
        />
      </mesh>
    </group>
  )
}

// Main Stack Scene - FIXED scroll logic
export default function ROXStackAnimation() {
  const groupRef = useRef<THREE.Group>(null)
  const [activeLayer, setActiveLayer] = useState(0)
  const scroll = useScroll()

  useFrame(() => {
    if (!groupRef.current) return

    const progress = scroll.offset
    const totalLayers = layers.length
    
    // FIXED: Better active layer calculation
    const newActiveLayer = Math.floor(progress * totalLayers * 1.5) // Extend range
    setActiveLayer(Math.min(newActiveLayer, totalLayers - 1))
    
    // FIXED: Continuous scroll animation throughout entire scroll
    layers.forEach((_, index) => {
      const child = groupRef.current?.children[index] as THREE.Group
      if (child) {
        // Calculate separation distance - works throughout entire scroll
        const separationFactor = Math.max(0, progress - (index / (totalLayers * 1.5)))
        const separationDistance = separationFactor * 1.2 // Increased separation
        
        // Smooth animation
        const targetY = index * 0.1 + separationDistance
        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Precise Lighting like ROX */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <pointLight position={[0, 3, 3]} intensity={0.3} color="#D4AF37" />
      <pointLight position={[-3, 3, 3]} intensity={0.15} color="#D4AF37" />
      <pointLight position={[3, 3, 3]} intensity={0.15} color="#D4AF37" />

      {/* Layers with proper spacing */}
      {layers.map((layer, index) => (
        <Layer
          key={layer.id}
          layer={layer}
          index={index}
          position={[0, index * 0.1, 0]}
          isActive={activeLayer === index}
          scrollProgress={scroll.offset}
        />
      ))}

      {/* Subtle ground glow */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.5, 32]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}