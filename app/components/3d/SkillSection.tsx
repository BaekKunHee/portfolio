import { Text, useScroll, Image, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { skillSets, SkillItem } from "../../data/aboutData";

const ORBIT_SPEED_MULTIPLIER = 0.2;

function SkillPlanet({
  skill,
  index,
  total,
  radius,
  speed,
  iconPath,
}: {
  skill: SkillItem;
  index: number;
  total: number;
  radius: number;
  speed: number;
  iconPath: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const angle =
        (index / total) * Math.PI * 2 +
        clock.elapsedTime * speed * ORBIT_SPEED_MULTIPLIER;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <group ref={ref}>
      <Billboard>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image url={iconPath} transparent scale={0.8} toneMapped={false} />
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.4}
          color="white"
          outlineWidth={0.04}
          outlineColor="black"
          anchorY="top"
          font="/assets/fonts/SpoqaHanSansNeo-Bold.woff"
        >
          {skill.label}
        </Text>
      </Billboard>
    </group>
  );
}

function OrbitRing({
  radius,
  color = "#ffffff",
  opacity = 0.3,
}: {
  radius: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function SkillSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  // Flatten and categorize skills for orbits
  // Orbit 1: Stack (Radius 3)
  // Orbit 2: Infra (Radius 5)
  // Orbit 3: Tools (Radius 7)
  // Orbit 4: Soft Skills (Radius 9)

  const orbits = useMemo(
    () => [
      {
        name: "Stack",
        data: skillSets.stack,
        radius: 3,
        speed: 0.5,
        color: "#61dafb",
      },
      {
        name: "Infra",
        data: skillSets.infra,
        radius: 5,
        speed: 0.3,
        color: "#ff9900",
      },
      {
        name: "Tools",
        data: skillSets.tools,
        radius: 7,
        speed: 0.2,
        color: "#aa00ff",
      },
      {
        name: "Soft Skills",
        data: skillSets.softSkills,
        radius: 9,
        speed: 0.15,
        color: "#00ff88",
      },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Visible page (6/12 to 10/12) - 4 pages
      const visible = scroll.visible(6 / 12, 4 / 12);
      groupRef.current.visible = visible;

      // Transition effect
      const progress = scroll.range(6 / 12, 4 / 12);
      // Tilt the whole system slightly for better view
      groupRef.current.rotation.x =
        0.5 + Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.1;

      // Zoom in/out based on scroll
      // Start closer (-5) so it's immediately visible, then zoom in slightly to -2
      groupRef.current.position.z = -5 + progress * 3;
      // Keep Y relatively stable or slight movement
      groupRef.current.position.y = -1 + progress * 1;
    }
  });

  const getIconPath = (iconName: string) => {
    if (iconName.startsWith("/")) return iconName;
    return `/assets/icons/${iconName}`;
  };

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Central Sun / Title */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ff8800"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#ff8800" intensity={3} distance={20} decay={2} />

      <Billboard>
        <Text
          position={[0, 0, 1.6]}
          fontSize={0.6}
          color="white"
          outlineWidth={0.05}
          outlineColor="black"
          font="/assets/fonts/SpoqaHanSansNeo-Bold.woff"
        >
          SKILLS
        </Text>
      </Billboard>

      {/* Orbits and Planets */}
      {orbits.map((orbit, i) => (
        <group key={orbit.name}>
          <OrbitRing radius={orbit.radius} color={orbit.color} />
          {orbit.data.map((skill, j) => (
            <SkillPlanet
              key={skill.label}
              skill={skill}
              index={j}
              total={orbit.data.length}
              radius={orbit.radius}
              speed={orbit.speed * (i % 2 === 0 ? 1 : -1)} // Alternate direction
              iconPath={getIconPath(skill.icon)}
            />
          ))}
        </group>
      ))}
    </group>
  );
}
