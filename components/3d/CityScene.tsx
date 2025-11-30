'use client';

import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars, Grid } from '@react-three/drei';
import { Building } from './Building';
import { Particles } from './Particles';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { properties } from '@/lib/data/properties';

// Hook to detect mobile device
function useIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a365d" wireframe />
    </mesh>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Environment and lighting */}
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 50, 150]} />
      
      <ambientLight intensity={isMobile ? 0.4 : 0.2} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={0.5}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]}
      />
      {!isMobile && (
        <>
          <pointLight position={[-20, 30, -20]} intensity={0.5} color="#60a5fa" />
          <pointLight position={[20, 30, 20]} intensity={0.5} color="#a78bfa" />
          <spotLight
            position={[0, 60, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#f472b6"
            castShadow
          />
        </>
      )}

      {/* Stars background - reduced for mobile */}
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 1000 : 5000}
        factor={4}
        saturation={0}
        fade
        speed={isMobile ? 0.5 : 1}
      />

      {/* Ground grid - simplified for mobile */}
      <Grid
        position={[0, 0, 0]}
        args={[200, 200]}
        cellSize={isMobile ? 4 : 2}
        cellThickness={0.5}
        cellColor="#1e3a8a"
        sectionSize={isMobile ? 20 : 10}
        sectionThickness={1}
        sectionColor="#3b82f6"
        fadeDistance={isMobile ? 60 : 100}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={!isMobile}
      />

      {/* Ground plane for shadows - only on desktop */}
      {!isMobile && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Buildings from properties data */}
      {properties.map((property, index) => (
        <Building key={property.id} property={property} index={index} isMobile={isMobile} />
      ))}

      {/* Floating particles - reduced for mobile */}
      <Particles isMobile={isMobile} />

      {/* Camera controller */}
      <CameraRig />

      {/* Environment map for reflections - simpler for mobile */}
      <Environment preset="city" />

      {/* Post-processing effects - only on desktop */}
      {!isMobile && <Effects />}
    </>
  );
}

export function CityScene() {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows={!isMobile}
        camera={{
          position: [0, 35, 60],
          fov: isMobile ? 60 : 50,
          near: 0.1,
          far: isMobile ? 200 : 500,
        }}
        gl={{
          antialias: !isMobile,
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
        }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        frameloop={isMobile ? 'demand' : 'always'}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
