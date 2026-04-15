'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <div>
      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1rem', opacity: 0.65 }}>On this page</h3>
      <nav aria-label="Table of contents">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          {items.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                fontSize: item.level === 1 ? '0.82rem' : '0.78rem',
                fontWeight: item.id === active ? 600 : 400,
                color: item.id === active ? 'var(--accent)' : 'var(--fg-muted)',
                paddingLeft: `${(item.level - 1) * 0.75}rem`,
                paddingTop: '0.3rem',
                paddingBottom: '0.3rem',
                textDecoration: 'none',
                borderLeft: `2px solid ${item.id === active ? 'var(--accent)' : 'rgba(26,26,27,0.08)'}`,
                paddingLeft: `calc(${(item.level - 1) * 0.75}rem + 0.75rem)`,
                transition: 'color 0.2s, border-color 0.2s',
                lineHeight: 1.4,
                display: 'block',
              } as React.CSSProperties}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
