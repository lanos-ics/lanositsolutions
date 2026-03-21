"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Steps data ─────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Enquiry",
    tag: "Entry",
    desc: "First contact — tell us your background, goals, and timeline. No commitments, no pressure.",
    detail: "A structured form + discovery call to map where you are versus where you want to be.",
  },
  {
    num: "02",
    title: "Counselling",
    tag: "Clarity",
    desc: "Deep 1-on-1 session with a Lanos mentor. We listen before we recommend.",
    detail: "90-minute session covering academic background, career aspirations, and skill assessment.",
  },
  {
    num: "03",
    title: "Track Selection",
    tag: "Strategy",
    desc: "We guide strategically, not randomly.",
    detail: "Based on your profile, we match you to the optimal tech track — backed by data from our placement outcomes.",
    highlight: true,
  },
  {
    num: "04",
    title: "Technical Training",
    tag: "Execution",
    desc: "Structured, project-driven curriculum. No rote learning — only production-grade thinking.",
    detail: "Cohort-based learning with weekly milestones, code reviews, and peer accountability.",
  },
  {
    num: "05",
    title: "Certification",
    tag: "Credential",
    desc: "Industry-recognised credentials built on demonstrated skill, not attendance.",
    detail: "Portfolio-based assessment. Your work speaks — not just a certificate.",
  },
  {
    num: "06",
    title: "Internship",
    tag: "Real Stakes",
    desc: "Hands-on exposure in live environments with real products and real stakes.",
    detail: "Work alongside senior engineers on Lanos ventures or partner organisations.",
  },
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  /* Heading fade-up */
  useEffect(() => {
    if (!headingRef.current) return;
    gsap.set(headingRef.current, { opacity: 0, y: 32 });
    const t = ScrollTrigger.create({
      trigger: headingRef.current,
      start:   "top 80%",
      onEnter: () => gsap.to(headingRef.current!, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  /* Scroll-scrubbed line draw */
  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
    const tween = gsap.to(lineRef.current, {
      scaleY: 1,
      ease:   "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "top 55%",
        end:     "bottom 65%",
        scrub:   1.2,
      },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  /* Per-step activation — nodes and content are co-located in the same row */
  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    document.querySelectorAll<HTMLElement>(".rm-row").forEach((row) => {
      const node    = row.querySelector<HTMLElement>(".rm-node");
      const content = row.querySelector<HTMLElement>(".rm-content");

      /* Node activation */
      const t1 = ScrollTrigger.create({
        trigger:     row,
        start:       "top 65%",
        onEnter:     () => node?.classList.add("is-active"),
        onLeaveBack: () => node?.classList.remove("is-active"),
      });
      triggers.push(t1);

      /* Content slide-in (one-shot) */
      if (content) {
        gsap.set(content, { opacity: 0, x: -20 });
        const t2 = ScrollTrigger.create({
          trigger: row,
          start:   "top 68%",
          onEnter: () => gsap.to(content, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }),
        });
        triggers.push(t2);
      }
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rm-section-pad"
      style={{ position: "relative", padding: "7rem clamp(1.75rem, 8vw, 9rem)", overflow: "hidden" }}
    >
      {/* Blueprint dot-grid */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.022 }}>
        <defs>
          <pattern id="rm-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1A1A1B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rm-dots)" />
      </svg>

      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: "clamp(1.75rem,8vw,9rem)", right: "clamp(1.75rem,8vw,9rem)", height: "1px", background: "rgba(26,26,27,0.07)" }} />

      {/* ── Section header ──────────────────────────────────────── */}
      <div ref={headingRef} className="rm-heading-wrap" style={{ marginBottom: "5rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "1.1rem" }}>
          Growth Roadmap
        </span>
        <h2 style={{ fontWeight: 200, fontSize: "clamp(1.8rem, 3.5vw, 3.4rem)", letterSpacing: "-0.035em", lineHeight: 1.18, maxWidth: "22ch", color: "var(--fg)" }}>
          Six deliberate steps.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-muted)" }}>
            One clear destination.
          </em>
        </h2>
      </div>

      {/* ── Stepper ─────────────────────────────────────────────── */}
      {/*
        Layout per row:
          [node col 64px fixed] [content col flex-1]
        A single absolutely-positioned vertical line runs behind all rows.
      */}
      <div style={{ position: "relative" }}>

        {/* Grey track behind all nodes */}
        <div style={{
          position:  "absolute",
          top:       14,         /* center of first node */
          bottom:    14,         /* center of last node  */
          left:      31,         /* center of 64px node col */
          width:     "1px",
          background:"rgba(26,26,27,0.1)",
        }} />

        {/* Animated blue fill — scrubs via GSAP */}
        <div ref={lineRef} style={{
          position:  "absolute",
          top:       14,
          bottom:    14,
          left:      31,
          width:     "2px",
          marginLeft:"-0.5px",
          background:"linear-gradient(to bottom, var(--accent), #124898)",
          borderRadius:"99px",
          transformOrigin:"top center",
        }} />

        {/* Steps — each row is self-contained */}
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="rm-row"
            style={{
              display:       "grid",
              gridTemplateColumns: "64px 1fr",
              gap:           "0 2rem",
              paddingBottom: i < STEPS.length - 1 ? "clamp(2.5rem, 5vw, 4rem)" : 0,
              alignItems:    "flex-start",
            }}
          >
            {/* Node */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.2rem" }}>
              <div
                className="rm-node"
                style={{
                  width:          28,
                  height:         28,
                  borderRadius:   "50%",
                  border:         "1.5px solid rgba(26,26,27,0.15)",
                  background:     "var(--bg)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  zIndex:         2,
                  position:       "relative",
                  flexShrink:     0,
                  transition:     "border-color 0.3s ease, background 0.3s ease, transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease",
                }}
              >
                <span style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.04em", color: "var(--fg-muted)", fontFamily: "monospace", transition: "color 0.3s ease" }}>
                  {step.num}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="rm-content">

              {/* Tag */}
              <span style={{
                fontSize:      "0.62rem",
                fontWeight:    700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color:         step.highlight ? "var(--accent)" : "var(--fg-muted)",
                fontFamily:    "monospace",
                display:       "block",
                marginBottom:  "0.5rem",
              }}>
                {step.tag}
              </span>

              {/* Title */}
              <h3
                className="rm-title"
                style={{
                  fontWeight:    step.highlight ? 500 : 300,
                  fontSize:      "clamp(1.2rem, 2vw, 1.7rem)",
                  letterSpacing: "-0.03em",
                  color:         "var(--fg)",
                  marginBottom:  "0.6rem",
                  transition:    "color 0.3s ease",
                }}
              >
                {step.title}
              </h3>

              {/* Primary desc */}
              <p style={{
                fontSize:    step.highlight ? "1rem" : "0.9rem",
                color:       step.highlight ? "var(--fg)" : "var(--fg-muted)",
                lineHeight:  1.7,
                fontWeight:  step.highlight ? 500 : 400,
                fontStyle:   step.highlight ? "italic" : "normal",
                marginBottom:"0.4rem",
                maxWidth:    "55ch",
              }}>
                {step.desc}
              </p>

              {/* Secondary detail */}
              <p style={{ fontSize: "0.8rem", color: "rgba(107,114,128,0.65)", lineHeight: 1.6, maxWidth: "52ch" }}>
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Scoped styles ───────────────────────────────────────── */}
      
    </section>
  );
}
