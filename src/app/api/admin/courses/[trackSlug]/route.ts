import { NextRequest, NextResponse } from 'next/server';
import { updateTrack, deleteTrack } from '@/lib/course/store';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ trackSlug: string }> }) {
  try {
    const { trackSlug } = await params;
    const body = await req.json();
    const track = updateTrack(trackSlug, body);
    return NextResponse.json(track);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ trackSlug: string }> }) {
  try {
    const { trackSlug } = await params;
    deleteTrack(trackSlug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
