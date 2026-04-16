'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCoursePage({ params }: { params: Promise<{ trackSlug: string }> }) {
  const router = useRouter();
  const [trackSlug, setTrackSlug] = useState('');
  const [trackLabel, setTrackLabel] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', description: '', briefDescription: '', icon: '📘',
    originalPrice: '', price: '', syllabusUrl: '', badge: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then(async ({ trackSlug: slug }) => {
      setTrackSlug(slug);
      const res = await fetch('/api/admin/courses');
      if (res.ok) {
        const tracks = await res.json();
        const track = tracks.find((t: { slug: string; label: string }) => t.slug === slug);
        if (track) setTrackLabel(track.label);
      }
    });
  }, [params]);

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !prev.slug ? { slug: autoSlug(value) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.slug || !form.description) {
      setError('Title, slug, and description are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/courses/${trackSlug}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug,
          title: form.title,
          description: form.description,
          briefDescription: form.briefDescription,
          icon: form.icon,
          originalPrice: Number(form.originalPrice) || 0,
          price: Number(form.price) || 0,
          syllabusUrl: form.syllabusUrl || '#',
          badge: form.badge || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to create course.');
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
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>New Course {trackLabel && <span style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>→ {trackLabel}</span>}</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div><label style={labelStyle}>Course Title *</label><input name="title" value={form.title} onChange={handleChange} placeholder="e.g. ReactJS" required style={inputStyle} /></div>
        <div>
          <label style={labelStyle}>Slug *</label>
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="reactjs" required style={inputStyle} />
        </div>
        <div><label style={labelStyle}>Description (Card Subtitle) *</label><textarea name="description" value={form.description} onChange={handleChange} rows={2} required placeholder="Short 1-line description" style={{ ...inputStyle, resize: 'vertical' }} /></div>
        
        <div><label style={labelStyle}>Brief Description (Detailed Course Page)</label><textarea name="briefDescription" value={form.briefDescription} onChange={handleChange} rows={4} placeholder="Expanded description for the dedicated course page..." style={{ ...inputStyle, resize: 'vertical' }} /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div><label style={labelStyle}>Icon (Emoji)</label><input name="icon" value={form.icon} onChange={handleChange} style={inputStyle} /></div>
          <div>
            <label style={labelStyle}>Badge</label>
            <select name="badge" value={form.badge} onChange={handleChange} style={inputStyle}>
              <option value="">None</option>
              <option value="new">New</option>
              <option value="popular">Popular</option>
              <option value="bestseller">Bestseller</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div><label style={labelStyle}>Price (₹)</label><input name="price" type="number" value={form.price} onChange={handleChange} placeholder="1999" style={inputStyle} /></div>
          <div><label style={labelStyle}>Original Price (₹)</label><input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="3999" style={inputStyle} /></div>
        </div>

        <div><label style={labelStyle}>Syllabus URL</label><input name="syllabusUrl" value={form.syllabusUrl} onChange={handleChange} placeholder="https://..." style={inputStyle} /></div>

        {error && <p style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(229,64,79,0.06)', borderRadius: '8px', border: '1px solid rgba(229,64,79,0.2)' }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ padding: '0.85rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s', marginTop: '0.5rem' }}>
          {submitting ? 'Adding…' : 'Add Course →'}
        </button>
      </form>
    </div>
  );
}
