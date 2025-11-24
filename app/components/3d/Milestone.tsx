"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Project } from "@/app/types/portfolio";
import { Mesh } from "three";
import * as THREE from "three";

interface MilestoneProps {
  project: Project;
  position: [number, number, number];
  onSelect: (project: Project) => void;
}

export default function Milestone({
  project,
  position,
  onSelect,
}: MilestoneProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 10;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation for idle animation
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;

      // Proximity effect
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      const distance = worldPosition.distanceTo(state.camera.position);

      // Scale up when close (distance < 8)
      // Base scale is 1, max scale is 2.5
      const proximityScale = Math.max(1, 3 - distance * 0.3);
      const hoverScale = hovered ? 1.2 : 1;
      const targetScale = proximityScale * hoverScale;

      // Smoothly interpolate scale
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Look at camera when close
      if (distance < 10) {
        const lookAtPos = state.camera.position.clone();
        meshRef.current.lookAt(lookAtPos);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.5 : 1}
      >
        <dodecahedronGeometry args={[isMobile ? 0.3 : 0.5, 0]} />
        <meshStandardMaterial
          color={hovered ? "#ff0055" : "#ffffff"}
          emissive={hovered ? "#ff0055" : "#000000"}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <Text
        position={[0, 1, 0]}
        fontSize={isMobile ? 0.2 : 0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  );
}
