/* ─── Course Store ──────────────────────────────────────────────
 * JSON-file–based CRUD for tracks and courses.
 * Mirrors the blog store pattern in src/lib/blog/store.ts.
 * ──────────────────────────────────────────────────────────────── */

import path from 'path';
import fs from 'fs';
import type { CourseStore, Track, Course } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/lib/course/data.json');

function readStore(): CourseStore {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as CourseStore;
}

function writeStore(store: CourseStore): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

/* ─── Track CRUD ──────────────────────────────────────────────── */

export function getAllTracks(): Track[] {
  return readStore().tracks;
}

export function getTrackBySlug(slug: string): Track | undefined {
  return readStore().tracks.find((t) => t.slug === slug);
}

export function createTrack(data: Omit<Track, 'courses'>): Track {
  const store = readStore();
  if (store.tracks.some((t) => t.slug === data.slug)) {
    throw new Error(`Track with slug "${data.slug}" already exists`);
  }
  const track: Track = { ...data, courses: [] };
  store.tracks.push(track);
  writeStore(store);
  return track;
}

export function updateTrack(slug: string, data: Partial<Omit<Track, 'courses'>>): Track {
  const store = readStore();
  const idx = store.tracks.findIndex((t) => t.slug === slug);
  if (idx === -1) throw new Error('Track not found');
  // Keep courses intact, only update track metadata
  store.tracks[idx] = { ...store.tracks[idx], ...data, courses: store.tracks[idx].courses };
  writeStore(store);
  return store.tracks[idx];
}

export function deleteTrack(slug: string): void {
  const store = readStore();
  const before = store.tracks.length;
  store.tracks = store.tracks.filter((t) => t.slug !== slug);
  if (store.tracks.length === before) throw new Error('Track not found');
  writeStore(store);
}

/* ─── Course CRUD ─────────────────────────────────────────────── */

export function createCourse(trackSlug: string, data: Course): Course {
  const store = readStore();
  const track = store.tracks.find((t) => t.slug === trackSlug);
  if (!track) throw new Error('Track not found');
  if (track.courses.some((c) => c.slug === data.slug)) {
    throw new Error(`Course with slug "${data.slug}" already exists in this track`);
  }
  track.courses.push(data);
  writeStore(store);
  return data;
}

export function updateCourse(trackSlug: string, courseSlug: string, data: Partial<Course>): Course {
  const store = readStore();
  const track = store.tracks.find((t) => t.slug === trackSlug);
  if (!track) throw new Error('Track not found');
  const idx = track.courses.findIndex((c) => c.slug === courseSlug);
  if (idx === -1) throw new Error('Course not found');
  track.courses[idx] = { ...track.courses[idx], ...data };
  writeStore(store);
  return track.courses[idx];
}

export function deleteCourse(trackSlug: string, courseSlug: string): void {
  const store = readStore();
  const track = store.tracks.find((t) => t.slug === trackSlug);
  if (!track) throw new Error('Track not found');
  const before = track.courses.length;
  track.courses = track.courses.filter((c) => c.slug !== courseSlug);
  if (track.courses.length === before) throw new Error('Course not found');
  writeStore(store);
}
