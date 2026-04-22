import { NextRequest, NextResponse } from 'next/server';
import { toggleLike } from '@/lib/blog/store';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

    const cookieStore = await cookies();
    let sessionId = cookieStore.get('lanos_blog_session')?.value;

    const res = NextResponse.json({ ok: true });

    if (!sessionId) {
      sessionId = randomUUID();
      res.cookies.set('lanos_blog_session', sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
      });
    }

    const result = await toggleLike(slug, sessionId);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
