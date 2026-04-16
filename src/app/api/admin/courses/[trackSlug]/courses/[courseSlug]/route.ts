import { NextRequest, NextResponse } from 'next/server';
import { updateCourse, deleteCourse } from '@/lib/course/store';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ trackSlug: string; courseSlug: string }> }
) {
  try {
    const { trackSlug, courseSlug } = await params;
    const body = await req.json();

    // Ensure numeric fields
    if (body.originalPrice !== undefined) body.originalPrice = Number(body.originalPrice);
    if (body.price !== undefined) body.price = Number(body.price);
    if (body.badge === '') body.badge = undefined;

    const course = updateCourse(trackSlug, courseSlug, body);
    return NextResponse.json(course);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ trackSlug: string; courseSlug: string }> }
) {
  try {
    const { trackSlug, courseSlug } = await params;
    deleteCourse(trackSlug, courseSlug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
