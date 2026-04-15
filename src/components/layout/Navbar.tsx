"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Courses", href: "/edtech/courses"},
  { label: "EdTech",    href: "/edtech" },
  { label: "Solutions", href: "/solutions" },
  { label: "R&D",       href: "/research" },
  { label: "Blog",      href: "/blog" },
] as const;

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null);
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  /* ── GSAP entrance: slide down from above ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll shadow toggle ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          100,
        height:          "var(--nav-h)",
        display:         "flex",
        alignItems:      "center",
        padding:         "0 clamp(1.5rem, 5vw, 4rem)",
        backdropFilter:  "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        backgroundColor: scrolled
          ? "rgba(248, 249, 250, 0.88)"
          : "rgba(248, 249, 250, 0.60)",
        borderBottom: scrolled
          ? "1px solid rgba(26, 26, 27, 0.10)"
          : "1px solid rgba(26, 26, 27, 0.04)",
        transition: "background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* ── Wordmark (SVG Logo) ── */}
      <Link
        href="/"
        style={{
          marginRight:  "auto",
          display:      "flex",
          alignItems:   "center",
          lineHeight:   1,
          flexShrink:   0,
        }}
        aria-label="Lanos home"
      >
        <Image
          src="/lanos-logo.png"
          alt="Lanos logo"
          width={120}
          height={36}
          priority
          style={{ objectFit: "contain", height: 44, width: "auto" }}
        />
      </Link>

      {/* ── Desktop Links ── */}
      <nav
        aria-label="Main navigation"
        style={{
          display:    "flex",
          gap:        "2.5rem",
          alignItems: "center",
        }}
        className="nav-desktop"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              fontSize:      "0.9rem",
              fontWeight:    500,
              color:         "var(--fg-muted)",
              letterSpacing: "0.01em",
              transition:    "color 0.2s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-muted)")}
          >
            {label}
          </Link>
        ))}

        {/* CTA Button */}
        <Link
          href="/contact"
          style={{
            marginLeft:      "0.5rem",
            padding:         "0.5rem 1.25rem",
            borderRadius:    "99px",
            background:      "var(--fg)",
            color:           "var(--bg)",
            fontSize:        "0.875rem",
            fontWeight:      600,
            letterSpacing:   "0.01em",
            transition:      "opacity 0.2s ease, transform 0.2s ease",
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "0.35rem",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          Get in touch
          <span aria-hidden>↗</span>
        </Link>
      </nav>

      {/* ── Mobile Hamburger ── */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(o => !o)}
        className="nav-mobile-toggle"
        style={{
          background:  "none",
          border:      "none",
          cursor:      "pointer",
          padding:     "0.5rem",
          display:     "none",
          flexDirection:"column",
          gap:         "5px",
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              display:         "block",
              width:           "22px",
              height:          "2px",
              background:      "var(--fg)",
              borderRadius:    "2px",
              transition:      "transform 0.3s ease, opacity 0.3s ease",
              transform:
                menuOpen
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div
          style={{
            position:        "absolute",
            top:             "var(--nav-h)",
            left:            0,
            right:           0,
            background:      "rgba(248, 249, 250, 0.96)",
            backdropFilter:  "blur(24px)",
            borderBottom:    "1px solid var(--glass-border)",
            padding:         "1.5rem clamp(1.5rem, 5vw, 4rem)",
            display:         "flex",
            flexDirection:   "column",
            gap:             "1.25rem",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize:   "1.1rem",
                fontWeight: 500,
                color:      "var(--fg)",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop:    "0.5rem",
              padding:      "0.75rem 1.5rem",
              borderRadius: "99px",
              background:   "var(--fg)",
              color:        "var(--bg)",
              fontWeight:   600,
              textAlign:    "center",
            }}
          >
            Get in touch ↗
          </Link>
        </div>
      )}

      {/* ── Mobile responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop        { display: none !important; }
          .nav-mobile-toggle  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
