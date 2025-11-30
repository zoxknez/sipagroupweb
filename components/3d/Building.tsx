'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { Property } from '@/lib/data/properties';

interface BuildingProps {
  property: Property;
  index: number;
  isMobile?: boolean;
}

export function Building({ property, index, isMobile = false }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const edgesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const { height, width, depth, color, emissiveColor, position } = property.building3D;

  // Create geometries (memoized) - simpler for mobile
  const geometry = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);
  const edgesGeometry = useMemo(() => isMobile ? null : new THREE.EdgesGeometry(geometry), [geometry, isMobile]);
  const glowGeometry = useMemo(() => isMobile ? null : new THREE.BoxGeometry(width + 0.3, height + 0.3, depth + 0.3), [width, height, depth, isMobile]);

  // Animation - simplified for mobile
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Floating animation - slower and smaller on mobile
    const floatSpeed = isMobile ? 0.3 : 0.5;
    const floatAmount = isMobile ? 0.08 : 0.15;
    const floatOffset = Math.sin(time * floatSpeed + index * 0.5) * floatAmount;
    groupRef.current.position.y = floatOffset;

    // Skip hover effects on mobile for performance
    if (isMobile) return;

    // Hover effects - desktop only
    const targetScale = hovered ? 1.05 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Update material opacity for glow effect
    if (glowMaterialRef.current) {
      const targetGlowOpacity = hovered ? 0.4 : 0;
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(
        glowMaterialRef.current.opacity,
        targetGlowOpacity,
        0.1
      );
    }

    if (edgesMaterialRef.current) {
      const targetEdgeOpacity = hovered ? 0.8 : 0.3;
      edgesMaterialRef.current.opacity = THREE.MathUtils.lerp(
        edgesMaterialRef.current.opacity,
        targetEdgeOpacity,
        0.1
      );
    }

    // Subtle rotation on hover
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.sin(time * 2) * 0.05,
        0.1
      );
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  const handleClick = () => {
    router.push(`/portfolio/${property.slug}`);
  };

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Main building */}
        <mesh
          ref={meshRef}
          geometry={geometry}
          position={[0, height / 2, 0]}
          onClick={handleClick}
          onPointerEnter={() => {
            if (isMobile) return;
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            if (isMobile) return;
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          castShadow={!isMobile}
          receiveShadow={!isMobile}
        >
          <meshStandardMaterial
            color={color}
            metalness={isMobile ? 0.3 : 0.7}
            roughness={isMobile ? 0.5 : 0.2}
            envMapIntensity={isMobile ? 0.5 : 1}
          />
        </mesh>

        {/* Glow effect - desktop only */}
        {!isMobile && glowGeometry && (
          <mesh geometry={glowGeometry} position={[0, height / 2, 0]}>
            <meshBasicMaterial
              ref={glowMaterialRef}
              color={emissiveColor}
              transparent
              opacity={0}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Edge wireframe - desktop only */}
        {!isMobile && edgesGeometry && (
          <lineSegments geometry={edgesGeometry} position={[0, height / 2, 0]}>
            <lineBasicMaterial
              ref={edgesMaterialRef}
              color={emissiveColor}
              transparent
              opacity={0.3}
            />
          </lineSegments>
        )}

        {/* Building label on hover - desktop only */}
        {!isMobile && hovered && (
          <Html
            position={[0, height + 3, 0]}
            center
            distanceFactor={50}
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap transform -translate-y-2">
              <p className="text-white font-semibold text-sm">{property.name}</p>
              <p className="text-white/60 text-xs">{property.location}</p>
            </div>
          </Html>
        )}
      </group>

      {/* Ground indicator - desktop only */}
      {!isMobile && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[width + 2, depth + 2]} />
          <meshStandardMaterial color={color} transparent opacity={0.1} metalness={0.5} roughness={0.5} />
        </mesh>
      )}
    </group>
  );
}
