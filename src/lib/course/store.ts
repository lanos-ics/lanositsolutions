import { prisma } from '@/lib/prisma';
import { mapTrack } from './api';
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

export async function createTrack(data: Omit<Track, 'courses'>): Promise<Track> {
  const existing = await prisma.track.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error(`Track with slug "${data.slug}" already exists`);

  const row = await prisma.track.create({
    data: {
      slug: data.slug,
      label: data.label,
      description: data.description,
      accent: data.accent,
      accentBg: data.accentBg,
      accentBorder: data.accentBorder,
      accentGlow: data.accentGlow,
      emoji: data.emoji,
      comingSoon: data.comingSoon ?? false,
    },
    include: { courses: true },
  });
  return mapTrack(row);
}

export async function updateTrack(slug: string, data: Partial<Omit<Track, 'courses'>>): Promise<Track> {
  const row = await prisma.track.update({
    where: { slug },
    data,
    include: { courses: { orderBy: { createdAt: 'asc' } } },
  });
  return mapTrack(row);
}

export async function deleteTrack(slug: string): Promise<void> {
  await prisma.track.delete({ where: { slug } });
}

export async function createCourse(trackSlug: string, data: Course): Promise<Course> {
  const existing = await prisma.course.findUnique({
    where: { trackSlug_slug: { trackSlug, slug: data.slug } },
  });
  if (existing) throw new Error(`Course with slug "${data.slug}" already exists in this track`);

  const row = await prisma.course.create({
    data: {
      trackSlug,
      slug: data.slug,
      title: data.title,
      description: data.description,
      briefDescription: data.briefDescription ?? null,
      icon: data.icon,
      originalPrice: data.originalPrice,
      price: data.price,
      syllabusUrl: data.syllabusUrl,
      badge: data.badge ?? null,
    },
  });
  return mapCourse(row);
}

export async function updateCourse(trackSlug: string, courseSlug: string, data: Partial<Course>): Promise<Course> {
  const row = await prisma.course.update({
    where: { trackSlug_slug: { trackSlug, slug: courseSlug } },
    data: {
      ...data,
      briefDescription: data.briefDescription ?? null,
      badge: data.badge ?? null,
    },
  });
  return mapCourse(row);
}

export async function deleteCourse(trackSlug: string, courseSlug: string): Promise<void> {
  await prisma.course.delete({
    where: { trackSlug_slug: { trackSlug, slug: courseSlug } },
  });
}
