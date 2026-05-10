"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ThreeHeroSceneProps = {
  className?: string;
};

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function DistortedMesh({ pointerRef }: { pointerRef: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);
  const lightC = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const { x: pointerX, y: pointerY } = pointerRef.current;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, elapsed * 0.22 + pointerX * 0.3, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointerY * 0.18, 0.08);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointerX * 0.18, 0.06);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointerY * 0.12, 0.06);
    }

    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(elapsed * 0.75) * 0.12;
    }

    const orbitRadius = 2.8;
    const speed = elapsed * 0.9;
    if (lightA.current) {
      lightA.current.position.set(Math.cos(speed) * orbitRadius, Math.sin(speed * 1.2) * 1.1, Math.sin(speed) * orbitRadius);
    }
    if (lightB.current) {
      lightB.current.position.set(Math.cos(speed + 2.1) * orbitRadius, Math.sin(speed * 1.1 + 1.8) * 1.2, Math.sin(speed + 2.1) * orbitRadius);
    }
    if (lightC.current) {
      lightC.current.position.set(Math.cos(speed + 4.1) * orbitRadius, Math.sin(speed * 0.9 + 3.4) * 1.3, Math.sin(speed + 4.1) * orbitRadius);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh ref={mesh} castShadow receiveShadow>
          <icosahedronGeometry args={[1.25, 1]} />
          <MeshDistortMaterial
            color="#DADADA"
            emissive="#BDBDBD"
            emissiveIntensity={0.4}
            wireframe
            roughness={0.2}
            metalness={0.5}
            distort={0.32}
            speed={1.8}
          />
        </mesh>
      </Float>
      <pointLight ref={lightA} color="#F5F5F5" intensity={22} distance={8} />
      <pointLight ref={lightB} color="#BDBDBD" intensity={16} distance={8} />
      <pointLight ref={lightC} color="#9E9E9E" intensity={10} distance={8} />
    </group>
  );
}

export function ThreeHeroScene({ className }: ThreeHeroSceneProps) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const supported = (() => {
      if (typeof window === "undefined") return false;
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return Boolean(context);
      } catch {
        return false;
      }
    })();
    setCanRender(supported);
  }, []);

  const handleMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerRef.current.x = x;
    pointerRef.current.y = y;
  }, []);

  const handleLeave = useCallback(() => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, []);

  return (
    <div className={className} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {canRender ? (
        <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.5} />
          <Environment preset="night" />
          <DistortedMesh pointerRef={pointerRef} />
        </Canvas>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
        </div>
      )}
    </div>
  );
}