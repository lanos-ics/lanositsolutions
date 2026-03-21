"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import FlipWords from "@/components/ui/FlipWords";
import InfinityParticles from "@/components/ui/InfinityParticles";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ─── GSAP entrance — staggered fade-up + skew ─────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-item", { opacity: 0, y: 50, skewY: 1.2 });
      gsap.to(".hero-item", {
        opacity:  1,
        y:        0,
        skewY:    0,
        duration: 1.1,
        ease:     "power4.out",
        stagger:  0.13,
        delay:    0.25,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={sectionRef}
      style={{
        position:         "relative",
        minHeight:        "calc(100svh - var(--nav-h))", /* fills viewport, can grow */
        display:          "grid",
        gridTemplateRows: "1fr auto",                    /* content + scroll-hint row */
        overflow:         "clip",                        /* clips blobs without creating scroll ctx */
      }}
    >
      {/* ── Background Particles ───────────────────────────────── */}
      <InfinityParticles className="hero-particles" />

      {/* ── SVG wireframe grid ───────────────────────────────── */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.032 }}
      >
        <defs>
          <pattern id="grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#1A1A1B" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Main content — centred in first grid row ──────────── */}
      <div
        style={{
          position:       "relative",
          zIndex:         2,
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
          padding:        "3rem clamp(1rem, 5vw, 9rem) 0", /* 3rem top gap from nav */
          gap:            "0",
        }}
      >
        {/* Eyebrow */}
        <div className="hero-item" style={{ marginBottom: "1.75rem" }}>
          <span
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.45rem",
              fontSize:      "clamp(0.6rem, 2vw, 0.7rem)",
              fontWeight:    600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              padding:       "0.28rem 0.75rem",
              border:        "1px solid rgba(229,64,79,0.22)",
              borderRadius:  "99px",
              background:    "rgba(229,64,79,0.06)",
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--accent)", display: "inline-block",
                animation: "pulse 2.4s ease-in-out infinite",
              }}
            />
            EdTech · Solutions · R&amp;D
          </span>
        </div>

        {/* Mega heading — thin weight */}
        <h1
          className="hero-item"
          style={{
            fontWeight:    200,
            fontSize:      "clamp(2.1rem, 6.5vw, 7.5rem)",
            lineHeight:    1.1,
            letterSpacing: "-0.03em",
            color:         "var(--fg)",
            maxWidth:      "16ch",
            marginBottom:  "1.6rem",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
            Lanos:
            <span id="infinity-target" className="mobile-particles-wrapper" aria-hidden="true" />
          </span>
          <br />
          <em
            style={{
              fontStyle:    "italic",
              fontWeight:   300,
              whiteSpace:   "nowrap",
            }}
          >
            <span style={{
              background:   "linear-gradient(125deg, var(--accent) 0%, #CD5473 35%, #124898 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}>Where </span>
            <FlipWords 
              words={["Education", "Solutions", "Research"]} 
              duration={2800} 
              style={{
                background:   "linear-gradient(125deg, #CD5473 0%, var(--accent) 55%, #124898 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
                paddingRight:  "0.07em",   /* stops italic overhang clipping */
              }}
            />
          </em>
          <br />
          Meets Execution.
        </h1>

        {/* Sub-copy */}
        <p
          className="hero-item"
          style={{
            fontSize:     "clamp(1rem, 1.5vw, 1.2rem)",
            color:        "var(--fg-muted)",
            lineHeight:   1.75,
            maxWidth:     "46ch",
            marginBottom: "2.5rem",
            fontWeight:   400,
          }}
        >
          We build intelligent platforms that turn knowledge into action — for
          students, enterprises, and the innovators between them.
        </p>

        {/* Borderless CTA */}
        <div className="hero-item">
          <Link
            href="/solutions"
            className="hero-cta"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.65rem",
              fontSize:      "1.05rem",
              fontWeight:    500,
              color:         "var(--fg)",
              textDecoration:"none",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="cta-text" style={{ transition: "color 0.22s ease" }}>
              Start your journey
            </span>
            <span
              className="cta-arrow"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          "2.5rem",
                height:         "2.5rem",
                borderRadius:   "50%",
                background:     "var(--fg)",
                color:          "var(--bg)",
                fontSize:       "1.1rem",
                transition:     "transform 0.32s var(--ease-out-expo), background 0.22s ease",
                flexShrink:     0,
              }}
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* ── Scroll hint — second row, pinned bottom ───────────── */}
      <div
        className="hero-item"
        style={{
          position:    "relative",
          zIndex:      2,
          display:     "flex",
          alignItems:  "center",
          gap:         "0.7rem",
          padding:     "0 clamp(1rem, 5vw, 9rem)",
          paddingBottom:"2rem",
          opacity:     0.32,
        }}
      >
        <span
          style={{
            width: "1px", height: "42px",
            background: "linear-gradient(to bottom, transparent, var(--fg))",
            display: "block",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
      </div>

      {/* ── Keyframes + hover styles ─────────────────────────── */}
      <style>{`
        .hero-cta:hover .cta-arrow {
          transform: translate(3px, -3px);
          background: var(--accent);
        }
        .hero-cta:hover .cta-text { color: var(--accent); }

        @keyframes blobMorph {
          0%, 100% { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
          33%       { border-radius: 50% 50% 45% 55% / 55% 45% 60% 40%; }
          66%       { border-radius: 40% 60% 60% 40% / 40% 60% 55% 45%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.45; transform: scaleY(1); }
          50%       { opacity: 1;    transform: scaleY(1.18); }
        }

        .hero-particles {
          pointer-events: none;
        }
        .mobile-particles-wrapper {
          display: inline-block;
          width: 1.8em;
          height: 0.7em;
          margin-left: 0.1em;
        }
        @media (min-width: 768px) {
          .mobile-particles-wrapper { display: none !important; }
        }

        /* Ghost watermark */
        .hero-watermark {
          position: absolute;
          right: clamp(-2rem, -2vw, -1rem);
          bottom: -1rem;
          font-size: clamp(7rem, 16vw, 20rem);
          font-weight: 800;
          letter-spacing: -0.06em;
          color: rgba(26,26,27,0.032);
          user-select: none;
          pointer-events: none;
          line-height: 1;
          z-index: 1;
        }
      `}</style>

      {/* Ghost watermark */}
      <div aria-hidden className="hero-watermark">Lanos</div>
    </section>
  );
}
