'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [burst, setBurst] = useState(false);

  // Check localStorage for liked state
  useEffect(() => {
    const likedSlugs = JSON.parse(localStorage.getItem('lanos_liked_blogs') ?? '[]') as string[];
    setLiked(likedSlugs.includes(slug));
  }, [slug]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 400);

    try {
      const res = await fetch('/api/blog/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data: { likes: number; liked: boolean } = await res.json();
      setLikes(data.likes);
      setLiked(data.liked);

      // Persist in localStorage as UX hint
      const likedSlugs = JSON.parse(localStorage.getItem('lanos_liked_blogs') ?? '[]') as string[];
      if (data.liked) {
        if (!likedSlugs.includes(slug)) likedSlugs.push(slug);
      } else {
        const idx = likedSlugs.indexOf(slug);
        if (idx > -1) likedSlugs.splice(idx, 1);
      }
      localStorage.setItem('lanos_liked_blogs', JSON.stringify(likedSlugs));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.4rem',
        borderRadius: '99px',
        border: `1.5px solid ${liked ? 'var(--accent)' : 'rgba(26,26,27,0.15)'}`,
        background: liked ? 'rgba(229,64,79,0.06)' : 'transparent',
        color: liked ? 'var(--accent)' : 'var(--fg-muted)',
        fontSize: '0.9rem',
        fontWeight: 600,
        cursor: loading ? 'wait' : 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        transform: burst ? 'scale(1.08)' : 'scale(1)',
      }}
      onMouseEnter={e => {
        if (!liked) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
        }
      }}
      onMouseLeave={e => {
        if (!liked) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,26,27,0.15)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)';
        }
      }}
    >
      <span style={{ fontSize: '1.1rem', transition: 'transform 0.3s ease', transform: burst ? 'scale(1.3)' : 'scale(1)' }}>
        {liked ? '❤️' : '🤍'}
      </span>
      <span>{likes}</span>
      <span style={{ fontWeight: 400, opacity: 0.7, fontSize: '0.82rem' }}>{liked ? 'Liked' : 'Like'}</span>
    </button>
  );
}
