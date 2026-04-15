'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '@/lib/blog/types';
import type { Blog } from '@/lib/blog/types';

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      setBlogs(await res.json());
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>Blog Admin</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)' }}>Manage all blog posts</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link
            href="/admin/blog/new"
            className="admin-btn-primary"
            style={{ padding: '0.65rem 1.5rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'opacity 0.2s' }}
          >
            + New Post
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="admin-btn-logout"
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '99px',
              border: '1.5px solid rgba(229,64,79,0.25)',
              background: 'transparent',
              color: 'var(--accent)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: loggingOut ? 'wait' : 'pointer',
              fontFamily: 'inherit',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {[{ label: 'Total Posts', value: blogs.length }, ...CATEGORY_SLUGS.map(k => ({ label: CATEGORY_LABELS[k], value: blogs.filter(b => b.category === k).length }))].map(s => (
          <div key={s.label} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--fg-muted)' }}>Loading…</div>
      ) : (
        <div style={{ border: '1px solid rgba(26,26,27,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'rgba(26,26,27,0.03)' }}>
                  {['Title', 'Category', 'Likes', 'Comments', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1.1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)', borderBottom: '1px solid rgba(26,26,27,0.08)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map(b => (
                  <tr key={b.id} className="admin-table-row" style={{ borderBottom: '1px solid rgba(26,26,27,0.06)', transition: 'background 0.15s' }}>
                    <td style={{ padding: '0.875rem 1.1rem', maxWidth: '260px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '0.1rem' }}>/blog/{b.slug}</div>
                    </td>
                    <td style={{ padding: '0.875rem 1.1rem' }}>
                      <span style={{ padding: '0.2rem 0.7rem', borderRadius: '99px', background: 'rgba(26,26,27,0.06)', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {CATEGORY_LABELS[b.category]}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1.1rem', color: 'var(--fg-muted)' }}>♥ {b.likes}</td>
                    <td style={{ padding: '0.875rem 1.1rem', color: 'var(--fg-muted)' }}>💬 {b.comments.length}</td>
                    <td style={{ padding: '0.875rem 1.1rem', color: 'var(--fg-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(b.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '0.875rem 1.1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link href={`/blog/${b.slug}`} target="_blank" className="admin-action-btn" style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(26,26,27,0.12)', color: 'var(--fg-muted)', fontSize: '0.78rem', textDecoration: 'none', transition: 'border-color 0.15s' }}>View</Link>
                        <Link href={`/admin/blog/${b.id}/edit`} className="admin-action-btn-edit" style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(26,26,27,0.12)', color: 'var(--navy)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>Edit</Link>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          disabled={deleting === b.id}
                          className="admin-action-btn-delete"
                          style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(229,64,79,0.25)', color: 'var(--accent)', fontSize: '0.78rem', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, transition: 'background 0.15s' }}
                        >
                          {deleting === b.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {blogs.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--fg-muted)' }}>No blog posts yet. <Link href="/admin/blog/new" style={{ color: 'var(--accent)' }}>Create the first one →</Link></div>
          )}
        </div>
      )}
    </div>
  );
}
