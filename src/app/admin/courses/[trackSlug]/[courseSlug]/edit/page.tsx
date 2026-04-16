'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  slug: string;
  title: string;
  description: string;
  briefDescription?: string;
  icon: string;
  originalPrice: number;
  price: number;
  syllabusUrl: string;
  badge?: string;
}

interface Track {
  slug: string;
  label: string;
  courses: Course[];
}

export default function EditCoursePage({ params }: { params: Promise<{ trackSlug: string; courseSlug: string }> }) {
  const router = useRouter();
  const [trackSlug, setTrackSlug] = useState('');
  const [courseSlug, setCourseSlug] = useState('');
  const [trackLabel, setTrackLabel] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', description: '', briefDescription: '', icon: '📘',
    originalPrice: '', price: '', syllabusUrl: '', badge: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(async ({ trackSlug: ts, courseSlug: cs }) => {
      setTrackSlug(ts);
      setCourseSlug(cs);
      const res = await fetch('/api/admin/courses');
      if (!res.ok) { setNotFound(true); setLoading(false); return; }
      const tracks: Track[] = await res.json();
      const track = tracks.find(t => t.slug === ts);
      if (!track) { setNotFound(true); setLoading(false); return; }
      setTrackLabel(track.label);
      const course = track.courses.find(c => c.slug === cs);
      if (!course) { setNotFound(true); setLoading(false); return; }
      setForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        briefDescription: course.briefDescription || '',
        icon: course.icon,
        originalPrice: String(course.originalPrice),
        price: String(course.price),
        syllabusUrl: course.syllabusUrl,
        badge: course.badge ?? '',
      });
      setLoading(false);
    });
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/courses/${trackSlug}/courses/${courseSlug}`, {
        method: 'PUT',
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
        setError(data.error ?? 'Failed to update course.');
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
  if (notFound) return <div style={{ padding: '4rem', textAlign: 'center' }}>Course not found. <Link href="/admin/courses" style={{ color: 'var(--accent)' }}>Back to admin</Link></div>;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)', maxWidth: '700px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem' }}>
        <Link href="/admin/courses" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>← Back</Link>
        <span style={{ color: 'rgba(26,26,27,0.2)' }}>|</span>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Edit Course {trackLabel && <span style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>→ {trackLabel}</span>}</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div><label style={labelStyle}>Course Title *</label><input name="title" value={form.title} onChange={handleChange} required style={inputStyle} /></div>
        <div><label style={labelStyle}>Slug *</label><input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} /></div>
        <div><label style={labelStyle}>Description (Card Subtitle) *</label><textarea name="description" value={form.description} onChange={handleChange} rows={2} required style={{ ...inputStyle, resize: 'vertical' }} /></div>
        <div><label style={labelStyle}>Brief Description (Detailed Course Page)</label><textarea name="briefDescription" value={form.briefDescription} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></div>

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
          <div><label style={labelStyle}>Price (₹)</label><input name="price" type="number" value={form.price} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Original Price (₹)</label><input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} style={inputStyle} /></div>
        </div>

        <div><label style={labelStyle}>Syllabus URL</label><input name="syllabusUrl" value={form.syllabusUrl} onChange={handleChange} style={inputStyle} /></div>

        {error && <p style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(229,64,79,0.06)', borderRadius: '8px' }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ padding: '0.85rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s', marginTop: '0.5rem' }}>
          {submitting ? 'Saving…' : 'Save Changes →'}
        </button>
      </form>
    </div>
  );
}
