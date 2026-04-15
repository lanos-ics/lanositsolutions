"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Track } from "@/lib/courseData";
import CourseGrid from "./CourseGrid";
import ComingSoonSection from "./ComingSoonSection";

interface TrackPageProps {
  track: Track;
}

export default function TrackPage({ track }: TrackPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return track.courses;
    const q = query.toLowerCase();
    return track.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query, track.courses]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll<HTMLElement>(".tp-animate");
    gsap.set(els, { opacity: 0, y: 30 });

    const t = ScrollTrigger.create({
      trigger: heroRef.current,
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
    if (!searchRef.current) return;
    gsap.set(searchRef.current, { opacity: 0, y: 20 });
    const t = ScrollTrigger.create({
      trigger: searchRef.current,
      start: "top 92%",
      onEnter: () =>
        gsap.to(searchRef.current!, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="tp-section">
      {/* ── Ambient orb ── */}
      <div
        className="tp-orb"
        style={{
          background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 65%)`,
        }}
      />

      {/* ── Hero ── */}
      <div ref={heroRef} className="tp-hero">
        {/* Breadcrumb */}
        <nav className="tp-animate tp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="tp-breadcrumb-link">
            Home
          </Link>
          <span className="tp-breadcrumb-sep">→</span>
          <Link href="/edtech" className="tp-breadcrumb-link">
            EdTech
          </Link>
          <span className="tp-breadcrumb-sep">→</span>
          <Link href="/edtech/courses" className="tp-breadcrumb-link">
            Courses
          </Link>
          <span className="tp-breadcrumb-sep">→</span>
          <span className="tp-breadcrumb-current">{track.label}</span>
        </nav>

        {/* Track badge */}
        <div className="tp-animate">
          <span
            className="tp-badge"
            style={{
              color: track.accent,
              background: track.accentBg,
              border: `1px solid ${track.accentBorder}`,
            }}
          >
            {track.emoji} {track.label}
          </span>
        </div>

        {/* Title */}
        <h1 className="tp-animate tp-title">
          {track.label}
          {track.comingSoon && (
            <span className="tp-coming-pill">Coming Soon</span>
          )}
        </h1>

        {/* Description */}
        <p className="tp-animate tp-description">{track.description}</p>

        {/* Course count */}
        {!track.comingSoon && (
          <div className="tp-animate tp-meta">
            <span className="tp-meta-item">
              <span className="tp-meta-num" style={{ color: track.accent }}>
                {track.courses.length}
              </span>
              {track.courses.length === 1 ? " Course" : " Courses"}
            </span>
            <span className="tp-meta-dot" />
            <span className="tp-meta-item">Structured Curriculum</span>
            <span className="tp-meta-dot" />
            <span className="tp-meta-item">Certificate Included</span>
          </div>
        )}
      </div>

      {/* ── Search ── */}
      {!track.comingSoon && (
        <div ref={searchRef} className="tp-search-wrap">
          <div className="tp-search-bar">
            <span className="tp-search-icon" aria-hidden>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={`Search ${track.label} courses…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="tp-search-input"
              id="course-search"
            />
            {query && (
              <button
                className="tp-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {query && (
            <p className="tp-search-results">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}{" "}
              found
            </p>
          )}
        </div>
      )}

      {/* ── Content ── */}
      {track.comingSoon ? (
        <ComingSoonSection track={track} />
      ) : filtered.length > 0 ? (
        <CourseGrid courses={filtered} track={track} />
      ) : (
        <div className="tp-empty">
          <span className="tp-empty-icon">🔍</span>
          <p className="tp-empty-text">
            No courses match &ldquo;{query}&rdquo;
          </p>
          <button
            className="tp-empty-clear"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
