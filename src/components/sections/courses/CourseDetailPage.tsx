"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Track, Course } from "@/lib/courseData";
import { formatPrice } from "@/lib/courseData";

interface CourseDetailPageProps {
  track: Track;
  course: Course;
}

export default function CourseDetailPage({ track, course }: CourseDetailPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll<HTMLElement>(".cd-animate");
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
  }, [course]);

  const discount = course.originalPrice > course.price 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) 
    : 0;

  return (
    <section className="cd-section">
      {/* ── Ambient orb ── */}
      <div
        className="cd-orb"
        style={{
          background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 65%)`,
        }}
      />

      {/* ── Hero ── */}
      <div ref={heroRef} className="cd-hero">
        {/* Breadcrumb */}
        <nav className="cd-animate cd-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="cd-breadcrumb-link">Home</Link>
          <span className="cd-breadcrumb-sep">→</span>
          <Link href="/edtech" className="cd-breadcrumb-link">EdTech</Link>
          <span className="cd-breadcrumb-sep">→</span>
          <Link href="/edtech/courses" className="cd-breadcrumb-link">Courses</Link>
          <span className="cd-breadcrumb-sep">→</span>
          <Link href={`/edtech/courses/${track.slug}`} className="cd-breadcrumb-link">{track.label}</Link>
          <span className="cd-breadcrumb-sep">→</span>
          <span className="cd-breadcrumb-current">{course.title}</span>
        </nav>

        {/* Track / Badge Pill */}
        <div className="cd-animate cd-badges">
          <Link href={`/edtech/courses/${track.slug}`} style={{ textDecoration: 'none' }}>
            <span
              className="cd-badge"
              style={{
                color: track.accent,
                background: track.accentBg,
                border: `1px solid ${track.accentBorder}`,
              }}
            >
              {track.emoji} {track.label}
            </span>
          </Link>
          {course.badge && (
            <span className={`cd-badge-course badge-${course.badge}`}>
              {course.badge.toUpperCase()}
            </span>
          )}
        </div>

        {/* Title & Icon */}
        <h1 className="cd-animate cd-title">
          <span className="cd-icon">{course.icon}</span> {course.title}
        </h1>

        {/* Description */}
        <p className="cd-animate cd-description">{course.briefDescription || course.description}</p>
        
        {/* Course Info Cards */}
        <div className="cd-animate cd-info-cards">
          <div className="cd-info-card">
            <span className="cd-info-label">Curriculum</span>
            <span className="cd-info-value">Structured</span>
          </div>
          <div className="cd-info-card">
            <span className="cd-info-label">Format</span>
            <span className="cd-info-value">Self-Paced</span>
          </div>
          <div className="cd-info-card">
            <span className="cd-info-label">Certificate</span>
            <span className="cd-info-value">Included</span>
          </div>
        </div>

        {/* Pricing Segment */}
        <div className="cd-animate cd-pricing-box">
          <div className="cd-price-wrap">
            <span className="cd-price-current" style={{ color: track.accent }}>
              {formatPrice(course.price)}
            </span>
            {course.originalPrice > course.price && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="cd-price-original">
                  {formatPrice(course.originalPrice)}
                </span>
                <span className="cd-price-discount">{discount}% OFF</span>
              </div>
            )}
          </div>
          
          <div className="cd-cta-group">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919XXXXXXXXX'}?text=${encodeURIComponent(`Hi, I'm interested in buying the "${course.title}" course (₹${course.price.toLocaleString('en-IN')}). Please share the details.`)}`}
              className="cd-cta cd-cta--solid"
              style={{ background: track.accent }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
              <span className="cd-cta-arrow">↗</span>
            </a>
            {course.syllabusUrl && (
              <a
                href={course.syllabusUrl}
                className="cd-cta cd-cta--outline"
                style={{
                  borderColor: track.accentBorder,
                  color: track.accent,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Syllabus
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cd-section {
          position: relative;
          padding: 3rem clamp(1.75rem, 8vw, 9rem) 6rem;
          overflow: hidden;
          min-height: 80vh;
        }

        .cd-orb {
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

        .cd-hero {
          position: relative;
          z-index: 1;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin: 0 auto;
        }

        /* ── Breadcrumb ── */
        .cd-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--fg-muted);
          margin-bottom: 0.5rem;
        }
        .cd-breadcrumb-link {
          color: var(--fg-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cd-breadcrumb-link:hover {
          color: var(--fg);
        }
        .cd-breadcrumb-sep {
          opacity: 0.35;
          font-size: 0.7rem;
        }
        .cd-breadcrumb-current {
          color: var(--fg);
          font-weight: 500;
        }

        /* ── Badges ── */
        .cd-badges {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .cd-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          will-change: transform;
        }
        
        .cd-badge-course {
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }
        .badge-new { background: rgba(155,92,246,0.10); color: #9B5CF6; border: 1px solid rgba(155,92,246,0.22); }
        .badge-popular { background: rgba(229,64,79,0.10); color: #E5404F; border: 1px solid rgba(229,64,79,0.22); }
        .badge-bestseller { background: rgba(29,171,110,0.10); color: #1DAB6E; border: 1px solid rgba(29,171,110,0.22); }

        /* ── Title ── */
        .cd-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--fg);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cd-icon {
          font-size: clamp(2.5rem, 5vw, 4rem);
        }

        /* ── Description ── */
        .cd-description {
          font-size: 1.15rem;
          font-weight: 300;
          line-height: 1.7;
          color: var(--fg-muted);
          margin: 0.5rem 0;
        }
        
        /* ── Info Cards ── */
        .cd-info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }
        .cd-info-card {
          padding: 1.25rem;
          border-radius: 14px;
          border: 1px solid rgba(26,26,27,0.08);
          background: rgba(26,26,27,0.02);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cd-info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--fg-muted);
          font-weight: 600;
        }
        .cd-info-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--fg);
        }

        /* ── Pricing Box ── */
        .cd-pricing-box {
          margin-top: 1.5rem;
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid rgba(26,26,27,0.1);
          background: rgba(248,249,250,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
        }

        .cd-price-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .cd-price-current {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .cd-price-original {
          font-size: 1.1rem;
          color: var(--fg-muted);
          text-decoration: line-through;
          opacity: 0.8;
          font-weight: 500;
        }
        .cd-price-discount {
          font-size: 0.75rem;
          background: rgba(229,64,79,0.1);
          color: #E5404F;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-weight: 700;
        }

        .cd-cta-group {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .cd-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 1.75rem;
          border-radius: 99px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .cd-cta--solid {
          color: #fff;
        }
        .cd-cta--solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -8px var(--fg-muted);
          filter: brightness(1.1);
        }
        .cd-cta--outline {
          border: 1.5px solid;
          background: transparent;
        }
        .cd-cta--outline:hover {
          background: rgba(26,26,27,0.03);
          transform: translateY(-2px);
        }
        .cd-cta-arrow {
          display: inline-block;
          font-size: 1.1rem;
          transition: transform 0.25s ease;
        }
        .cd-cta:hover .cd-cta-arrow {
          transform: translate(3px, -3px);
        }

        @media (max-width: 768px) {
          .cd-section { padding: 2rem 1.25rem 4rem; }
          .cd-pricing-box {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.75rem;
          }
          .cd-cta-group {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
          .cd-cta { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
