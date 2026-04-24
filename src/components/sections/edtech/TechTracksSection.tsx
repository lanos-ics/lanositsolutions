"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Track } from "@/lib/course/types";

interface Props {
  tracks: Track[];
}

export default function TechTracksSection({ tracks }: Props) {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    gsap.set(headRef.current, { opacity: 0, y: 32 });
    const t = ScrollTrigger.create({
      trigger: headRef.current,
      start: "top 82%",
      onEnter: () =>
        gsap.to(headRef.current!, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  useEffect(() => {
    if (!bodyRef.current) return;
    const groups = bodyRef.current.querySelectorAll<HTMLElement>(".tts-group");
    groups.forEach((group) => {
      const header = group.querySelector<HTMLElement>(".tts-group-header");
      const cards  = group.querySelectorAll<HTMLElement>(".tts-card");
      if (header) gsap.set(header, { opacity: 0, x: -20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      const t = ScrollTrigger.create({
        trigger: group,
        start: "top 85%",
        onEnter: () => {
          if (header) gsap.to(header, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, delay: 0.1 });
        },
      });
      return () => t.kill();
    });
  }, []);

  const visibleTracks = tracks.filter((t) => t.courses.length > 0);

  return (
    <section
      id="tech-tracks"
      style={{
        position: "relative",
        padding: "7rem clamp(1.75rem, 8vw, 9rem) 8rem",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(1.75rem,8vw,9rem)",
          right: "clamp(1.75rem,8vw,9rem)",
          height: "1px",
          background: "rgba(26,26,27,0.07)",
        }}
      />

      {/* ── Section header ──────────────────────────────────────── */}
      <div ref={headRef} style={{ maxWidth: "72ch", marginBottom: "5.5rem" }}>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            display: "block",
            marginBottom: "1.25rem",
          }}
        >
          Tech Tracks & Courses
        </span>
        <p
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
            fontWeight: 200,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            margin: 0,
          }}
        >
          Structured pathways built for{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-muted)" }}>
            depth, not breadth
          </em>
          {" "}— every track maps to a real-world career outcome.
        </p>
      </div>

      {/* ── Tracks + courses ────────────────────────────────────── */}
      <div ref={bodyRef} style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
        {visibleTracks.map((track) => (
          <div key={track.slug} className="tts-group">

            {/* Track header */}
            <div
              className="tts-group-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.75rem",
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{track.emoji}</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: track.accent,
                  padding: "0.3rem 0.85rem",
                  borderRadius: "100px",
                  background: track.accentBg,
                  border: `1px solid ${track.accentBorder}`,
                }}
              >
                {track.label}
              </span>
              {track.comingSoon && (
                <span className="tts-badge tts-badge--soon">Coming Soon</span>
              )}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(to right, ${track.accentBorder}, transparent)`,
                  marginLeft: "0.5rem",
                }}
              />
            </div>

            {/* Course cards */}
            <div className="tts-row">
              {track.courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/edtech/courses/${track.slug}/${course.slug}`}
                  className="tts-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* Top accent bar */}
                  <div className="tts-topbar" style={{ background: track.accent }} />

                  {/* Glow */}
                  <div
                    className="tts-glow"
                    style={{
                      background: `radial-gradient(ellipse at 10% 0%, ${track.accentGlow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Card body */}
                  <div className="tts-card-body">
                    {/* Icon + badges row */}
                    <div className="tts-meta-row">
                      <span className="tts-icon">{course.icon}</span>
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        {course.badge === "new" && (
                          <span className="tts-badge tts-badge--new">New</span>
                        )}
                        {course.badge === "popular" && (
                          <span className="tts-badge tts-badge--popular">Popular</span>
                        )}
                        {course.badge === "bestseller" && (
                          <span className="tts-badge tts-badge--best">Bestseller</span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <p className="tts-label">{course.title}</p>

                    {/* Description */}
                    <p className="tts-sub">
                      {course.briefDescription ?? course.description}
                    </p>

                    {/* Price + arrow row */}
                    <div className="tts-footer">
                      <div className="tts-price-group">
                        <span className="tts-price" style={{ color: track.accent }}>
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="tts-original-price">
                            ₹{course.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <div className="tts-arrow" style={{ color: track.accent }}>↗</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Scoped styles ────────────────────────────────────────── */}
      <style>{`
        .tts-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }

        .tts-card {
          position: relative;
          border-radius: 14px;
          border: 1px solid rgba(26,26,27,0.09);
          background: rgba(248,249,250,0.72);
          backdrop-filter: blur(8px);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .tts-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
          border-color: rgba(26,26,27,0.16);
        }
        .tts-card:hover .tts-arrow { opacity: 1; transform: translate(0,0); }

        .tts-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 14px 14px 0 0;
        }

        .tts-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .tts-card-body {
          position: relative;
          padding: 1.6rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          min-height: 200px;
        }

        .tts-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tts-icon {
          font-size: 1.3rem;
          line-height: 1;
        }

        .tts-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.22rem 0.6rem;
          border-radius: 100px;
        }
        .tts-badge--new {
          background: rgba(29,171,110,0.13);
          color: #1DAB6E;
          border: 1px solid rgba(29,171,110,0.25);
        }
        .tts-badge--popular {
          background: rgba(42,125,225,0.13);
          color: #2A7DE1;
          border: 1px solid rgba(42,125,225,0.25);
        }
        .tts-badge--best {
          background: rgba(232,140,42,0.13);
          color: #E88C2A;
          border: 1px solid rgba(232,140,42,0.25);
        }
        .tts-badge--soon {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.22rem 0.6rem;
          border-radius: 100px;
          background: rgba(232,140,42,0.13);
          color: #E88C2A;
          border: 1px solid rgba(232,140,42,0.25);
        }

        .tts-label {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--fg);
          margin: 0;
          line-height: 1.3;
        }

        .tts-sub {
          font-size: 0.825rem;
          color: var(--fg-muted);
          margin: 0;
          line-height: 1.55;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tts-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.25rem;
        }

        .tts-price-group {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .tts-price {
          font-size: 1rem;
          font-weight: 700;
          font-family: "JetBrains Mono", monospace;
          letter-spacing: -0.02em;
        }

        .tts-original-price {
          font-size: 0.75rem;
          color: var(--fg-muted);
          text-decoration: line-through;
          opacity: 0.6;
        }

        .tts-arrow {
          font-size: 1.05rem;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.25s, transform 0.25s;
        }

        @media (max-width: 600px) {
          .tts-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
