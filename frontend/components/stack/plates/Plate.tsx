'use client'

import { useMemo } from 'react'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

interface PlateProps {
  idx: number
  color: string
  name: string
  count: number | string
  description: string
}

export default function Plate({ idx, color, name, count, description }: PlateProps) {
  // Create rounded plate geometry
  const geom = useMemo(() => createRoundedPlate(2.5, 2.5, 0.15, 0.2), [])
  
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.15,
    emissive: new THREE.Color("#111109"),
    emissiveIntensity: 0.2
  }), [color])

  // Screws
  const screw = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.08, 20), [])
  const screwMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2A2E36",
    metalness: 0.6,
    roughness: 0.4
  }), [])

  return (
    <group position={[0, -idx * 0.16, 0]}>
      <mesh geometry={geom} castShadow receiveShadow material={mat}>
        <Edges scale={1.002} color="#3a3f48" threshold={20} />
      </mesh>

      {/* Corner screws */}
      {[[-1.25, 1.25], [1.25, 1.25], [-1.25, -1.25], [1.25, -1.25]].map(([x, z], i) => (
        <mesh
          key={i}
          geometry={screw}
          material={screwMat}
          rotation={[Math.PI / 2, 0, 0]}
          position={[x, 0.12, z]}
        />
      ))}

      {/* Center emblem */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.42, 48]} />
        <meshStandardMaterial color="#2F343C" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Data text on the plate */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function createRoundedPlate(w: number, h: number, t: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2, y = -h / 2
  
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)

  const settings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: t,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 2
  }
  
  const g = new THREE.ExtrudeGeometry(s, settings)
  g.center()
  return g
}
