"use client";

import type { Course, Track } from "@/lib/courseData";
import { formatPrice } from "@/lib/courseData";

interface CourseCardProps {
  course: Course;
  track: Track;
}

const BADGE_STYLES: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  new: {
    bg: "rgba(155,92,246,0.10)",
    color: "#9B5CF6",
    border: "rgba(155,92,246,0.22)",
  },
  popular: {
    bg: "rgba(229,64,79,0.10)",
    color: "#E5404F",
    border: "rgba(229,64,79,0.22)",
  },
  bestseller: {
    bg: "rgba(29,171,110,0.10)",
    color: "#1DAB6E",
    border: "rgba(29,171,110,0.22)",
  },
};

export default function CourseCard({ course, track }: CourseCardProps) {
  const badge = course.badge ? BADGE_STYLES[course.badge] : null;
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <div className="cc-card">
      {/* Top accent bar */}
      <div
        className="cc-topbar"
        style={{ background: `linear-gradient(90deg, ${track.accent}, ${track.accent}cc)` }}
      />

      {/* Glow */}
      <div
        className="cc-glow"
        style={{
          background: `radial-gradient(ellipse at 10% 0%, ${track.accentGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Card body */}
      <div className="cc-body">
        {/* Top row: icon + badge */}
        <div className="cc-top-row">
          <span className="cc-icon">{course.icon}</span>
          <div className="cc-badges">
            {badge && (
              <span
                className="cc-badge"
                style={{
                  background: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.border}`,
                }}
              >
                {course.badge === "new"
                  ? "NEW"
                  : course.badge === "popular"
                  ? "POPULAR"
                  : "BESTSELLER"}
              </span>
            )}
            {discount > 0 && (
              <span className="cc-badge cc-badge--discount">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="cc-title">{course.title}</h3>

        {/* Description */}
        <p className="cc-desc">{course.description}</p>

        {/* Pricing */}
        <div className="cc-pricing">
          <span className="cc-price-current" style={{ color: track.accent }}>
            {formatPrice(course.price)}
          </span>
          {course.originalPrice > course.price && (
            <span className="cc-price-original">
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="cc-cta-row">
          <a
            href={course.syllabusUrl}
            className="cc-cta cc-cta--outline"
            style={{
              borderColor: track.accentBorder,
              color: track.accent,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
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
            Syllabus
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919XXXXXXXXX'}?text=${encodeURIComponent(`Hi, I'm interested in buying the "${course.title}" course (₹${course.price.toLocaleString('en-IN')}). Please share the details.`)}`}
            className="cc-cta cc-cta--solid"
            style={{ background: track.accent }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now
            <span className="cc-cta-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
