"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Voice {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  hue: number; // avatar accent hue for color-reveal
}

/* ─── Active Interns (top row → left scroll) ─────────────────────── */
const INTERNS: Voice[] = [
  { id: "i1", name: "Aryan Mehta",      role: "Full Stack Intern",     quote: "Building production-level code from day one.",                      initials: "AM", hue: 231 },
  { id: "i2", name: "Priya Nair",       role: "AI/ML Intern",          quote: "The 8-hour pulse changed how I think about logic.",                  initials: "PN", hue: 270 },
  { id: "i3", name: "Rohan Sharma",     role: "DevOps Intern",         quote: "Not just an internship — it's a structured launchpad.",              initials: "RS", hue: 195 },
  { id: "i4", name: "Sneha Patel",      role: "Product Intern",        quote: "Every sprint felt like shipping for a real company.",                initials: "SP", hue: 340 },
  { id: "i5", name: "Karan Joshi",      role: "Cyber Security Intern", quote: "Real threat modelling. Real stakes. Real growth.",                   initials: "KJ", hue: 15  },
  { id: "i6", name: "Ananya Singh",     role: "BCI Research Intern",   quote: "Lanos gave me access to neurotechnology I couldn't find elsewhere.", initials: "AS", hue: 160 },
  { id: "i7", name: "Harsh Verma",      role: "IoT Intern",            quote: "From circuits to the cloud — I built it all under one roof.",        initials: "HV", hue: 45  },
  { id: "i8", name: "Divya Kulkarni",   role: "AR/VR Intern",          quote: "My final project shipped as a real client prototype.",               initials: "DK", hue: 300 },
];

/* ─── Alumni (bottom row → right scroll) ────────────────────────── */
const ALUMNI: Voice[] = [
  { id: "a1", name: "Vikram Iyer",      role: "SDE at Google",         quote: "From Lanos R&D to a Senior SDE role. The depth here is unmatched.", initials: "VI", hue: 231 },
  { id: "a2", name: "Meera Reddy",      role: "Founding Engineer, Zeta",quote: "Building my own startup with the foundations I laid at Lanos.",    initials: "MR", hue: 195 },
  { id: "a3", name: "Aditya Bhatt",     role: "SDE-2 at Microsoft",    quote: "The transition to corporate was seamless thanks to Lanos culture.",  initials: "AB", hue: 160 },
  { id: "a4", name: "Nisha Agarwal",    role: "ML Engineer at OpenAI", quote: "Lanos didn't teach me to code. It taught me to think in systems.",  initials: "NA", hue: 270 },
  { id: "a5", name: "Siddharth Rao",    role: "Product Manager, Razorpay", quote: "The product sprints at Lanos gave me a PM edge from day one.",   initials: "SR", hue: 15  },
  { id: "a6", name: "Tanvi Choudhary",  role: "DevOps Lead at Infosys", quote: "Eight hours a day of real infra work — nothing else compares.",    initials: "TC", hue: 45  },
  { id: "a7", name: "Rahul Gupta",      role: "Security Analyst, Wipro", quote: "Lanos's cyber curriculum is years ahead of university content.",   initials: "RG", hue: 340 },
  { id: "a8", name: "Pooja Desai",      role: "Co-founder, NeuralEdge", quote: "We raised seed funding on the prototype I built as a Lanos intern.", initials: "PD", hue: 300 },
];

/* ─── Avatar ────────────────────────────────────────────────────── */
function Avatar({ initials, hue }: { initials: string; hue: number }) {
  return (
    <div
      className="vs-avatar"
      style={{ "--av-hue": hue } as React.CSSProperties}
      aria-hidden
    >
      <span className="vs-avatar-initials">{initials}</span>
    </div>
  );
}

/* ─── Card ──────────────────────────────────────────────────────── */
function VoiceCard({ v }: { v: Voice }) {
  return (
    <div className="vs-card" style={{ "--av-hue": v.hue } as React.CSSProperties}>
      {/* Top accent strip */}
      <div className="vs-card-topline" />

      {/* Ambient glow */}
      <div className="vs-card-glow" />

      {/* Decorative opening quote mark */}
      <svg className="vs-deco-quote" viewBox="0 0 40 30" fill="none" aria-hidden>
        <path d="M0 20C0 10 6 2 16 0L17.5 3C12 4.5 9 8 8.5 12H14V28H0V20ZM22 20C22 10 28 2 38 0L39.5 3C34 4.5 31 8 30.5 12H36V28H22V20Z"
          fill="currentColor" opacity="0.08" />
      </svg>

      {/* Quote body */}
      <p className="vs-quote">{v.quote}</p>

      {/* Footer: avatar + name + role pill */}
      <div className="vs-card-footer">
        <Avatar initials={v.initials} hue={v.hue} />
        <div className="vs-meta">
          <span className="vs-name">{v.name}</span>
          <span className="vs-role-pill">{v.role}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Marquee Row ───────────────────────────────────────────────── */
function MarqueeRow({
  voices,
  direction,
  duration,
  label,
  rowLabel,
}: {
  voices: Voice[];
  direction: "left" | "right";
  duration: number;
  label: string;
  rowLabel: string;
}) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Clone the original cards so the track is 2× wide
    const origCards = Array.from(track.querySelectorAll<HTMLElement>(".vs-card"));
    origCards.forEach((card) => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    // 2. Defer scrollWidth read until AFTER the browser has reflowed the DOM
    const rafId = requestAnimationFrame(() => {
      const half = track.scrollWidth / 2; // width of one full set

      // 3. For "right" direction, start the track displaced left by one set
      //    and animate back to 0. For "left", start at 0 and go to -half.
      if (direction === "right") {
        gsap.set(track, { x: -half });
        tweenRef.current = gsap.to(track, {
          x: 0,
          duration,
          ease: "none",
          repeat: -1,
        });
      } else {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -half,
          duration,
          ease: "none",
          repeat: -1,
        });
      }

      // 4. Hover — smoothly slow to 10 % speed, spring back on leave
      const row = track.closest<HTMLElement>(".vs-row-wrap");
      if (!row) return;

      const onEnter = () =>
        gsap.to(tweenRef.current, { timeScale: 0.1, duration: 0.5, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);

      cleanupRef.current = () => {
        tweenRef.current?.kill();
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
    };
  }, [direction, duration]);

  return (
    <div className="vs-row-wrap" aria-label={rowLabel}>
      {/* Edge masks */}
      <div className="vs-fade-left"  aria-hidden />
      <div className="vs-fade-right" aria-hidden />

      {/* Row label */}
      <span className="vs-row-label">{label}</span>

      {/* Track */}
      <div className="vs-row-viewport">
        <div ref={trackRef} className="vs-track">
          {voices.map((v) => <VoiceCard key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function VoicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.set(headerRef.current, { opacity: 0, y: 28 });
    const t = ScrollTrigger.create({
      trigger: headerRef.current,
      start:   "top 82%",
      onEnter: () => gsap.to(headerRef.current!, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="vs-section">

      {/* Top rule */}
      <div className="vs-rule" />

      {/* ── Header ─── */}
      <div ref={headerRef} className="vs-header">
        <span className="vs-eyebrow">Voices from the Ecosystem</span>
        <h2 className="vs-heading">Voices from the<br /><em>Ecosystem.</em></h2>
        <p className="vs-sub">Real stories from our active interns and placed alumni.</p>
      </div>

      {/* ── Marquees ─── */}
      <div className="vs-marquees">
        <MarqueeRow
          voices={INTERNS}
          direction="left"
          duration={55}
          label="The Active Pulse"
          rowLabel="Active interns at Lanos"
        />
        <MarqueeRow
          voices={ALUMNI}
          direction="right"
          duration={40}
          label="The Alumni Network"
          rowLabel="Placed alumni from Lanos"
        />
      </div>

      {/* ── Styles ─── */}
      
    </section>
  );
}
