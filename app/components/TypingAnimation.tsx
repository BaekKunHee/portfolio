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
          sequence={['A Business-driven Developer.', 2000]}
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
            A Business-driven Developer.
          </h1>
          <TypeAnimation
            sequence={[
              '비즈니스의 본질을 이해하고, 기술로 가치를 창출하는 문제 해결사, 백건희입니다.',
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
