'use client';

import { useEffect, useRef, useState } from 'react';

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
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            visibleRef.current.add(e.target.id);
          } else {
            visibleRef.current.delete(e.target.id);
          }
        });

        // Pick the first item (in document order) that is currently visible
        for (const { id } of items) {
          if (visibleRef.current.has(id)) {
            setActive(id);
            return;
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '0',
      10
    );
    const offset = (isNaN(navHeight) ? 80 : navHeight) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

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
              onClick={(e) => handleClick(e, item.id)}
              style={{
                fontSize: item.level === 1 ? '0.82rem' : '0.78rem',
                fontWeight: item.id === active ? 600 : 400,
                color: item.id === active ? 'var(--accent)' : 'var(--fg-muted)',
                paddingTop: '0.3rem',
                paddingBottom: '0.3rem',
                textDecoration: 'none',
                borderLeft: `2px solid ${item.id === active ? 'var(--accent)' : 'rgba(26,26,27,0.08)'}`,
                paddingLeft: `calc(${(item.level - 1) * 0.75}rem + 0.75rem)`,
                transition: 'color 0.2s, border-color 0.2s',
                lineHeight: 1.4,
                display: 'block',
              } as React.CSSProperties}
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
