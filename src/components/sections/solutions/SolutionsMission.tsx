export default function SolutionsMission() {
  return (
    <section className="s-section" style={{ background: "rgba(229,64,79,0.02)", paddingTop: "clamp(3rem,6vw,5rem)" }}>
      <div className="eyebrow wa"><span className="eyebrow-dot" /> Primary Mission</div>
      <h2 className="ed-h wa" data-delay="0.05">Self-Owned SaaS<br /><em>&amp; Platform Products.</em></h2>
      <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", marginTop: "1rem", marginBottom: 0, maxWidth: "52ch" }}>
        Our core identity is building and owning intelligent platforms — not just delivering client projects.
        Every client engagement informs our product thinking.
      </p>

      <div className="card-grid" style={{ marginTop: "3rem" }}>
        {[{ n: "01", icon: "◈", title: "Vertical SaaS Platforms.", desc: "Industry-specific intelligent systems engineered from the ground up for the workflows that matter most." },
          { n: "02", icon: "✦", title: "AI-Integrated Workflow Engines.", desc: "OpenAI-powered automation embedded directly into business processes — not bolted on as an afterthought.", highlight: true },
          { n: "03", icon: "◬", title: "Platform-as-a-Service.", desc: "APIs, infrastructure modules, and integration services that other developers build on top of." },
        ].map((c, i) => (
          <div key={c.n} className={`ncard wa ${c.highlight ? 'highlight' : ''}`} data-delay={0.08 * i}>
            <span className="ncard-num">{c.n}</span>
            <div className="ncard-icon">{c.icon}</div>
            <div className="ncard-title">{c.title}</div>
            <div className="ncard-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
