/* ─── Course Types ──────────────────────────────────────────────
 * Shared type definitions for the EdTech course system.
 * ──────────────────────────────────────────────────────────────── */

export type CourseBadge = "new" | "popular" | "bestseller";

export interface Course {
  slug: string;
  title: string;
  description: string;
  briefDescription?: string;
  icon: string;
  originalPrice: number;
  price: number;
  syllabusUrl: string;
  badge?: CourseBadge;
}

export interface Track {
  slug: string;
  label: string;
  description: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  emoji: string;
  courses: Course[];
  comingSoon?: boolean;
}

export interface CourseStore {
  tracks: Track[];
}
