import Link from "next/link";
import { getAllBlogs, readingTime } from "@/lib/blog/api";
import type { BlogCategory } from "@/lib/blog/types";
import { BlogCard, type BlogCardData } from "./BlogCard";

const TAG_LABEL: Record<BlogCategory, string> = {
  "lanos-edtech":            "EdTech",
  "solutions":               "IT Solutions",
  "research-and-development": "R&D",
};

const TAG_COLOR: Record<BlogCategory, string> = {
  "lanos-edtech":            "#E5404F",
  "solutions":               "#124898",
  "research-and-development": "#CD5473",
};

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

export default async function BlogTrailer() {
  const blogs = await getAllBlogs();
  const posts: BlogCardData[] = blogs.slice(0, 3).map((b) => ({
    slug:       b.slug,
    tag:        TAG_LABEL[b.category],
    tagColor:   TAG_COLOR[b.category],
    title:      b.title,
    excerpt:    b.excerpt,
    date:       formatShortDate(b.createdAt),
    readTime:   readingTime(b.content),
    coverImage: b.coverImage,
  }));

  if (posts.length === 0) return null;

  return (
    <section
      style={{
        padding:  "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        zIndex:   1,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding:        "0 clamp(1.75rem, 8vw, 9rem)",
          marginBottom:   "3.5rem",
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          gap:            "1rem",
          flexWrap:       "wrap",
        }}
      >
        <div>
          <span
            style={{
              display:       "block",
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              marginBottom:  "0.75rem",
              opacity:       0.75,
            }}
          >
            From the blog
          </span>
          <h2
            style={{
              fontWeight:    300,
              fontSize:      "clamp(1.75rem, 3.5vw, 3rem)",
              letterSpacing: "-0.035em",
              lineHeight:    1.1,
              color:         "var(--fg)",
            }}
          >
            Ideas worth{" "}
            <em style={{ fontStyle: "italic", fontWeight: 200, color: "var(--fg-muted)" }}>reading.</em>
          </h2>
        </div>

        <Link
          href="/blog"
          style={{
            fontSize:       "0.85rem",
            fontWeight:     600,
            color:          "var(--accent)",
            display:        "flex",
            alignItems:     "center",
            gap:            "0.4rem",
            whiteSpace:     "nowrap",
            textDecoration: "none",
          }}
        >
          All articles →
        </Link>
      </div>

      {/* Horizontal scrollable card row */}
      <div
        style={{
          display:                 "flex",
          gap:                     "2rem",
          padding:                 "0 clamp(1.75rem, 8vw, 9rem) 2rem",
          overflowX:               "auto",
          scrollSnapType:          "x mandatory",
          scrollbarWidth:          "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            style={{ scrollSnapAlign: "start", display: "flex", flex: "0 0 clamp(280px, 32%, 420px)" }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
