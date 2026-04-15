'use client';

import { CATEGORY_LABELS, CATEGORY_SLUGS } from '@/lib/blog/types';
import type { BlogCategory } from '@/lib/blog/types';

interface CategoryFilterProps {
  active: BlogCategory | 'all';
  onChange: (cat: BlogCategory | 'all') => void;
  counts?: Partial<Record<BlogCategory | 'all', number>>;
}

const CATEGORY_COLORS: Record<string, string> = {
  'lanos-edtech': 'var(--accent)',
  'solutions': 'var(--navy)',
  'research-and-development': '#7C3AED',
};

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  const all = [{ key: 'all' as const, label: 'All Posts' }, ...CATEGORY_SLUGS.map(k => ({ key: k, label: CATEGORY_LABELS[k] }))];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {all.map(({ key, label }) => {
        const isActive = active === key;
        const color = key === 'all' ? 'var(--fg)' : CATEGORY_COLORS[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '99px',
              border: `1.5px solid ${isActive ? color : 'rgba(26,26,27,0.12)'}`,
              background: isActive ? color : 'transparent',
              color: isActive ? '#fff' : 'var(--fg-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = color;
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,26,27,0.12)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)';
              }
            }}
          >
            {label}
            {counts?.[key] !== undefined && (
              <span style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 500 }}>({counts[key]})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
