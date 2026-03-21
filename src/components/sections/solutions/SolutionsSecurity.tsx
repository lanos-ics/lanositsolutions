export default function SolutionsSecurity() {
  return (
    <section className="s-section" id="security">
      <div className="eyebrow wa"><span className="eyebrow-dot" /> Security &amp; Compliance</div>
      <div className="two-col" style={{ alignItems: "end", gap: "2rem", marginBottom: "3rem" }}>
        <h2 className="ed-h wa" data-delay="0.05">Built for<br /><em>enterprise trust.</em></h2>
        <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)" }}>
          Security is embedded at the architecture level — from the first commit to the production environment.
        </p>
      </div>
      <div className="sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {[
          { icon: "🔐", title: "Secure Coding", desc: "OWASP-aligned standards enforced through mandatory peer review on every pull request." },
          { icon: "👤", title: "Role-Based Access Control", desc: "Granular RBAC across all services — principle of least privilege by default." },
          { icon: "🔒", title: "Encryption at Rest & Transit", desc: "AES-256 at rest, TLS 1.3 in transit. No exceptions for production." },
          { icon: "📋", title: "Audit Logging", desc: "Immutable audit trails for all sensitive operations, integrated with monitoring dashboards." },
          { icon: "📡", title: "Infrastructure Monitoring", desc: "Real-time alerting on AWS CloudWatch and custom health endpoints across all services." },
          { icon: "☁", title: "AWS Security Standards", desc: "VPC isolation, IAM least-privilege, security groups, and regular penetration test cycles." },
        ].map((s, i) => (
          <div className="wa" data-delay={0.05 * i} key={s.title} style={{ background: "var(--card-bg)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", padding: "2rem", borderRadius: "1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ fontSize: "1.5rem" }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.4rem" }}>{s.title}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
