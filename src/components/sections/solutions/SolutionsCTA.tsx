import Link from "next/link";

export default function SolutionsCTA() {
  return (
    <section className="s-cta" style={{
      padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)",
      background: "var(--fg)", color: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(229,64,79,0.2), transparent 70%)", top: "-100px", left: "-100px", mixBlendMode: "screen" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(18,72,152,0.15), transparent 70%)", bottom: "-80px", right: 0, mixBlendMode: "screen" }} />
      
      <div style={{ position: "relative", zIndex: 1 }} className="wa">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
          Let's Build Together
        </div>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem", color: "#fff" }}>
          Ready to <em style={{ fontStyle: "italic", fontWeight: 200, color: "rgba(255,255,255,0.6)" }}>architect</em><br />something that lasts?
        </h2>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: "48ch", margin: "0 auto 3rem", lineHeight: 1.6 }}>
          Whether you need an AI-powered product, a scalable platform, or engineering
          that will survive growth — we'd like to hear from you.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-cta-glow" style={{
            background: "#fff", color: "var(--fg)", fontSize: "0.9375rem", fontWeight: 600,
            padding: "0.875rem 2rem", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "0.5rem"
          }}>
            Start a conversation ↗
          </Link>
          <Link href="/rd" style={{
            border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.9375rem", fontWeight: 600,
            padding: "0.875rem 2rem", borderRadius: "99px",
          }}>
            Explore R&D
          </Link>
        </div>
      </div>
    </section>
  );
}
