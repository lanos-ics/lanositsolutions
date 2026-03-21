"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Types ───────────────────────────────────────────────────────── */
type Tab = "enquiry" | "counselling" | "guidance";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
  fullProblem: string;
  counsellingInterest: string;
  guidanceCriteria: string;
  cvFile: File | null;
  marksheetFile: File | null;
  linkedinUrl: string;
}

interface Errors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
  fullProblem?: string;
}

/* ─── Tab config ──────────────────────────────────────────────────── */
const TABS: { id: Tab; label: string; submit: string }[] = [
  { id: "enquiry",     label: "Enquiry",     submit: "Send Enquiry"          },
  { id: "counselling", label: "Counselling", submit: "Request Counselling"   },
  { id: "guidance",    label: "Guidance",    submit: "Request Guidance"      },
];

const COUNSELLING_INTERESTS = [
  "Full-Stack Development",
  "Data Science & AI",
  "UI/UX Design",
  "Product Management",
  "Cybersecurity",
  "DevOps & Cloud",
  "Other",
];
const GUIDANCE_CRITERIA = [
  "Academic Performance Improvement",
  "Career Transition Advice",
  "Project Portfolio Review",
  "Startup & Entrepreneurship",
  "Internship Readiness",
  "Other",
];

/* ─── Email regex ─────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EdTechClosingSection() {
  /* refs */
  const leftRef       = useRef<HTMLDivElement>(null);
  const formCardRef   = useRef<HTMLDivElement>(null);
  const fieldsRef     = useRef<HTMLDivElement>(null);
  const indicatorRef  = useRef<HTMLDivElement>(null);
  const tabsBarRef    = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  /* state */
  const [activeTab, setActiveTab] = useState<Tab>("enquiry");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData]   = useState<FormData>({
    name: "", email: "", mobile: "", message: "", fullProblem: "",
    counsellingInterest: "", guidanceCriteria: "",
    cvFile: null, marksheetFile: null, linkedinUrl: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  /* ── Scroll-in: left copy ─────────────────────────────────────── */
  useEffect(() => {
    if (!leftRef.current) return;
    gsap.set(leftRef.current, { opacity: 0, y: 44 });
    const t = ScrollTrigger.create({
      trigger: leftRef.current,
      start: "top 78%",
      onEnter: () =>
        gsap.to(leftRef.current!, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  /* ── Scroll-in: form card ─────────────────────────────────────── */
  useEffect(() => {
    if (!formCardRef.current) return;
    gsap.set(formCardRef.current, { opacity: 0, y: 56 });
    const t = ScrollTrigger.create({
      trigger: formCardRef.current,
      start: "top 82%",
      onEnter: () =>
        gsap.to(formCardRef.current!, {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15,
          onComplete: () => startFloat(),
        }),
    });
    return () => t.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Float loop ───────────────────────────────────────────────── */
  const startFloat = useCallback(() => {
    if (!formCardRef.current) return;
    floatTweenRef.current?.kill();
    floatTweenRef.current = gsap.to(formCardRef.current, {
      y: -9,
      repeat: -1,
      yoyo: true,
      duration: 3.2,
      ease: "sine.inOut",
    });
  }, []);

  /* ── Slide tab indicator ──────────────────────────────────────── */
  const slideIndicator = useCallback((newTab: Tab) => {
    if (!tabsBarRef.current || !indicatorRef.current) return;
    const bar   = tabsBarRef.current;
    const idx   = TABS.findIndex(t => t.id === newTab);
    const btns  = bar.querySelectorAll<HTMLButtonElement>("[data-tab-btn]");
    const btn   = btns[idx];
    if (!btn) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x:        btnRect.left - barRect.left,
      width:    btnRect.width,
      duration: 0.3,
      ease:     "power2.inOut",
    });
  }, []);

  /* ── Init indicator on mount ──────────────────────────────────── */
  useEffect(() => {
    // small delay to wait for layout
    const raf = requestAnimationFrame(() => slideIndicator("enquiry"));
    return () => cancelAnimationFrame(raf);
  }, [slideIndicator]);

  /* ── Tab switch ───────────────────────────────────────────────── */
  const handleTabSwitch = useCallback((newTab: Tab) => {
    if (newTab === activeTab) return;
    slideIndicator(newTab);
    // pause float
    floatTweenRef.current?.pause();

    if (fieldsRef.current) {
      gsap.to(fieldsRef.current, {
        opacity: 0, y: 8, duration: 0.18, ease: "power1.in",
        onComplete: () => {
          setActiveTab(newTab);
          setErrors({});
          gsap.fromTo(
            fieldsRef.current!,
            { opacity: 0, y: 18 },
            {
              opacity: 1, y: 0, duration: 0.32, ease: "power2.out",
              onComplete: () => void floatTweenRef.current?.resume(),
            }
          );
        },
      });
    } else {
      setActiveTab(newTab);
    }
  }, [activeTab, slideIndicator]);

  /* ── Input helpers ────────────────────────────────────────────── */
  const set = (field: keyof FormData, value: string | File | null) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  /* ── Validate ─────────────────────────────────────────────────── */
  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim())  e.name   = "Name is required.";
    if (!formData.email.trim()) e.email  = "Email is required.";
    else if (!EMAIL_RE.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.mobile.trim()) e.mobile = "Mobile number is required.";

    if (activeTab === "enquiry" || activeTab === "counselling") {
      if (!formData.message.trim()) e.message = "Please write a message.";
    }
    if (activeTab === "guidance") {
      if (!formData.fullProblem.trim()) e.fullProblem = "Please describe your problem.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ───────────────────────────────────────────────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const activeTabCfg = TABS.find(t => t.id === activeTab)!;

  return (
    <section
      id="edtech-contact"
      className="ecs-section-wrap"
      style={{
        position:      "relative",
        padding:       "9rem clamp(1.75rem, 8vw, 9rem) 8rem",
        overflow:      "hidden",
      }}
    >
      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0,
        left: "clamp(1.75rem,8vw,9rem)", right: "clamp(1.75rem,8vw,9rem)",
        height: "1px", background: "rgba(26,26,27,0.07)",
      }} />

      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(900px, 90vw)", height: "min(900px, 90vw)",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(229,64,79,0.055) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Two-col grid ─────────────────────────────────────────── */}
      <div className="ecs-grid">

        {/* ── LEFT: brand copy ─────────────────────────────────── */}
        <div ref={leftRef} className="ecs-left">

          {/* Section label */}
          <span style={{
            fontSize: "0.67rem", fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--accent)",
            marginBottom: "2.5rem", display: "block",
          }}>
            The Lanos Standard
          </span>

          {/* Grand statement */}
          <p style={{
            fontSize: "clamp(2rem, 4vw, 4.8rem)",
            fontWeight: 200, lineHeight: 1.08, letterSpacing: "-0.04em",
            color: "var(--fg)", margin: "0 0 2rem",
          }}>
            Lanos does not prepare students{" "}
            <em style={{
              fontStyle: "italic", fontWeight: 300,
              background: "linear-gradient(130deg, var(--accent) 0%, #CD5473 55%, #124898 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", display: "inline-block",
              paddingLeft: "0.1em", paddingRight: "0.4em",
            }}>
              only for jobs.
            </em>
            <br />
            We prepare{" "}
            <strong style={{ fontWeight: 500, color: "var(--fg)" }}>
              Technology Leaders.
            </strong>
          </p>

          {/* Trust disclaimer */}
          <p style={{
            fontSize: "0.78rem", fontWeight: 400, color: "var(--fg-muted)",
            letterSpacing: "0.06em", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: "0.7rem",
            marginBottom: "3.5rem",
          }}>
            <span style={{ display: "inline-block", width: 24, height: "1px", background: "rgba(107,114,128,0.35)", flexShrink: 0 }} />
            Structured placement &amp; startup support
            <span style={{ display: "inline-block", width: 24, height: "1px", background: "rgba(107,114,128,0.35)", flexShrink: 0 }} />
          </p>

          {/* Stats row */}
          <div className="ecs-stats">
            {[
              { val: "8+",    label: "Tech Tracks"       },
              { val: "7",     label: "Career Steps"      },
              { val: "3",     label: "Outcome Paths"     },
              { val: "₹1Cr+", label: "Startup Milestone" },
            ].map(({ val, label }) => (
              <div key={label} className="ecs-stat">
                <span className="ecs-stat-val">{val}</span>
                <span className="ecs-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: floating form card ─────────────────────────── */}
        <div ref={formCardRef} className="ecs-form-card">

          {submitted ? (
            /* ── Success state ─────────────────────────────────── */
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: "1rem", padding: "3rem 1rem",
              minHeight: 380, textAlign: "center",
            }}>
              <span style={{ fontSize: "2.4rem" }}>✦</span>
              <h3 style={{ fontWeight: 300, fontSize: "1.4rem", letterSpacing: "-0.02em", margin: 0 }}>
                {activeTab === "enquiry"
                  ? "Enquiry received!"
                  : activeTab === "counselling"
                  ? "Counselling request sent!"
                  : "Guidance request sent!"}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", maxWidth: "28ch" }}>
                Our team will get back to you within 24 hours.
              </p>
              <button className="ecs-submit-btn" onClick={() => { setSubmitted(false); setFormData({ name:"",email:"",mobile:"",message:"",fullProblem:"",counsellingInterest:"",guidanceCriteria:"",cvFile:null,marksheetFile:null,linkedinUrl:"" }); }}>
                Submit another
              </button>
            </div>
          ) : (
            <>
              {/* ── Segmented control ─────────────────────────── */}
              <div ref={tabsBarRef} className="ecs-tabs-bar">
                {/* sliding indicator */}
                <div ref={indicatorRef} className="ecs-tab-indicator" />
                {TABS.map(t => (
                  <button
                    key={t.id}
                    data-tab-btn
                    className={`ecs-tab-btn${activeTab === t.id ? " active" : ""}`}
                    onClick={() => handleTabSwitch(t.id)}
                    type="button"
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ── Fields ────────────────────────────────────── */}
              <form onSubmit={handleSubmit} noValidate>
                <div ref={fieldsRef} className="ecs-fields">

                  {/* ── Common: Name / Email / Mobile ─────────── */}
                  <Field label="Full Name" error={errors.name}>
                    <input
                      className="ecs-input" type="text" placeholder="Your name"
                      value={formData.name} onChange={e => set("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      className="ecs-input" type="email" placeholder="you@example.com"
                      value={formData.email} onChange={e => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Mobile Number" error={errors.mobile}>
                    <input
                      className="ecs-input" type="tel" placeholder="+91 98765 43210"
                      value={formData.mobile} onChange={e => set("mobile", e.target.value)}
                    />
                  </Field>

                  {/* ── Enquiry / Counselling: Message ────────── */}
                  {(activeTab === "enquiry" || activeTab === "counselling") && (
                    <Field label="Message" error={errors.message}>
                      <textarea
                        className="ecs-input ecs-textarea" placeholder="What would you like to know?"
                        value={formData.message} onChange={e => set("message", e.target.value)}
                        rows={3}
                      />
                    </Field>
                  )}

                  {/* ── Counselling extras ─────────────────────── */}
                  {activeTab === "counselling" && (
                    <>
                      <Field label="Counselling Interest Area">
                        <select
                          className="ecs-input ecs-select"
                          value={formData.counsellingInterest}
                          onChange={e => set("counsellingInterest", e.target.value)}
                        >
                          <option value="">Select an area…</option>
                          {COUNSELLING_INTERESTS.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field label="Your CV">
                        <FileDropZone
                          accept=".pdf,.doc,.docx"
                          file={formData.cvFile}
                          onChange={f => set("cvFile", f)}
                          hint="PDF or DOC · Max 5 MB"
                        />
                      </Field>
                      <Field label="LinkedIn Profile URL">
                        <input
                          className="ecs-input" type="url" placeholder="linkedin.com/in/yourprofile"
                          value={formData.linkedinUrl} onChange={e => set("linkedinUrl", e.target.value)}
                        />
                      </Field>
                    </>
                  )}

                  {/* ── Guidance extras ────────────────────────── */}
                  {activeTab === "guidance" && (
                    <>
                      <Field label="Describe Your Full Problem" error={errors.fullProblem}>
                        <textarea
                          className="ecs-input ecs-textarea" placeholder="Be as specific as possible…"
                          value={formData.fullProblem} onChange={e => set("fullProblem", e.target.value)}
                          rows={3}
                        />
                      </Field>
                      <Field label="Guidance Criteria">
                        <select
                          className="ecs-input ecs-select"
                          value={formData.guidanceCriteria}
                          onChange={e => set("guidanceCriteria", e.target.value)}
                        >
                          <option value="">Select criteria…</option>
                          {GUIDANCE_CRITERIA.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field label="Last Sem Marksheet">
                        <FileDropZone
                          accept=".pdf,.jpg,.jpeg,.png"
                          file={formData.marksheetFile}
                          onChange={f => set("marksheetFile", f)}
                          hint="PDF or Image · Max 5 MB"
                        />
                      </Field>
                      <Field label="LinkedIn Profile URL">
                        <input
                          className="ecs-input" type="url" placeholder="linkedin.com/in/yourprofile"
                          value={formData.linkedinUrl} onChange={e => set("linkedinUrl", e.target.value)}
                        />
                      </Field>
                    </>
                  )}
                </div>

                {/* ── Submit ────────────────────────────────────── */}
                <button type="submit" className="ecs-submit-btn" style={{ marginTop: "1.75rem", width: "100%" }}>
                  {activeTabCfg.submit}
                  <span className="ecs-submit-arrow">↗</span>
                </button>
              </form>

              {/* ── FAQ link ──────────────────────────────────── */}
              <p className="ecs-faq-link">
                Have questions?{" "}
                <Link href="/edtech/faq" className="ecs-faq-anchor">
                  View FAQ →
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Scoped styles ──────────────────────────────────────────── */}
      
    </section>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────── */

function Field({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ecs-field">
      <label className="ecs-label">{label}</label>
      {children}
      {error && <span className="ecs-error">{error}</span>}
    </div>
  );
}

function FileDropZone({
  accept, file, onChange, hint,
}: {
  accept: string;
  file: File | null;
  onChange: (f: File | null) => void;
  hint: string;
}) {
  return (
    <div className="ecs-file-zone">
      <input
        type="file"
        accept={accept}
        onChange={e => onChange(e.target.files?.[0] ?? null)}
      />
      <span className="ecs-file-icon">↑</span>
      <div style={{ overflow: "hidden" }}>
        <p className="ecs-file-name">
          {file ? file.name : "Click or drag to upload"}
        </p>
        <p className="ecs-file-hint">{hint}</p>
      </div>
    </div>
  );
}
