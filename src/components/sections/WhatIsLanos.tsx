"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

/* ─── Department data ─────────────────────────────────────── */
const DEPARTMENTS = [
  {
    id:          "edtech",
    icon:        "◈",
    label:       "EdTech",
    heading:     "Become a Software Engineer.",
    description: (
      <>
        Start from fundamentals and progress into real-world development — from{" "}
        <strong>coder</strong> to <strong>Industry-Ready Software Engineer</strong>.
        {" "}Learn by building applications driven by current industry demand, with
        guaranteed paid internships and 100% placement under the Lanos Ecosystem.
      </>
    ),
    href:        "/edtech",
    cta:         "Explore Learning",
    fromX:       -80,  // slides in from left
    fromY:        0,
    delay:        0,
    accentColor: "rgba(229, 64, 79, 0.12)",
    iconColor:   "#E5404F",
  },
  {
    id:          "solutions",
    icon:        "◎",
    label:       "IT Solutions",
    heading:     "Build Scalable Software.",
    description:
      "We design and develop production-grade systems for startups and businesses — built to scale, perform, and last, at a price never seen before.",
    href:        "/solutions",
    cta:         "View Solutions & Pricing",
    fromX:        0,   // slides in from below
    fromY:        80,
    delay:        0.12,
    accentColor: "rgba(18, 72, 152, 0.10)",
    iconColor:   "#124898",
  },
  {
    id:          "rd",
    icon:        "◬",
    label:       "R&D",
    heading:     "It's All About Research.",
    description:
      "We don't follow the frontier — we define it. Our research teams push the boundaries of AI, BCI/EEG technology, operating systems, IoT/drone systems, and next-generation computing — engineering what doesn't exist yet.",
    href:        "/research",
    cta:         "Explore Research",
    fromX:        80,  // slides in from right
    fromY:        0,
    delay:        0.22,
    accentColor: "rgba(205, 84, 115, 0.10)",
    iconColor:   "#CD5473",
  },
];

/* ─── Individual card ─────────────────────────────────────── */
function DeptCard({
  icon, label, heading, description, href, cta,
  accentColor, iconColor,
}: (typeof DEPARTMENTS)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       "flex",
        flexDirection: "column",
        gap:           "1.5rem",
        padding:       "2.5rem 2rem 2rem",
        borderRadius:  "1.25rem",
        border:        "1px solid rgba(26,26,27,0.07)",
        background:    hovered
          ? `radial-gradient(ellipse at 30% 20%, ${accentColor} 0%, rgba(248,249,250,0.6) 70%)`
          : "rgba(248,249,250,0.5)",
        backdropFilter:  "blur(8px)",
        textDecoration:  "none",
        cursor:          "pointer",
        transform:       hovered ? "translateY(-8px)" : "translateY(0)",
        transition:
          "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.45s ease",
        boxShadow: hovered
          ? "0 20px 60px rgba(26,26,27,0.08), 0 4px 16px rgba(26,26,27,0.06)"
          : "0 2px 12px rgba(26,26,27,0.04)",
        borderColor: hovered ? "rgba(26,26,27,0.13)" : "rgba(26,26,27,0.07)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width:          "2.8rem",
          height:         "2.8rem",
          borderRadius:   "0.7rem",
          background:     accentColor,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       "1.35rem",
          color:          iconColor,
          transition:     "transform 0.35s ease",
          transform:      hovered ? "scale(1.14)" : "scale(1)",
          animation:      hovered ? "iconPulse 0.7s ease" : "none",
        }}
      >
        {icon}
      </div>

      {/* Label pill */}
      <span
        style={{
          fontSize:      "0.68rem",
          fontWeight:    700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         iconColor,
          opacity:       0.85,
        }}
      >
        {label}
      </span>

      {/* Heading */}
      <h3
        style={{
          fontWeight:    500,
          fontSize:      "clamp(1.15rem, 1.6vw, 1.4rem)",
          letterSpacing: "-0.025em",
          lineHeight:    1.25,
          color:         "var(--fg)",
          marginTop:    "-0.75rem",
        }}
      >
        {heading}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize:   "0.9rem",
          lineHeight: 1.72,
          color:      "var(--fg-muted)",
          flexGrow:   1,
          maxWidth:   "38ch",
        }}
      >
        {description}
      </p>

      {/* Learn more arrow */}
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        hovered ? "0.75rem" : "0.5rem",
          fontSize:   "0.82rem",
          fontWeight: 600,
          color:      iconColor,
          opacity:    hovered ? 1 : 0.6,
          transition: "opacity 0.25s ease, gap 0.3s ease",
        }}
      >
        {cta}
        <span
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          "1.6rem",
            height:         "1.6rem",
            borderRadius:   "50%",
            background:     iconColor,
            color:          "#fff",
            fontSize:       "0.75rem",
            flexShrink:     0,
            transition:     "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform:      hovered ? "translate(2px,-2px)" : "none",
          }}
        >
          ↗
        </span>
      </div>
    </Link>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function WhatIsLanos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      DEPARTMENTS.forEach(({ id, fromX, fromY, delay }) => {
        gsap.fromTo(
          `#dept-${id}`,
          { opacity: 0, x: fromX, y: fromY },
          {
            opacity:  1,
            x:        0,
            y:        0,
            duration: 1.1,
            ease:     "back.out(1.4)",
            delay,
            scrollTrigger: {
              trigger: `#dept-${id}`,
              start:   "top 85%",
              once:    true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding:          "clamp(5rem, 10vw, 10rem) clamp(1.75rem, 8vw, 9rem)",
        position:         "relative",
        zIndex:           1,
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "4rem", maxWidth: "52ch" }}>
        <span
          style={{
            display:       "block",
            fontSize:      "0.7rem",
            fontWeight:    700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color:         "var(--accent)",
            marginBottom:  "1rem",
            opacity:       0.75,
          }}
        >
          What is Lanos?
        </span>
        <h2
          style={{
            fontWeight:    300,
            fontSize:      "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.035em",
            lineHeight:    1.1,
            color:         "var(--fg)",
          }}
        >
          A Complete Tech Ecosystem —{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 200,
              color: "var(--fg-muted)",
            }}
          >
            Built for Growth.
          </span>
        </h2>
        <p
          style={{
            fontSize:   "clamp(0.95rem, 1.3vw, 1.1rem)",
            lineHeight: 1.72,
            color:      "var(--fg-muted)",
            marginTop:  "1.25rem",
            maxWidth:   "52ch",
          }}
        >
          Lanos is a unified system where learning turns into real-world
          engineering, engineering turns into production systems, and systems
          evolve into future technologies.
        </p>
      </div>

      {/* 3-column grid */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap:                 "1.5rem",
          alignItems:          "stretch",
        }}
      >
        {DEPARTMENTS.map((dept) => (
          <div key={dept.id} id={`dept-${dept.id}`} style={{ display: "flex" }}>
            <DeptCard {...dept} />
          </div>
        ))}
      </div>

      {/* Bottom ecosystem line */}
      <p
        style={{
          textAlign:     "center",
          fontSize:      "clamp(0.95rem, 1.3vw, 1.1rem)",
          color:         "var(--fg-muted)",
          lineHeight:    1.72,
          marginTop:     "3.5rem",
          maxWidth:      "60ch",
          marginLeft:    "auto",
          marginRight:   "auto",
          fontWeight:    400,
          letterSpacing: "-0.01em",
        }}
      >
        All three operate as one ecosystem:{" "}
        <strong style={{ fontWeight: 600, color: "var(--fg)" }}>LANOS ECOSYSTEM</strong>
        {" "}— enabling continuous growth from learning → real-world execution → innovation.
      </p>

      {/* Icon pulse keyframe */}
      <style>{`
        @keyframes iconPulse {
          0%  { transform: scale(1); }
          40% { transform: scale(1.22); }
          70% { transform: scale(1.08); }
          100%{ transform: scale(1.14); }
        }
      `}</style>
    </section>
  );
}
