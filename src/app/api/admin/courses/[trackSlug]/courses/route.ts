import { NextRequest, NextResponse } from 'next/server';
import { createCourse } from '@/lib/course/store';

export async function POST(req: NextRequest, { params }: { params: Promise<{ trackSlug: string }> }) {
  try {
    const { trackSlug } = await params;
    const body = await req.json();
    const { slug, title, description, briefDescription, icon, originalPrice, price, syllabusUrl, badge } = body;

    if (!slug || !title || !description) {
      return NextResponse.json({ error: 'slug, title, and description are required' }, { status: 400 });
    }

    const course = createCourse(trackSlug, {
      slug,
      title,
      description,
      briefDescription: briefDescription || undefined,
      icon: icon ?? '📘',
      originalPrice: Number(originalPrice) || 0,
      price: Number(price) || 0,
      syllabusUrl: syllabusUrl ?? '#',
      badge: badge || undefined,
    });

    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
