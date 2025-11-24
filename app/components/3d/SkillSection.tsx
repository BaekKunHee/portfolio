import { Text, useScroll, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const SKILL_CLUSTERS = [
  {
    name: "Cloud",
    color: "#ff9900",
    position: [-4, 2, 0],
    skills: ["AWS", "EKS", "OpenSearch", "Lambda"],
  },
  {
    name: "DevOps",
    color: "#0088ff",
    position: [4, 2, 0],
    skills: ["Kubernetes", "ArgoCD", "Docker", "Terraform"],
  },
  {
    name: "Development",
    color: "#00ff88",
    position: [-4, -2, 0],
    skills: ["React", "Python", "Flutter", "TypeScript"],
  },
  {
    name: "Tools",
    color: "#aa00ff",
    position: [4, -2, 0],
    skills: ["n8n", "Prometheus", "Grafana", "Git"],
  },
];

export default function SkillSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Visible last page (5/6 to 6/6)
      const visible = scroll.visible(5 / 6, 1 / 6);
      groupRef.current.visible = visible;

      // Gentle rotation of clusters
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

      // Bring closer
      const progress = scroll.range(5 / 6, 1 / 6);
      groupRef.current.position.z = -2 + progress * 2; // Closer range
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <Text
        position={[0, 4.5, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        Skill Network
      </Text>

      {SKILL_CLUSTERS.map((cluster, i) => (
        <group
          key={cluster.name}
          position={new THREE.Vector3(...cluster.position)}
        >
          {/* Cluster Center */}
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial
              color={cluster.color}
              emissive={cluster.color}
              emissiveIntensity={0.8}
            />
          </mesh>
          <Text
            position={[0, 1, 0]}
            fontSize={0.5}
            color={cluster.color}
            outlineWidth={0.01}
            outlineColor="black"
          >
            {cluster.name}
          </Text>

          {/* Satellite Skills */}
          {cluster.skills.map((skill, j) => {
            const angle = (j / cluster.skills.length) * Math.PI * 2;
            const radius = 2.2; // Increased radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <group key={skill} position={[x, y, 0]}>
                <mesh>
                  <sphereGeometry args={[0.25, 16, 16]} />
                  <meshStandardMaterial
                    color="#eeeeee"
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </mesh>
                <Text
                  position={[0, 0.5, 0]}
                  fontSize={0.3}
                  color="white"
                  outlineWidth={0.01}
                  outlineColor="black"
                >
                  {skill}
                </Text>
                {/* Connection Line */}
                <Line
                  points={[
                    [0, 0, 0],
                    [-x, -y, 0],
                  ]}
                  color={cluster.color}
                  lineWidth={2}
                  transparent
                  opacity={0.4}
                />
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}
