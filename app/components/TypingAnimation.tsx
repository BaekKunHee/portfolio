'use client';

import { TypeAnimation } from 'react-type-animation';

interface TypingAnimationProps {
  isAnimationComplete: boolean;
  showProfile: boolean;
}

export default function TypingAnimation({
  isAnimationComplete,
  showProfile,
}: TypingAnimationProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-1000 relative z-10 ${
        isAnimationComplete
          ? 'scale-75 translate-y-[-200px] md:translate-y-[-220px]'
          : 'animate-fade-in'
      }`}
    >
      {!showProfile && (
        <TypeAnimation
          sequence={['A Growth-focused Product Hacker.', 2000]}
          wrapper="span"
          speed={40}
          cursor={false}
          className={`text-2xl sm:text-2xl md:text-6xl font-extrabold transition-all duration-1000 ${
            showProfile ? 'text-white' : 'text-black'
          }`}
        />
      )}
      {showProfile && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-3xl md:text-6xl font-extrabold transition-all duration-2000 text-white animate-fade-in">
            A Growth-focused Product Hacker.
          </h1>
          <TypeAnimation
            sequence={[
              '비즈니스 성장을 주도하고, 빠른 실험과 기술로 혁신을 만들어가는 프로덕트해커, 백건희입니다.',
              1000,
            ]}
            wrapper="span"
            speed={40}
            className="text-md sm:text-base md:text-2xl font-medium p-2 text-[#F5F5F5] opacity-0 animate-fade-in"
          />
        </div>
      )}
    </div>
  );
}
