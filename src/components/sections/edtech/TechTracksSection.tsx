"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Track data ─────────────────────────────────────────────────── */
const TRACKS = [
  {
    id: "fullstack",
    num: "01",
    label: "Full Stack",
    sub: "End-to-end product engineering",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <rect x="6" y="6"  width="28" height="8"  rx="2.5" />
        <rect x="6" y="18" width="28" height="8"  rx="2.5" />
        <rect x="6" y="30" width="28" height="4"  rx="2.5" />
      </svg>
    ),
  },
  {
    id: "devops",
    num: "02",
    label: "DevOps",
    sub: "CI/CD, cloud infra & pipelines",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M20 8C10 8 6 14 8 20" strokeLinecap="round" />
        <path d="M20 32C30 32 34 26 32 20" strokeLinecap="round" />
        <polyline points="5,16 8,20 12,17" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="35,24 32,20 28,23" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="4" />
      </svg>
    ),
  },
  {
    id: "aiml",
    num: "03",
    label: "AI / ML",
    sub: "Models, inference & intelligent systems",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <circle cx="20" cy="20" r="3.5" />
        <circle cx="8"  cy="12" r="2.5" /><circle cx="32" cy="12" r="2.5" />
        <circle cx="8"  cy="28" r="2.5" /><circle cx="32" cy="28" r="2.5" />
        <circle cx="20" cy="6"  r="2.5" /><circle cx="20" cy="34" r="2.5" />
        <line x1="20" y1="16.5" x2="20" y2="8.5" />
        <line x1="20" y1="23.5" x2="20" y2="31.5" />
        <line x1="17.2" y1="18.3" x2="10" y2="13.4" />
        <line x1="22.8" y1="18.3" x2="30" y2="13.4" />
        <line x1="17.2" y1="21.7" x2="10" y2="26.6" />
        <line x1="22.8" y1="21.7" x2="30" y2="26.6" />
      </svg>
    ),
  },
  {
    id: "cyber",
    num: "04",
    label: "Cyber Security",
    sub: "Threat modelling, pentesting & compliance",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M20 5L34 11V21C34 29 27 35 20 37C13 35 6 29 6 21V11Z" strokeLinejoin="round" />
        <polyline points="14,20 18,24 26,16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "iot",
    num: "05",
    label: "IoT",
    sub: "Embedded systems & connected devices",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <rect x="12" y="12" width="16" height="16" rx="3" />
        <line x1="16" y1="8"  x2="16" y2="12" strokeLinecap="round" />
        <line x1="20" y1="8"  x2="20" y2="12" strokeLinecap="round" />
        <line x1="24" y1="8"  x2="24" y2="12" strokeLinecap="round" />
        <line x1="16" y1="28" x2="16" y2="32" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="32" strokeLinecap="round" />
        <line x1="24" y1="28" x2="24" y2="32" strokeLinecap="round" />
        <line x1="8"  y1="16" x2="12" y2="16" strokeLinecap="round" />
        <line x1="8"  y1="20" x2="12" y2="20" strokeLinecap="round" />
        <line x1="8"  y1="24" x2="12" y2="24" strokeLinecap="round" />
        <line x1="28" y1="16" x2="32" y2="16" strokeLinecap="round" />
        <line x1="28" y1="20" x2="32" y2="20" strokeLinecap="round" />
        <line x1="28" y1="24" x2="32" y2="24" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" />
      </svg>
    ),
  },
  {
    id: "prodsupport",
    num: "06",
    label: "Production Support",
    sub: "SRE, incident response & observability",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <rect x="6"  y="7"  width="28" height="7"  rx="2" />
        <rect x="6"  y="17" width="28" height="7"  rx="2" />
        <rect x="6"  y="27" width="28" height="7"  rx="2" />
        <circle cx="11" cy="10.5" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="11" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="11" cy="30.5" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "arvr",
    num: "07",
    label: "AR / VR",
    sub: "Spatial computing & immersive experiences",
    accent: "blue",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M4 16C4 14 6 13 8 13H32C34 13 36 14 36 16V24C36 26 34 27 32 27H8C6 27 4 26 4 24Z" />
        <circle cx="14" cy="20" r="3.5" /><circle cx="26" cy="20" r="3.5" />
        <line x1="17.5" y1="20" x2="22.5" y2="20" />
      </svg>
    ),
  },
  {
    id: "bci",
    num: "08",
    label: "BCI / EEG Research",
    sub: "Brain-Computer Interface & Neurotechnology",
    accent: "purple",
    research: true,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.4" stroke="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M20 10C14 10 8 14 8 20C8 25 11 28 14 29L14 33H26L26 29C29 28 32 25 32 20C32 14 26 10 20 10Z" strokeLinejoin="round" />
        <polyline points="8,21 11,21 13,17 15,25 17,19 19,23 21,21 23,21 25,18 27,24 29,21 32,21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const C = {
  blue:   { icon: "var(--accent)", iconBg: "rgba(229,64,79,0.09)",  border: "rgba(229,64,79,0.15)",  glow: "rgba(229,64,79,0.13)",  tag: "rgba(229,64,79,0.10)" },
  purple: { icon: "#CD5473",        iconBg: "rgba(205,84,115,0.09)", border: "rgba(205,84,115,0.22)", glow: "rgba(205,84,115,0.13)", tag: "rgba(205,84,115,0.10)" },
};

export default function TechTracksSection() {
  const promiseRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!promiseRef.current) return;
    gsap.set(promiseRef.current, { opacity: 0, y: 36 });
    const t = ScrollTrigger.create({
      trigger: promiseRef.current,
      start:   "top 78%",
      onEnter: () => gsap.to(promiseRef.current!, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".tt-card");
    gsap.set(cards, { opacity: 0, y: 44 });
    const t = ScrollTrigger.create({
      trigger: gridRef.current,
      start:   "top 84%",
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.08 }),
    });
    return () => t.kill();
  }, []);

  return (
    <section style={{ position: "relative", padding: "7rem clamp(1.75rem, 8vw, 9rem)", overflow: "hidden" }}>

      {/* Top rule */}
      <div style={{ position: "absolute", top: 0, left: "clamp(1.75rem,8vw,9rem)", right: "clamp(1.75rem,8vw,9rem)", height: "1px", background: "rgba(26,26,27,0.07)" }} />

      {/* ── Core Promise ─────────────────────────────────────── */}
      <div ref={promiseRef} style={{ maxWidth: "72ch", marginBottom: "5.5rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "1.25rem" }}>
          Core Promise
        </span>
        <p style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)", fontWeight: 200, lineHeight: 1.25, letterSpacing: "-0.03em", color: "var(--fg)", margin: 0 }}>
          At Lanos, you don&apos;t just learn technologies.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-muted)" }}>You enter a guided system</em>
          {" "}— built to take you from concept to career-ready, one deliberate step at a time.
        </p>
      </div>

      {/* Grid label */}
      <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: "2rem" }}>
        Tech Tracks
      </span>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <div ref={gridRef} className="tt-grid">
        {TRACKS.map((track) => {
          const col = C[track.accent as keyof typeof C];
          return (
            <div key={track.id} className="tt-card" data-accent={track.accent}>

              {/* Gradient border overlay (top accent bar via pseudo in <style>) */}
              <div className="tt-card-inner" style={{ background: track.research ? "rgba(205,84,115,0.025)" : "rgba(248,249,250,0.7)" }}>

                {/* Card number watermark */}
                <span className="tt-num" style={{ color: col.icon }}>{track.num}</span>

                {/* Research badge */}
                {track.research && (
                  <span className="tt-badge" style={{ background: col.tag, color: col.icon, border: `1px solid ${col.border}` }}>
                    Research
                  </span>
                )}

                {/* Icon badge */}
                <div className="tt-icon-wrap" style={{ background: col.iconBg, color: col.icon }}>
                  {track.icon}
                </div>

                {/* Text */}
                <div className="tt-text">
                  <p className="tt-label">{track.label}</p>
                  <p className="tt-sub">{track.sub}</p>
                </div>

                {/* Arrow */}
                <div className="tt-arrow" style={{ color: col.icon }}>↗</div>

                {/* Glow layer */}
                <div className="tt-glow" style={{ background: `radial-gradient(ellipse at 20% 20%, ${col.glow} 0%, transparent 65%)` }} />
                {/* Top gradient line */}
                <div className="tt-topline" style={{ background: track.research ? "linear-gradient(to right, #CD5473, #E88DA0)" : "linear-gradient(to right, var(--accent), #124898)" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Styles ───────────────────────────────────────────── */}
      
    </section>
  );
}
