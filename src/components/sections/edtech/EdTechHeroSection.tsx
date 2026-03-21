"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function EdTechHeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  /* ─── Mount: staggered fade-up + skew ───────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".et-item", { opacity: 0, y: 52, skewY: 1.1 });
      gsap.to(".et-item", {
        opacity:  1,
        y:        0,
        skewY:    0,
        duration: 1.15,
        ease:     "power4.out",
        stagger:  0.13,
        delay:    0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ─── Scroll: philosophy block float-in ─────────────────────── */
  useEffect(() => {
    if (!philosophyRef.current) return;
    gsap.set(philosophyRef.current, { opacity: 0, y: 32 });
    const trigger = ScrollTrigger.create({
      trigger:  philosophyRef.current,
      start:    "top 82%",
      onEnter:  () =>
        gsap.to(philosophyRef.current!, {
          opacity:  1,
          y:        0,
          duration: 1.1,
          ease:     "power3.out",
        }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position:         "relative",
        minHeight:        "calc(100svh - var(--nav-h))",
        display:          "grid",
        gridTemplateRows: "1fr auto",
        overflow:         "clip",
      }}
    >
      {/* ── Subtle dot-grid ─────────────────────────────────── */}
      <svg
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          pointerEvents: "none",
          opacity:       0.028,
        }}
      >
        <defs>
          <pattern id="et-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1A1A1B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#et-grid)" />
      </svg>

      {/* ── Ambient accent blobs ─────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          top:           "-14%",
          right:         "-10%",
          width:         "min(680px, 55vw)",
          height:        "min(680px, 55vw)",
          borderRadius:  "62% 38% 50% 50% / 42% 58% 42% 58%",
          background:    "radial-gradient(ellipse at 35% 35%, rgba(229,64,79,0.10) 0%, rgba(205,84,115,0.06) 55%, transparent 75%)",
          pointerEvents: "none",
          animation:     "etBlobMorph 16s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position:      "absolute",
          bottom:        "-12%",
          left:          "-8%",
          width:         "min(460px, 36vw)",
          height:        "min(460px, 36vw)",
          borderRadius:  "45% 55% 38% 62% / 60% 40% 55% 45%",
          background:    "radial-gradient(ellipse at 62% 62%, rgba(18,72,152,0.08) 0%, rgba(229,64,79,0.04) 55%, transparent 75%)",
          pointerEvents: "none",
          animation:     "etBlobMorph 20s ease-in-out infinite reverse",
        }}
      />

      {/* ── Main content col ─────────────────────────────────── */}
      <div
        className="et-main-grid"
        style={{
          position:      "relative",
          zIndex:        2,
          display:       "grid",
          gridTemplateColumns: "1fr min(420px, 38vw)",
          alignItems:    "center",
          gap:           "4rem",
          padding:       "3.5rem clamp(1.75rem, 8vw, 9rem) 0",
        }}
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

          {/* Eyebrow badge */}
          <div className="et-item" style={{ marginBottom: "1.6rem" }}>
            <span
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.45rem",
                fontSize:      "0.68rem",
                fontWeight:    600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                padding:       "0.28rem 0.8rem",
                border:        "1px solid rgba(229,64,79,0.22)",
                borderRadius:  "99px",
                background:    "rgba(229,64,79,0.06)",
              }}
            >
              <span
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "var(--accent)", display: "inline-block",
                  animation: "etPulse 2.4s ease-in-out infinite",
                }}
              />
              Lanos EdTech · Career Ecosystem
            </span>
          </div>

          {/* Headline */}
          <h1
            className="et-item"
            style={{
              fontWeight:    200,
              fontSize:      "clamp(2.8rem, 6.5vw, 8rem)",
              lineHeight:    1.04,
              letterSpacing: "-0.045em",
              color:         "var(--fg)",
              maxWidth:      "14ch",
              marginBottom:  "1rem",
            }}
          >
            Build Beyond{" "}
            <em
              style={{
                fontStyle:            "italic",
                fontWeight:           300,
                background:           "linear-gradient(130deg, var(--accent) 0%, #CD5473 55%, #124898 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
                paddingRight:         "0.06em",
                display:              "inline",
              }}
            >
              Coding.
            </em>
          </h1>

          {/* Sub-headline */}
          <p
            className="et-item"
            style={{
              fontSize:      "clamp(1.05rem, 1.8vw, 1.45rem)",
              fontWeight:    300,
              color:         "var(--fg-muted)",
              lineHeight:    1.55,
              maxWidth:      "38ch",
              letterSpacing: "-0.01em",
              marginBottom:  "2.6rem",
            }}
          >
            Enter the{" "}
            <span style={{ color: "var(--fg)", fontWeight: 400 }}>
              Lanos Technology Ecosystem.
            </span>
          </p>

          {/* Three ghost CTAs */}
          <div
            className="et-item et-cta-row"
            style={{
              display:   "flex",
              flexWrap:  "wrap",
              gap:       "0.75rem",
            }}
          >
            {/* Primary CTA — external link */}
            <Link
              href="/edtech/learning"
              className="et-cta-primary"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                padding:       "0.65rem 1.5rem",
                fontSize:      "0.82rem",
                fontWeight:    500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius:  "99px",
                textDecoration:"none",
                border:        "1px solid var(--accent)",
                color:         "var(--accent)",
                background:    "transparent",
                transition:    "border-color 0.22s ease, color 0.22s ease, background 0.22s ease",
              }}
            >
              Start Learning
              <span style={{ fontSize: "0.9rem", display: "inline-block", transition: "transform 0.22s ease" }}>
                ↗
              </span>
            </Link>

            {/* Ghost CTA — smooth-scrolls to closing form via Lenis */}
            <button
              type="button"
              className="et-cta-ghost"
              onClick={() => {
                const target = document.getElementById("edtech-contact");
                if (window.__lenis && target) {
                  window.__lenis.scrollTo(target, {
                    duration: 1.4,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  });
                } else {
                  target?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                padding:       "0.65rem 1.5rem",
                fontSize:      "0.82rem",
                fontWeight:    500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius:  "99px",
                border:        "1px solid rgba(26,26,27,0.18)",
                color:         "var(--fg-muted)",
                background:    "transparent",
                cursor:        "pointer",
                fontFamily:    "inherit",
                transition:    "border-color 0.22s ease, color 0.22s ease",
              }}
            >
              Book Counselling
            </button>
          </div>

        </div>

        {/* Right — Ecosystem SVG visual */}
        <div
          className="et-item et-network"
          aria-hidden
          style={{
            position:      "relative",
            width:         "100%",
            aspectRatio:   "1",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
          }}
        >
          <svg
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {/* Connection lines */}
            <line x1="160" y1="160" x2="160" y2="52"  stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            <line x1="160" y1="160" x2="248" y2="104" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            <line x1="160" y1="160" x2="248" y2="216" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            <line x1="160" y1="160" x2="160" y2="268" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            <line x1="160" y1="160" x2="72"  y2="216" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            <line x1="160" y1="160" x2="72"  y2="104" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
            {/* Outer ring lines */}
            <line x1="160" y1="52"  x2="248" y2="104" stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />
            <line x1="248" y1="104" x2="248" y2="216" stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />
            <line x1="248" y1="216" x2="160" y2="268" stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />
            <line x1="160" y1="268" x2="72"  y2="216" stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />
            <line x1="72"  y1="216" x2="72"  y2="104" stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />
            <line x1="72"  y1="104" x2="160" y2="52"  stroke="rgba(205,84,115,0.10)" strokeWidth="0.8" />

            {/* Center glow */}
            <circle cx="160" cy="160" r="28" fill="rgba(229,64,79,0.06)" stroke="rgba(229,64,79,0.22)" strokeWidth="1" />
            <circle cx="160" cy="160" r="15" fill="rgba(229,64,79,0.14)" />
            <circle cx="160" cy="160" r="6"  fill="var(--accent)" />

            {/* Orbit nodes — each gets its own CSS animation class */}
            {/* Orbit nodes — each gets its own CSS animation class */}
            {[
              { 
                cx: 160, cy: 52, label: "DSA", delay: "0s",
                icon: <image href="/tech/media__1772181643663.png" x={160 - 14} y={52 - 14} width="28" height="28" />
              },
              { 
                cx: 248, cy: 104, label: "Dev", delay: "0.4s",
                icon: <image href="/tech/media__1772181671194.png" x={248 - 14} y={104 - 14} width="28" height="28" />
              },
              { 
                cx: 248, cy: 216, label: "AI", delay: "0.8s",
                icon: <image href="/tech/media__1772181686053.png" x={248 - 14} y={216 - 14} width="28" height="28" />
              },
              { 
                cx: 160, cy: 268, label: "Data", delay: "1.2s",
                icon: <image href="/tech/media__1772181694962.png" x={160 - 14} y={268 - 14} width="28" height="28" />
              },
              { 
                cx: 72, cy: 216, label: "Git", delay: "1.6s",
                icon: <image href="/tech/media__1772184068160.png" x={72 - 14} y={216 - 14} width="28" height="28" />
              },
              { 
                cx: 72, cy: 104, label: "Java", delay: "2.0s",
                icon: <image href="/tech/media__1772183706000.png" x={72 - 14} y={104 - 14} width="28" height="28" />
              },
            ].map(({ cx, cy, label, delay, icon }) => (
              <g key={label} style={{ animation: `etNodeFloat 4s ease-in-out infinite`, animationDelay: delay }}>
                <circle cx={cx} cy={cy} r="22" fill="rgba(248,249,250,0.9)" stroke="rgba(229,64,79,0.18)" strokeWidth="1" />
                {icon}
              </g>
            ))}

            {/* Outer pulsing ring */}
            <circle cx="160" cy="160" r="118" stroke="rgba(229,64,79,0.07)" strokeWidth="1" strokeDasharray="4 6" style={{ animation: "etRingRotate 24s linear infinite" }} />
          </svg>
        </div>
      </div>

      {/* ── Philosophy block — scroll-triggered ──────────────── */}
      <div
        ref={philosophyRef}
        className="et-philosophy"
        style={{
          position:      "relative",
          zIndex:        2,
          padding:       "4rem clamp(1.75rem, 8vw, 9rem)",
          maxWidth:      "72ch",
        }}
      >
        <p
          style={{
            fontSize:      "clamp(1rem, 1.55vw, 1.25rem)",
            fontWeight:    300,
            color:         "var(--fg-muted)",
            lineHeight:    1.85,
            letterSpacing: "-0.005em",
          }}
        >
          <span style={{ color: "var(--fg)", fontWeight: 500 }}>
            Lanos is not a training institute.
          </span>{" "}
          It is a structured{" "}
          <span style={{ color: "var(--fg)", fontWeight: 400 }}>Tech Career Ecosystem</span>
          {" "}— where every learner, every project, and every mentor interaction is wired
          into a larger network of opportunity. We don't teach coding. We engineer careers.
        </p>
      </div>

      {/* ── Scroll hint ──────────────────────────────────────── */}
      <div
        className="et-scroll-hint"
        style={{
          position:    "relative",
          zIndex:      2,
          display:     "flex",
          alignItems:  "center",
          gap:         "0.7rem",
          padding:     "0 clamp(1.75rem, 8vw, 9rem) 2rem",
          opacity:     0.3,
        }}
      >
        <span
          style={{
            width: "1px", height: "40px",
            background: "linear-gradient(to bottom, transparent, var(--fg))",
            display: "block",
            animation: "etScrollPulse 2s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Scroll
        </span>
      </div>

      {/* ── Ghost watermark ──────────────────────────────────── */}
      <div aria-hidden className="et-watermark">EdTech</div>

      {/* ── Scoped keyframes + hover states ──────────────────── */}
      
    </section>
  );
}
