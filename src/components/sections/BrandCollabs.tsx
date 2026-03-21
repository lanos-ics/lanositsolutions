"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/* ─── Partner list (duplicated for seamless loop) ─────────── */
const PARTNERS = [
  { name: "Notion",    weight: 600, size: "1.4rem" },
  { name: "Vercel",    weight: 700, size: "1.3rem" },
  { name: "Linear",    weight: 600, size: "1.35rem" },
  { name: "Figma",     weight: 700, size: "1.4rem" },
  { name: "Stripe",    weight: 700, size: "1.3rem" },
  { name: "Framer",    weight: 600, size: "1.35rem" },
  { name: "Supabase",  weight: 700, size: "1.2rem" },
  { name: "Resend",    weight: 600, size: "1.3rem" },
];

/* ─── One track (original + clone for seamless loop) ──────── */
function MarqueeTrack({ direction = 1, speed = 40 }: { direction?: 1 | -1; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalW = track.scrollWidth / 2;   // half = one set of items
    const startX = direction === 1 ? 0 : -totalW;
    const endX   = direction === 1 ? -totalW : 0;

    gsap.fromTo(
      track,
      { x: startX },
      { x: endX, duration: speed, ease: "none", repeat: -1 }
    );

    return () => { gsap.killTweensOf(track); };
  }, [direction, speed]);

  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          gap:        "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
          width:      "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map(({ name, weight, size }, i) => (
          <span
            key={`${name}-${i}`}
            className="marquee-logo"
            style={{
              fontWeight:    weight,
              fontSize:      size,
              letterSpacing: "-0.035em",
              color:         "#1A1A1B",
              opacity:       0.32,
              filter:        "grayscale(1)",
              whiteSpace:    "nowrap",
              transition:    "opacity 0.3s ease",
              cursor:        "default",
              userSelect:    "none",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.32")}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function BrandCollabs() {
  return (
    <section
      style={{
        padding:    "clamp(4rem, 7vw, 7rem) 0",
        position:   "relative",
        zIndex:     1,
        overflow:   "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize:      "0.68rem",
          fontWeight:    600,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color:         "var(--fg-muted)",
          opacity:       0.5,
          textAlign:     "center",
          marginBottom:  "2.5rem",
        }}
      >
        Trusted by teams at
      </p>

      {/* Row 1 — scrolls left */}
      <MarqueeTrack direction={1} speed={38} />

      {/* Subtle gap between rows */}
      <div style={{ height: "1.5rem" }} />

      {/* Row 2 — scrolls right (counter-direction) */}
      <MarqueeTrack direction={-1} speed={50} />
    </section>
  );
}
