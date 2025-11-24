import { Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const gridPoints: number[] = [];
const size = 10;
const step = 1;
for (let x = -size; x <= size; x += step) {
  for (let y = -size; y <= size; y += step) {
    if (Math.abs(x) + Math.abs(y) > 5) continue;
    gridPoints.push(x, y, -5);
  }
}
const positions = new Float32Array(gridPoints);

export default function ProfileSection() {
  const scroll = useScroll();
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 10;

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Visible between scroll 1.5/12 and 3/12 (1.5 pages)
      const visible = scroll.visible(1.5 / 12, 1.5 / 12);
      groupRef.current.visible = visible;

      // Fly through effect
      const progress = scroll.range(1.5 / 12, 1.5 / 12);
      groupRef.current.position.z = progress * 10; // Move towards camera
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#4444ff" transparent opacity={0.4} />
      </points>

      <group position={[0, 0, 0]}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={isMobile ? 0.25 : 0.6}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          Life is about
        </Text>
        <Text
          position={[0, 1.5, 0]}
          fontSize={isMobile ? 0.4 : 1.0}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          Connecting the Dots
        </Text>

        <Text
          position={[0, -0.5, 0]}
          fontSize={isMobile ? 0.15 : 0.35}
          color="#cccccc"
          maxWidth={isMobile ? 3 : 6}
          textAlign="center"
          anchorX="center"
          anchorY="top"
        >
          Every moment of the past connects to form who I am today.
        </Text>

        <Text
          position={[0, -2.5, 0]}
          fontSize={isMobile ? 0.15 : 0.35}
          color="#cccccc"
          maxWidth={isMobile ? 3 : 6}
          textAlign="center"
          anchorX="center"
          anchorY="top"
        >
          I believe in the power of consistency and the value of every
          experience.
        </Text>
      </group>
    </group>
  );
}
