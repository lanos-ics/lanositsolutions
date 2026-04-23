'use client';

import { useEffect, useRef } from 'react';

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Wrap bare tables in a scrollable container so they don't overflow on mobile
    container.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
      if (table.parentElement?.classList.contains('table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      wrapper.style.cssText = 'overflow-x:auto;max-width:100%;margin:1.5em 0;';
      table.style.margin = '0';
      table.parentNode!.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    const blocks = container.querySelectorAll<HTMLPreElement>('pre');
    const cleanups: (() => void)[] = [];

    blocks.forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return; // already injected

      pre.style.position = 'relative';

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code');
      btn.style.cssText = [
        'position:absolute',
        'top:0.6rem',
        'right:0.6rem',
        'padding:0.2rem 0.6rem',
        'font-size:0.72rem',
        'font-weight:600',
        'line-height:1.6',
        'border-radius:6px',
        'border:1px solid rgba(255,255,255,0.15)',
        'background:rgba(255,255,255,0.08)',
        'color:rgba(255,255,255,0.7)',
        'cursor:pointer',
        'transition:background 0.15s,color 0.15s',
        'z-index:1',
      ].join(';');

      const handleClick = async () => {
        const code = pre.querySelector('code');
        const text = code?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied!';
          btn.style.color = '#4ade80';
          btn.style.borderColor = 'rgba(74,222,128,0.4)';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.color = 'rgba(255,255,255,0.7)';
            btn.style.borderColor = 'rgba(255,255,255,0.15)';
          }, 2000);
        } catch {
          btn.textContent = 'Failed';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        }
      };

      btn.addEventListener('click', handleClick);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener('click', handleClick));
    });

    return () => cleanups.forEach(fn => fn());
  }, [html]);

  return (
    <div
      ref={ref}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
