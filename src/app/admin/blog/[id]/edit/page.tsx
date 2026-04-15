'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CATEGORY_SLUGS, CATEGORY_LABELS } from '@/lib/blog/types';
import type { Blog, BlogCategory } from '@/lib/blog/types';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', category: 'lanos-edtech' as BlogCategory,
    excerpt: '', content: '', coverImage: '', authorName: '', authorRole: '', authorBio: '',
    featured: false, tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(async ({ id: blogId }) => {
      setId(blogId);
      const res = await fetch('/api/admin/blogs');
      if (!res.ok) { setNotFound(true); setLoading(false); return; }
      const blogs: Blog[] = await res.json();
      const blog = blogs.find(b => b.id === blogId);
      if (!blog) { setNotFound(true); setLoading(false); return; }
      setForm({
        title: blog.title, slug: blog.slug, category: blog.category,
        excerpt: blog.excerpt, content: blog.content, coverImage: blog.coverImage,
        authorName: blog.author.name, authorRole: blog.author.role ?? '',
        authorBio: blog.author.bio ?? '', featured: blog.featured ?? false,
        tags: (blog.tags ?? []).join(', '),
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
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, slug: form.slug, category: form.category,
          excerpt: form.excerpt, content: form.content, coverImage: form.coverImage,
          author: { name: form.authorName, role: form.authorRole, bio: form.authorBio },
          featured: form.featured,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to update post.');
        return;
      }
      router.push('/admin/blog');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.35rem', display: 'block' };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--fg-muted)' }}>Loading…</div>;
  if (notFound) return <div style={{ padding: '4rem', textAlign: 'center' }}>Post not found. <Link href="/admin/blog" style={{ color: 'var(--accent)' }}>Back to admin</Link></div>;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem' }}>
        <Link href="/admin/blog" style={{ color: 'var(--fg-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Admin</Link>
        <span style={{ color: 'rgba(26,26,27,0.2)' }}>|</span>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div><label style={labelStyle}>Title *</label><input name="title" value={form.title} onChange={handleChange} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Slug *</label><input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Excerpt</label><textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: 'vertical' }} /></div>
            <div>
              <label style={labelStyle}>Content (Markdown) *</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={20} required style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: 'calc(var(--nav-h) + 1.5rem)' }}>
            <div style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div><label style={labelStyle}>Category *</label><select name="category" value={form.category} onChange={handleChange} style={inputStyle}>{CATEGORY_SLUGS.map(k => <option key={k} value={k}>{CATEGORY_LABELS[k]}</option>)}</select></div>
              <div><label style={labelStyle}>Cover Image URL</label><input name="coverImage" value={form.coverImage} onChange={handleChange} style={inputStyle} /></div>
              <div><label style={labelStyle}>Tags (comma separated)</label><input name="tags" value={form.tags} onChange={handleChange} placeholder="nextjs, ai, tutorial" style={inputStyle} /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
                Featured post
              </label>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', margin: 0, opacity: 0.7 }}>Author</p>
              <div><label style={labelStyle}>Name *</label><input name="authorName" value={form.authorName} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Role</label><input name="authorRole" value={form.authorRole} onChange={handleChange} style={inputStyle} /></div>
              <div><label style={labelStyle}>Bio</label><textarea name="authorBio" value={form.authorBio} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: 'vertical' }} /></div>
            </div>
            {error && <p style={{ color: 'var(--accent)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(229,64,79,0.06)', borderRadius: '8px' }}>{error}</p>}
            <button type="submit" disabled={submitting} style={{ padding: '0.85rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}>
              {submitting ? 'Saving…' : 'Save Changes →'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
