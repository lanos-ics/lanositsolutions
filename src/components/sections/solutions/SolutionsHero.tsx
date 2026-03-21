import Link from "next/link";
import FlipWords from "@/components/ui/FlipWords";

export default function SolutionsHero() {
  return (
    <section className="s-hero">
      {/* Background grid */}
      <svg aria-hidden className="svg-grid">
        <defs>
          <pattern id="grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#1A1A1B" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow wa" data-delay="0">
          <span className="eyebrow-dot" />
          Lanos IT Solutions
        </div>
        
        <h1 className="wa" data-delay="0.08" style={{
          fontWeight: 200,
          fontSize: "clamp(2.1rem, 6vw, 5.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
          marginBottom: "1.5rem",
        }}>
          Engineer.<br />
          <em style={{ fontStyle: "italic", fontWeight: 300, whiteSpace: "nowrap" }}>
            <span style={{
              background: "linear-gradient(125deg, var(--accent) 0%, #CD5473 35%, #124898 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Architect </span>
            <FlipWords 
              words={["Platforms.", "Systems.", "Scale."]} 
              duration={2800} 
              style={{
                background: "linear-gradient(125deg, #CD5473 0%, var(--accent) 55%, #124898 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                paddingRight: "0.07em",
              }}
            />
          </em>
        </h1>
        
        <p className="hero-sub wa" data-delay="0.16">
          Self-Owned SaaS. AI-Embedded Platforms.
          Microservice Architecture on AWS.
          Systems built to outlast the roadmap.
        </p>

        <div className="wa" data-delay="0.22" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="#platforms" style={{
            fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em",
            color: "#fff", background: "var(--accent)", padding: "0.75rem 1.625rem", borderRadius: "99px",
            boxShadow: "0 4px 20px rgba(229,64,79,0.3)",
          }}>
            Explore Platforms ↗
          </Link>
          <Link href="/contact" style={{
            fontSize: "0.875rem", fontWeight: 500, color: "var(--fg)",
            border: "1px solid rgba(26,26,27,0.15)", padding: "0.75rem 1.625rem", borderRadius: "99px",
          }}>
            Partner With Lanos
          </Link>
        </div>

        <div className="hero-stats wa" data-delay="0.3">
          {[{ n: "10", s: "+", l: "Active Products" }, { n: "99.9", s: "%", l: "Uptime SLA" }, { n: "3", s: "×", l: "Faster Delivery" }].map((s) => (
            <div key={s.l}>
              <div className="stat-num">{s.n}<span>{s.s}</span></div>
              <div className="stat-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="s-hero-right wa" data-delay="0.2">
        <div className="hero-diagram">
          <div className="hd-topbar">
            <div className="hd-dot" style={{ background: "#ff5f57" }} />
            <div className="hd-dot" style={{ background: "#febc2e" }} />
            <div className="hd-dot" style={{ background: "#28c840" }} />
            <div className="hd-title">Architecture</div>
          </div>
          <div className="hd-node hdn-gateway">API Gateway · OpenAPI / Swagger</div>
          <div className="hd-conn" />
          <div className="hd-row">
            <div className="hd-node hdn-svc">Auth Service</div>
            <div className="hd-node hdn-svc">User Service</div>
          </div>
          <div className="hd-conn" />
          <div style={{ position: "relative" }}>
            <div className="hd-node hdn-ai">
              <div className="hdn-ai-shine" />
              ✦ AI Layer · Workflow Engine
            </div>
            <div className="hd-pulse" />
          </div>
          <div className="hd-conn" />
          <div className="hd-row">
            <div className="hd-node hdn-db">MySQL</div>
            <div className="hd-node hdn-db">Audit Logs</div>
          </div>
          <div className="hd-conn" />
          <div className="hd-node hdn-aws">☁ AWS · Docker · K8s · CI/CD</div>
        </div>
      </div>
    </section>
  );
}
