import { Text, useScroll, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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

function OrbitingPlanet({
  skill,
  index,
  total,
  speed,
  radius,
  color,
}: {
  skill: string;
  index: number;
  total: number;
  speed: number;
  radius: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const angle = (index / total) * Math.PI * 2 + clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(angle) * radius;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#eeeeee"
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.3}
        color="white"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {skill}
      </Text>
    </group>
  );
}

function SolarSystem({
  cluster,
  index,
}: {
  cluster: (typeof SKILL_CLUSTERS)[0];
  index: number;
}) {
  return (
    <group position={new THREE.Vector3(...cluster.position)}>
      {/* Sun (Cluster Center) */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={cluster.color}
          emissive={cluster.color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={cluster.color} intensity={2} distance={5} decay={2} />

      <Text
        position={[0, 0, 1]}
        fontSize={0.5}
        color="white"
        outlineWidth={0.04}
        outlineColor="black"
      >
        {cluster.name}
      </Text>

      {/* Orbit Path (Visual Ring) */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[2.4, 2.5, 64]} />
        <meshBasicMaterial
          color={cluster.color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planets */}
      {cluster.skills.map((skill, j) => (
        <OrbitingPlanet
          key={skill}
          skill={skill}
          index={j}
          total={cluster.skills.length}
          speed={0.3 + (index % 2) * 0.1} // Vary speed slightly
          radius={2.45}
          color={cluster.color}
        />
      ))}
    </group>
  );
}

export default function SkillSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Visible page (5/7 to 6/7)
      const visible = scroll.visible(5 / 7, 1 / 7);
      groupRef.current.visible = visible;

      // Gentle rotation of clusters
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

      // Bring closer
      const progress = scroll.range(5 / 7, 1 / 7);
      groupRef.current.position.z = -2 + progress * 2; // Closer range
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        Skill Universe
      </Text>

      {SKILL_CLUSTERS.map((cluster, i) => (
        <SolarSystem key={cluster.name} cluster={cluster} index={i} />
      ))}
    </group>
  );
}
