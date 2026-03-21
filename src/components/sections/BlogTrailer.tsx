"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const POSTS = [
  {
    slug:     "future-of-edtech",
    tag:      "EdTech",
    tagColor: "#E5404F",
    title:    "The Future of EdTech Is Adaptive, Not Just Digital",
    excerpt:  "Why the next wave of learning platforms will feel less like apps and more like tutors — and what it takes to build them.",
    date:     "Feb 18, 2026",
    readTime: "5 min read",
    image:    "/blog-edtech.png",
  },
  {
    slug:     "ai-and-curriculum",
    tag:      "R&D",
    tagColor: "#CD5473",
    title:    "What Happens When AI Writes the Curriculum?",
    excerpt:  "A deep dive into our research on AI-generated lesson plans — what works, what breaks, and what we learned.",
    date:     "Feb 10, 2026",
    readTime: "7 min read",
    image:    "/blog-ai.png",
  },
  {
    slug:     "architecture-at-scale",
    tag:      "IT Solutions",
    tagColor: "#124898",
    title:    "Designing Systems That Don't Break Under Pressure",
    excerpt:  "Three architectural patterns our consultancy team relies on when building for 10× growth.",
    date:     "Jan 29, 2026",
    readTime: "6 min read",
    image:    "/blog-rd.png",
  },
];

function BlogCard({ post }: { post: (typeof POSTS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        "flex",
        flexDirection:  "column",
        gap:            "1.25rem",
        textDecoration: "none",
        flex:           "0 0 clamp(280px, 32%, 420px)",
        minWidth:       0,
      }}
    >
      {/* Image container — no border, just clean zoom */}
      <div
        style={{
          borderRadius: "1rem",
          overflow:     "hidden",
          aspectRatio:  "16 / 9",
          position:     "relative",
          background:   "#e5e7eb",
        }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{
            objectFit:  "cover",
            transform:   hovered ? "scale(1.045)" : "scale(1)",
            transition:  "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange:  "transform",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span
          style={{
            fontSize:      "0.68rem",
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         post.tagColor,
          }}
        >
          {post.tag}
        </span>
        <span style={{ color: "var(--fg-muted)", fontSize: "0.7rem" }}>·</span>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>{post.date}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginLeft: "auto" }}>{post.readTime}</span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontWeight:    500,
          fontSize:      "clamp(1rem, 1.4vw, 1.2rem)",
          letterSpacing: "-0.02em",
          lineHeight:    1.3,
          color:         "var(--fg)",
          marginTop:     "-0.25rem",
          transition:    "color 0.2s ease",
          ...(hovered ? { color: "var(--accent)" } : {}),
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontSize:   "0.875rem",
          lineHeight: 1.68,
          color:      "var(--fg-muted)",
          marginTop:  "-0.5rem",
        }}
      >
        {post.excerpt}
      </p>

      {/* Read CTA */}
      <span
        style={{
          fontSize:    "0.8rem",
          fontWeight:  600,
          color:       post.tagColor,
          display:     "flex",
          alignItems:  "center",
          gap:         "0.35rem",
          opacity:     hovered ? 1 : 0.6,
          transition:  "opacity 0.25s ease",
        }}
      >
        Read article
        <span style={{ transition: "transform 0.25s ease", transform: hovered ? "translateX(3px)" : "none" }}>→</span>
      </span>
    </Link>
  );
}

export default function BlogTrailer() {
  return (
    <section
      style={{
        padding:  "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        zIndex:   1,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding:       "0 clamp(1.75rem, 8vw, 9rem)",
          marginBottom:  "3.5rem",
          display:       "flex",
          alignItems:    "flex-end",
          justifyContent:"space-between",
          gap:           "1rem",
          flexWrap:      "wrap",
        }}
      >
        <div>
          <span
            style={{
              display:       "block",
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              marginBottom:  "0.75rem",
              opacity:       0.75,
            }}
          >
            From the blog
          </span>
          <h2
            style={{
              fontWeight:    300,
              fontSize:      "clamp(1.75rem, 3.5vw, 3rem)",
              letterSpacing: "-0.035em",
              lineHeight:    1.1,
              color:         "var(--fg)",
            }}
          >
            Ideas worth{" "}
            <em style={{ fontStyle: "italic", fontWeight: 200, color: "var(--fg-muted)" }}>reading.</em>
          </h2>
        </div>

        <Link
          href="/blog"
          style={{
            fontSize:      "0.85rem",
            fontWeight:    600,
            color:         "var(--accent)",
            display:       "flex",
            alignItems:    "center",
            gap:           "0.4rem",
            whiteSpace:    "nowrap",
            textDecoration:"none",
          }}
        >
          All articles →
        </Link>
      </div>

      {/* Horizontal scrollable card row */}
      <div
        style={{
          display:        "flex",
          gap:            "2rem",
          padding:        "0 clamp(1.75rem, 8vw, 9rem) 2rem",
          overflowX:      "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {POSTS.map((post) => (
          <div
            key={post.slug}
            style={{ scrollSnapAlign: "start", display: "flex", flex: "0 0 clamp(280px, 32%, 420px)" }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      <style>{`
        /* Hide scrollbar */
        section:has(.blog-scroll)::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
