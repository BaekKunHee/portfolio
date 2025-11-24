"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import StarField from "./StarField";
import Timeline from "./Timeline";
import IntroSection from "./IntroSection";
import ProfileSection from "./ProfileSection";
import SkillSection from "./SkillSection";
import { Project } from "@/app/types/portfolio";

interface SceneProps {
  portfolioItems: Project[];
  onProjectSelect: (project: Project) => void;
}

export default function Scene({ portfolioItems, onProjectSelect }: SceneProps) {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-0 bg-black pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 15]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[0, 0, 5]} intensity={1} />

        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.3}>
            <StarField />
            <IntroSection />
            <ProfileSection />
            <Timeline items={portfolioItems} onSelect={onProjectSelect} />
            <SkillSection />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
