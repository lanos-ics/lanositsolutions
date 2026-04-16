'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ACCENT_PRESETS = [
  { label: 'Red', accent: '#E5404F', bg: 'rgba(229,64,79,0.08)', border: 'rgba(229,64,79,0.18)', glow: 'rgba(229,64,79,0.11)' },
  { label: 'Blue', accent: '#2A7DE1', bg: 'rgba(42,125,225,0.08)', border: 'rgba(42,125,225,0.18)', glow: 'rgba(42,125,225,0.11)' },
  { label: 'Green', accent: '#1DAB6E', bg: 'rgba(29,171,110,0.08)', border: 'rgba(29,171,110,0.18)', glow: 'rgba(29,171,110,0.11)' },
  { label: 'Orange', accent: '#E88C2A', bg: 'rgba(232,140,42,0.08)', border: 'rgba(232,140,42,0.18)', glow: 'rgba(232,140,42,0.11)' },
  { label: 'Purple', accent: '#9B5CF6', bg: 'rgba(155,92,246,0.08)', border: 'rgba(155,92,246,0.18)', glow: 'rgba(155,92,246,0.11)' },
];

export default function NewTrackPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    label: '', slug: '', description: '', emoji: '📚', comingSoon: false, accentIdx: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const autoSlug = (label: string) =>
    label.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'label' && !prev.slug ? { slug: autoSlug(value) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.label || !form.slug || !form.description) {
      setError('Label, slug, and description are required.');
      return;
    }
    setSubmitting(true);
    const preset = ACCENT_PRESETS[form.accentIdx];
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug,
          label: form.label,
          description: form.description,
          emoji: form.emoji,
          comingSoon: form.comingSoon,
          accent: preset.accent,
          accentBg: preset.bg,
          accentBorder: preset.border,
          accentGlow: preset.glow,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to create track.');
        return;
      }
      router.push('/admin/courses');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.35rem', display: 'block' };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)', maxWidth: '700px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem' }}>
        <Link href="/admin/courses" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>← Back</Link>
        <span style={{ color: 'rgba(26,26,27,0.2)' }}>|</span>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>New Track</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={labelStyle}>Track Label *</label>
          <input name="label" value={form.label} onChange={handleChange} placeholder="e.g. Programming Foundations" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Slug *</label>
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="programming-foundations" required style={inputStyle} />
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.3rem' }}>URL: /edtech/courses/{form.slug || 'your-slug'}</p>
        </div>
        <div>
          <label style={labelStyle}>Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} required placeholder="What does this track cover?" style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Emoji</label>
            <input name="emoji" value={form.emoji} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Accent Color</label>
            <select name="accentIdx" value={form.accentIdx} onChange={e => setForm(prev => ({ ...prev, accentIdx: Number(e.target.value) }))} style={inputStyle}>
              {ACCENT_PRESETS.map((p, i) => (
                <option key={p.label} value={i}>{p.label} ({p.accent})</option>
              ))}
            </select>
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
          <input type="checkbox" name="comingSoon" checked={form.comingSoon} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
          Mark as &quot;Coming Soon&quot;
        </label>

        {error && <p style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(229,64,79,0.06)', borderRadius: '8px', border: '1px solid rgba(229,64,79,0.2)' }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ padding: '0.85rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s', marginTop: '0.5rem' }}>
          {submitting ? 'Creating…' : 'Create Track →'}
        </button>
      </form>
    </div>
  );
}
