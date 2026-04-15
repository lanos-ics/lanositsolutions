import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/blog/types';
import type { Blog } from '@/lib/blog/types';

interface RelatedPostsProps {
  blogs: Pick<Blog, 'title' | 'slug' | 'category' | 'excerpt' | 'coverImage' | 'createdAt' | 'likes'>[];
}

export default function RelatedPosts({ blogs }: RelatedPostsProps) {
  if (!blogs.length) return null;

  const CATEGORY_COLORS: Record<string, string> = {
    'lanos-edtech': 'var(--accent)',
    'solutions': 'var(--navy)',
    'research-and-development': '#7C3AED',
  };

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Related Posts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {blogs.map(b => {
          const catColor = CATEGORY_COLORS[b.category] ?? 'var(--accent)';
          const hasCover = b.coverImage && !b.coverImage.includes('placeholder');
          return (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="related-post-card"
              style={{ display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(26,26,27,0.08)', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: hasCover ? 'rgba(26,26,27,0.06)' : `linear-gradient(135deg, ${catColor}18, ${catColor}06)` }}>
                {hasCover ? (
                  <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
                    </svg>
                  </div>
                )}
              </div>
              <div style={{ padding: '0.875rem 1rem', flex: 1 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--accent)', marginBottom: '0.35rem' }}>
                  {CATEGORY_LABELS[b.category]}
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3, letterSpacing: '-0.01em', margin: 0 }}>{b.title}</h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '0.35rem' }}>♥ {b.likes}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
