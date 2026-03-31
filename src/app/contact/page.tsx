"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";

/* ─── Premium Form Input Component ────────────────────────────── */
function PremiumInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  isTextArea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  isTextArea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div className="w-full flex-1" style={{ marginBottom: "1.5rem" }}>
      <div className="flex justify-between items-baseline" style={{ marginBottom: "0.5rem" }}>
        <label
          htmlFor={id}
          className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
          style={{ color: focused ? "var(--accent)" : "var(--fg-muted)" }}
        >
          {label}
        </label>
        {error && <span className="text-xs font-medium text-[var(--accent)] animate-pulse">{error}</span>}
      </div>

      <div className="relative">
        <InputComponent
          id={id}
          type={!isTextArea ? type : undefined}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e: any) => onChange(e.target.value)}
          rows={isTextArea ? 4 : undefined}
          className="w-full bg-transparent border-none outline-none text-base font-medium text-[var(--fg)] placeholder-[var(--fg-muted)] placeholder-opacity-40 transition-all resize-none appearance-none"
          style={{
            padding: isTextArea ? "0.75rem 0" : "0.5rem 0",
            borderBottom: focused 
              ? "1px solid var(--accent)" 
              : "1px solid rgba(26,26,27,0.15)",
            boxShadow: focused
              ? "0 4px 12px -4px var(--accent-soft)"
              : "none",
            backgroundColor: "transparent",
          }}
        />
        {/* Animated highlight bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-500 ease-out z-10"
          style={{ width: focused ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
}

/* ─── Contact Info Card Component ───────────────────────────── */
function ContactInfoCard({ icon: Icon, title, content, link }: { icon: any, title: string, content: string, link?: string }) {
  const Wrapper = link ? "a" : "div";
  return (
    <Wrapper 
      href={link}
      className="flex items-center sm:items-start bg-white border border-[var(--glass-border)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
      style={{ padding: "1.5rem", borderRadius: "1rem", marginBottom: "1rem", gap: "1rem" }}
    >
      <div 
        className="flex items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ width: "3.5rem", height: "3.5rem" }}
      >
        <Icon size={20} className="stroke-[2px]" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--fg-muted)]" style={{ marginBottom: "0.25rem" }}>
          {title}
        </span>
        <span className="text-sm sm:text-base text-[var(--fg)] font-medium leading-relaxed group-hover:text-[var(--accent)] transition-colors duration-300 break-all sm:break-normal">
          {content}
        </span>
      </div>
    </Wrapper>
  );
}

/* ─── Main Page Component ───────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Elegant entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(".animate-item", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [field]: v }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: "" }));
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Required";
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) errs.email = "Required";
    else if (!EMAIL_RE.test(form.email)) errs.email = "Invalid format";
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
        // Play success animation
        gsap.fromTo(".success-msg", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
        // Scroll slightly up towards the success message smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    <main 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center w-full"
      style={{ paddingTop: "clamp(6rem, 15vh, 10rem)", paddingBottom: "5rem" }}
    >
      {/* Background Orbs for Premium feel */}
      <div className="absolute top-20 right-[10%] w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] max-w-[500px] h-[50vw] max-h-[500px] rounded-full bg-[#124898]/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 w-full max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Header Section (Fully Centered) */}
        <div className="w-full max-w-4xl animate-item flex flex-col items-center text-center" style={{ marginBottom: "clamp(3rem, 6vh, 4.5rem)" }}>
          <div className="inline-flex items-center justify-center bg-[var(--accent-soft)] text-[var(--accent)] rounded-full uppercase font-bold tracking-widest" style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Sparkles size={14} />
            <span>Connect with Us</span>
          </div>
          <h1 className="font-light tracking-tight text-[var(--fg)] leading-[1.05]" style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)", marginBottom: "1.5rem" }}>
            Let's start a <br className="hidden sm:block"/>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#CD5473] to-[var(--navy)] pb-2 inline-block">
              conversation.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--fg-muted)] leading-relaxed max-w-2xl mx-auto px-4">
            Have a bold idea? Need robust tech solutions? Reach out, and let's craft the future of your digital landscape together.
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-start" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
          
          {/* Left Column: Form */}
          <div 
            className="w-full lg:col-span-7 bg-white relative overflow-hidden animate-item flex flex-col"
            style={{ 
              borderRadius: "2rem", 
              padding: "clamp(2rem, 5vw, 3.5rem)", 
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.05)",
              border: "1px solid rgba(26,26,27,0.05)"
            }}
          >
            <div className="relative z-10 w-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center success-msg" style={{ padding: "4rem 1rem" }}>
                  <div className="rounded-full bg-green-50 border border-green-100 flex items-center justify-center shadow-xl shadow-green-500/10" style={{ width: "5rem", height: "5rem", marginBottom: "1.5rem" }}>
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">Message received</h3>
                  <p className="text-sm sm:text-base text-[var(--fg-muted)] max-w-sm mx-auto" style={{ marginBottom: "2rem" }}>
                    Thanks for reaching out! We've received your enquiry and will be in touch with you shortly.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", mobile: "", message: "" }); }}
                    className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] hover:text-[var(--navy)] transition-colors inline-flex items-center gap-2"
                  >
                    Send another message <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col">
                  {/* Top Inputs: Side by side on sm/md, stacked on mobile */}
                  <div className="w-full flex flex-col sm:flex-row" style={{ gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <PremiumInput
                      id="name"
                      label="Full Name"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Doe"
                      error={errors.name}
                    />
                    <PremiumInput
                      id="mobile"
                      label="Phone Number"
                      type="tel"
                      value={form.mobile}
                      onChange={set("mobile")}
                      placeholder="+91 98765 43210"
                      error={errors.mobile}
                    />
                  </div>
                  
                  <PremiumInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@company.com"
                    error={errors.email}
                  />
                  
                  <PremiumInput
                    id="message"
                    label="How can we help?"
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your project, goals, or the challenge you're facing..."
                    isTextArea
                    error={errors.message}
                  />

                  {/* Submission Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full" style={{ marginTop: "2.5rem", gap: "1.5rem" }}>
                    <p className="text-xs text-[var(--fg-muted)] w-full sm:max-w-[180px] text-center sm:text-left order-2 sm:order-1 opacity-80">
                      Your information is kept entirely secure and never shared.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="order-1 sm:order-2 group relative inline-flex items-center justify-center bg-[var(--fg)] text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/30 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto shrink-0"
                      style={{ padding: "1rem 2rem", gap: "0.75rem" }}
                    >
                      <span className="relative z-10 font-medium tracking-wide">
                        {loading ? "Sending..." : "Send Message"}
                      </span>
                      {!loading && (
                        <div className="relative z-10 flex items-center justify-center bg-white/20 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ width: "1.5rem", height: "1.5rem" }}>
                           <ArrowUpRight size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Info & Map */}
          <div className="w-full lg:col-span-5 flex flex-col animate-item h-full">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-center lg:text-left" style={{ marginBottom: "1.5rem" }}>
              Direct Contacts
            </h3>
            
            <div className="flex flex-col w-full" style={{ marginBottom: "2rem" }}>
              <ContactInfoCard 
                icon={Mail} 
                title="Email Us" 
                content="contact@lanositsolutions.com" 
                link="mailto:contact@lanositsolutions.com"
              />
              <ContactInfoCard 
                icon={Phone} 
                title="Call Us" 
                content="+91 98765 43210" 
                link="tel:+919876543210"
              />
              <ContactInfoCard 
                icon={MapPin} 
                title="Visit Us" 
                content="Sagar, Madhya Pradesh, India 470004" 
              />
            </div>

            {/* Micro-Map / Location visual */}
            <div 
              className="w-full rounded-2xl overflow-hidden border border-[var(--glass-border)] relative shadow-md group mt-auto flex-shrink-0 bg-[var(--bg)]" 
              style={{ 
                height: "clamp(240px, 30vh, 320px)", 
                maxHeight: "320px",
                marginBottom: "1.5rem" 
              }}
            >
              <iframe
                title="Lanos Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.0!2d78.79311920!3d23.85161470!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUxJzA1LjgiTiA3OMKwNDcnMzUuMiJF!5e0!3m2!1sen!2sin!4v1708000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="absolute inset-0 grayscale contrast-125 opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 object-cover"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl"></div>
            </div>
            
            <p className="text-xs text-[var(--fg-muted)] mt-2 mb-8 lg:mb-12 font-medium text-center lg:text-left opacity-80">
              We operate globally but find our roots deeply planted in central India.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}