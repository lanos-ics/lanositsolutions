import type { Metadata } from "next";
import CoursesIndex from "@/components/sections/courses/CoursesIndex";
import "../edtech.css";

export const metadata: Metadata = {
  title: "All Courses · Lanos EdTech",
  description:
    "Explore all tech tracks and courses at Lanos EdTech — from Programming Foundations to AI, Web Development, Data Science, and more.",
  keywords: ["courses", "EdTech", "Lanos", "programming", "web development", "data science"],
};

export default function CoursesPage() {
  return <CoursesIndex />;
}
