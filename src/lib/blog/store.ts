import { prisma } from '@/lib/prisma';
import type { Blog, Comment } from './types';
import type { Prisma } from '@/generated/prisma/client';

const blogInclude = {
  _count: { select: { likes: true } },
  comments: { orderBy: { createdAt: 'desc' as const } },
} as const;

function mapBlogRow(row: {
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
    category: row.category as Blog['category'],
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.coverImage,
    author: row.author as Blog['author'],
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

export async function toggleLike(slug: string, sessionId: string): Promise<{ likes: number; liked: boolean }> {
  const blog = await prisma.blog.findUnique({ where: { slug }, select: { id: true } });
  if (!blog) throw new Error('Blog not found');

  const existing = await prisma.like.findUnique({
    where: { blogId_sessionId: { blogId: blog.id, sessionId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { blogId_sessionId: { blogId: blog.id, sessionId } } });
  } else {
    await prisma.like.create({ data: { blogId: blog.id, sessionId } });
  }

  const likes = await prisma.like.count({ where: { blogId: blog.id } });
  return { likes, liked: !existing };
}

export async function addComment(slug: string, name: string, message: string): Promise<Comment> {
  const blog = await prisma.blog.findUnique({ where: { slug }, select: { id: true } });
  if (!blog) throw new Error('Blog not found');

  const row = await prisma.comment.create({
    data: { blogId: blog.id, name: name.trim(), message: message.trim() },
  });

  return {
    id: row.id,
    blogSlug: slug,
    name: row.name,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getComments(slug: string): Promise<Comment[]> {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: {
      slug: true,
      comments: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!blog) return [];
  return blog.comments.map((c) => ({
    id: c.id,
    blogSlug: slug,
    name: c.name,
    message: c.message,
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function createBlog(data: Omit<Blog, 'id' | 'likes' | 'likedBy' | 'comments'>): Promise<Blog> {
  const row = await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author as unknown as Prisma.InputJsonValue,
      featured: data.featured ?? false,
      tags: data.tags ?? [],
      keywords: data.keywords ?? [],
    },
    include: blogInclude,
  });
  return mapBlogRow(row);
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog> {
  const row = await prisma.blog.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author !== undefined ? (data.author as unknown as Prisma.InputJsonValue) : undefined,
      featured: data.featured,
      tags: data.tags,
      keywords: data.keywords,
    },
    include: blogInclude,
  });
  return mapBlogRow(row);
}

export async function deleteBlog(id: string): Promise<void> {
  await prisma.blog.delete({ where: { id } });
}
