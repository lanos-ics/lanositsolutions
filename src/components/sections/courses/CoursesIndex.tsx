"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Track } from "@/lib/courseData";

interface CoursesIndexProps {
  tracks: Track[];
}

export default function CoursesIndex({ tracks }: CoursesIndexProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!headRef.current) return;
    const els = headRef.current.querySelectorAll<HTMLElement>(".ci-animate");
    gsap.set(els, { opacity: 0, y: 30 });

    const t = ScrollTrigger.create({
      trigger: headRef.current,
      start: "top 90%",
      onEnter: () =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        }),
    });
    return () => t.kill();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".ci-card");
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 });

    const t = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.06,
        }),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="ci-section">
      {/* Ambient orb */}
      <div
        className="ci-orb"
        style={{
          background:
            "radial-gradient(circle, rgba(229,64,79,0.11) 0%, transparent 65%)",
        }}
      />

      {/* ── Hero ── */}
      <div ref={headRef} className="ci-hero">
        {/* Breadcrumb */}
        <nav className="ci-animate ci-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="ci-breadcrumb-link">
            Home
          </Link>
          <span className="ci-breadcrumb-sep">→</span>
          <Link href="/edtech" className="ci-breadcrumb-link">
            EdTech
          </Link>
          <span className="ci-breadcrumb-sep">→</span>
          <span className="ci-breadcrumb-current">Courses</span>
        </nav>

        <span className="ci-animate ci-eyebrow">All Courses</span>

        <h1 className="ci-animate ci-title">
          Explore our{" "}
          <em>tech tracks</em>
        </h1>

        <p className="ci-animate ci-description">
          {tracks.length} structured learning paths covering programming,
          web development, data science, tools, and more. Each track is designed
          to map to a real-world career outcome.
        </p>
      </div>

      {/* ── Grid ── */}
      <div ref={gridRef} className="ci-grid">
        {tracks.map((track) => {
          const courseCount = track.courses.length;

          return (
            <Link
              key={track.slug}
              href={`/edtech/courses/${track.slug}`}
              className="ci-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Top accent */}
              <div
                className="ci-card-topbar"
                style={{ background: track.accent }}
              />

              {/* Glow */}
              <div
                className="ci-card-glow"
                style={{
                  background: `radial-gradient(ellipse at 10% 0%, ${track.accentGlow} 0%, transparent 70%)`,
                }}
              />

              <div className="ci-card-body">
                {/* Emoji + badge row */}
                <div className="ci-card-top">
                  <span className="ci-card-emoji">{track.emoji}</span>
                  <div className="ci-card-badges">
                    {track.comingSoon && (
                      <span className="ci-badge ci-badge--soon">
                        Coming Soon
                      </span>
                    )}
                    <span
                      className="ci-badge"
                      style={{
                        background: track.accentBg,
                        color: track.accent,
                        border: `1px solid ${track.accentBorder}`,
                      }}
                    >
                      {courseCount} {courseCount === 1 ? "Course" : "Courses"}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="ci-card-title">{track.label}</h2>

                {/* Description */}
                <p className="ci-card-desc">{track.description}</p>

                {/* Footer */}
                <div className="ci-card-footer">
                  <span
                    className="ci-card-cta"
                    style={{ color: track.accent }}
                  >
                    {track.comingSoon ? "View Details" : "Browse Courses"}
                    <span className="ci-card-arrow">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .ci-section {
          position: relative;
          padding: 3rem clamp(1.75rem, 8vw, 9rem) 6rem;
          overflow: hidden;
          min-height: 80vh;
        }

        .ci-orb {
          position: absolute;
          top: -200px;
          right: -150px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.5;
          filter: blur(60px);
          z-index: 0;
        }

        /* ── Hero ── */
        .ci-hero {
          position: relative;
          z-index: 1;
          max-width: 72ch;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3.5rem;
        }

        /* ── Breadcrumb ── */
        .ci-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--fg-muted);
          margin-bottom: 0.5rem;
        }
        .ci-breadcrumb-link {
          color: var(--fg-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ci-breadcrumb-link:hover {
          color: var(--fg);
        }
        .ci-breadcrumb-sep {
          opacity: 0.35;
          font-size: 0.7rem;
        }
        .ci-breadcrumb-current {
          color: var(--fg);
          font-weight: 500;
        }

        .ci-eyebrow {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .ci-title {
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 200;
          line-height: 1.15;
          letter-spacing: -0.04em;
          color: var(--fg);
          margin: 0;
        }
        .ci-title em {
          font-style: italic;
          font-weight: 300;
          color: var(--fg-muted);
        }

        .ci-description {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.7;
          color: var(--fg-muted);
          margin: 0;
          max-width: 60ch;
        }

        /* ── Grid ── */
        .ci-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        /* ── Card ── */
        .ci-card {
          position: relative;
          border-radius: 18px;
          border: 1px solid rgba(26,26,27,0.08);
          background: rgba(248,249,250,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 0.32s cubic-bezier(0.34,1.2,0.64,1),
            box-shadow 0.32s ease,
            border-color 0.28s ease;
        }
        .ci-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px -10px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.05);
          border-color: rgba(26,26,27,0.16);
        }

        .ci-card-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 18px 18px 0 0;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .ci-card:hover .ci-card-topbar { opacity: 1; }

        .ci-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .ci-card:hover .ci-card-glow { opacity: 1; }

        .ci-card-body {
          position: relative;
          padding: 1.75rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          min-height: 220px;
        }

        .ci-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .ci-card-emoji {
          font-size: 1.75rem;
          line-height: 1;
          filter: grayscale(0.15);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
        }
        .ci-card:hover .ci-card-emoji {
          transform: scale(1.12) translateY(-2px);
          filter: grayscale(0);
        }

        .ci-card-badges {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .ci-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.2rem 0.58rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .ci-badge--soon {
          background: rgba(155,92,246,0.10);
          color: #9B5CF6;
          border: 1px solid rgba(155,92,246,0.22);
          animation: ci-pulse 2.5s ease-in-out infinite;
        }
        @keyframes ci-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .ci-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--fg);
          margin: 0;
          line-height: 1.3;
        }

        .ci-card-desc {
          font-size: 0.82rem;
          color: var(--fg-muted);
          line-height: 1.6;
          margin: 0;
          flex: 1;
          max-width: none;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ci-card-footer {
          margin-top: 0.25rem;
        }

        .ci-card-cta {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.2s ease;
        }
        .ci-card:hover .ci-card-cta { gap: 0.5rem; }

        .ci-card-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
          font-size: 0.85rem;
        }
        .ci-card:hover .ci-card-arrow {
          transform: translate(2px, -2px);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ci-section { padding: 2rem 1.25rem 4rem; }
          .ci-grid { grid-template-columns: 1fr; }
          .ci-card-body { min-height: 0; }
        }
      `}</style>
    </section>
  );
}
