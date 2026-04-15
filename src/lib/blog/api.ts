import path from 'path';
import fs from 'fs';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { Blog, BlogCategory, BlogStore } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/lib/blog/data.json');

function readStore(): BlogStore {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as BlogStore;
}

export function getAllBlogs(): Blog[] {
  const { blogs } = readStore();
  return blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getBlogBySlug(slug: string): Blog | undefined {
  const { blogs } = readStore();
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsByCategory(category: BlogCategory): Blog[] {
  return getAllBlogs().filter((b) => b.category === category);
}

export function getFeaturedBlogs(limit = 3): Blog[] {
  return getAllBlogs()
    .filter((b) => b.featured)
    .slice(0, limit);
}

export function getPopularBlogs(limit = 5): Blog[] {
  return getAllBlogs()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
}

export function getRelatedBlogs(slug: string, category: BlogCategory, limit = 3): Blog[] {
  return getAllBlogs()
    .filter((b) => b.category === category && b.slug !== slug)
    .slice(0, limit);
}

export function searchBlogs(query: string): Blog[] {
  const q = query.toLowerCase();
  return getAllBlogs().filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      (b.tags ?? []).some((t) => t.toLowerCase().includes(q))
  );
}

export function readingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function extractTocItems(markdown: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }
  return items;
}
