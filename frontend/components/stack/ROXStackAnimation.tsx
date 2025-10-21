'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// DATA CONFIGURATION - EDIT THIS FOR YOUR USE CASE
// ============================================
const STACK_DATA = [
  {
    id: 'data-sources',
    title: 'Data Sources',
    subtitle: 'Multi-source Integration',
    description: '25+ Sources, Real-time Sync, API Integrations',
    details: 'We aggregate data from multiple sources including IPEDS, College Board, and real-time admission data to ensure comprehensive coverage.',
    color: '#1a1d24',
    icon: 'sources'
  },
  {
    id: 'college-db',
    title: 'College Database',
    subtitle: 'Comprehensive Data',
    description: '2,847 Colleges, Historical Data, Admission Trends',
    details: 'Our database contains detailed information on over 2,800 colleges with historical admission data spanning multiple years.',
    color: '#1c1f26',
    icon: 'database'
  },
  {
    id: 'ai-engine',
    title: 'AI Analysis Engine',
    subtitle: 'Machine Learning',
    description: '94.3% Accuracy, Neural Networks, Pattern Recognition',
    details: 'Our proprietary AI engine uses advanced machine learning algorithms to analyze student profiles and predict admission chances.',
    color: '#1e2228',
    icon: 'ai'
  },
  {
    id: 'application',
    title: 'Chancify AI',
    subtitle: 'Student Analysis',
    description: '12,847 Students, Holistic Analysis, Real-time Results',
    details: 'The final application layer that provides students with personalized insights and actionable recommendations.',
    color: '#20242a',
    icon: 'app'
  }
];

// ============================================
// 3D LAYER PLATE COMPONENT
// ============================================
const LayerPlate = ({ index, total, activeIndex, scrollProgress, data }: {
  index: number;
  total: number;
  activeIndex: number;
  scrollProgress: number;
  data: any;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  // Create rounded rectangle shape
  const plateGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 2.8;
    const height = 2.8;
    const radius = 0.08;
    
    shape.moveTo(-width/2 + radius, -height/2);
    shape.lineTo(width/2 - radius, -height/2);
    shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
    shape.lineTo(width/2, height/2 - radius);
    shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
    shape.lineTo(-width/2 + radius, height/2);
    shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
    shape.lineTo(-width/2, -height/2 + radius);
    shape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);
    
    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Create screw geometry
  const screwGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const clock = state.clock.getElapsedTime();
    
    // FIXED: Only the active card should be glowing
    const isActive = activeIndex === index;
    
    // IMPROVED: Better scroll calculation
    const scrollPart = Math.floor(scrollProgress * 4);
    const partProgress = (scrollProgress * 4) % 1;
    
    // FIXED: Proper stacked positioning - cards should be stacked, not phasing
    const baseY = 0;
    const stackSpacing = 0.15; // Proper spacing between cards
    const stackOffset = -index * stackSpacing;
    
    // CLEAN ANIMATION LOGIC
    let targetY = baseY + stackOffset;
    let targetRotationX = -Math.PI / 4;
    let targetRotationY = Math.PI / 4;
    let targetRotationZ = 0;
    
    if (scrollPart > index) {
      // This card has been activated - KEEP IT DOWN
      targetY = baseY - 3.0;
      targetRotationX = -Math.PI / 4;
      targetRotationZ = 0;
    } else if (scrollPart === index) {
      // Current part - this card is being activated
      if (partProgress < 0.5) {
        // Phase 1: This card goes down slightly with the deck
        const downProgress = partProgress / 0.5;
        const smoothDown = Math.sin(downProgress * Math.PI * 0.5);
        targetY = baseY + stackOffset - smoothDown * 0.5; // Slight down movement
        targetRotationX = -Math.PI / 4;
      } else {
        // Phase 2: This card rises up smoothly
        const riseProgress = (partProgress - 0.5) / 0.5;
        const smoothRise = Math.sin(riseProgress * Math.PI * 0.5);
        targetY = baseY + stackOffset - 0.5 + smoothRise * 3.5; // Rise from down position
        targetRotationX = -Math.PI / 4 + smoothRise * 0.3;
        targetRotationZ = smoothRise * 0.2;
      }
    } else {
      // This card hasn't been activated yet
      if (scrollPart > 0) {
        // OTHER cards go down slightly
        if (partProgress < 0.5) {
          // OTHER cards go down slightly
          const downProgress = partProgress / 0.5;
          const smoothDown = Math.sin(downProgress * Math.PI * 0.5);
          targetY = baseY + stackOffset - smoothDown * 0.5; // Slight down movement
        } else {
          // OTHER cards go back up slightly
          const upProgress = (partProgress - 0.5) / 0.5;
          const smoothUp = Math.sin(upProgress * Math.PI * 0.5);
          targetY = baseY + stackOffset - 0.5 + smoothUp * 0.5; // Back to original position
        }
      }
    }
    
    // SMOOTH ANIMATION
    const lerpSpeed = 0.06; // Slower for smoother animation
    
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      lerpSpeed
    );
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      lerpSpeed
    );
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      lerpSpeed
    );
    
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotationZ,
      lerpSpeed
    );

    // FIXED: Only active card gets glow and float
    if (isActive) {
      meshRef.current.position.y += Math.sin(clock * 2) * 0.02;
    }
  });

  // FIXED: Only active card should be gold
  const isActive = activeIndex === index;
  const accentColor = isActive ? '#D4AF37' : '#3a3f48';

  return (
    <group ref={meshRef} position={[0, -index * 0.15, 0]}>
      {/* Main plate body */}
      <mesh 
        geometry={plateGeometry} 
        castShadow 
        receiveShadow
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      >
        <meshStandardMaterial
          color={data.color}
          metalness={0.2}
          roughness={0.8}
          emissive={isActive ? new THREE.Color('#D4AF37') : new THREE.Color('#000000')}
          emissiveIntensity={isActive ? 0.1 : 0}
        />
      </mesh>

      {/* Edge highlights */}
      <lineSegments ref={edgesRef} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <edgesGeometry args={[plateGeometry]} />
        <lineBasicMaterial color={accentColor} linewidth={2} />
      </lineSegments>

      {/* Corner screws */}
      {[
        [-1.2, 1.2], [1.2, 1.2], [-1.2, -1.2], [1.2, -1.2]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.08, z]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <mesh geometry={screwGeometry} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#2a2e36" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Center logo ring */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2 - Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[0.35, 0.45, 64]} />
        <meshStandardMaterial
          color={isActive ? '#D4AF37' : '#2f343c'}
          metalness={0.4}
          roughness={0.6}
          emissive={isActive ? new THREE.Color('#D4AF37') : new THREE.Color('#000000')}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Inner logo circle */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2 - Math.PI / 4, Math.PI / 4, 0]}>
        <circleGeometry args={[0.3, 64]} />
        <meshStandardMaterial
          color={data.color}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Texture overlay lines */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2 - Math.PI / 4, Math.PI / 4, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={isActive ? 0.05 : 0.01}
        />
      </mesh>
    </group>
  );
};

// ============================================
// 3D SCENE COMPONENT
// ============================================
const Scene = ({ scrollProgress, onActiveLayerChange }: {
  scrollProgress: number;
  onActiveLayerChange: (index: number) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [activeLayer, setActiveLayer] = useState(0);

  useFrame(() => {
    // IMPROVED: Better active layer calculation
    const scrollPart = Math.floor(scrollProgress * 4);
    const newActive = Math.min(scrollPart, STACK_DATA.length - 1);
    
    if (newActive !== activeLayer) {
      setActiveLayer(newActive);
      onActiveLayerChange(newActive);
    }

    // FIXED: Only rotate when scrolling
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.1; // Slower rotation
    }
  });

  return (
    <>
      {/* Lighting setup - key to the look */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.6} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#D4AF37" />
      <pointLight position={[-5, 3, 3]} intensity={0.2} color="#4a9eff" />
      <pointLight position={[5, 3, -3]} intensity={0.2} color="#D4AF37" />

      {/* Main stack group */}
      <group ref={groupRef}>
        {STACK_DATA.map((data, index) => (
          <LayerPlate
            key={data.id}
            index={index}
            total={STACK_DATA.length}
            activeIndex={activeLayer}
            scrollProgress={scrollProgress}
            data={data}
          />
        ))}
      </group>

      {/* Ground glow effect */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 5, 64]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function ROXStackAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = containerRef.current.offsetHeight;

      // Calculate scroll progress through this section
      const scrollStart = -rect.top;
      const scrollEnd = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentData = STACK_DATA[activeLayer];
  const scrollPart = Math.floor(scrollProgress * 4);

  return (
    <div 
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '600vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Top title section */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-16 text-center">
          <div className="inline-block px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-full mb-4">
            <span className="text-yellow-400 text-sm font-medium">Chancify AI</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">AI Architecture</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Scroll to explore how our multi-layered system processes and analyzes your data
          </p>
        </div>

        {/* 3D Canvas */}
        <Canvas
          shadows
          className="absolute inset-0"
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
          <Scene 
            scrollProgress={scrollProgress} 
            onActiveLayerChange={setActiveLayer}
          />
        </Canvas>

        {/* Left info panel */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 max-w-md">
          {STACK_DATA.map((data, index) => (
            <div
              key={data.id}
              className={`mb-8 transition-all duration-500 ${
                activeLayer === index
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-30 scale-95 -translate-x-4'
              }`}
            >
              <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activeLayer === index ? 'bg-yellow-400' : 'bg-gray-600'
                  }`} />
                  <h3 className="text-2xl font-bold text-white">{data.title}</h3>
                </div>
                <p className="text-yellow-400 font-semibold mb-2">{data.subtitle}</p>
                <p className="text-gray-400 text-sm">{data.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right info panel */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 max-w-md">
          {STACK_DATA.map((data, index) => (
            <div
              key={data.id}
              className={`mb-8 transition-all duration-500 ${
                activeLayer === index
                  ? 'opacity-100 scale-100 translate-x-0'
                  : 'opacity-30 scale-95 translate-x-4'
              }`}
            >
              <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activeLayer === index ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'
                  }`} />
                  <h3 className="text-xl font-bold text-white">Details</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {data.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom progress indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {STACK_DATA.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full ${
                activeLayer === index
                  ? 'w-8 h-3 bg-yellow-400'
                  : 'w-3 h-3 bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator (shows only at start) */}
        {scrollProgress < 0.1 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="text-gray-400 text-sm text-center">
              <div className="mb-2">Scroll to explore</div>
              <div className="text-2xl">↓</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}