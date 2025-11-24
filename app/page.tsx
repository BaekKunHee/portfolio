"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ProjectModal from "./components/portfolio/ProjectModal";
import { Project } from "./types/portfolio";

const Scene = dynamic(() => import("./components/3d/Scene"), { ssr: false });

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch("/api/notion");
        const data = await response.json();
        if (data.portfolioItems) {
          const sortedItems = data.portfolioItems.sort(
            (a: Project, b: Project) => {
              if (!a.period || !b.period) return 0;
              return b.period.localeCompare(a.period);
            }
          );
          setPortfolioItems(sortedItems);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-transparent text-white pointer-events-none">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-2xl font-light tracking-widest animate-pulse">
            CONNECTING THE DOTS...
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <h1 className="text-4xl font-bold tracking-tighter">HAN</h1>
            <p className="text-sm text-gray-400 mt-2 tracking-widest">
              PRODUCT HACKER
            </p>
          </div>

          <div className="absolute bottom-8 right-8 z-10 pointer-events-none text-right">
            <p className="text-xs text-gray-500">SCROLL TO EXPLORE</p>
          </div>

          <Scene
            portfolioItems={portfolioItems}
            onProjectSelect={setSelectedProject}
          />

          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
