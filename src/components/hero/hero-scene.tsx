"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, type Group } from "three";

type Theme = "light" | "dark";

type HeroSceneProps = {
  theme: Theme;
  active: boolean;
  onReady: () => void;
};

const PALETTES = {
  light: {
    core: "#b8b0a2",
    wire: "#1b1915",
    accent: "#bc3d18",
    points: "#1b1915",
  },
  dark: {
    core: "#f2efe8",
    wire: "#f2efe8",
    accent: "#ff7a52",
    points: "#f2efe8",
  },
};

function useParticleField(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    let seed = 17;

    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i += 1) {
      const radius = 1.8 + random() * 0.8;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, [count]);
}

function Lattice({ theme }: { theme: Theme }) {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const shell = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const positions = useParticleField(150);
  const palette = PALETTES[theme];

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1.5);
    };

    onScroll();

    if (finePointer.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);

    if (tilt.current) {
      const targetX = pointer.current.y * 0.16 + scroll.current * 0.12;
      const targetY = pointer.current.x * 0.28;

      tilt.current.rotation.x = MathUtils.damp(
        tilt.current.rotation.x,
        targetX,
        3.5,
        step,
      );
      tilt.current.rotation.y = MathUtils.damp(
        tilt.current.rotation.y,
        targetY,
        3.5,
        step,
      );
      tilt.current.position.y = MathUtils.damp(
        tilt.current.position.y,
        -scroll.current * 0.12,
        3,
        step,
      );
    }

    if (spin.current) {
      spin.current.rotation.y += step * 0.14;
    }

    if (shell.current) {
      shell.current.rotation.y -= step * 0.08;
      shell.current.rotation.x += step * 0.03;
    }

    if (orbit.current) {
      orbit.current.rotation.z += step * 0.55;
    }
  });

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.55 : 0.8} />
      <directionalLight
        position={[3.5, 4, 5]}
        intensity={theme === "dark" ? 1.9 : 1.6}
      />
      <directionalLight
        position={[-4, -2, -4]}
        intensity={0.9}
        color={palette.accent}
      />

      <group ref={tilt}>
        <group ref={spin}>
          <mesh>
            <icosahedronGeometry args={[1.16, 1]} />
            <meshStandardMaterial
              color={palette.core}
              roughness={0.68}
              metalness={0.08}
              flatShading
            />
          </mesh>

          <group ref={shell}>
            <mesh>
              <icosahedronGeometry args={[1.62, 1]} />
              <meshBasicMaterial
                color={palette.wire}
                wireframe
                transparent
                opacity={theme === "dark" ? 0.24 : 0.18}
              />
            </mesh>
          </group>

          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[positions, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              color={palette.points}
              size={0.022}
              sizeAttenuation
              transparent
              opacity={0.38}
              depthWrite={false}
            />
          </points>

          <group rotation={[0.35, 0.8, 0.45]}>
            <mesh>
              <torusGeometry args={[2.02, 0.007, 4, 180]} />
              <meshBasicMaterial
                color={palette.accent}
                transparent
                opacity={0.9}
              />
            </mesh>
            <group ref={orbit}>
              <mesh position={[2.02, 0, 0]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshBasicMaterial color={palette.accent} />
              </mesh>
            </group>
          </group>

          <group rotation={[-0.5, 0.2, 1.15]}>
            <mesh>
              <torusGeometry args={[1.88, 0.005, 4, 180]} />
              <meshBasicMaterial
                color={palette.wire}
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ theme, active, onReady }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.8], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={active ? "always" : "never"}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady();
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor />
      <AdaptiveDpr />
      <Lattice theme={theme} />
    </Canvas>
  );
}
