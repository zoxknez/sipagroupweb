'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars, Grid } from '@react-three/drei';
import { Building } from './Building';
import { Particles } from './Particles';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { properties } from '@/lib/data/properties';

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a365d" wireframe />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* Environment and lighting */}
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 50, 150]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
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

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Ground grid */}
      <Grid
        position={[0, 0, 0]}
        args={[200, 200]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#1e3a8a"
        sectionSize={10}
        sectionThickness={1}
        sectionColor="#3b82f6"
        fadeDistance={100}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
      </mesh>

      {/* Buildings from properties data */}
      {properties.map((property, index) => (
        <Building key={property.id} property={property} index={index} />
      ))}

      {/* Floating particles */}
      <Particles />

      {/* Camera controller */}
      <CameraRig />

      {/* Environment map for reflections */}
      <Environment preset="city" />

      {/* Post-processing effects */}
      <Effects />
    </>
  );
}

export function CityScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{
          position: [0, 35, 60],
          fov: 50,
          near: 0.1,
          far: 500,
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
