export default function SolutionsStack() {
  return (
    <section className="s-section" style={{ paddingTop: "clamp(3rem,6vw,5rem)" }}>
      <div className="two-col" style={{ alignItems: "end", gap: "2rem" }}>
        <div>
          <div className="eyebrow wa"><span className="eyebrow-dot" /> Architecture Stack</div>
          <h2 className="ed-h wa" data-delay="0.05">Built on<br /><em>proven foundations.</em></h2>
        </div>
        <p className="wa" data-delay="0.1" style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", paddingBottom: "0.25rem" }}>
          Every layer chosen for maintainability, observability, and production resilience.
          Cloud-native by default. Containerised always.
        </p>
      </div>
      <div className="stack-table wa" data-delay="0.15">
        {[
          { lbl: "Client",   chips: [{ t: "React / Next.js", c: "cd" }, { t: "Mobile (Android/iOS)", c: "cm" }] },
          { lbl: "Gateway",  chips: [{ t: "API Gateway", c: "cn" }, { t: "OpenAPI / Swagger", c: "cn" }] },
          { lbl: "Services", chips: [{ t: "Spring Boot", c: "cr" }, { t: "Microservices", c: "cr" }, { t: "Docker", c: "cd" }, { t: "Kubernetes", c: "cd" }] },
          { lbl: "AI Layer", chips: [{ t: "OpenAI API", c: "cr" }, { t: "Workflow Agents", c: "cm" }] },
          { lbl: "Database", chips: [{ t: "MySQL", c: "cn" }, { t: "Audit Logs", c: "cm" }] },
          { lbl: "CI / CD",  chips: [{ t: "GitHub Actions", c: "cd" }, { t: "Automated Testing", c: "cm" }] },
          { lbl: "Cloud",    chips: [{ t: "AWS", c: "ca" }, { t: "EC2 · S3 · RDS · Lambda", c: "ca" }] },
        ].map((row) => (
          <div className="stack-row" key={row.lbl}>
            <div className="stack-lbl">{row.lbl}</div>
            <div className="stack-chips">
              {row.chips.map((c) => <span className={`chip ${c.c}`} key={c.t}>{c.t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
