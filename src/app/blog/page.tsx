import type { Metadata } from 'next';
import { getAllBlogs, getFeaturedBlogs } from '@/lib/blog/api';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Lanos IT Solutions',
  description: 'Insights on EdTech, software engineering, and R&D from the Lanos team. Explore articles on modern development, AI, and education.',
  keywords: ['lanos blog', 'edtech', 'software engineering', 'AI', 'R&D', 'India tech'],
  openGraph: {
    title: 'Blog — Lanos IT Solutions',
    description: 'Insights on EdTech, software engineering, and R&D from the Lanos team.',
    url: 'https://lanositsolutions.com/blog',
    siteName: 'Lanos IT Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Lanos IT Solutions',
    description: 'Insights on EdTech, software engineering, and R&D from the Lanos team.',
  },
  alternates: { canonical: 'https://lanositsolutions.com/blog' },
};

export default async function BlogPage() {
  const [allBlogs, featured] = await Promise.all([getAllBlogs(), getFeaturedBlogs(3)]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero banner */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 8vw, 9rem)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(26,26,27,0.07)',
        }}
      >
        {/* Background orb */}
        <div aria-hidden style={{ position: 'absolute', top: '-60px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,64,79,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', opacity: 0.85 }}>
            Lanos Blog
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.25rem', color: 'var(--fg)' }}>
            Ideas that<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              move things forward
            </span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--fg-muted)', lineHeight: 1.7, maxWidth: '52ch' }}>
            Perspectives on EdTech, software engineering, AI research, and building things that last — from the Lanos team.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 8vw, 9rem)' }}>
        <BlogListingClient allBlogs={allBlogs} featured={featured} />
      </section>
    </div>
  );
}
