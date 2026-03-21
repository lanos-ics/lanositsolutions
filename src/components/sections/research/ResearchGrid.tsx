export default function ResearchGrid() {
  const quadrants = [
    {
      num: "01",
      icon: "🧠",
      title: "EEG / BCI",
      desc: "Neural signal processing, brain-computer interfaces, and real-time cognitive state detection.",
    },
    {
      num: "02",
      icon: "🥽",
      title: "Extended Reality (XR)",
      desc: "AR, MR, VR experimental prototypes — spatial computing and immersive research environments.",
    },
    {
      num: "03",
      icon: "⌨️",
      title: "OS / Language Dev",
      desc: "LA-OS-N kernel development and the Sanskrit programming language compiler toolchain.",
    },
    {
      num: "04",
      icon: "🤖",
      title: "IoT + AI Agents",
      desc: "Autonomous drone systems, edge computing networks, and intelligent agent architectures.",
    },
  ];

  return (
    <section id="grid" className="r-grid-section">
      <div className="r-eyebrow r-eyebrow--dark ra" data-delay="0">
        <span className="r-eyebrow-dot" />
        Research Divisions
      </div>

      <h2 className="r-grid-heading ra" data-delay="0.06">
        Become Part of the Research
      </h2>
      <p className="r-grid-sub ra" data-delay="0.12">
        Four specialized labs. Each pushing boundaries in a different dimension
        of computing&apos;s future.
      </p>

      <div className="r-quad-grid">
        {quadrants.map((q, i) => (
          <div key={q.num} className="r-quad ra" data-delay={0.1 + i * 0.08}>
            <span className="r-quad-number">{q.num}</span>
            <div className="r-quad-icon">{q.icon}</div>
            <div className="r-quad-title">{q.title}</div>
            <div className="r-quad-desc">{q.desc}</div>
            <button className="r-quad-btn">
              View Lab Notes →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
