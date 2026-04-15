'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/blog';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient orbs */}
      <div aria-hidden style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,64,79,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(18,72,152,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo / branding */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.25rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent), var(--navy))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(229,64,79,0.25)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="m16 15-3-3 3-3" />
            </svg>
          </div>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--fg)',
            marginBottom: '0.4rem',
          }}>
            Admin Portal
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--fg-muted)',
            margin: 0,
          }}>
            Sign in to manage Lanos Blog
          </p>
        </div>

        {/* Login card */}
        <div style={{
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(26,26,27,0.08)',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 16px 64px rgba(26,26,27,0.06)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username */}
            <div>
              <label style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--fg)',
                marginBottom: '0.4rem',
                display: 'block',
              }}>
                Username
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0 1rem',
                borderRadius: '12px',
                border: '1.5px solid rgba(26,26,27,0.12)',
                background: 'var(--bg)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  autoFocus
                  style={{
                    flex: 1,
                    padding: '0.8rem 0',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    color: 'var(--fg)',
                    caretColor: 'var(--accent)',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--fg)',
                marginBottom: '0.4rem',
                display: 'block',
              }}>
                Password
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0 1rem',
                borderRadius: '12px',
                border: '1.5px solid rgba(26,26,27,0.12)',
                background: 'var(--bg)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  style={{
                    flex: 1,
                    padding: '0.8rem 0',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    color: 'var(--fg)',
                    caretColor: 'var(--accent)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--fg-muted)',
                    padding: '4px',
                    display: 'flex',
                  }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(229,64,79,0.06)',
                border: '1px solid rgba(229,64,79,0.2)',
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.85rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--fg), #2d2d30)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                fontFamily: 'inherit',
                transition: 'opacity 0.2s, transform 0.15s',
                opacity: loading ? 0.7 : 1,
                letterSpacing: '-0.01em',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                  Signing in…
                </span>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--fg-muted)',
          marginTop: '1.5rem',
          opacity: 0.6,
        }}>
          Protected area · Lanos IT Solutions
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          outline: none;
        }
        input:focus ~ * {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
