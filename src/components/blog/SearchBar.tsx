'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/blog/types';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  createdAt: string;
  likes: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 350);
    return () => clearTimeout(t);
  }, [query, search]);

  return (
    <div style={{ position: 'relative', maxWidth: '480px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.1rem', borderRadius: '99px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', transition: 'border-color 0.2s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search articles…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', caretColor: 'var(--accent)' }}
        />
        {loading && <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>…</span>}
        {query && <button onClick={() => { setQuery(''); setResults([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', fontSize: '1rem', lineHeight: 1 }}>×</button>}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: 'var(--bg)', border: '1px solid rgba(26,26,27,0.10)', borderRadius: '16px', boxShadow: '0 16px 48px rgba(26,26,27,0.12)', zIndex: 50, overflow: 'hidden' }}>
          {results.slice(0, 5).map(r => (
            <Link
              key={r.id}
              href={`/blog/${r.slug}`}
              onClick={() => { setOpen(false); setQuery(''); }}
              className="search-result-link"
              style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', alignItems: 'center', borderBottom: '1px solid rgba(26,26,27,0.05)', transition: 'background 0.15s' }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '0.1rem' }}>{CATEGORY_LABELS[r.category as keyof typeof CATEGORY_LABELS] ?? r.category}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
