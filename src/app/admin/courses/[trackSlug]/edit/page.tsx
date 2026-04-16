'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ACCENT_PRESETS = [
  { label: 'Red', accent: '#E5404F', bg: 'rgba(229,64,79,0.08)', border: 'rgba(229,64,79,0.18)', glow: 'rgba(229,64,79,0.11)' },
  { label: 'Blue', accent: '#2A7DE1', bg: 'rgba(42,125,225,0.08)', border: 'rgba(42,125,225,0.18)', glow: 'rgba(42,125,225,0.11)' },
  { label: 'Green', accent: '#1DAB6E', bg: 'rgba(29,171,110,0.08)', border: 'rgba(29,171,110,0.18)', glow: 'rgba(29,171,110,0.11)' },
  { label: 'Orange', accent: '#E88C2A', bg: 'rgba(232,140,42,0.08)', border: 'rgba(232,140,42,0.18)', glow: 'rgba(232,140,42,0.11)' },
  { label: 'Purple', accent: '#9B5CF6', bg: 'rgba(155,92,246,0.08)', border: 'rgba(155,92,246,0.18)', glow: 'rgba(155,92,246,0.11)' },
];

interface Track {
  slug: string;
  label: string;
  description: string;
  accent: string;
  emoji: string;
  comingSoon?: boolean;
}

export default function EditTrackPage({ params }: { params: Promise<{ trackSlug: string }> }) {
  const router = useRouter();
  const [trackSlug, setTrackSlug] = useState('');
  const [form, setForm] = useState({ label: '', slug: '', description: '', emoji: '📚', comingSoon: false, accentIdx: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(async ({ trackSlug: slug }) => {
      setTrackSlug(slug);
      const res = await fetch('/api/admin/courses');
      if (!res.ok) { setNotFound(true); setLoading(false); return; }
      const tracks: Track[] = await res.json();
      const track = tracks.find(t => t.slug === slug);
      if (!track) { setNotFound(true); setLoading(false); return; }
      const presetIdx = ACCENT_PRESETS.findIndex(p => p.accent === track.accent);
      setForm({
        label: track.label,
        slug: track.slug,
        description: track.description,
        emoji: track.emoji,
        comingSoon: track.comingSoon ?? false,
        accentIdx: presetIdx >= 0 ? presetIdx : 0,
      });
      setLoading(false);
    });
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const preset = ACCENT_PRESETS[form.accentIdx];
    try {
      const res = await fetch(`/api/admin/courses/${trackSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: form.label,
          slug: form.slug,
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
        setError(data.error ?? 'Failed to update track.');
        return;
      }
      router.push('/admin/courses');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.35rem', display: 'block' };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--fg-muted)' }}>Loading…</div>;
  if (notFound) return <div style={{ padding: '4rem', textAlign: 'center' }}>Track not found. <Link href="/admin/courses" style={{ color: 'var(--accent)' }}>Back to admin</Link></div>;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)', maxWidth: '700px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem' }}>
        <Link href="/admin/courses" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>← Back</Link>
        <span style={{ color: 'rgba(26,26,27,0.2)' }}>|</span>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Edit Track</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div><label style={labelStyle}>Track Label *</label><input name="label" value={form.label} onChange={handleChange} required style={inputStyle} /></div>
        <div><label style={labelStyle}>Slug *</label><input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} /></div>
        <div><label style={labelStyle}>Description *</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} required style={{ ...inputStyle, resize: 'vertical' }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div><label style={labelStyle}>Emoji</label><input name="emoji" value={form.emoji} onChange={handleChange} style={inputStyle} /></div>
          <div>
            <label style={labelStyle}>Accent Color</label>
            <select name="accentIdx" value={form.accentIdx} onChange={e => setForm(prev => ({ ...prev, accentIdx: Number(e.target.value) }))} style={inputStyle}>
              {ACCENT_PRESETS.map((p, i) => <option key={p.label} value={i}>{p.label} ({p.accent})</option>)}
            </select>
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
          <input type="checkbox" name="comingSoon" checked={form.comingSoon} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
          Mark as &quot;Coming Soon&quot;
        </label>
        {error && <p style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(229,64,79,0.06)', borderRadius: '8px' }}>{error}</p>}
        <button type="submit" disabled={submitting} style={{ padding: '0.85rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s', marginTop: '0.5rem' }}>
          {submitting ? 'Saving…' : 'Save Changes →'}
        </button>
      </form>
    </div>
  );
}
