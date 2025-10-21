'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Plate from './plates/Plate'

// Our data layers matching ROX structure
const layers = [
  {
    id: 'data-sources',
    name: 'Data Sources',
    color: '#1C2230',
    count: 25,
    description: 'Multi-source data integration'
  },
  {
    id: 'college-db',
    name: 'College Database',
    color: '#1E252B',
    count: 2847,
    description: 'US colleges and universities'
  },
  {
    id: 'ai-engine',
    name: 'AI Analysis Engine',
    color: '#212730',
    count: 94.3,
    description: 'Machine learning models'
  },
  {
    id: 'application',
    name: 'Chancify AI',
    color: '#252A35',
    count: 12847,
    description: 'Student profile analysis'
  }
]

export default function StackScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const scroll = useScroll()

  // Explode function based on scroll progress
  const explode = useMemo(() => {
    return (progress: number) => {
      const base = 0.16
      const lift = 0.8
      
      return layers.map((_, idx) => {
        const quarter = Math.floor(progress * 4)
        const quarterProgress = (progress * 4) % 1
        
        if (idx < quarter) {
          return idx * base + lift * 0.8
        } else if (idx === quarter) {
          return idx * base + lift * quarterProgress
        } else {
          return idx * base
        }
      })
    }
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    const progress = scroll.offset
    const positions = explode(progress)

    layers.forEach((_, idx) => {
      const child = groupRef.current?.children[idx] as THREE.Object3D
      if (child) {
        child.position.y = positions[idx]
        
        // Add subtle rotation based on scroll
        child.rotation.y = Math.sin(progress * Math.PI * 2 + idx) * 0.02
      }
    })

    // Gentle oscillation for the entire stack
    groupRef.current.rotation.y = Math.sin(progress * Math.PI * 4) * 0.01
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#D4AF37" />

      {/* Main Stack Group */}
      <group ref={groupRef}>
        {layers.map((layer, idx) => (
          <Plate
            key={layer.id}
            idx={idx}
            color={layer.color}
            name={layer.name}
            count={layer.count}
            description={layer.description}
          />
        ))}
      </group>

      {/* Gold glow disc underneath */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 4, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.1} />
      </mesh>
    </>
  )
}
