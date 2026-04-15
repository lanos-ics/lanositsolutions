export type BlogCategory = 'lanos-edtech' | 'solutions' | 'research-and-development';

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'lanos-edtech': 'Lanos Edtech',
  'solutions': 'Solutions',
  'research-and-development': 'R&D',
};

export const CATEGORY_SLUGS = Object.keys(CATEGORY_LABELS) as BlogCategory[];

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface Comment {
  id: string;
  blogSlug: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  content: string;        // Markdown string
  coverImage: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[];      // session IDs that liked
  comments: Comment[];
  featured?: boolean;
  tags?: string[];
  keywords?: string[];
}

export interface BlogStore {
  blogs: Blog[];
}
