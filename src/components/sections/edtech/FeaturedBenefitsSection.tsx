"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Benefit data ─────────────────────────────────────────────── */
const BENEFITS = [
  {
    id: "gamification",
    tag: "01",
    headline: "Level up your logic.",
    body: "Real XP, skill trees, and ranked challenges — gamified progression that wires your technical intuition through play.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.3" stroke="currentColor" style={{ width: 32, height: 32 }}>
        <path d="M12 36L24 12L36 36" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="15.5" y1="28" x2="32.5" y2="28" strokeLinecap="round" />
        <circle cx="24" cy="12" r="3" fill="currentColor" stroke="none" />
        <circle cx="12" cy="36" r="2.5" />
        <circle cx="36" cy="36" r="2.5" />
      </svg>
    ),
    gridArea: "gamification",
    size: "medium",
  },
  {
    id: "product",
    tag: "02",
    headline: "Learn while building.",
    body: "Every concept ships as a product. Project-based sprints with real product cycles, user research, and launch pressure.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.3" stroke="currentColor" style={{ width: 32, height: 32 }}>
        <rect x="8" y="14" width="32" height="22" rx="3" />
        <line x1="16" y1="14" x2="16" y2="36" />
        <line x1="8" y1="22" x2="40" y2="22" />
        <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
    gridArea: "product",
    size: "medium",
  },
  {
    id: "intensity",
    tag: "03",
    headline: "The 8-Hour Pulse.",
    body: "Simulate an active internship every single day. 8 structured hours. Zero passive learning.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.3" stroke="currentColor" style={{ width: 32, height: 32 }}>
        <circle cx="24" cy="24" r="16" />
        <line x1="24" y1="24" x2="24" y2="13" strokeLinecap="round" strokeWidth="1.8" />
        <line x1="24" y1="24" x2="32" y2="28" strokeLinecap="round" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    gridArea: "intensity",
    size: "tall",
  },
  {
    id: "portfolio",
    tag: "04",
    headline: "Proof of Work.",
    body: "Certifications wired directly into your portfolio. Real projects, real commits, real evidence.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.3" stroke="currentColor" style={{ width: 32, height: 32 }}>
        <rect x="10" y="8" width="28" height="34" rx="3" />
        <line x1="17" y1="18" x2="31" y2="18" strokeLinecap="round" />
        <line x1="17" y1="24" x2="31" y2="24" strokeLinecap="round" />
        <line x1="17" y1="30" x2="25" y2="30" strokeLinecap="round" />
        <polyline points="28,27 31,30 28,33" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gridArea: "portfolio",
    size: "small",
  },
  {
    id: "talent",
    tag: "05",
    headline: "We find your edge.",
    body: "Psychometric talent mapping + mentor-led career nudges. Your strengths become strategy.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.3" stroke="currentColor" style={{ width: 32, height: 32 }}>
        <circle cx="24" cy="18" r="8" />
        <path d="M12 38C12 32 17.4 28 24 28C30.6 28 36 32 36 38" strokeLinecap="round" />
        <line x1="30" y1="12" x2="38" y2="8" strokeLinecap="round" />
        <circle cx="38" cy="8" r="2.5" />
        <line x1="33" y1="16" x2="40" y2="16" strokeLinecap="round" />
      </svg>
    ),
    gridArea: "talent",
    size: "small",
  },
  {
    id: "infinite",
    tag: "06",
    headline: "Career = Infinite",
    body: "Active placement support across 4 distinct career paths. Not a placement cell — a perpetual launch pad.",
    icon: null, // Uses animated infinity SVG instead
    gridArea: "infinite",
    size: "large",
  },
];

/* ─── Magnetic hover helper ────────────────────────────────────── */
function useMagneticHover(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>(".fb-inner");
    if (!inner) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(inner, { x: dx * 6, y: dy * 6, duration: 0.35, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(inner, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);
}

/* ─── Individual Bento Card ────────────────────────────────────── */
function BentoCard({ benefit }: { benefit: (typeof BENEFITS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const infRef  = useRef<SVGPathElement | null>(null);

  // Magnetic effect
  useMagneticHover(cardRef as React.RefObject<HTMLDivElement>);

  // Animated infinity
  useEffect(() => {
    if (benefit.id !== "infinite" || !infRef.current) return;
    const len = infRef.current.getTotalLength?.() ?? 360;
    gsap.set(infRef.current, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.to(infRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    tl.to(infRef.current, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" });
    tl.to(infRef.current, { strokeDashoffset: -len, duration: 1.8, ease: "power2.inOut", delay: 0.6 });
    tl.to(infRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.3");
    return () => { tl.kill(); };
  }, [benefit.id]);

  const isInfinite = benefit.id === "infinite";

  return (
    <div
      ref={cardRef}
      className={`fb-card fb-card--${benefit.size}`}
      style={{ gridArea: benefit.gridArea }}
    >
      <div className="fb-inner">
        {/* Tag */}
        <span className="fb-tag">{benefit.tag}</span>

        {/* Icon or infinity visual */}
        <div className="fb-icon-area">
          {isInfinite ? (
            <svg viewBox="0 0 120 60" fill="none" style={{ width: "100%", maxWidth: 110, height: "auto" }}>
              {/* Static ghost */}
              <path
                d="M40 30 C40 18 20 10 10 20 C0 30 0 40 10 45 C20 50 40 42 60 30 C80 18 100 10 110 20 C120 30 120 40 110 45 C100 50 80 42 60 30 C40 18 20 10 10 20"
                stroke="rgba(229,64,79,0.12)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Animated trace */}
              <path
                ref={infRef}
                d="M40 30 C40 18 20 10 10 20 C0 30 0 40 10 45 C20 50 40 42 60 30 C80 18 100 10 110 20 C120 30 120 40 110 45 C100 50 80 42 60 30 C40 18 20 10 10 20"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : (
            <div className="fb-icon-wrap">{benefit.icon}</div>
          )}
        </div>

        {/* Text */}
        <div className="fb-text">
          <h3 className="fb-headline">
            {isInfinite ? (
              <>Career = Infinite <span className="fb-inf-emoji">♾️</span></>
            ) : (
              benefit.headline
            )}
          </h3>
          <p className="fb-body">{benefit.body}</p>
        </div>

        {/* Glowing orb */}
        <div className="fb-orb" />

        {/* Arrow */}
        <span className="fb-arrow">↗</span>
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */
export default function FeaturedBenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  /* Header fade-up */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.set(headerRef.current, { opacity: 0, y: 32 });
    const t = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 82%",
      onEnter: () => gsap.to(headerRef.current!, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  /* Grid cards float-in with stagger */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".fb-card");
    gsap.set(cards, { opacity: 0, y: 52, scale: 0.97 });
    const t = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: 0.1, from: "start" },
        }),
    });
    return () => t.kill();
  }, []);

  return (
    <section ref={sectionRef} className="fb-section">

      {/* Top rule */}
      <div className="fb-rule" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div ref={headerRef} className="fb-header">
        <span className="fb-eyebrow">Featured Benefits</span>
        <p className="fb-heading">
          The ecosystem,{" "}
          <em>not just<br />the school.</em>
        </p>
      </div>

      {/* ── Bento Grid ─────────────────────────────────────────── */}
      <div ref={gridRef} className="fb-grid">
        {BENEFITS.map((b) => (
          <BentoCard key={b.id} benefit={b} />
        ))}
      </div>

      {/* ── Scoped styles ──────────────────────────────────────── */}
      
    </section>
  );
}
