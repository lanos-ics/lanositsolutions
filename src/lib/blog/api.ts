import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { prisma } from '@/lib/prisma';
import type { Blog, BlogCategory, Author, Comment } from './types';

function mapBlog(row: {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: unknown;
  featured: boolean;
  tags: string[];
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  _count?: { likes: number };
  likes?: { sessionId: string }[];
  comments?: { id: string; name: string; message: string; createdAt: Date }[];
}): Blog {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category as BlogCategory,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.coverImage,
    author: row.author as Author,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    featured: row.featured,
    tags: row.tags ?? [],
    keywords: row.keywords ?? [],
    likes: row._count?.likes ?? row.likes?.length ?? 0,
    likedBy: row.likes?.map((l) => l.sessionId) ?? [],
    comments: (row.comments ?? []).map((c): Comment => ({
      id: c.id,
      blogSlug: row.slug,
      name: c.name,
      message: c.message,
      createdAt: c.createdAt.toISOString(),
    })),
  };
}

const blogInclude = {
  _count: { select: { likes: true } },
  comments: { orderBy: { createdAt: 'desc' as const } },
} as const;

export async function getAllBlogs(): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    include: blogInclude,
  });
  return rows.map(mapBlog);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const row = await prisma.blog.findUnique({
    where: { slug },
    include: {
      likes: { select: { sessionId: true } },
      comments: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!row) return undefined;
  return mapBlog({ ...row, _count: { likes: row.likes.length } });
}

export async function getBlogsByCategory(category: BlogCategory): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    where: { category },
    orderBy: { createdAt: 'desc' },
    include: blogInclude,
  });
  return rows.map(mapBlog);
}

export async function getFeaturedBlogs(limit = 3): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: blogInclude,
  });
  return rows.map(mapBlog);
}

export async function getPopularBlogs(limit = 5): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    orderBy: { likes: { _count: 'desc' } },
    take: limit,
    include: blogInclude,
  });
  return rows.map(mapBlog);
}

export async function getRelatedBlogs(slug: string, category: BlogCategory, limit = 3): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    where: { category, NOT: { slug } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: blogInclude,
  });
  return rows.map(mapBlog);
}

export async function searchBlogs(query: string): Promise<Blog[]> {
  const rows = await prisma.blog.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: blogInclude,
  });
  return rows.map(mapBlog);
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
