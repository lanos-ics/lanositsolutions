"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import FlipWords from "@/components/ui/FlipWords";
import "./solutions.css";

import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionsStatement from "@/components/sections/solutions/SolutionsStatement";
import SolutionsDNA from "@/components/sections/solutions/SolutionsDNA";
import SolutionsMission from "@/components/sections/solutions/SolutionsMission";
import SolutionsStack from "@/components/sections/solutions/SolutionsStack";
import SolutionsAIWorkflows from "@/components/sections/solutions/SolutionsAIWorkflows";
import SolutionsTalent from "@/components/sections/solutions/SolutionsTalent";
import SolutionsSecurity from "@/components/sections/solutions/SolutionsSecurity";
import SolutionsPricing from "@/components/sections/solutions/SolutionsPricing";
import SolutionsCTA from "@/components/sections/solutions/SolutionsCTA";

export default function SolutionsPage() {
  /* ── GSAP Reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".wa", { opacity: 0, y: 50, skewY: 1.2 });
      gsap.utils.toArray<HTMLElement>(".wa").forEach((el) => {
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
          delay: delay,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="s-nav">
        <Link href="/" className="s-nav-logo">Lanos</Link>
        <ul className="s-nav-links">
          <li><Link href="/edtech">EdTech</Link></li>
          <li><Link href="/solutions" className="active" style={{ color: "var(--fg)" }}>Solutions</Link></li>
          <li><Link href="/rd">R&D</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
        <Link href="/contact" className="s-nav-cta">Get in touch ↗</Link>
      </nav>


      {/* ── Page Sections ── */}
      <SolutionsHero />
      <SolutionsStatement />
      <SolutionsDNA />
      <SolutionsMission />
      <SolutionsStack />
      <SolutionsAIWorkflows />
      <SolutionsTalent />
      <SolutionsSecurity />
      <SolutionsPricing />
      <SolutionsCTA />

      {/* ══════════════════════════════════════════
          FOOTER STRIP
      ══════════════════════════════════════════ */}
      <div className="s-foot" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "2.5rem clamp(1.5rem,5vw,3.5rem)", background: "var(--bg)",
        borderTop: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--muted)"
      }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/">← Back to Lanos</Link>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="mailto:hello@lanos.in">hello@lanos.in</Link>
          <Link href="/contact" style={{ color: "var(--fg)", fontWeight: 600 }}>Partner With Lanos ↗</Link>
        </div>
      </div>
    </>
  );
}