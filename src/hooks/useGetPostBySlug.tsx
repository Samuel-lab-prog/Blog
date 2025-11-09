import { useEffect, useState } from 'react';
import type { Post } from '../types/types';

export default function useGetPostBySlug(
  slug: string
): Omit<Post, 'authorId'> | null {
  const [post, setPost] = useState<Omit<
    Post,
    'authorId'
  > | null>(null);
  useEffect(() => {
    if (!slug) return;
    const storedPost = localStorage.getItem(`post_${slug}`);
    if (storedPost) {
      try {
        const parsed = JSON.parse(storedPost);
        if (parsed) {
          setPost(parsed);
        }
      } catch {
        localStorage.removeItem(`post_${slug}`);
      }
    }

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
