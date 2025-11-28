'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Get mouse position
    const { pointer } = state;
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, pointer.x * 0.5, 0.05);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, pointer.y * 0.3, 0.05);

    // Camera follows mouse with subtle movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 10, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 35 + mouseRef.current.y * 5, 0.02);
    
    // Subtle breathing motion
    camera.position.y += Math.sin(time * 0.3) * 0.1;
    
    // Always look at center
    camera.lookAt(0, 10, 0);
  });

  return null;
}
