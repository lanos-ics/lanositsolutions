import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrackBySlug, getAllTrackSlugs } from "@/lib/course/api";
import TrackPage from "@/components/sections/courses/TrackPage";
import "./courses.css";

/* ─── Static params for all tracks ────────────────────────────── */
export function generateStaticParams() {
  return getAllTrackSlugs().map((slug) => ({ track: slug }));
}

/* ─── Dynamic metadata per track ──────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track: slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) return { title: "Track Not Found · Lanos IT Solutions" };

  return {
    title: `${track.label} Courses · Lanos EdTech`,
    description: track.description,
    keywords: [
      track.label,
      "courses",
      "EdTech",
      "Lanos",
      ...track.courses.map((c) => c.title),
    ],
  };
}

/* ─── Page ────────────────────────────────────────────────────── */
export default async function CoursesTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();

  return <TrackPage track={track} />;
}
