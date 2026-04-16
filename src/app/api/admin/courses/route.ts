import { NextRequest, NextResponse } from 'next/server';
import { getAllTracks, createTrack } from '@/lib/course/store';

export async function GET() {
  const tracks = getAllTracks();
  return NextResponse.json(tracks);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, label, description, accent, accentBg, accentBorder, accentGlow, emoji, comingSoon } = body;

    if (!slug || !label || !description) {
      return NextResponse.json({ error: 'slug, label, and description are required' }, { status: 400 });
    }

    const track = createTrack({
      slug,
      label,
      description,
      accent: accent ?? '#E5404F',
      accentBg: accentBg ?? 'rgba(229,64,79,0.08)',
      accentBorder: accentBorder ?? 'rgba(229,64,79,0.18)',
      accentGlow: accentGlow ?? 'rgba(229,64,79,0.11)',
      emoji: emoji ?? '📚',
      comingSoon: comingSoon ?? false,
    });

    return NextResponse.json(track, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
