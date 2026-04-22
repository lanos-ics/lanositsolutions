import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogs, getBlogBySlug, getRelatedBlogs, getPopularBlogs, markdownToHtml, readingTime, extractTocItems } from '@/lib/blog/api';
import BlogHero from '@/components/blog/BlogHero';
import BlogContent from '@/components/blog/BlogContent';
import BlogAuthor from '@/components/blog/BlogAuthor';
import LikeButton from '@/components/blog/LikeButton';
import CommentsSection from '@/components/blog/CommentsSection';
import RelatedPosts from '@/components/blog/RelatedPosts';
import PopularPosts from '@/components/blog/PopularPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://lanositsolutions.com';

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  const url = `${BASE_URL}/blog/${blog.slug}`;
  return {
    title: `${blog.title} — Lanos Blog`,
    description: blog.excerpt,
    keywords: blog.keywords ?? blog.tags,
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      siteName: 'Lanos IT Solutions',
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const [html, related, popular] = await Promise.all([
    markdownToHtml(blog.content),
    getRelatedBlogs(slug, blog.category),
    getPopularBlogs(5),
  ]);

  const rt = readingTime(blog.content);
  const tocItems = extractTocItems(blog.content);
  const pageUrl = `${BASE_URL}/blog/${blog.slug}`;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: { '@type': 'Person', name: blog.author.name },
    publisher: { '@type': 'Organization', name: 'Lanos IT Solutions', url: BASE_URL },
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    keywords: (blog.keywords ?? blog.tags ?? []).join(', '),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{ padding: '2rem clamp(1.5rem, 8vw, 9rem) 0' }}>
          <BlogHero blog={blog} readingTime={rt} />
        </div>

        {/* Body: article + sidebar */}
        <div
          className="blog-detail-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '3rem',
            padding: '3rem clamp(1.5rem, 8vw, 9rem)',
            alignItems: 'start',
          }}
        >
          {/* Main article */}
          <article>
            <BlogAuthor author={blog.author} date={blog.createdAt} readingTime={rt} />

            <div style={{ marginTop: '2.5rem' }}>
              <BlogContent html={html} />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(26,26,27,0.08)' }}>
                {blog.tags.map((t, i) => (
                  <span key={`${t}-${i}`} style={{ padding: '0.25rem 0.8rem', borderRadius: '99px', background: 'rgba(26,26,27,0.05)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--fg-muted)', border: '1px solid rgba(26,26,27,0.08)' }}>#{t}</span>
                ))}
              </div>
            )}

            {/* Like */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(26,26,27,0.08)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--fg-muted)' }}>Found this useful?</span>
              <LikeButton slug={blog.slug} initialLikes={blog.likes} />
            </div>

            {/* Related posts */}
            <RelatedPosts blogs={related} />

            {/* Comments */}
            <CommentsSection slug={blog.slug} initialComments={blog.comments} />
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {tocItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)' }}>
                <TableOfContents items={tocItems} />
              </div>
            )}
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)' }}>
              <ShareButtons url={pageUrl} title={blog.title} />
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)' }}>
              <PopularPosts blogs={popular} />
            </div>
          </aside>
        </div>
      </div>

      {/* Responsive layout: stack on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .blog-detail-layout {
            grid-template-columns: 1fr !important;
          }
          .blog-detail-layout > aside {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}
