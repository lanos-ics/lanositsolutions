"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Staggered entrance */
      gsap.set(".nf-item", { opacity: 0, y: 36, skewY: 0.8 });
      gsap.to(".nf-item", {
        opacity:  1,
        y:        0,
        skewY:    0,
        duration: 1.0,
        ease:     "power4.out",
        stagger:  0.12,
        delay:    0.15,
      });

      /* Floating 404 watermark */
      gsap.to(".nf-watermark", {
        y:        -18,
        duration: 4.5,
        ease:     "power1.inOut",
        yoyo:     true,
        repeat:   -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position:       "relative",
        minHeight:      "calc(100svh - var(--nav-h))",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "4rem clamp(1.75rem, 8vw, 9rem)",
        overflow:       "hidden",
      }}
    >
      {/* ── Dot grid ──────────────────────────────────────────── */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.025 }}>
        <defs>
          <pattern id="nf-dots" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1A1A1B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nf-dots)" />
      </svg>

      {/* ── Ambient glow blobs ─────────────────────────────────── */}
      <div aria-hidden style={{
        position: "absolute", top: "-15%", right: "-10%",
        width: "min(600px, 55vw)", height: "min(600px, 55vw)",
        borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        background: "radial-gradient(ellipse, rgba(229,64,79,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "nfBlob 16s ease-in-out infinite",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-12%", left: "-8%",
        width: "min(440px, 38vw)", height: "min(440px, 38vw)",
        borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
        background: "radial-gradient(ellipse, rgba(205,84,115,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "nfBlob 20s ease-in-out infinite reverse",
      }} />

      {/* ── 404 Watermark ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="nf-watermark"
        style={{
          position:      "absolute",
          fontSize:      "clamp(10rem, 28vw, 32rem)",
          fontWeight:    800,
          letterSpacing: "-0.06em",
          color:         "rgba(26,26,27,0.030)",
          userSelect:    "none",
          pointerEvents: "none",
          lineHeight:    1,
          zIndex:        0,
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          whiteSpace:    "nowrap",
        }}
      >
        404
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>

        {/* Eyebrow */}
        <div className="nf-item" style={{ marginBottom: "1.75rem" }}>
          <span style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.45rem",
            fontSize:      "0.68rem",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "var(--accent)",
            padding:       "0.28rem 0.8rem",
            border:        "1px solid rgba(229,64,79,0.22)",
            borderRadius:  "99px",
            background:    "rgba(229,64,79,0.06)",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--accent)", display: "inline-block",
              animation: "nfPulse 2.4s ease-in-out infinite",
            }} />
            Error 404
          </span>
        </div>

        {/* Heading */}
        <h1
          className="nf-item"
          style={{
            fontWeight:    200,
            fontSize:      "clamp(2.5rem, 6vw, 7rem)",
            lineHeight:    1.06,
            letterSpacing: "-0.045em",
            color:         "var(--fg)",
            marginBottom:  "1.25rem",
            maxWidth:      "18ch",
          }}
        >
          This page{" "}
          <em style={{
            fontStyle:            "italic",
            fontWeight:           300,
            background:           "linear-gradient(130deg, var(--accent) 0%, #CD5473 55%, #124898 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            paddingRight:         "0.06em",
          }}>
            doesn&apos;t exist.
          </em>
        </h1>

        {/* Sub-copy */}
        <p
          className="nf-item"
          style={{
            fontSize:      "clamp(0.95rem, 1.5vw, 1.15rem)",
            color:         "var(--fg-muted)",
            lineHeight:    1.75,
            maxWidth:      "42ch",
            marginBottom:  "2.75rem",
            fontWeight:    400,
          }}
        >
          The path you followed isn&apos;t part of the ecosystem. Let&apos;s get you back
          to somewhere that is.
        </p>

        {/* CTAs */}
        <div
          className="nf-item"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}
        >
          <Link href="/" className="nf-cta nf-cta--primary">
            Back to Home
            <span className="nf-arrow">↗</span>
          </Link>
          <Link href="/edtech" className="nf-cta nf-cta--ghost">
            Explore EdTech
          </Link>
          <Link href="/#contact" className="nf-cta nf-cta--ghost">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ── Quick nav links ────────────────────────────────────── */}
      <div
        className="nf-item"
        style={{
          position:   "absolute",
          bottom:     "2.5rem",
          left:       "50%",
          transform:  "translateX(-50%)",
          display:    "flex",
          gap:        "2rem",
          opacity:    0.45,
          whiteSpace: "nowrap",
        }}
      >
        {["Solutions", "R&D", "Blog"].map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase().replace("&", "").replace(" ", "")}`}
            style={{
              fontSize:      "0.72rem",
              fontWeight:    500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--fg-muted)",
              textDecoration:"none",
              transition:    "color 0.2s ease, opacity 0.2s ease",
            }}
            className="nf-nav-link"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── Scoped styles ─────────────────────────────────────── */}
      <style>{`
        @keyframes nfBlob {
          0%, 100% { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
          33%       { border-radius: 50% 50% 45% 55% / 55% 45% 60% 40%; }
          66%       { border-radius: 40% 60% 60% 40% / 40% 60% 55% 45%; }
        }
        @keyframes nfPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }

        /* Primary CTA */
        .nf-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.75rem 1.75rem;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease, transform 0.28s var(--ease-out-expo), box-shadow 0.28s ease, border-color 0.25s ease;
        }
        .nf-cta--primary {
          background: var(--fg);
          color: var(--bg);
          border: 1px solid var(--fg);
        }
        .nf-cta--primary:hover {
          background: var(--accent);
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px -6px rgba(229,64,79,0.3);
        }
        .nf-cta--primary:hover .nf-arrow {
          transform: translate(2px, -2px);
        }
        .nf-arrow {
          display: inline-block;
          transition: transform 0.25s var(--ease-out-expo);
        }
        .nf-cta--ghost {
          background: transparent;
          color: var(--fg-muted);
          border: 1px solid rgba(26,26,27,0.16);
        }
        .nf-cta--ghost:hover {
          border-color: rgba(229,64,79,0.35);
          color: var(--accent);
          transform: translateY(-2px);
        }

        .nf-nav-link:hover {
          color: var(--fg) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
