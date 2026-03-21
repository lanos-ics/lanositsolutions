"use client";

import { useEffect, useState } from "react";

interface FlipWordsProps {
  words: string[];
  /** Duration each word is visible (ms). Default: 2400 */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FlipWords — cycles through `words` with a smooth vertical flip animation.
 * Each word flips out upward, then the next flips in from below.
 */
export default function FlipWords({
  words,
  duration = 2400,
  className = "",
  style,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");

  useEffect(() => {
    // Idle phase — word is visible for `duration` ms
    const idleTimer = setTimeout(() => {
      setPhase("exit");

      // Exit animation plays for 350 ms, then swap word + enter
      const exitTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("enter");

        // Enter animation plays for 400 ms, then back to idle
        const enterTimer = setTimeout(() => setPhase("idle"), 400);
        return () => clearTimeout(enterTimer);
      }, 350);

      return () => clearTimeout(exitTimer);
    }, duration);

    return () => clearTimeout(idleTimer);
  }, [index, phase, duration, words.length]);

  return (
    <>
      <style>{`
        @keyframes flipWordIn {
          0%   { opacity: 0; filter: blur(10px); transform: rotateX(-90deg) translateY(12px); }
          60%  { opacity: 1; filter: blur(2px);  transform: rotateX(8deg)   translateY(-2px); }
          100% { opacity: 1; filter: blur(0px);  transform: rotateX(0deg)   translateY(0px); }
        }
        @keyframes flipWordOut {
          0%   { opacity: 1; filter: blur(0px);  transform: rotateX(0deg)  translateY(0px); }
          100% { opacity: 0; filter: blur(10px); transform: rotateX(90deg) translateY(-12px); }
        }

        .flip-word-exit {
          display: inline-block;
          transform-origin: center top;
          animation: flipWordOut 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }
        .flip-word-enter {
          display: inline-block;
          transform-origin: center bottom;
          animation: flipWordIn 0.4s cubic-bezier(0, 0.55, 0.45, 1) forwards;
        }
        .flip-word-idle {
          display: inline-block;
        }
      `}</style>

      <span
        className={`flip-word-${phase} ${className}`}
        style={{ perspective: "600px", ...style }}
      >
        {words[index]}
      </span>
    </>
  );
}
