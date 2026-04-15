import { NextRequest, NextResponse } from 'next/server';
import { addComment, getComments } from '@/lib/blog/store';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });
  const comments = getComments(slug);
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  try {
    const { slug, name, message } = await req.json();
    if (!slug || !name || !message) {
      return NextResponse.json({ error: 'slug, name, and message are required' }, { status: 400 });
    }
    if (name.trim().length < 2) {
      return NextResponse.json({ error: 'Name too short' }, { status: 400 });
    }
    if (message.trim().length < 5) {
      return NextResponse.json({ error: 'Message too short' }, { status: 400 });
    }
    const comment = addComment(slug, name, message);
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
