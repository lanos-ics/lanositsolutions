import Link from 'next/link';
import type { Blog } from '@/lib/blog/types';
import { CATEGORY_LABELS } from '@/lib/blog/types';

interface PopularPostsProps {
  blogs: Pick<Blog, 'title' | 'slug' | 'category' | 'likes' | 'createdAt'>[];
}

export default function PopularPosts({ blogs }: PopularPostsProps) {
  if (!blogs.length) return null;
  return (
    <div>
      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1rem', opacity: 0.65 }}>Popular Posts</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {blogs.map((b, i) => (
          <Link
            key={b.slug}
            href={`/blog/${b.slug}`}
            className="popular-post-link"
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', textDecoration: 'none', padding: '0.5rem', borderRadius: '10px', transition: 'background 0.15s' }}
          >
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: i === 0 ? 'var(--accent)' : 'rgba(26,26,27,0.08)', color: i === 0 ? '#fff' : 'var(--fg-muted)', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.35 }}>{b.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginTop: '0.2rem', display: 'flex', gap: '0.5rem' }}>
                <span>{CATEGORY_LABELS[b.category]}</span>
                <span>·</span>
                <span>♥ {b.likes}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
