import { cookies } from 'next/headers';

/* ─── Token helpers (Web Crypto HMAC-SHA256 — Edge-compatible) ── */

const ALG = { name: 'HMAC', hash: 'SHA-256' } as const;
const ENC = new TextEncoder();

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not set');
  return s;
}

function toBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function strToBase64Url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToStr(b64: string): string {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
  return atob(padded);
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', ENC.encode(getSecret()), ALG, false, ['sign', 'verify']);
}

async function sign(payload: Record<string, unknown>, expiresInMs: number): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Date.now();
  const body = { ...payload, iat: now, exp: now + expiresInMs };
  const segments = [strToBase64Url(JSON.stringify(header)), strToBase64Url(JSON.stringify(body))];
  const key = await getKey();
  const sig = await crypto.subtle.sign('HMAC', key, ENC.encode(segments.join('.')));
  return [...segments, toBase64Url(sig)].join('.');
}

async function verify(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, bodyB64, sigB64] = parts;
    const key = await getKey();
    // Reconstruct the signature bytes
    const sigPadded = sigB64.replace(/-/g, '+').replace(/_/g, '/');
    const sigBinary = atob(sigPadded);
    const sigBytes = new Uint8Array(sigBinary.length);
    for (let i = 0; i < sigBinary.length; i++) sigBytes[i] = sigBinary.charCodeAt(i);
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, ENC.encode(`${headerB64}.${bodyB64}`));
    if (!valid) return null;
    const body = JSON.parse(base64UrlToStr(bodyB64));
    if (typeof body.exp === 'number' && Date.now() > body.exp) return null;
    return body;
  } catch {
    return null;
  }
}

/* ─── Cookie config ───────────────────────────────────────────── */

const COOKIE_NAME = 'lanos_admin_session';
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 h

/* ─── Public API ──────────────────────────────────────────────── */

export interface AdminSession {
  username: string;
}

/**
 * Authenticate admin credentials.
 * Returns a session token string on success, or null on failure.
 */
export async function authenticateAdmin(
  username: string,
  password: string,
): Promise<string | null> {
  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;
  if (!envUser || !envPass) return null;
  if (username !== envUser) return null;
  if (password !== envPass) return null;

  return sign({ username, role: 'admin' }, SESSION_TTL);
}


/**
 * Set the session cookie on a NextResponse-compatible response.
 */
export function setSessionCookie(
  res: { cookies: { set: (name: string, value: string, opts: Record<string, unknown>) => void } },
  token: string,
): void {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL / 1000,
  });
}

/**
 * Clear the session cookie.
 */
export function clearSessionCookie(
  res: { cookies: { set: (name: string, value: string, opts: Record<string, unknown>) => void } },
): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Read + verify the session from the request cookies (server-side).
 */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verify(token);
  if (!payload || payload.role !== 'admin') return null;
  return { username: payload.username as string };
}

/**
 * Verify a raw token string (used by middleware).
 */
export async function verifyToken(token: string): Promise<AdminSession | null> {
  const payload = await verify(token);
  if (!payload || payload.role !== 'admin') return null;
  return { username: payload.username as string };
}

export { COOKIE_NAME };
