import path from 'path';
import fs from 'fs';
import type { Blog, BlogStore, Comment } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/lib/blog/data.json');

function readStore(): BlogStore {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as BlogStore;
}

function writeStore(store: BlogStore): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export function toggleLike(slug: string, sessionId: string): { likes: number; liked: boolean } {
  const store = readStore();
  const blog = store.blogs.find((b) => b.slug === slug);
  if (!blog) throw new Error('Blog not found');

  const alreadyLiked = blog.likedBy.includes(sessionId);
  if (alreadyLiked) {
    blog.likedBy = blog.likedBy.filter((id) => id !== sessionId);
    blog.likes = Math.max(0, blog.likes - 1);
  } else {
    blog.likedBy.push(sessionId);
    blog.likes += 1;
  }
  writeStore(store);
  return { likes: blog.likes, liked: !alreadyLiked };
}

export function addComment(slug: string, name: string, message: string): Comment {
  const store = readStore();
  const blog = store.blogs.find((b) => b.slug === slug);
  if (!blog) throw new Error('Blog not found');

  const comment: Comment = {
    id: `c${Date.now()}`,
    blogSlug: slug,
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  blog.comments.push(comment);
  writeStore(store);
  return comment;
}

export function getComments(slug: string): Comment[] {
  const store = readStore();
  const blog = store.blogs.find((b) => b.slug === slug);
  return blog?.comments ?? [];
}

export function createBlog(data: Omit<Blog, 'id' | 'likes' | 'likedBy' | 'comments'>): Blog {
  const store = readStore();
  const blog: Blog = {
    ...data,
    id: String(Date.now()),
    likes: 0,
    likedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.blogs.push(blog);
  writeStore(store);
  return blog;
}

export function updateBlog(id: string, data: Partial<Blog>): Blog {
  const store = readStore();
  const idx = store.blogs.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error('Blog not found');
  store.blogs[idx] = { ...store.blogs[idx], ...data, updatedAt: new Date().toISOString() };
  writeStore(store);
  return store.blogs[idx];
}

export function deleteBlog(id: string): void {
  const store = readStore();
  store.blogs = store.blogs.filter((b) => b.id !== id);
  writeStore(store);
}
