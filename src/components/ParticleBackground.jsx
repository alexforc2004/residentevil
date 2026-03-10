import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleBackground({ activeIndex }) {
  const particlesRef = useRef()
  const particleCount = 2000

  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Color - red/pink theme
      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        // Red particles
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.2
      } else if (colorChoice < 0.85) {
        // White particles
        colors[i * 3] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
      } else {
        // Purple particles
        colors[i * 3] = 0.5 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      }

      // Size
      sizes[i] = Math.random() * 0.05 + 0.01
    }

    return { positions, colors, sizes }
  }, [])

  // Animation
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1

      // Pulse effect based on active character
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + activeIndex) * 0.02
      particlesRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff3366" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6633ff" />

      {/* Particles */}
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
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating orbs */}
      <FloatingOrb position={[3, 2, -5]} color="#ff3366" />
      <FloatingOrb position={[-4, -1, -3]} color="#ff6699" />
      <FloatingOrb position={[2, -3, -4]} color="#9933ff" />
    </>
  )
}

function FloatingOrb({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

export default ParticleBackground
