import { NextRequest, NextResponse } from 'next/server';
import { searchBlogs } from '@/lib/blog/api';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  if (q.trim().length < 2) return NextResponse.json([]);
  const results = await searchBlogs(q);
  return NextResponse.json(results.map(({ id, title, slug, category, excerpt, coverImage, createdAt, likes }) => ({
    id, title, slug, category, excerpt, coverImage, createdAt, likes,
  })));
}
