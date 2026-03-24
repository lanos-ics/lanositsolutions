"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Link categories ─────────────────────────────────────── */
const NAV = [
  {
    heading: "Company",
    links: [
      { label: "About",    href: "/about"   },
      { label: "Blog",     href: "/blog"    },
      { label: "Careers",  href: "/careers" },
      { label: "Contact",  href: "#contact" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "EdTech",      href: "/edtech"    },
      { label: "IT Solutions", href: "/solutions" },
      { label: "R&D",         href: "/rd"        },
      { label: "Case Studies", href: "/work"      },
    ],
  },
  {
    heading: "Socials",
    links: [
      { label: "LinkedIn",  href: "https://linkedin.com"  },
      { label: "Twitter/X", href: "https://x.com"         },
      { label: "GitHub",    href: "https://github.com"    },
      { label: "Dribbble",  href: "https://dribbble.com"  },
    ],
  },
];

/* ─── Back-to-Top button ──────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setPressed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setPressed(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position:       "fixed",
        bottom:         "2rem",
        right:          "2rem",
        zIndex:         50,
        width:          "3rem",
        height:         "3rem",
        borderRadius:   "50%",
        background:     "var(--fg)",
        color:          "var(--bg)",
        border:         "none",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       "1.1rem",
        fontFamily:     "inherit",
        opacity:        visible ? 1 : 0,
        transform:      pressed
          ? "scale(0.88) translateY(2px)"
          : visible ? "scale(1) translateY(0)" : "scale(0.75) translateY(8px)",
        transition:
          "opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        pointerEvents:  visible ? "auto" : "none",
        boxShadow:      "0 4px 24px rgba(26,26,27,0.18)",
      }}
    >
      ↑
    </button>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */
export default function Footer() {
  return (
    <>
      <BackToTop />

      <footer
        style={{
          position:   "relative",
          overflow:   "hidden",
          borderTop:  "1px solid rgba(26,26,27,0.08)",
          background: "var(--bg)",
          zIndex:     1,
        }}
      >
        {/* ── Watermark ─────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position:      "absolute",
            bottom:        "-0.35em",
            left:          "50%",
            transform:     "translateX(-50%)",
            fontWeight:    800,
            fontSize:      "clamp(7rem, 22vw, 22rem)",
            letterSpacing: "-0.06em",
            lineHeight:    1,
            color:         "rgba(26,26,27,0.11)",
            userSelect:    "none",
            pointerEvents: "none",
            whiteSpace:    "nowrap",
          }}
        >
          LANOS
        </div>

        {/* ── Main footer body ──────────────────────────────── */}
        <div
          style={{
            padding:  "clamp(4rem, 7vw, 7rem) clamp(1.75rem, 8vw, 9rem) 0",
            position: "relative",
            zIndex:   2,
          }}
        >
          {/* Top row: wordmark + nav columns */}
          <div
            className="footer-top"
            style={{
              display:             "grid",
              gridTemplateColumns: "1.5fr repeat(3, 1fr)",
              gap:                 "clamp(2rem, 4vw, 4rem)",
              alignItems:          "start",
              marginBottom:        "clamp(3rem, 5vw, 5rem)",
            }}
          >
            {/* Brand block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/lanos-logo.png"
                  alt="Lanos Logo"
                  width={130}
                  height={40}
                  style={{
                    objectFit: "contain",
                    display: "block",
                  }}
                  priority
                />
              </Link>
              <p
                style={{
                  fontSize:   "0.875rem",
                  lineHeight: 1.72,
                  color:      "var(--fg-muted)",
                  maxWidth:   "28ch",
                }}
              >
                EdTech, Software Systems &amp; Research — built to develop
                engineers, create scalable products, and explore future technologies.
              </p>
              <a
                href="mailto:contact@lanositsolutions.com"
                style={{
                  fontSize:      "0.82rem",
                  fontWeight:    500,
                  color:         "var(--accent)",
                  textDecoration:"none",
                  letterSpacing: "-0.01em",
                }}
              >
                contact@lanositsolutions.com
              </a>
            </div>

            {/* Nav columns */}
            {NAV.map((col) => (
              <div
                key={col.heading}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <span
                  style={{
                    fontSize:      "0.65rem",
                    fontWeight:    700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:         "var(--fg-muted)",
                    opacity:       0.55,
                    marginBottom:  "0.25rem",
                  }}
                >
                  {col.heading}
                </span>
                {col.links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      fontSize:      "0.9rem",
                      color:         "var(--fg)",
                      textDecoration:"none",
                      opacity:       0.7,
                      transition:    "opacity 0.2s ease",
                      display:       "inline-block",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop:      "1px solid rgba(26,26,27,0.07)",
              padding:        "1.5rem 0 2rem",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "0.75rem",
              position:       "relative",
              zIndex:         2,
            }}
          >
            <span style={{ fontSize: "0.78rem", color: "var(--fg-muted)", opacity: 0.55 }}>
              © {new Date().getFullYear()} Lanos Technologies Pvt. Ltd.
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--fg-muted)", opacity: 0.45 }}>
              Sagar · Madhya Pradesh · India
            </span>
          </div>
        </div>
      </footer>

      {/* ── Responsive styles ─────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
