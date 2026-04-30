"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface BlogCardData {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
}

export function BlogCard({ post }: { post: BlogCardData }) {
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
      <div
        style={{
          borderRadius: "1rem",
          overflow:     "hidden",
          aspectRatio:  "16 / 9",
          position:     "relative",
          background:   "#e5e7eb",
        }}
      >
        {post.coverImage && (
          <Image
            src={post.coverImage}
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
        )}
      </div>

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
