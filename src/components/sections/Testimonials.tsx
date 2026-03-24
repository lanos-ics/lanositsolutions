"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/* ─── Testimonial data ────────────────────────────────────── */
const EDTECH_TESTIMONIALS = [
  { name: "Ashish Ahirwar",   role: "AutoCAD Student",              text: "Completed my AutoCAD training in just six weeks with excellent results. The structured learning and hands-on support made all the difference." },
  { name: "Anurag Bala",      role: "Python & Web Dev Student",     text: "Learning Python and web development here has been transformative. The teaching is clear, and the hands-on practice makes complex concepts click." },
  { name: "Prachi Rohit",     role: "Web Development Student",      text: "One of the best places for learning web development and programming. My expectations were consistently exceeded — start to finish." },
  { name: "Sachin Yadav",     role: "Programming Student",          text: "The best institute for mastering Python, C++, and JavaScript. The faculty is deeply supportive and genuinely invested in your growth." },
  { name: "Vedant Nagayach",  role: "C & Python Student",           text: "Friendly environment and highly skilled faculty. I learned C and Python effectively within a few months — practical skills I use every day." },
  { name: "Shaurya",          role: "Student",                      text: "Crystal-clear teaching and genuinely supportive faculty. An outstanding learning experience from start to finish." },
];

const CONSULTANCY_TESTIMONIALS = [
  { name: "Aditya Rao",     role: "CTO, FinTech Startup",       text: "Lanos took our spaghetti codebase and turned it into a system we're actually proud of. Methodical, pragmatic engineers." },
  { name: "Fatima Al-Zaidi",role: "VP Engineering, SaaS Co.",   text: "Three months with their team saved us from a rewrite we'd been dreading for two years. Massive ROI." },
  { name: "James Okonkwo",  role: "Founder, HealthTech",        text: "They designed an architecture that scaled from 200 to 80,000 users without a single major incident. Exceptional." },
  { name: "Meera Pillai",   role: "Head of Product, E-Commerce",text: "The Lanos team spotted our bottleneck in 48 hours. What we thought was a DB problem turned out to be a caching gap." },
  { name: "Nikhil Sharma",  role: "Engineering Manager",        text: "Their code reviews alone were worth the engagement. My team levelled up significantly working alongside them." },
  { name: "Sara Osei",      role: "CPO, AgriTech",              text: "From RFP to delivery in 10 weeks. On spec, on budget. I've never worked with an agency this disciplined." },
];

/* ─── Individual bubble ───────────────────────────────────── */
function TestimonialBubble({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div
      style={{
        padding:      "1.4rem 1.5rem",
        borderRadius: "1rem",
        background:   "#F3F4F6",
        border:       "1px solid rgba(26,26,27,0.08)",
        display:      "flex",
        flexDirection:"column",
        gap:          "0.75rem",
        flexShrink:   0,
        width:        "100%",
      }}
    >
      {/* Quote mark */}
      <span style={{ fontSize: "1.5rem", color: "var(--accent)", lineHeight: 1, opacity: 0.5 }}>"</span>

      <p
        style={{
          fontSize:   "0.88rem",
          lineHeight: 1.7,
          color:      "var(--fg)",
          fontWeight: 400,
        }}
      >
        {text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", marginTop: "0.25rem" }}>
        <span style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--fg)" }}>{name}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>{role}</span>
      </div>
    </div>
  );
}

/* ─── Vertical marquee column ─────────────────────────────── */
function MarqueeColumn({
  items,
  speed,
  reversed = false,
}: {
  items: typeof EDTECH_TESTIMONIALS;
  speed: number;
  reversed?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Total height of one set (half of duplicated list)
    const totalH = track.scrollHeight / 2;
    const startY = reversed ? -totalH : 0;
    const endY   = reversed ? 0        : -totalH;

    gsap.fromTo(
      track,
      { y: startY },
      {
        y:        endY,
        duration: speed,
        ease:     "none",
        repeat:   -1,
      }
    );

    return () => { gsap.killTweensOf(track); };
  }, [speed, reversed]);

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow:   "hidden",
        height:     "520px",
        position:   "relative",
        width:      "100%",          /* grid handles column width */
        minWidth:   0,
      }}
    >
      {/* Fade masks top & bottom */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          top:        0, left: 0, right: 0,
          height:     "80px",
          background: "linear-gradient(to bottom, var(--bg), transparent)",
          zIndex:     2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position:   "absolute",
          bottom:     0, left: 0, right: 0,
          height:     "80px",
          background: "linear-gradient(to top, var(--bg), transparent)",
          zIndex:     2,
          pointerEvents: "none",
        }}
      />

      <div
        ref={trackRef}
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "1rem",
          willChange:    "transform",
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialBubble key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section
      style={{
        padding:  "clamp(5rem, 10vw, 10rem) clamp(1.75rem, 8vw, 9rem)",
        position: "relative",
        zIndex:   1,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "4rem", maxWidth: "52ch" }}>
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
          Testimonials
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
          Trusted by learners{" "}
          <em style={{ fontStyle: "italic", fontWeight: 200, color: "var(--fg-muted)" }}>
            and builders.
          </em>
        </h2>
      </div>

      {/* Two marquee columns with column labels */}
      <div
        className="testimonials-grid"
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "2.5rem",
          alignItems:          "start",
        }}
      >
        {/* EdTech column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#E5404F", display: "inline-block", flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E5404F" }}>
              EdTech Students
            </span>
          </div>
          <MarqueeColumn items={EDTECH_TESTIMONIALS} speed={28} />
        </div>

        {/* Consultancy column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#124898", display: "inline-block", flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#124898" }}>
              Consultancy Clients
            </span>
          </div>
          <MarqueeColumn items={CONSULTANCY_TESTIMONIALS} speed={22} reversed />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
