export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};