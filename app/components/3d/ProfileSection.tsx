import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ProfileSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Visible between scroll 1/7 and 2/7
      const visible = scroll.visible(1 / 7, 1 / 7);
      groupRef.current.visible = visible;

      // Fly through effect
      const progress = scroll.range(1 / 7, 1 / 7);
      groupRef.current.position.z = progress * 10; // Move towards camera
    }
  });

  // Create a grid of points
  const gridPoints = [];
  const size = 10;
  const step = 1;
  for (let x = -size; x <= size; x += step) {
    for (let y = -size; y <= size; y += step) {
      if (Math.abs(x) + Math.abs(y) > 5) continue; // Create a diamond shape hole in middle
      gridPoints.push(x, y, -5);
    }
  }
  const positions = new Float32Array(gridPoints);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#4444ff" transparent opacity={0.4} />
      </points>

      <group position={[0, 0, 0]}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.6}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          Life is about
        </Text>
        <Text
          position={[0, 1.5, 0]}
          fontSize={1.0}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          Connecting the Dots
        </Text>

        <Text
          position={[0, -0.5, 0]}
          fontSize={0.35}
          color="#cccccc"
          maxWidth={6}
          textAlign="center"
          anchorX="center"
          anchorY="top"
        >
          Every moment of the past connects to form who I am today.
        </Text>

        <Text
          position={[0, -2.5, 0]}
          fontSize={0.35}
          color="#cccccc"
          maxWidth={6}
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
