"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import "./research.css";

import ResearchHero from "@/components/sections/research/ResearchHero";
import ProjectVault from "@/components/sections/research/ProjectVault";
import QuantumPerspective from "@/components/sections/research/QuantumPerspective";
import ResearchGrid from "@/components/sections/research/ResearchGrid";
import ResearchCommunity from "@/components/sections/research/ResearchCommunity";

export default function ResearchPage() {
  /* ── GSAP Scroll-Triggered Reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".ra", { opacity: 0, y: 50, skewY: 1.2 });
      gsap.utils.toArray<HTMLElement>(".ra").forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.1,
          ease: "power4.out",
          delay,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="r-nav">
        <Link href="/" className="r-nav-logo">Lanos</Link>
        <ul className="r-nav-links">
          <li><Link href="/edtech">EdTech</Link></li>
          <li><Link href="/solutions">Solutions</Link></li>
          <li><Link href="/research" className="active" style={{ color: "var(--r-fg)" }}>R&amp;D</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
        <Link href="/contact" className="r-nav-cta">Get in touch ↗</Link>
      </nav>

      {/* ── Sections ── */}
      <ResearchHero />
      <ProjectVault />
      <QuantumPerspective />
      <ResearchGrid />
      <ResearchCommunity />

      {/* ── Footer Strip ── */}
      <div className="r-foot">
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/">← Back to Lanos</Link>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="mailto:hello@lanos.in">hello@lanos.in</Link>
          <Link href="/contact" style={{ color: "var(--r-fg-light)", fontWeight: 600 }}>
            Partner With Lanos ↗
          </Link>
        </div>
      </div>
    </>
  );
}
