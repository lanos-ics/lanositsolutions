export default function SolutionsPricing() {
  return (
    <section className="s-section" style={{ background: "rgba(26,26,27,0.01)" }}>
      <div className="eyebrow wa"><span className="eyebrow-dot" /> Pricing Philosophy</div>
      <div className="two-col">
        <div>
          <h2 className="ed-h wa" data-delay="0.05">Enterprise quality.<br /><em>No inflated overhead.</em></h2>
          <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", marginTop: "1rem" }}>
            We are not the cheapest option. We are the most efficient. Our internal talent pipeline
            and lean engineering model reduce operational cost without reducing output quality.
          </p>
        </div>
        <div className="wa" data-delay="0.15">
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(26,26,27,0.04)" }}>
            {[
              ["Internal Talent Pipeline", "↓ Cost Basis"],
              ["Efficient Architecture Patterns", "↑ Delivery Speed"],
              ["Reusable Platform Components", "↓ Rebuild Cost"],
              ["CI/CD Automation", "↓ Manual Hours"],
              ["Documented Systems", "↓ Handoff Cost"],
            ].map(([l, r], i, a) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: i < a.length - 1 ? "1px solid var(--border)" : "none", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--fg)", fontWeight: 500 }}>{l}</span>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em" }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
