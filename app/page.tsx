'use client';

import { useCallback, useEffect, useState } from 'react';
import AboutSection from './components/AboutSection';
import BackgroundOverlay from './components/BackgroundOverlay';
import FloatingMenu from './components/FloatingMenu';
import ProfileSection from './components/MainSection';
import PortfolioSection from './components/PortfolioSection';
import TypingAnimation from './components/TypingAnimation';
import { useAnimationState } from './hooks/useAnimationState';
import { useScroll } from './hooks/useScroll';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { isAnimationComplete, showProfile, setShowPortfolio } =
    useAnimationState();
  const { currentSection, scrollToSection } = useScroll({
    isAnimationComplete,
    onScrollProgress: (section) => {
      if (section > 0) {
        setShowPortfolio(true);
      }
    },
  });

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollToSection(0);
  }, [scrollToSection]);

  const handleSectionClick = useCallback(
    (sectionIndex: number) => {
      scrollToSection(sectionIndex);
    },
    [scrollToSection]
  );

  return (
    <>
      {showProfile && (
        <FloatingMenu
          onScrollToTop={handleScrollToTop}
          currentSection={currentSection}
          onSectionClick={handleSectionClick}
        />
      )}
      <main className="relative w-full h-screen md:overflow-hidden overflow-auto text-[#0d0d0d]">
        <div
          className="transition-transform duration-700 ease-in-out md:h-screen"
          style={{
            transform: isDesktop
              ? `translateY(-${currentSection * 100}vh)`
              : 'none',
          }}
        >
          {/* 메인 섹션 */}
          <section
            className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${
              showProfile
                ? 'bg-[url("/assets/images/abstract.jpg")] bg-cover bg-opacity-100'
                : 'bg-[#F9FBFC]'
            }`}
          >
            <BackgroundOverlay showProfile={showProfile} />
            <TypingAnimation
              isAnimationComplete={isAnimationComplete}
              showProfile={showProfile}
            />
            <ProfileSection showProfile={showProfile} />
          </section>

          {/* About Section */}
          <section className="relative w-full min-h-screen flex items-center justify-center bg-[#1C1B1B] text-white">
            <AboutSection />
          </section>

          {/* 포트폴리오 섹션 */}
          <section className="relative w-full min-h-screen flex items-center justify-center bg-[#1C1B1B] text-white">
            <PortfolioSection />
          </section>
        </div>
      </main>
    </>
  );
}
