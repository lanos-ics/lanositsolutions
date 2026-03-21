export default function SolutionsTalent() {
  return (
    <section className="s-section" id="talent" style={{ background: "rgba(229,64,79,0.02)" }}>
      <div className="eyebrow wa"><span className="eyebrow-dot" /> Talent Engine</div>
      <div className="two-col">
        <div>
          <h2 className="ed-h wa" data-delay="0.05">Our secret<br /><em>engineering force.</em></h2>
          <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", marginTop: "1rem", marginBottom: "2.5rem" }}>
            Our engineering team is cultivated from within — through our own EdTech division,
            creating a self-reinforcing pipeline of production-ready engineers.
          </p>
          <div className="pipeline-steps">
            {[
              { step: "01", title: "EdTech Division", desc: "Industry-aligned curriculum built around real-world engineering standards." },
              { step: "02", title: "Internship Pipeline", desc: "Top learners transition directly into structured internship tracks." },
              { step: "03", title: "Product Team Integration", desc: "Interns who demonstrate production-level output join the core product engineering team." },
              { step: "04", title: "R&D Acceleration", desc: "Senior engineers feed back into research — keeping the system ahead of the curve." },
            ].map((s, i) => (
              <div className="ps wa" data-delay={0.1 * i} key={s.step} style={{ display: "flex", gap: "1.25rem", marginBottom: "2rem" }}>
                <div className="ps-circle" style={{ width: "2.5rem", height: "2.5rem", background: "#fff", border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--fg)", flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>{s.title}</div>
                  <div style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="wa" data-delay="0.2">
          <div style={{ background: "var(--fg)", borderRadius: "16px", padding: "clamp(2rem, 4vw, 3rem)", color: "#fff", position: "relative", overflow: "hidden" }}>
            <div className="orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(229,64,79,0.25), transparent 70%)", top: "-50px", right: "-50px", mixBlendMode: "screen" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>Why It Matters</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.35, marginBottom: "1rem" }}>
                Our engineering force is continuously upgraded through our internal education ecosystem.
              </div>
              <div style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                This is not a recruitment strategy. It is an architectural decision applied to the organisation itself.
                The result: lower overhead, higher quality, and engineering culture that does not drift.
              </div>
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["Education shapes standards", "Interns build real products", "Engineers own production systems", "Output funds better education"].map((t, i) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(229,64,79,0.2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
