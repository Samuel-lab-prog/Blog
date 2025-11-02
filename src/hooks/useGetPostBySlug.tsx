import { useEffect, useState } from 'react';

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

export default function useGetPostBySlug(slug: string): Post | null {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    if (!slug) return;
    async function fetchPost() {
      try {
        const response = await fetch(
          `http://localhost:5000/posts/${slug}`
        );
        if (!response.ok) {
          console.error(
            'Network response was not ok',
            response.statusText
          );
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (err: unknown) {
        console.error(
          'There was a problem with the fetch operation:',
          err
        );
      }
    }
    fetchPost();
  }, [slug]);
  return post;
}
