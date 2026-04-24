import type { Author } from '@/lib/blog/types';

interface BlogAuthorProps {
  author: Author;
  date: string;
  readingTime: string;
}

export default function BlogAuthor({ author, date, readingTime }: BlogAuthorProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', borderRadius: '16px', background: 'rgba(26,26,27,0.03)', border: '1px solid rgba(26,26,27,0.07)', flexWrap: 'wrap' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>
        {author.name.charAt(0)}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)' }}>{author.name}</div>
        {author.role && <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500 }}>{author.role}</div>}
        {author.bio && <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', marginTop: '0.25rem' }}>{author.bio}</div>}
        <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.4rem', display: 'flex', gap: '1rem' }}>
          <span>Published {formattedDate}</span>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
