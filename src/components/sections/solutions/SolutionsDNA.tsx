export default function SolutionsDNA() {
  return (
    <section className="s-section" id="dna" style={{ paddingTop: "clamp(3rem,6vw,5rem)" }}>
      <div className="eyebrow wa"><span className="eyebrow-dot" /> Engineering DNA</div>
      <div className="two-col" style={{ alignItems: "end", gap: "2rem" }}>
        <h2 className="ed-h wa" data-delay="0.05">
          How we build<br /><em>is who we are.</em>
        </h2>
        <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", paddingBottom: "0.5rem" }}>
          We don't use drag-and-drop builders, no-code shortcuts, or unmanaged AI code.
          Every system is engineered from first principles — with architecture built to survive growth.
        </p>
      </div>

      <div className="card-grid" id="platforms">
        {[{ n: "01", icon: "⬡", title: "Clean Architecture.", desc: "Domain-driven, layered structures that separate concerns clearly and survive years of change." },
          { n: "02", icon: "⬢", title: "Microservices.", desc: "Independently deployable services with well-defined contracts — no shared-state nightmares." },
          { n: "03", icon: "⇄", title: "CI/CD Pipelines.", desc: "Automated testing, build, and deployment on every merge. No broken mains. No surprises." },
          { n: "04", icon: "□", title: "Containerized Deploy.", desc: "Docker + Kubernetes for reproducible, environment-agnostic delivery at any scale.", highlight: true },
          { n: "05", icon: "⊕", title: "Version Control.", desc: "Branching strategy, commit standards, and enforced code review gates baked into every workflow.", highlight: true },
          { n: "06", icon: "≡", title: "Documentation-First.", desc: "OpenAPI specs, ADRs, and runbooks ship alongside every line of code — always." },
        ].map((c, i) => (
          <div key={c.n} className={`ncard wa ${c.highlight ? 'highlight' : ''}`} data-delay={0.05 * i}>
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
