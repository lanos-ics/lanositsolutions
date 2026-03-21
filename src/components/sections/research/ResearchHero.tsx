import FlipWords from "@/components/ui/FlipWords";
import RDCountdown from "./RDCountdown";

export default function ResearchHero() {
  const FLIP_WORDS_MIN_WIDTH = "18ch";

  return (
    <section 
      className="r-hero" 
      style={{ 
        display: "flex", 
        position: "relative", 
        overflow: "hidden", 
        minHeight: "70vh", // Reduced from 80vh to bring content up
        paddingTop: "2rem", // Explicitly reduced top whitespace
        alignItems: "flex-start" // Ensures content starts from the top
      }}
    >
      {/* Background grid */}
      <svg aria-hidden className="r-svg-grid">
        <defs>
          <pattern id="r-grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#1A1A1B" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#r-grid)" />
      </svg>

      {/* ── Left column ── */}
      <div 
        className="r-hero-left" 
        style={{ 
          flex: 1, 
          zIndex: 2, 
          marginTop: "1.5rem" // Fine-tune this to align with your navbar
        }}
      >
        <div className="r-eyebrow ra" data-delay="0" style={{ marginBottom: "1rem" }}>
          <span className="r-eyebrow-dot" />
          Research &amp; Development
        </div>

        <h1 className="r-hero-heading ra" data-delay="0.08" style={{ marginTop: "0.5rem" }}>
          Pioneering the<br />
          <span className="gradient-text">Future of : </span>
          <br />
          <em>
            <span style={{ 
              display: "inline-flex", 
              minWidth: FLIP_WORDS_MIN_WIDTH,
              whiteSpace: "nowrap" 
            }}>
              <FlipWords
                words={["BCI & EEG", "AR | MR | VR | XR", "Quantum Computers", "IoT & Drone Tech"]}
                duration={2800}
                style={{
                  background: "linear-gradient(125deg, #CD5473 0%, var(--r-accent) 55%, #124898 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  paddingRight: "0.2em",
                }}
              />
            </span>
          </em>
        </h1>

        <p className="r-hero-sub ra" data-delay="0.16" style={{ marginTop: "1.5rem" }}>
          Where ancient logic meets quantum computing. We&apos;re building
          operating systems, programming languages, and brain-computer interfaces
          that redefine what&apos;s possible.
        </p>

        <div className="ra" data-delay="0.22" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginTop: "2rem" }}>
          <a href="#vault" style={{
            fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em",
            color: "#fff", background: "var(--r-accent)", padding: "0.75rem 1.625rem", borderRadius: "99px",
            boxShadow: "0 4px 20px rgba(229,64,79,0.3)",
            transition: "transform 0.2s ease",
          }}>
            Explore Projects ↗
          </a>
          <a href="#grid" style={{
            fontSize: "0.875rem", fontWeight: 500, color: "var(--r-fg)",
            border: "1px solid rgba(26,26,27,0.15)", padding: "0.75rem 1.625rem", borderRadius: "99px",
            transition: "background 0.2s ease",
          }}>
            Join the Research
          </a>
        </div>
      </div>

      {/* ── Right column — Countdown + Watermark ── */}
      <div 
        className="r-hero-right" 
        style={{ 
          position: "relative", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          flex: 1,
          alignSelf: "center" // Keeps the countdown centered vertically in the available space
        }}
      >
        <div 
          className="r-hero-rd-watermark ra" 
          data-delay="0.1"
          style={{
            position: "absolute",
            zIndex: 0,
            fontSize: "clamp(5rem, 12vw, 15rem)", 
            fontWeight: 900,
            opacity: 0.015,
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "var(--r-accent, #E5404F)"
          }}
        >
          R&D
        </div>

        <div style={{ zIndex: 1 }} className="ra" data-delay="0.3">
            <RDCountdown />
        </div>
      </div>
    </section>
  );
}