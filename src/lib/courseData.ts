/* ─── Course Data ───────────────────────────────────────────────
 * Backward-compatible re-exports.
 *
 * IMPORTANT: This file is imported by client components, so it
 * MUST NOT import Node-only modules (fs, path, etc.).
 *
 * • Types & formatPrice — re-exported here (safe for client)
 * • Server-only functions — import from '@/lib/course/api' directly
 * ──────────────────────────────────────────────────────────────── */

// Re-export types (type-only — always safe)
export type { CourseBadge, Course, Track } from './course/types';

/** Format price in INR */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
