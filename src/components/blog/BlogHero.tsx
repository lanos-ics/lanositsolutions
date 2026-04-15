'use client';

import { CATEGORY_LABELS } from '@/lib/blog/types';
import type { Blog } from '@/lib/blog/types';

interface BlogHeroProps {
  blog: Pick<Blog, 'title' | 'category' | 'coverImage' | 'author' | 'createdAt' | 'likes' | 'comments'>;
  readingTime: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'lanos-edtech': 'var(--accent)',
  'solutions': 'var(--navy)',
  'research-and-development': '#7C3AED',
};

export default function BlogHero({ blog, readingTime }: BlogHeroProps) {
  const catColor = CATEGORY_COLORS[blog.category] ?? 'var(--accent)';
  const hasCover = blog.coverImage && !blog.coverImage.includes('placeholder');

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '480px',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      borderRadius: '24px',
    }}>
      {/* Cover / fallback */}
      {hasCover ? (
        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${catColor}30, var(--navy)30, ${catColor}15)`,
        }}>
          {/* Decorative pattern for fallback */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 25% 50%, ${catColor}20 0%, transparent 50%), radial-gradient(circle at 75% 50%, var(--navy)20 0%, transparent 50%)`,
          }} />
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.3) 60%, transparent 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.5rem, 4vw, 3rem)', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.25rem 0.85rem', borderRadius: '99px', background: catColor, color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {CATEGORY_LABELS[blog.category]}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>{readingTime}</span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>♥ {blog.likes}</span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>💬 {blog.comments.length}</span>
        </div>
        <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '800px', marginBottom: '1rem' }}>
          {blog.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>
            {blog.author.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{blog.author.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
              {blog.author.role} · {new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
