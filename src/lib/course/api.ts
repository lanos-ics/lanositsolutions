/* ─── Course API ────────────────────────────────────────────────
 * Read-only helpers consumed by frontend pages.
 * ──────────────────────────────────────────────────────────────── */

import path from 'path';
import fs from 'fs';
import type { CourseStore, Track } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/lib/course/data.json');

function readStore(): CourseStore {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as CourseStore;
}

/** Get all tracks (with their courses) */
export function getAllTracks(): Track[] {
  return readStore().tracks;
}

/** Look up a track by its URL slug */
export function getTrackBySlug(slug: string): Track | undefined {
  return readStore().tracks.find((t) => t.slug === slug);
}

/** Get all track slugs (for generateStaticParams) */
export function getAllTrackSlugs(): string[] {
  return readStore().tracks.map((t) => t.slug);
}

/** Format price in INR */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
