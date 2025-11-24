"use client";

import { useEffect, useState } from "react";

export default function ConnectingDotsLoader() {
  const [currentDot, setCurrentDot] = useState(0);
  const [blinkEyes, setBlinkEyes] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setCurrentDot((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 600);

    const blinkInterval = setInterval(() => {
      setBlinkEyes(true);
      setTimeout(() => setBlinkEyes(false), 150);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  const dots = [
    { x: 30, y: 50 },
    { x: 45, y: 40 },
    { x: 60, y: 50 },
    { x: 75, y: 40 },
    { x: 90, y: 50 },
  ];

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Pixel Art Scene */}
      <div className="relative">
        <svg
          width="300"
          height="180"
          viewBox="0 0 120 80"
          className="pixel-art"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Connected dots path */}
          {dots.map((dot, i) => {
            if (i === 0 || i > currentDot) return null;
            const prevDot = dots[i - 1];
            return (
              <line
                key={`line-${i}`}
                x1={prevDot.x}
                y1={prevDot.y}
                x2={dot.x}
                y2={dot.y}
                stroke="#00ff88"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dots */}
          {dots.map((dot, i) => (
            <g key={`dot-${i}`}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={i < currentDot ? 2.5 : 1.5}
                fill={i < currentDot ? "#00ff88" : "#444"}
                className="transition-all duration-300"
              />
              {i === currentDot && (
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="4"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values="4;7;4"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}

          {/* Pixel Character - positioned near current dot */}
          <g
            transform={`translate(${dots[currentDot].x - 8}, ${
              dots[currentDot].y + 8
            })`}
            className="transition-transform duration-500 ease-in-out"
          >
            {/* Character body (8x8 pixel sprite) */}
            {/* Head */}
            <rect x="2" y="0" width="4" height="4" fill="#fff" />
            {/* Eyes */}
            {!blinkEyes ? (
              <>
                <rect x="2.5" y="1" width="1" height="1" fill="#000" />
                <rect x="4.5" y="1" width="1" height="1" fill="#000" />
              </>
            ) : (
              <>
                <rect x="2.5" y="1.5" width="1" height="0.5" fill="#000" />
                <rect x="4.5" y="1.5" width="1" height="0.5" fill="#000" />
              </>
            )}
            {/* Body */}
            <rect x="2.5" y="4" width="3" height="3" fill="#00ff88" />
            {/* Arm holding pen */}
            <rect x="5.5" y="5" width="2" height="1" fill="#fff" />
            <rect x="7" y="4" width="1" height="1" fill="#ff6b9d" />
            {/* Legs */}
            <rect x="2.5" y="7" width="1" height="2" fill="#fff" />
            <rect x="4.5" y="7" width="1" height="2" fill="#fff" />

            {/* Bounce animation */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-1; 0,0"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>

      {/* Retro text */}
      <div className="text-center">
        <div
          className="text-2xl font-bold tracking-wider mb-2"
          style={{
            fontFamily: "monospace",
            textShadow: "2px 2px 0px #00ff88",
          }}
        >
          CONNECTING THE DOTS
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {".".repeat(((currentDot + 1) % 4) + 1)}
        </div>
      </div>
    </div>
  );
}
