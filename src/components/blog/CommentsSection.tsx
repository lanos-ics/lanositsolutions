'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Comment } from '@/lib/blog/types';

interface CommentsSectionProps {
  slug: string;
  initialComments: Comment[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export default function CommentsSection({ slug, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchComments = useCallback(async () => {
    const res = await fetch(`/api/blog/comments?slug=${slug}`);
    if (res.ok) setComments(await res.json());
  }, [slug]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || name.trim().length < 2) { setError('Please enter your name (min 2 characters).'); return; }
    if (!message.trim() || message.trim().length < 5) { setError('Message is too short (min 5 characters).'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to post comment.');
        return;
      }
      setName(''); setMessage(''); setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchComments();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        Comments <span style={{ color: 'var(--fg-muted)', fontWeight: 400, fontSize: '1rem' }}>({comments.length})</span>
      </h2>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--fg-muted)', background: 'rgba(26,26,27,0.03)', borderRadius: '12px', fontSize: '0.9rem' }}>
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(26,26,27,0.07)', background: 'rgba(26,26,27,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--fg)' }}>{c.name}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{timeAgo(c.createdAt)}</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--fg)', margin: 0, maxWidth: '100%' }}>{c.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(26,26,27,0.08)', background: 'rgba(26,26,27,0.02)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>Leave a Comment</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => ((e.currentTarget as HTMLInputElement).style.borderColor = 'var(--accent)')}
            onBlur={e => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(26,26,27,0.12)')}
          />
          <textarea
            placeholder="Your comment *"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            rows={4}
            style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(26,26,27,0.12)', background: 'var(--bg)', fontSize: '0.9rem', fontFamily: 'inherit', color: 'var(--fg)', outline: 'none', resize: 'vertical', lineHeight: 1.6, transition: 'border-color 0.2s' }}
            onFocus={e => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--accent)')}
            onBlur={e => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(26,26,27,0.12)')}
          />
          {error && <p style={{ color: 'var(--accent)', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
          {success && <p style={{ color: '#22c55e', fontSize: '0.85rem', margin: 0 }}>✓ Comment posted! Thank you.</p>}
          <button
            type="submit"
            disabled={submitting}
            style={{ padding: '0.75rem 1.75rem', borderRadius: '99px', background: 'var(--fg)', color: 'var(--bg)', fontSize: '0.9rem', fontWeight: 700, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s, transform 0.2s', alignSelf: 'flex-start' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          >
            {submitting ? 'Posting…' : 'Post Comment →'}
          </button>
        </form>
      </div>
    </section>
  );
}
