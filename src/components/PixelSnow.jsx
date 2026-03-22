import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SnowParticles = ({ 
  color, flakeSize, minFlakeSize, pixelResolution, speed, density, direction, brightness 
}) => {
  const meshRef = useRef();
  const count = useMemo(() => Math.floor(density * 12000), [density]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // Wider spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Movement Logic
    meshRef.current.position.y -= delta * speed * 2;
    const rad = (direction * Math.PI) / 180;
    meshRef.current.position.x += Math.cos(rad) * delta * speed;

    if (meshRef.current.position.y < -15) {
      meshRef.current.position.y = 15;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={flakeSize * pixelResolution}
        color={new THREE.Color(color)}
        transparent
        opacity={brightness}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const PixelSnow = (props) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <SnowParticles {...props} />
      </Canvas>
    </div>
  );
};

export default PixelSnow;