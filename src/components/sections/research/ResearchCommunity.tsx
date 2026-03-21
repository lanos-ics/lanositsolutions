export default function ResearchCommunity() {
  const jobs = [
    { role: "Kernel Engineer — LA-OS-N", dept: "OS Development" },
    { role: "Compiler Developer — Sanskrit Lang", dept: "Language R&D" },
    { role: "BCI/EEG Research Scientist", dept: "Neurotech" },
    { role: "XR Prototyping Lead", dept: "Extended Reality" },
    { role: "AI Agent Architect", dept: "IoT & Agents" },
  ];

  const team = [
    { initials: "YN", name: "Yash N." },
    { initials: "AK", name: "Team Lead" },
    { initials: "RS", name: "Researcher" },
    { initials: "PD", name: "Engineer" },
    { initials: "MK", name: "Designer" },
  ];

  const partners = [
    "AWS", "NVIDIA", "IEEE", "arXiv", "TensorFlow",
  ];

  return (
    <section className="r-community">
      {/* ── Community CTA ── */}
      <div className="r-cta-block ra" data-delay="0">
        <h2 className="r-cta-heading">
          Join the Frontier
        </h2>
        <p className="r-cta-sub">
          We&apos;re building technology that doesn&apos;t exist yet.
          If that excites you more than it scares you, you belong here.
        </p>
        <button className="r-cta-btn">
          Apply to Research Labs ↗
        </button>
      </div>

      {/* ── Jobs ── */}
      <div className="r-jobs ra" data-delay="0.06">
        <div className="r-jobs-header">
          <h3 className="r-jobs-title">See All Hirings</h3>
          <span className="r-jobs-count">{jobs.length} Active</span>
        </div>

        {jobs.map((job) => (
          <div key={job.role} className="r-job-row">
            <div>
              <div className="r-job-role">{job.role}</div>
              <div className="r-job-dept">{job.dept}</div>
            </div>
            <span className="r-job-arrow">→</span>
          </div>
        ))}
      </div>

      {/* ── Team & Partners ── */}
      <div className="ra" data-delay="0.12">
        <h3 className="r-team-heading">Core Team</h3>
        <div className="r-team-grid">
          {team.map((member) => (
            <div
              key={member.initials}
              className="r-team-avatar"
              title={member.name}
            >
              {member.initials}
            </div>
          ))}
        </div>

        <div className="r-partners">
          <div className="r-partners-label">Technology Partners</div>
          <div className="r-partner-cloud">
            {partners.map((p) => (
              <span key={p} className="r-partner-logo">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
