export default function ProjectVault() {
  return (
    <>
      {/* Gradient transition from light to dark */}
      <div className="r-transition-zone" />

      <section id="vault" className="r-vault">
        {/* Background grid for dark */}
        <svg aria-hidden className="r-svg-grid">
          <defs>
            <pattern id="r-grid-dark" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#r-grid-dark)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="r-eyebrow r-eyebrow--dark ra" data-delay="0">
            <span className="r-eyebrow-dot" />
            Project Vault
          </div>

          <h2 className="r-vault-heading ra" data-delay="0.06">
            Active <em>Research Projects</em>
          </h2>
          <p className="r-vault-sub ra" data-delay="0.12">
            Four moonshot initiatives operating at the intersection of
            hardware, software, and human cognition.
          </p>

          <div className="r-vault-grid">
            {/* ── 1. LA-OS-N  (Terminal Card) ── */}
            <div className="r-vault-card r-card-terminal ra" data-delay="0.1">
              <div className="r-terminal-bar">
                <div className="r-terminal-dot" style={{ background: "#ff5f57" }} />
                <div className="r-terminal-dot" style={{ background: "#febc2e" }} />
                <div className="r-terminal-dot" style={{ background: "#28c840" }} />
                <span className="r-terminal-title">la-os-n v0.1.0</span>
              </div>
              <div className="r-terminal-line">$ boot --init la-os-n</div>
              <div className="r-terminal-line">&gt; Initializing kernel modules...</div>
              <div className="r-terminal-line">&gt; Loading custom scheduler...</div>
              <div className="r-terminal-line">&gt; AI inference engine: READY</div>
              <div className="r-terminal-line">
                &gt; Status: IN DEVELOPMENT<span className="r-terminal-cursor" />
              </div>
              <div style={{ marginTop: "1.25rem" }}>
                <div className="r-vault-card-title" style={{ color: "rgba(0, 255, 65, 0.85)" }}>
                  LA-OS-N
                </div>
                <div className="r-vault-card-desc" style={{ color: "rgba(0, 255, 65, 0.4)" }}>
                  A custom operating system built from the ground up — optimized for AI workloads,
                  real-time processing, and seamless hardware integration. The OS that thinks.
                </div>
              </div>
            </div>

            {/* ── 2. Sanskrit Programming Language ── */}
            <div className="r-vault-card r-card-sanskrit ra" data-delay="0.18">
              <div className="r-vault-card-tag">PROJECT · SANSKRIT</div>
              <div className="r-vault-card-title">
                Sanskrit Programming Language
              </div>
              <div className="r-vault-card-desc">
                The intersection of ancient logic and modern code. A programming
                language rooted in the grammatical precision of Pāṇini&apos;s Aṣṭādhyāyī,
                designed for mathematical purity and computational clarity.
              </div>
              {/* Devnagari watermark */}
              <div className="r-sanskrit-watermark" aria-hidden>
                संस्कृत
              </div>
            </div>

            {/* ── 3. Smart Goggles ── */}
            <div className="r-vault-card ra" data-delay="0.24">
              <div className="r-vault-card-tag">PROJECT · GOGGLES</div>
              <div className="r-vault-card-title">
                Smart Goggles
              </div>
              <div className="r-vault-card-desc">
                BCI-integrated &lsquo;Thought-to-Text&rsquo; display. Using EEG sensors
                and neural decoding algorithms, these goggles translate cognitive
                intent into real-time visual output — hands-free computing, redefined.
              </div>
            </div>

            {/* ── 4. Digital World Simulation ── */}
            <div className="r-vault-card ra" data-delay="0.30">
              <div className="r-vault-card-tag">PROJECT · SIMULATION</div>
              <div className="r-vault-card-title">
                Digital World Simulation
              </div>
              <div className="r-vault-card-desc">
                A macro-scale virtual environment simulating real-world systems —
                from city infrastructure to climate patterns. Built for testing
                IoT networks, AI agents, and quantum algorithms at planetary scale.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
