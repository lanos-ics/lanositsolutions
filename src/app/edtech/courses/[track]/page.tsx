import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrackBySlug, getAllTrackSlugs } from "@/lib/course/api";
import TrackPage from "@/components/sections/courses/TrackPage";
import "./courses.css";

export const dynamic = "force-dynamic";

/* ─── Static params for all tracks ────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllTrackSlugs();
  return slugs.map((slug) => ({ track: slug }));
}

/* ─── Dynamic metadata per track ──────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track: slug } = await params;
  const track = await getTrackBySlug(slug);
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
  const track = await getTrackBySlug(slug);
  if (!track) notFound();

  return <TrackPage track={track} />;
}
