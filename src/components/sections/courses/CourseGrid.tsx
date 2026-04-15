"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Course, Track } from "@/lib/courseData";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  track: Track;
}

export default function CourseGrid({ courses, track }: CourseGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".cc-card");
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.97 });

    const t = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.07,
        }),
    });
    return () => t.kill();
  }, [courses]);

  return (
    <div ref={gridRef} className="cg-grid">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} track={track} />
      ))}
    </div>
  );
}
