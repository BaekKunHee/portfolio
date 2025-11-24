"use client";

import { useScroll, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { Project } from "@/app/types/portfolio";
import Milestone from "./Milestone";

interface TimelineProps {
  items: Project[];
  onSelect: (project: Project) => void;
}

export default function Timeline({ items, onSelect }: TimelineProps) {
  const scroll = useScroll();
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    // Move the camera or the group based on scroll
    // For this concept, we'll move the group towards the camera to simulate travel
    if (groupRef.current) {
      const scrollOffset = scroll.offset;
      const spacing = 5;
      const totalDistance = (items.length - 1) * spacing;

      // Move the group forward to bring items into view
      // We add a buffer (e.g., +5) to ensure the last item passes the camera or stays in view
      groupRef.current.position.z = scrollOffset * (totalDistance + 10);

      groupRef.current.rotation.z = scrollOffset * 0.5;
    }
  });

  if (!items.length) return null;

  const points = items.map(
    (_, index) =>
      [Math.sin(index) * 2, Math.cos(index) * 2, -index * 5] as [
        number,
        number,
        number
      ]
  );

  return (
    <group ref={groupRef}>
      {points.length > 1 && (
        <Line
          points={points}
          color="white"
          lineWidth={1}
          dashed={true}
          dashScale={2}
          dashSize={1}
          gapSize={1}
        />
      )}
      {items.map((item, index) => (
        <Milestone
          key={item.id}
          project={item}
          position={points[index]}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}
