"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

// Augment window so TypeScript knows about the global Lenis reference
declare global {
  interface Window { __lenis?: Lenis; }
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Initialises Lenis smooth scrolling and wires it into GSAP ScrollTrigger
 * so scroll-based animations stay perfectly in sync.
 */
export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sync Lenis RAF with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const rafId = { current: 0 };
    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
