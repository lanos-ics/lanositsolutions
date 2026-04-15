'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import SearchBar from '@/components/blog/SearchBar';
import type { Blog, BlogCategory } from '@/lib/blog/types';
import { CATEGORY_SLUGS } from '@/lib/blog/types';

const POSTS_PER_PAGE = 6;

interface BlogListingClientProps {
  allBlogs: Blog[];
  featured: Blog[];
}

export default function BlogListingClient({ allBlogs, featured }: BlogListingClientProps) {
  const [category, setCategory] = useState<BlogCategory | 'all'>('all');
  const [page, setPage] = useState(1);

  const counts = useMemo<Partial<Record<BlogCategory | 'all', number>>>(() => {
    const c: Partial<Record<BlogCategory | 'all', number>> = { all: allBlogs.length };
    CATEGORY_SLUGS.forEach(k => { c[k] = allBlogs.filter(b => b.category === k).length; });
    return c;
  }, [allBlogs]);

  const filtered = useMemo(() => {
    if (category === 'all') return allBlogs;
    return allBlogs.filter(b => b.category === category);
  }, [allBlogs, category]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategoryChange = (cat: BlogCategory | 'all') => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <>
      {/* Featured Posts */}
      {category === 'all' && page === 1 && featured.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', opacity: 0.65, marginBottom: '1.25rem' }}>
            Featured
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {featured.map(b => <BlogCard key={b.slug} blog={b} featured />)}
          </div>
        </section>
      )}

      {/* Filters + Search */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', justifyContent: 'space-between' }}>
        <CategoryFilter active={category} onChange={handleCategoryChange} counts={counts} />
        <SearchBar />
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--fg-muted)', background: 'rgba(26,26,27,0.03)', borderRadius: '16px' }}>
          No posts in this category yet. Check back soon!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {paginated.map(b => <BlogCard key={b.slug} blog={b} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: '0.5rem 1.1rem', borderRadius: '99px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'transparent', color: 'var(--fg-muted)', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', opacity: page === 1 ? 0.4 : 1, transition: 'all 0.2s' }}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1.5px solid ${page === i + 1 ? 'var(--accent)' : 'rgba(26,26,27,0.12)'}`, background: page === i + 1 ? 'var(--accent)' : 'transparent', color: page === i + 1 ? '#fff' : 'var(--fg-muted)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.2s' }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ padding: '0.5rem 1.1rem', borderRadius: '99px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'transparent', color: 'var(--fg-muted)', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', opacity: page === totalPages ? 0.4 : 1, transition: 'all 0.2s' }}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
