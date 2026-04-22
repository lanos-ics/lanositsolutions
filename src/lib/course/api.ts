import { prisma } from '@/lib/prisma';
import type { Track, Course } from './types';

function mapCourse(row: {
  slug: string;
  title: string;
  description: string;
  briefDescription: string | null;
  icon: string;
  originalPrice: number;
  price: number;
  syllabusUrl: string;
  badge: string | null;
}): Course {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    briefDescription: row.briefDescription ?? undefined,
    icon: row.icon,
    originalPrice: row.originalPrice,
    price: row.price,
    syllabusUrl: row.syllabusUrl,
    badge: (row.badge ?? undefined) as Course['badge'],
  };
}

export function mapTrack(row: {
  slug: string;
  label: string;
  description: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  emoji: string;
  comingSoon: boolean;
  courses: Parameters<typeof mapCourse>[0][];
}): Track {
  return {
    slug: row.slug,
    label: row.label,
    description: row.description,
    accent: row.accent,
    accentBg: row.accentBg,
    accentBorder: row.accentBorder,
    accentGlow: row.accentGlow,
    emoji: row.emoji,
    comingSoon: row.comingSoon,
    courses: row.courses.map(mapCourse),
  };
}

export async function getAllTracks(): Promise<Track[]> {
  const rows = await prisma.track.findMany({
    include: { courses: { orderBy: { createdAt: 'asc' } } },
    orderBy: { createdAt: 'asc' },
  });
  return rows.map(mapTrack);
}

export async function getTrackBySlug(slug: string): Promise<Track | undefined> {
  const row = await prisma.track.findUnique({
    where: { slug },
    include: { courses: { orderBy: { createdAt: 'asc' } } },
  });
  return row ? mapTrack(row) : undefined;
}

export async function getAllTrackSlugs(): Promise<string[]> {
  const rows = await prisma.track.findMany({ select: { slug: true }, orderBy: { createdAt: 'asc' } });
  return rows.map((r) => r.slug);
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
