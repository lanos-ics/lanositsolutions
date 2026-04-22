import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrackBySlug, getAllTracks } from "@/lib/course/api";
import CourseDetailPage from "@/components/sections/courses/CourseDetailPage";
import "../courses.css";

export const dynamic = "force-dynamic";

/* ─── Static params for all courses ────────────────────────────── */
export async function generateStaticParams() {
  const tracks = await getAllTracks();
  const params: { track: string; course: string }[] = [];
  for (const track of tracks) {
    for (const course of track.courses) {
      params.push({ track: track.slug, course: course.slug });
    }
  }
  return params;
}

/* ─── Dynamic metadata per course ──────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; course: string }>;
}): Promise<Metadata> {
  const { track: trackSlug, course: courseSlug } = await params;
  const track = await getTrackBySlug(trackSlug);
  if (!track) return { title: "Track Not Found · Lanos IT Solutions" };

  const course = track.courses.find(c => c.slug === courseSlug);
  if (!course) return { title: "Course Not Found · Lanos IT Solutions" };

  return {
    title: `${course.title} · ${track.label} · Lanos EdTech`,
    description: course.description,
    keywords: [
      course.title,
      track.label,
      "courses",
      "EdTech",
      "Lanos",
      course.badge || ""
    ].filter(Boolean),
  };
}

/* ─── Page ────────────────────────────────────────────────────── */
export default async function CoursesTrackPage({
  params,
}: {
  params: Promise<{ track: string; course: string }>;
}) {
  const { track: trackSlug, course: courseSlug } = await params;
  const track = await getTrackBySlug(trackSlug);
  if (!track) notFound();

  const course = track.courses.find(c => c.slug === courseSlug);
  if (!course) notFound();

  return <CourseDetailPage track={track} course={course} />;
}
