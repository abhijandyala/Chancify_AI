'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Reveal from '../ui/Reveal'

// Our AI architecture layers
const layers = [
  {
    id: 'data-sources',
    name: 'Data Sources',
    color: '#1C2230',
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

// 3D Layer Component
function Layer({ layer, index, position, isActive }: any) {
  const meshRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Create isometric 3D geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 2.5
    const radius = 0.2
    
    // Create rounded rectangle shape
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
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: layer.color,
    metalness: 0.1,
    roughness: 0.8,
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.05
  }), [layer.color])

  // Screw geometry
  const screwGeometry = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), [])
  const screwMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2A2E36',
    metalness: 0.6,
    roughness: 0.4
  }), [])

  useFrame(() => {
    if (meshRef.current) {
      // Isometric rotation
      meshRef.current.rotation.x = -Math.PI / 6
      meshRef.current.rotation.y = Math.PI / 4
      
      // Subtle hover animation
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.05
      }
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Main layer */}
      <mesh geometry={geometry} material={material} castShadow receiveShadow>
        {/* Edges for clean lines */}
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#3a3f48" />
      </mesh>

      {/* Corner screws */}
      {[[-1.1, 1.1], [1.1, 1.1], [-1.1, -1.1], [1.1, -1.1]].map(([x, z], i) => (
        <mesh
          key={i}
          geometry={screwGeometry}
          material={screwMaterial}
          rotation={[Math.PI / 2, 0, 0]}
          position={[x, 0.08, z]}
        />
      ))}

      {/* Center logo */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color="#2F343C" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Layer icon */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

// Main Stack Scene
export default function ROXStackAnimation() {
  const groupRef = useRef<THREE.Group>(null)
  const [activeLayer, setActiveLayer] = useState(0)
  const scroll = useScroll()

  useFrame(() => {
    if (!groupRef.current) return

    const progress = scroll.offset
    const totalLayers = layers.length
    
    // Calculate layer positions based on scroll
    layers.forEach((_, index) => {
      const child = groupRef.current?.children[index] as THREE.Group
      if (child) {
        const quarter = Math.floor(progress * totalLayers)
        const quarterProgress = (progress * totalLayers) % 1
        
        let targetY = index * 0.3
        
        if (index < quarter) {
          targetY += 1.5 * (quarter / totalLayers)
        } else if (index === quarter) {
          targetY += 1.5 * quarterProgress * (quarter / totalLayers)
        }
        
        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1)
        
        // Update active layer
        if (index === quarter) {
          setActiveLayer(index)
        }
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} castShadow />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#D4AF37" />

      {/* Layers */}
      {layers.map((layer, index) => (
        <Layer
          key={layer.id}
          layer={layer}
          index={index}
          position={[0, index * 0.3, 0]}
          isActive={activeLayer === index}
        />
      ))}

      {/* Ground glow */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 5, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}
