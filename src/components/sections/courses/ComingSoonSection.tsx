"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Track } from "@/lib/courseData";

interface ComingSoonProps {
  track: Track;
}

export default function ComingSoonSection({ track }: ComingSoonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { opacity: 0, y: 40, scale: 0.97 });

    const t = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to(ref.current!, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        }),
    });
    return () => t.kill();
  }, []);

  return (
    <div ref={ref} className="cs-wrap">
      <div
        className="cs-card"
        style={{
          borderColor: track.accentBorder,
        }}
      >
        {/* Animated gradient border overlay */}
        <div
          className="cs-gradient-border"
          style={{
            background: `linear-gradient(135deg, ${track.accent}22, ${track.accentGlow}, ${track.accent}22)`,
          }}
        />

        {/* Content */}
        <div className="cs-content">
          {/* Decorative orbs */}
          <div
            className="cs-orb cs-orb--1"
            style={{
              background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 60%)`,
            }}
          />
          <div
            className="cs-orb cs-orb--2"
            style={{
              background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 60%)`,
            }}
          />

          {/* Badge */}
          <div className="cs-badge-wrap">
            <span
              className="cs-badge"
              style={{
                color: track.accent,
                background: track.accentBg,
                border: `1px solid ${track.accentBorder}`,
              }}
            >
              <span className="cs-badge-dot" style={{ background: track.accent }} />
              Coming Soon
            </span>
          </div>

          {/* Icon */}
          <span className="cs-icon">{track.emoji}</span>

          {/* Title */}
          <h2 className="cs-title">{track.label}</h2>

          {/* Description */}
          <p className="cs-desc">{track.description}</p>

          {/* Upcoming courses */}
          <div className="cs-courses">
            <span className="cs-courses-label">Upcoming courses:</span>
            <div className="cs-courses-list">
              {track.courses.map((c) => (
                <span
                  key={c.slug}
                  className="cs-course-pill"
                  style={{
                    background: track.accentBg,
                    color: track.accent,
                    border: `1px solid ${track.accentBorder}`,
                  }}
                >
                  {c.icon} {c.title}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="cs-cta"
            style={{ background: track.accent }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Notify Me When Available
          </a>
        </div>
      </div>
    </div>
  );
}
