/**
 * gsap.ts
 * Central GSAP config — registers ScrollTrigger plugin and
 * exports shared defaults. Import this file (not gsap directly)
 * inside any `useEffect` block to ensure plugin is registered.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module level (safe in client code)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Shared animation defaults matching the design token `--ease-out-expo` */
export const gsapDefaults = {
  ease: "power4.out",
  duration: 0.9,
} as const;

/**
 * Animate a set of elements in with a staggered fade-up.
 * Call inside a GSAP context / useEffect.
 */
export function animateFadeUp(
  targets: gsap.TweenTarget,
  options?: gsap.TweenVars
) {
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    ...gsapDefaults,
    stagger: 0.12,
    ...options,
  });
}
