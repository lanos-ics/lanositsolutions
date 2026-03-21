export default function SolutionsAIWorkflows() {
  return (
    <section className="s-section" id="ai">
      <div className="eyebrow wa"><span className="eyebrow-dot" /> AI Embedded Workflows</div>
      <div className="two-col" style={{ alignItems: "end", gap: "2rem", marginBottom: "3rem" }}>
        <h2 className="ed-h wa" data-delay="0.05">AI at the<br /><em>system layer.</em></h2>
        <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)" }}>
          We don't add AI as a feature. We engineer it as infrastructure — embedded in the workflow engine where it makes decisions, not decorations.
        </p>
      </div>
      <div className="card-grid">
        {[
          { n: "01", icon: "⎋", title: "Customer Service Flows.", desc: "AI-assisted routing, response generation, and escalation logic embedded inside support systems." },
          { n: "02", icon: "⌗", title: "Intelligent Report Generation.", desc: "Structured data analysed and narrated by language models — reports that read like insights.", highlight: true },
          { n: "03", icon: "⚙", title: "Workflow Automation Agents.", desc: "Autonomous agents that act on triggers, manage queues, and complete multi-step tasks without handoffs." },
          { n: "04", icon: "⬚", title: "Business Decision Support.", desc: "AI layers that surface anomalies, recommend actions, and reduce cognitive load for operators." },
          { n: "05", icon: "◫", title: "Dashboard Intelligence.", desc: "AI chat embedded inside dashboards — your team asks questions, the system answers with data.", highlight: true },
        ].map((c, i) => (
          <div key={c.n} className={`ncard wa ${c.highlight ? 'highlight' : ''}`} data-delay={0.05 * i}>
            <span className="ncard-num">{c.n}</span>
            <div className="ncard-icon">{c.icon}</div>
            <div className="ncard-title">{c.title}</div>
            <div className="ncard-desc">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className="wa" data-delay="0.25" style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", background: "rgba(18,72,152,0.04)", border: "1px solid rgba(18,72,152,0.12)", borderRadius: "16px" }}>
        <span style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: "0.9375rem", fontWeight: 600, color: "var(--navy)" }}>
          // AI is not an add-on. It is embedded into the system layer.
        </span>
      </div>
    </section>
  );
}
