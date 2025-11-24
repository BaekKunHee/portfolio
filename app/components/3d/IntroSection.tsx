import { Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function IntroSection() {
  const scroll = useScroll();
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 10;

  const groupRef = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  });

  useFrame(() => {
    if (groupRef.current) {
      // Visible for first page (0 to 1.5/12)
      const visible = scroll.visible(0, 1.5 / 12);
      groupRef.current.visible = visible;

      // Fade out animation
      const progress = scroll.range(0, 1.5 / 12);
      groupRef.current.position.y = progress * 5; // Float up
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#00ff88"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <group position={[0, 0, 0]}>
        <Text
          position={[0, 1, 0]}
          fontSize={isMobile ? 0.6 : 2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Connecting the Dots
        </Text>
        <Text
          position={[0, -0.8, 0]}
          fontSize={isMobile ? 0.3 : 0.8}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          Han&apos;s Journey
        </Text>
        <Text
          position={[0, -2.5, 0]}
          fontSize={isMobile ? 0.15 : 0.4}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
        >
          Scroll to Explore
        </Text>
      </group>
    </group>
  );
}
