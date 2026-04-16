'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  description: string;
  accent: string;
  emoji: string;
  courses: Course[];
  comingSoon?: boolean;
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses');
      if (res.status === 401) { router.push('/admin/login'); return; }
      setTracks(await res.json());
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchTracks(); }, [fetchTracks]);

  const handleDeleteTrack = async (slug: string, label: string) => {
    if (!confirm(`Delete track "${label}" and ALL its courses? This cannot be undone.`)) return;
    setDeleting(`track-${slug}`);
    try {
      await fetch(`/api/admin/courses/${slug}`, { method: 'DELETE' });
      fetchTracks();
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteCourse = async (trackSlug: string, courseSlug: string, title: string) => {
    if (!confirm(`Delete course "${title}"? This cannot be undone.`)) return;
    setDeleting(`course-${courseSlug}`);
    try {
      await fetch(`/api/admin/courses/${trackSlug}/courses/${courseSlug}`, { method: 'DELETE' });
      fetchTracks();
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

  const totalCourses = tracks.reduce((sum, t) => sum + t.courses.length, 0);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem clamp(1.5rem, 6vw, 5rem)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid rgba(26,26,27,0.08)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>Courses Admin</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)' }}>Manage all tracks &amp; courses</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/admin/blog"
            style={{ padding: '0.65rem 1.25rem', borderRadius: '99px', border: '1.5px solid rgba(26,26,27,0.12)', color: 'var(--fg-muted)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
          >
            📝 Blog Admin
          </Link>
          <Link
            href="/admin/courses/new-track"
            style={{ padding: '0.65rem 1.5rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'opacity 0.2s' }}
          >
            + New Track
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              padding: '0.65rem 1.25rem', borderRadius: '99px',
              border: '1.5px solid rgba(229,64,79,0.25)', background: 'transparent',
              color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600,
              cursor: loggingOut ? 'wait' : 'pointer', fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s',
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
        {[
          { label: 'Total Tracks', value: tracks.length },
          { label: 'Total Courses', value: totalCourses },
          { label: 'Active', value: tracks.filter(t => !t.comingSoon).length },
          { label: 'Coming Soon', value: tracks.filter(t => t.comingSoon).length },
        ].map(s => (
          <div key={s.label} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tracks list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--fg-muted)' }}>Loading…</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tracks.map(track => {
            const isOpen = expanded === track.slug;
            return (
              <div key={track.slug} style={{ border: '1px solid rgba(26,26,27,0.08)', borderRadius: '16px', overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                {/* Track header */}
                <div
                  style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: isOpen ? 'rgba(26,26,27,0.03)' : 'transparent', transition: 'background 0.15s', flexWrap: 'wrap', gap: '0.75rem' }}
                  onClick={() => setExpanded(isOpen ? null : track.slug)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem' }}>{track.emoji}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--fg)' }}>{track.label}</span>
                        {track.comingSoon && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '99px', background: 'rgba(155,92,246,0.10)', color: '#9B5CF6', border: '1px solid rgba(155,92,246,0.22)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Coming Soon</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', marginTop: '0.15rem' }}>
                        {track.courses.length} {track.courses.length === 1 ? 'course' : 'courses'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                    <Link href={`/admin/courses/${track.slug}/new-course`} style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(26,26,27,0.12)', color: 'var(--fg-muted)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>+ Course</Link>
                    <Link href={`/admin/courses/${track.slug}/edit`} style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(26,26,27,0.12)', color: '#2A7DE1', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>Edit</Link>
                    <button
                      onClick={() => handleDeleteTrack(track.slug, track.label)}
                      disabled={deleting === `track-${track.slug}`}
                      style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(229,64,79,0.25)', color: 'var(--accent)', fontSize: '0.78rem', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, whiteSpace: 'nowrap' }}
                    >
                      {deleting === `track-${track.slug}` ? '…' : 'Delete'}
                    </button>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
                </div>

                {/* Expanded courses table */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid rgba(26,26,27,0.06)' }}>
                    {track.courses.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--fg-muted)', fontSize: '0.875rem' }}>
                        No courses yet. <Link href={`/admin/courses/${track.slug}/new-course`} style={{ color: 'var(--accent)' }}>Add the first one →</Link>
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '650px' }}>
                          <thead>
                            <tr style={{ background: 'rgba(26,26,27,0.03)' }}>
                              {['', 'Title', 'Price', 'Original', 'Badge', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)', borderBottom: '1px solid rgba(26,26,27,0.06)' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {track.courses.map(course => (
                              <tr key={course.slug} style={{ borderBottom: '1px solid rgba(26,26,27,0.04)' }}>
                                <td style={{ padding: '0.7rem 1rem', fontSize: '1.15rem', width: '40px' }}>{course.icon}</td>
                                <td style={{ padding: '0.7rem 1rem' }}>
                                  <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{course.title}</div>
                                  <div style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '0.1rem', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.description}</div>
                                </td>
                                <td style={{ padding: '0.7rem 1rem', fontWeight: 700, color: track.accent }}>₹{course.price.toLocaleString('en-IN')}</td>
                                <td style={{ padding: '0.7rem 1rem', color: 'var(--fg-muted)', textDecoration: 'line-through' }}>₹{course.originalPrice.toLocaleString('en-IN')}</td>
                                <td style={{ padding: '0.7rem 1rem' }}>
                                  {course.badge && (
                                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '99px', background: 'rgba(26,26,27,0.06)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{course.badge}</span>
                                  )}
                                </td>
                                <td style={{ padding: '0.7rem 1rem' }}>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <Link href={`/admin/courses/${track.slug}/${course.slug}/edit`} style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(26,26,27,0.12)', color: '#2A7DE1', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>Edit</Link>
                                    <button
                                      onClick={() => handleDeleteCourse(track.slug, course.slug, course.title)}
                                      disabled={deleting === `course-${course.slug}`}
                                      style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(229,64,79,0.25)', color: 'var(--accent)', fontSize: '0.75rem', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}
                                    >
                                      {deleting === `course-${course.slug}` ? '…' : 'Delete'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {tracks.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--fg-muted)', border: '1px solid rgba(26,26,27,0.08)', borderRadius: '16px' }}>
              No tracks yet. <Link href="/admin/courses/new-track" style={{ color: 'var(--accent)' }}>Create the first one →</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
