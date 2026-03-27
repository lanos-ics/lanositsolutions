/**
 * Ambient module declarations for GSAP plugin sub-paths.
 *
 * TypeScript's "bundler" moduleResolution does not expand wildcard globs in
 * package.json `exports` maps, so `gsap/ScrollTrigger` and friends are not
 * auto-resolved. These declarations point them at the globals GSAP ships.
 */

/// <reference path="../../node_modules/gsap/types/scroll-trigger.d.ts" />
/// <reference path="../../node_modules/gsap/types/observer.d.ts" />

declare module "gsap/ScrollTrigger" {
  export { ScrollTrigger };
}

declare module "gsap/Observer" {
  export { Observer };
}

declare module "gsap/Draggable" {
  export { Draggable };
}

declare module "gsap/Flip" {
  export { Flip };
}

declare module "gsap/ScrollToPlugin" {
  export { ScrollToPlugin };
}

declare module "gsap/TextPlugin" {
  export { TextPlugin };
}
