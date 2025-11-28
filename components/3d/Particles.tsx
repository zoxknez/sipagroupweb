'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate positions outside component to avoid React compiler issues
function generateParticlePositions(count: number, seed: number = 42): Float32Array {
  const positions = new Float32Array(count * 3);
  
  // Simple seeded random function
  const seededRandom = (s: number): number => {
    const x = Math.sin(s + seed) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (seededRandom(i * 3) - 0.5) * 150;
    positions[i * 3 + 1] = seededRandom(i * 3 + 1) * 60;
    positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 150;
  }

  return positions;
}

// Pre-generate positions
const PARTICLE_COUNT = 500;
const particlePositions = generateParticlePositions(PARTICLE_COUNT);

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}
