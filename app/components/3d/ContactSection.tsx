import { Text, useScroll, Image, Billboard, Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { learnMoreItems } from "../../data/aboutData";

function ContactPlanet({
  item,
  index,
  total,
  radius,
  speed,
}: {
  item: (typeof learnMoreItems)[0];
  index: number;
  total: number;
  radius: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const angle = (index / total) * Math.PI * 2 + clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
    }
  });

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <group ref={ref}>
      <Billboard>
        <group
          onClick={() => handleLinkClick(item.url)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image url={item.icon} transparent scale={1.2} toneMapped={false} />
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.3}
            color="white"
            outlineWidth={0.02}
            outlineColor="black"
            anchorY="top"
            font="/assets/fonts/SpoqaHanSansNeo-Bold.woff"
          >
            {item.text}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}

function OrbitRing({
  radius,
  color = "#ffffff",
  opacity = 0.1,
}: {
  radius: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ContactSection() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Visible at the very end (10/12 to 12/12)
      const visible = scroll.visible(10 / 12, 2 / 12);
      groupRef.current.visible = visible;

      // Transition
      const progress = scroll.range(10 / 12, 2 / 12);
      // Start closer (-5) and move to 0
      groupRef.current.position.z = -5 + progress * 5;

      // Rotate system
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Central Sun / Contact Me */}
      <mesh
        onClick={() => window.open("mailto:hanbaek1643@gmail.com")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="black"
          emissive="black"
          emissiveIntensity={2}
          toneMapped={false}
        />
        <Outlines thickness={0.05} color="white" />
      </mesh>
      <pointLight color="black" intensity={3} distance={20} decay={2} />

      <Billboard>
        <Text
          position={[0, 0, 2.2]}
          fontSize={0.4}
          color="white"
          font="/assets/fonts/SpoqaHanSansNeo-Bold.woff"
        >
          The Next Dot
        </Text>
        <Text
          position={[0, -0.6, 2.2]}
          fontSize={0.3}
          color="#ccffdd"
          outlineWidth={0.02}
          outlineColor="black"
          font="/assets/fonts/SpoqaHanSansNeo-Bold.woff"
        >
          Is You
        </Text>
      </Billboard>

      {/* Orbit and Planets */}
      <OrbitRing radius={6} color="#00ff88" opacity={0.2} />

      {learnMoreItems.map((item, i) => (
        <ContactPlanet
          key={item.text}
          item={item}
          index={i}
          total={learnMoreItems.length}
          radius={6}
          speed={0.3}
        />
      ))}
    </group>
  );
}
