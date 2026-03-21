"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Outcome cards data ─────────────────────────────────────────── */
const OUTCOMES = [
  {
    id: "inhouse",
    step: "7A",
    title: "In-House Placement",
    archetype: "Corporate Engineer",
    accent: "blue",
    tagline: "Multiple in-house opportunities",
    desc: "High-performers join live Lanos ventures as salaried team members — shipping real products from day one.",
    details: [
      "Roles across Full Stack, DevOps & AI divisions",
      "Mentored by senior engineers",
      "Salary commensurate with industry standards",
      "Fast path to team lead responsibilities",
    ],
    stat: null,
    elite: false,
  },
  {
    id: "mnc",
    step: "7B",
    title: "MNC & Corporate",
    archetype: "Corporate Engineer",
    accent: "cyan",
    tagline: "Industry placement support",
    desc: "Structured referral pipeline to top-tier enterprises and MNCs. We stay in the loop until you land.",
    details: [
      "Active referral network across 40+ companies",
      "Interview preparation & mock sessions",
      "Resume & portfolio positioning",
      "Ongoing support post-placement",
    ],
    stat: null,
    elite: false,
  },
  {
    id: "startup",
    step: "7C",
    title: "Startup & Research",
    archetype: "Startup Founder · Product Architect",
    accent: "purple",
    tagline: "Support until ₹1Cr+ turnover",
    desc: "The elite track — for those who want to build, not just work. Lanos stays with you through your first ₹1 crore.",
    details: [
      "Incubation support & co-founding guidance",
      "Access to Lanos R&D infrastructure",
      "Legal, financial & technical mentorship",
      "Network introductions to early-stage investors",
    ],
    stat: "₹1Cr+",
    statLabel: "Turnover milestone supported",
    elite: true,
  },
];

const COLORS = {
  blue:   { col: "var(--accent)",  glow: "rgba(229,64,79,0.16)",   border: "rgba(229,64,79,0.2)",   bg: "rgba(229,64,79,0.04)"   },
  cyan:   { col: "#124898",         glow: "rgba(18,72,152,0.14)",   border: "rgba(18,72,152,0.2)",   bg: "rgba(18,72,152,0.04)"   },
  purple: { col: "#CD5473",          glow: "rgba(205,84,115,0.18)",  border: "rgba(205,84,115,0.3)",  bg: "rgba(205,84,115,0.055)" },
};

export default function CareerOutcomesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.set(headingRef.current, { opacity: 0, y: 32 });
    const t = ScrollTrigger.create({
      trigger: headingRef.current, start: "top 80%",
      onEnter: () => gsap.to(headingRef.current!, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>(".co-card");
    gsap.set(cards, { opacity: 0, y: 48 });
    const t = ScrollTrigger.create({
      trigger: cardsRef.current, start: "top 82%",
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14 }),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="co-section" style={{ position: "relative", padding: "7rem clamp(1.75rem, 8vw, 9rem) 9rem", overflow: "hidden" }}>

      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: "clamp(1.75rem,8vw,9rem)", right: "clamp(1.75rem,8vw,9rem)", height: "1px", background: "rgba(26,26,27,0.07)" }} />

      {/* Large step label */}
      <div style={{ position: "absolute", top: "4rem", right: "clamp(1.75rem,8vw,9rem)", fontSize: "clamp(4rem,10vw,11rem)", fontWeight: 800, letterSpacing: "-0.06em", color: "rgba(26,26,27,0.028)", userSelect: "none", pointerEvents: "none", lineHeight: 1 }} aria-hidden>
        07
      </div>

      {/* ── Heading ───────────────────────────────────────────── */}
      <div ref={headingRef} style={{ marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "1.1rem" }}>
          Step 7 · Career Outcomes
        </span>
        <h2 style={{ fontWeight: 200, fontSize: "clamp(1.8rem, 3.5vw, 3.4rem)", letterSpacing: "-0.035em", lineHeight: 1.18, color: "var(--fg)", maxWidth: "28ch" }}>
          Step 7 is not a destination.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-muted)" }}>It is a launch.</em>
        </h2>
      </div>

      <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "54ch", marginBottom: "4rem" }}>
        We prepare{" "}
        <span style={{ color: "var(--fg)", fontWeight: 500 }}>Corporate Engineers</span>,{" "}
        <span style={{ color: "var(--fg)", fontWeight: 500 }}>Startup Founders</span>, and{" "}
        <span style={{ color: "var(--fg)", fontWeight: 500 }}>Product Architects</span>.
        Your outcome depends on the path you choose at Step 7.
      </p>

      {/* ── Cards ─────────────────────────────────────────────── */}
      <div ref={cardsRef} className="co-grid">
        {OUTCOMES.map((outcome) => {
          const c = COLORS[outcome.accent as keyof typeof COLORS];
          return (
            <div
              key={outcome.id}
              className={`co-card${outcome.elite ? " co-card--elite" : ""}`}
              data-accent={outcome.accent}
              style={{ "--glow": c.glow, "--border": c.border, "--col": c.col, "--bg": c.bg } as React.CSSProperties}
            >
              <div className="co-inner">
                {/* Step tag */}
                <div className="co-step-tag" style={{ color: c.col, borderColor: c.border, background: c.bg }}>
                  {outcome.step}
                </div>

                {/* Elite badge */}
                {outcome.elite && (
                  <div className="co-elite-badge">
                    ⭐ Elite Track
                  </div>
                )}

                {/* Tagline */}
                <p className="co-tagline" style={{ color: c.col }}>{outcome.tagline}</p>

                {/* Title */}
                <h3 className="co-title">{outcome.title}</h3>

                {/* Desc */}
                <p className="co-desc">{outcome.desc}</p>

                {/* Stat (elite only) */}
                {outcome.stat && (
                  <div className="co-stat">
                    <span className="co-stat-num" style={{ color: c.col }}>{outcome.stat}</span>
                    <span className="co-stat-label">{outcome.statLabel}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="co-divider" style={{ background: c.border }} />

                {/* Detail list — reveals on hover */}
                <ul className="co-details">
                  {outcome.details.map((d, i) => (
                    <li key={i} className="co-detail-item">
                      <span className="co-dot" style={{ background: c.col }} />
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Archetype footer */}
                <div className="co-archetype" style={{ color: c.col }}>
                  {outcome.archetype}
                </div>

                {/* Glow */}
                <div className="co-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.glow} 0%, transparent 65%)` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Styles ─────────────────────────────────────────────── */}
      
    </section>
  );
}
