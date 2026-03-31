"use client";

import { useState } from "react";

/* ─── Reusable bottom-border input ──────────────────────────── */
function GhostInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: {
  id:          string;
  label:       string;
  type?:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder: string;
  error?:      string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label
          htmlFor={id}
          style={{
            fontSize:      "0.68rem",
            fontWeight:    600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "var(--fg-muted)",
          }}
        >
          {label}
        </label>
        {error && <span style={{ fontSize: "0.68rem", color: "var(--accent)" }}>{error}</span>}
      </div>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background:   "transparent",
          border:       "none",
          borderBottom: focused 
            ? "1px solid var(--accent)"
            : "1px solid rgba(26,26,27,0.18)",
          borderRadius: 0,
          outline:      "none",
          padding:      "0.55rem 0",
          fontSize:     "0.9rem",
          fontWeight:   400,
          color:        "var(--fg)",
          fontFamily:   "inherit",
          width:        "100%",
          transition:   "border-color 0.22s ease, box-shadow 0.22s ease",
          boxShadow:    focused
            ? "0 2px 0 -1px rgba(229,64,79,0.25)"
            : "none",
        }}
      />
    </div>
  );
}

/* ─── Contact Section ────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [field]: v }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Required";
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) errs.email = "Required";
    else if (!EMAIL_RE.test(form.email)) errs.email = "Invalid email formatting";
    if (!form.mobile.trim()) errs.mobile = "Required";
    if (!form.message.trim()) errs.message = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        padding:          "clamp(5rem, 10vw, 10rem) clamp(1.75rem, 8vw, 9rem)",
        position:         "relative",
        zIndex:           1,
        borderTop:        "1px solid rgba(26,26,27,0.07)",
      }}
    >
      {/* Ambient glow behind form */}
      <div
        aria-hidden
        style={{
          position:     "absolute",
          right:        "10%",
          top:          "50%",
          transform:    "translateY(-50%)",
          width:        "500px",
          height:       "500px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(229,64,79,0.07) 0%, transparent 70%)",
          pointerEvents:"none",
        }}
      />

      <div
        className="contact-grid"
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "clamp(3rem, 8vw, 8rem)",
          alignItems:          "center",
          position:            "relative",
        }}
      >
        {/* ── Left: copy + location ──────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <span
              style={{
                display:       "block",
                fontSize:      "0.7rem",
                fontWeight:    700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                marginBottom:  "1rem",
                opacity:       0.75,
              }}
            >
              Get in touch
            </span>
            <h2
              style={{
                fontWeight:    200,
                fontSize:      "clamp(2.2rem, 4.5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                lineHeight:    1.08,
                color:         "var(--fg)",
              }}
            >
              Let's build the{" "}
              <br />
              <em
                style={{
                  fontStyle:  "italic",
                  fontWeight: 300,
                  background: "linear-gradient(125deg, var(--accent) 0%, #CD5473 60%, #124898 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:       "text",
                  paddingRight:         "0.05em",
                }}
              >
                tech future together.
              </em>
            </h2>
          </div>

          <p
            style={{
              fontSize:   "clamp(0.95rem, 1.3vw, 1.1rem)",
              color:      "var(--fg-muted)",
              lineHeight: 1.72,
              maxWidth:   "38ch",
            }}
          >
            Whether you're looking to launch an EdTech product, modernise your
            tech stack, or explore a research partnership — we'd love to hear
            from you.
          </p>

          {/* Location block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <span
              style={{
                fontSize:      "0.68rem",
                fontWeight:    700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                opacity:       0.65,
              }}
            >
              Location
            </span>
            <span style={{ fontSize: "0.95rem", color: "var(--fg)", fontWeight: 500 }}>
              Sagar, Madhya Pradesh, India 470004
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
              Building from Sagar. Scaling to global systems.
            </span>
          </div>

          {/* Email link */}
          <a
            href="mailto:contact@lanositsolutions.com"
            style={{
              fontSize:      "0.9rem",
              fontWeight:    500,
              color:         "var(--accent)",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.4rem",
              textDecoration:"none",
              letterSpacing: "-0.01em",
            }}
          >
            contact@lanositsolutions.com ↗
          </a>
        </div>

        {/* ── Right: form ────────────────────────────────────── */}
        <div>
          {submitted ? (
            /* Success state */
            <div
              style={{
                display:        "flex",
                flexDirection:  "column",
                gap:            "1rem",
                alignItems:     "flex-start",
                padding:        "3rem 0",
              }}
            >
              <div
                style={{
                  width:          "3rem",
                  height:         "3rem",
                  borderRadius:   "50%",
                  background:     "var(--accent-soft)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "1.4rem",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontWeight:    400,
                  fontSize:      "1.4rem",
                  letterSpacing: "-0.025em",
                  color:         "var(--fg)",
                }}
              >
                Message received.
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", lineHeight: 1.7 }}>
                We'll be in touch within 24 hours. In the meantime, explore{" "}
                <a href="/blog" style={{ color: "var(--accent)", textDecoration: "none" }}>
                  our thinking →
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
              noValidate
            >
              <GhostInput
                id="contact-name"
                label="Your name"
                value={form.name}
                onChange={set("name")}
                placeholder="Ada Lovelace"
                error={errors.name}
              />
              <GhostInput
                id="contact-email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="ada@example.com"
                error={errors.email}
              />
              <GhostInput
                id="contact-mobile"
                label="Mobile Number"
                type="tel"
                value={form.mobile}
                onChange={set("mobile")}
                placeholder="+91 98765 43210"
                error={errors.mobile}
              />
              <GhostInput
                id="contact-goal"
                label="What's your goal?"
                value={form.message}
                onChange={set("message")}
                placeholder="Launch an EdTech platform, modernise our stack…"
                error={errors.message}
              />

              {/* Submit CTA */}
              <div style={{ paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display:      "inline-flex",
                    alignItems:   "center",
                    gap:          "0.65rem",
                    background:   "none",
                    border:       "none",
                    cursor:       loading ? "not-allowed" : "pointer",
                    padding:      0,
                    fontFamily:   "inherit",
                    fontSize:     "1.05rem",
                    fontWeight:   500,
                    color:        "var(--fg)",
                    letterSpacing:"-0.01em",
                  }}
                  className="contact-submit"
                >
                  <span className="submit-text" style={{ transition: "color 0.2s ease", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Sending..." : "Send message"}
                  </span>
                  <span
                    className="submit-arrow"
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      width:          "2.5rem",
                      height:         "2.5rem",
                      borderRadius:   "50%",
                      background:     "var(--fg)",
                      color:          "var(--bg)",
                      fontSize:       "1.1rem",
                      transition:     "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), background 0.22s ease",
                      flexShrink:     0,
                    }}
                  >
                    ↗
                  </span>
                </button>
              </div>

              <style>{`
                .contact-submit:hover .submit-arrow {
                  transform: translate(3px, -3px);
                  background: var(--accent);
                }
                .contact-submit:hover .submit-text { color: var(--accent); }

                /* Mobile responsive */
                @media (max-width: 768px) {
                  .contact-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
            </form>
          )}
        </div>
      </div>

      {/* ── Google Maps embed ─────────────────────────────────── */}
      <div
        style={{
          marginTop:    "4rem",
          borderRadius: "1.25rem",
          overflow:     "hidden",
          border:       "1px solid rgba(26,26,27,0.08)",
          boxShadow:    "0 4px 32px rgba(26,26,27,0.06)",
          height:       "420px",
          position:     "relative",
          zIndex:       1,
        }}
      >
        <iframe
          title="Lanos IT Solutions — Sagar Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.070936081933!2d78.79311919999999!3d23.8516147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d1a4df0cf14f%3A0x6e1342daf268b94e!2sLanos%20It%20Solutions!5e0!3m2!1sen!2sin!4v1774940280999!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", filter: "grayscale(0.2) contrast(1.02)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
