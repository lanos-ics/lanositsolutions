'use client';

import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/blog/types';
import type { Blog } from '@/lib/blog/types';

interface BlogCardProps {
  blog: Pick<Blog, 'title' | 'slug' | 'category' | 'excerpt' | 'coverImage' | 'author' | 'createdAt' | 'likes' | 'comments' | 'tags'>;
  featured?: boolean;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function readingTimeEstimate(excerpt: string): string {
  return `${Math.max(3, Math.ceil(excerpt.split(' ').length / 20))} min read`;
}

const CATEGORY_COLORS: Record<string, string> = {
  'lanos-edtech': 'var(--accent)',
  'solutions': 'var(--navy)',
  'research-and-development': '#7C3AED',
};

export default function BlogCard({ blog, featured }: BlogCardProps) {
  const catColor = CATEGORY_COLORS[blog.category] ?? 'var(--accent)';
  const hasCover = blog.coverImage && !blog.coverImage.includes('placeholder');

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="blog-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(26,26,27,0.08)',
        background: 'var(--bg)',
        textDecoration: 'none',
        position: 'relative',
      }}
    >
      {/* Cover image / gradient fallback */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: featured ? '16/7' : '16/9',
        overflow: 'hidden',
        background: hasCover ? 'rgba(26,26,27,0.05)' : `linear-gradient(135deg, ${catColor}22, ${catColor}08)`,
      }}>
        {hasCover ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${catColor}18 0%, var(--navy)10 50%, ${catColor}08 100%)`,
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: `${catColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
              </svg>
            </div>
          </div>
        )}
        {/* Category badge */}
        <span style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '99px',
          background: catColor,
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
        }}>
          {CATEGORY_LABELS[blog.category]}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <h3 style={{
          fontSize: featured ? '1.2rem' : '1rem',
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          {blog.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', lineHeight: 1.6, margin: 0, maxWidth: '100%' }}>
          {blog.excerpt}
        </p>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(26,26,27,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
              {blog.author.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)' }}>{blog.author.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--fg-muted)' }}>{formatDate(blog.createdAt)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--fg-muted)' }}>{readingTimeEstimate(blog.excerpt)}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              ♥ {blog.likes}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              💬 {blog.comments.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
