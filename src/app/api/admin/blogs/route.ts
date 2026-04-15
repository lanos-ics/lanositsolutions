import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/blog/api';
import { createBlog } from '@/lib/blog/store';
import type { BlogCategory } from '@/lib/blog/types';

export async function GET() {
  const blogs = getAllBlogs();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, category, excerpt, content, coverImage, author, featured, tags, keywords } = body;

    if (!title || !slug || !category || !content || !author) {
      return NextResponse.json({ error: 'title, slug, category, content, and author are required' }, { status: 400 });
    }

    const blog = createBlog({
      title,
      slug,
      category: category as BlogCategory,
      excerpt: excerpt ?? '',
      content,
      coverImage: coverImage ?? '',
      author,
      featured: featured ?? false,
      tags: tags ?? [],
      keywords: keywords ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
