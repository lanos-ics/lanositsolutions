"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Track {
  num: string;
  label: string;
  sub: string;
  isNew?: boolean;
  isResearch?: boolean;
}

interface Group {
  id: string;
  emoji: string;
  label: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  tracks: Track[];
}

/* ─── Category groups ────────────────────────────────────────────── */
const GROUPS: Group[] = [
  {
    id: "foundation",
    emoji: "🔰",
    label: "Foundation",
    accent: "#E5404F",
    accentBg: "rgba(229,64,79,0.08)",
    accentBorder: "rgba(229,64,79,0.18)",
    accentGlow: "rgba(229,64,79,0.11)",
    tracks: [
      {
        num: "01",
        label: "Programming Foundations",
        sub: "Start from zero and build strong logical and coding fundamentals.",
      },
      {
        num: "06",
        label: "Programming Mastery",
        sub: "Master languages like Java, Python, C++, and system-level thinking.",
      },
    ],
  },
  {
    id: "web",
    emoji: "🌐",
    label: "Web Systems",
    accent: "#2A7DE1",
    accentBg: "rgba(42,125,225,0.08)",
    accentBorder: "rgba(42,125,225,0.18)",
    accentGlow: "rgba(42,125,225,0.11)",
    tracks: [
      {
        num: "02",
        label: "Web Design & UI Systems",
        sub: "Design modern, responsive interfaces with real-world design principles.",
      },
      {
        num: "03",
        label: "Frontend Engineering",
        sub: "Build interactive, scalable user interfaces using modern frameworks.",
      },
      {
        num: "04",
        label: "Backend Systems",
        sub: "Develop secure, scalable server-side applications and architectures.",
      },
      {
        num: "05",
        label: "API & System Integration",
        sub: "Design and build REST APIs powering real-world applications.",
      },
    ],
  },
  {
    id: "data-security",
    emoji: "📊",
    label: "Data + Security",
    accent: "#1DAB6E",
    accentBg: "rgba(29,171,110,0.08)",
    accentBorder: "rgba(29,171,110,0.18)",
    accentGlow: "rgba(29,171,110,0.11)",
    tracks: [
      {
        num: "12",
        label: "Data Science & Analytics",
        sub: "Analyze data, build models, and extract actionable business insights.",
        isNew: true,
      },
      {
        num: "07",
        label: "Cyber Security",
        sub: "Understand vulnerabilities and secure real-world applications and systems.",
      },
    ],
  },
  {
    id: "advanced",
    emoji: "⚙️",
    label: "Advanced Systems",
    accent: "#9B5CF6",
    accentBg: "rgba(155,92,246,0.08)",
    accentBorder: "rgba(155,92,246,0.18)",
    accentGlow: "rgba(155,92,246,0.11)",
    tracks: [
      {
        num: "08",
        label: "IoT & Drone Technology",
        sub: "Build connected systems, embedded devices, and automation solutions.",
      },
      {
        num: "09",
        label: "AR / VR / XR Systems",
        sub: "Create immersive digital experiences and spatial computing applications.",
      },
      {
        num: "10",
        label: "BCI & EEG Research",
        sub: "Explore brain-computer interfaces and next-generation neurotechnology.",
        isResearch: true,
      },
    ],
  },
  {
    id: "tools",
    emoji: "🏗️",
    label: "Tools",
    accent: "#E88C2A",
    accentBg: "rgba(232,140,42,0.08)",
    accentBorder: "rgba(232,140,42,0.18)",
    accentGlow: "rgba(232,140,42,0.11)",
    tracks: [
      {
        num: "11",
        label: "CAD & Design Software",
        sub: "Work with industry tools like AutoCAD, Revit, SketchUp and design systems.",
      },
      {
        num: "13",
        label: "Digital Accounting & MS Office 360",
        sub: "Master professional productivity and digital finance tools for the modern workplace.",
      },
    ],
  },
];

export default function TechTracksSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    gsap.set(headRef.current, { opacity: 0, y: 32 });
    const t = ScrollTrigger.create({
      trigger: headRef.current,
      start: "top 82%",
      onEnter: () =>
        gsap.to(headRef.current!, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  useEffect(() => {
    if (!bodyRef.current) return;
    const groups = bodyRef.current.querySelectorAll<HTMLElement>(".tts-group");
    groups.forEach((group) => {
      const header = group.querySelector<HTMLElement>(".tts-group-header");
      const cards  = group.querySelectorAll<HTMLElement>(".tts-card");
      if (header) gsap.set(header, { opacity: 0, x: -20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      const t = ScrollTrigger.create({
        trigger: group,
        start: "top 85%",
        onEnter: () => {
          if (header) gsap.to(header, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, delay: 0.1 });
        },
      });
      return () => t.kill();
    });
  }, []);

  return (
    <section
      id="tech-tracks"
      style={{
        position: "relative",
        padding: "7rem clamp(1.75rem, 8vw, 9rem) 8rem",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(1.75rem,8vw,9rem)",
          right: "clamp(1.75rem,8vw,9rem)",
          height: "1px",
          background: "rgba(26,26,27,0.07)",
        }}
      />

      {/* ── Section header ──────────────────────────────────────── */}
      <div ref={headRef} style={{ maxWidth: "72ch", marginBottom: "5.5rem" }}>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            display: "block",
            marginBottom: "1.25rem",
          }}
        >
          Tech Tracks
        </span>
        <p
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
            fontWeight: 200,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            margin: 0,
          }}
        >
          Structured pathways built for{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--fg-muted)" }}>
            depth, not breadth
          </em>
          {" "}— every track maps to a real-world career outcome.
        </p>
      </div>

      {/* ── Groups ──────────────────────────────────────────────── */}
      <div ref={bodyRef} style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
        {GROUPS.map((group) => (
          <div key={group.id} className="tts-group">

            {/* Group header */}
            <div
              className="tts-group-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.75rem",
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{group.emoji}</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: group.accent,
                  padding: "0.3rem 0.85rem",
                  borderRadius: "100px",
                  background: group.accentBg,
                  border: `1px solid ${group.accentBorder}`,
                }}
              >
                {group.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(to right, ${group.accentBorder}, transparent)`,
                  marginLeft: "0.5rem",
                }}
              />
            </div>

            {/* Cards row */}
            <div className="tts-row">
              {group.tracks.map((track) => (
                <div key={track.num} className="tts-card">
                  {/* Top accent bar */}
                  <div
                    className="tts-topbar"
                    style={{ background: group.accent }}
                  />

                  {/* Glow */}
                  <div
                    className="tts-glow"
                    style={{
                      background: `radial-gradient(ellipse at 10% 0%, ${group.accentGlow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Card body */}
                  <div className="tts-card-body">
                    {/* Number + badges row */}
                    <div className="tts-meta-row">
                      <span
                        className="tts-num"
                        style={{ color: group.accent }}
                      >
                        ⚔️ {track.num}
                      </span>
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        {/* Category tag */}
                        <span
                          className="tts-tag"
                          style={{
                            background: group.accentBg,
                            color: group.accent,
                            border: `1px solid ${group.accentBorder}`,
                          }}
                        >
                          {group.label}
                        </span>
                        {/* NEW badge */}
                        {track.isNew && (
                          <span className="tts-badge tts-badge--new">NEW</span>
                        )}
                        {/* RESEARCH badge */}
                        {track.isResearch && (
                          <span className="tts-badge tts-badge--research">Research</span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <p className="tts-label">{track.label}</p>

                    {/* Description */}
                    <p className="tts-sub">{track.sub}</p>

                    {/* Arrow */}
                    <div
                      className="tts-arrow"
                      style={{ color: group.accent }}
                    >
                      ↗
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Scoped styles ────────────────────────────────────────── */}
      <style>{`
        .tts-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }

        .tts-card {
          position: relative;
          border-radius: 14px;
          border: 1px solid rgba(26,26,27,0.09);
          background: rgba(248,249,250,0.72);
          backdrop-filter: blur(8px);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .tts-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
          border-color: rgba(26,26,27,0.16);
        }
        .tts-card:hover .tts-arrow { opacity: 1; transform: translate(0,0); }

        .tts-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 14px 14px 0 0;
        }

        .tts-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .tts-card-body {
          position: relative;
          padding: 1.6rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          min-height: 190px;
        }

        .tts-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tts-num {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          font-family: "JetBrains Mono", monospace;
          opacity: 0.85;
        }

        .tts-tag {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          padding: 0.22rem 0.65rem;
          border-radius: 100px;
        }

        .tts-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.22rem 0.6rem;
          border-radius: 100px;
        }
        .tts-badge--new {
          background: rgba(29,171,110,0.13);
          color: #1DAB6E;
          border: 1px solid rgba(29,171,110,0.25);
        }
        .tts-badge--research {
          background: rgba(155,92,246,0.12);
          color: #9B5CF6;
          border: 1px solid rgba(155,92,246,0.22);
        }

        .tts-label {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--fg);
          margin: 0;
          line-height: 1.3;
        }

        .tts-sub {
          font-size: 0.825rem;
          color: var(--fg-muted);
          margin: 0;
          line-height: 1.55;
          flex: 1;
        }

        .tts-arrow {
          font-size: 1.05rem;
          margin-top: 0.25rem;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.25s, transform 0.25s;
          align-self: flex-end;
        }

        @media (max-width: 600px) {
          .tts-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
