import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ContactSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && dotRef.current && orbitRef.current) {
      // Visible at the very end (6/7 to 7/7)
      const visible = scroll.visible(6 / 7, 1 / 7);
      groupRef.current.visible = visible;

      // Bring closer
      const progress = scroll.range(6 / 7, 1 / 7);
      groupRef.current.position.z = -10 + progress * 10; // Fly in from far

      // Pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      dotRef.current.scale.set(scale, scale, scale);

      // Orbit
      orbitRef.current.rotation.z += 0.005;
      orbitRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Central Dot */}
      <mesh
        ref={dotRef}
        onClick={() => handleLinkClick("mailto:qorrjsgml22@gmail.com")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="white" intensity={2} distance={10} />

      {/* Text - Static relative to camera */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        The Next Dot
      </Text>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.8}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        Is You
      </Text>

      {/* Orbiting Socials */}
      <group ref={orbitRef}>
        <SocialPlanet
          position={[3, 0, 0]}
          label="GitHub"
          onClick={() => handleLinkClick("https://github.com/BaekKunHee")}
        />
        <SocialPlanet
          position={[-3, 0, 0]}
          label="Bio Link"
          onClick={() => handleLinkClick("https://bit.ly/m/developer_bear")}
        />
        <SocialPlanet
          position={[0, 3, 0]}
          label="Notion"
          onClick={() =>
            handleLinkClick(
              "https://han-baek.notion.site/HAN-Product-Hacker-21c7a57f96cb414fb69347aeeeb06f72?pvs=74"
            )
          }
        />
      </group>
    </group>
  );
}

function SocialPlanet({ position, label, onClick }: any) {
  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#0088ff"
          emissive="#0088ff"
          emissiveIntensity={1}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.3}
        color="white"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {label}
      </Text>
    </group>
  );
}
