import { useState, useEffect } from 'react';
import type { Post } from '../types/types';

export default function useFetchPosts(
  limit?: number,
  tag?: string | null
): Omit<Post, 'content' | 'authorId'>[] {
  const [posts, setPosts] = useState<
    Omit<Post, 'content' | 'authorId'>[]
  >([]);

  useEffect(() => {
    const storageKey = `posts_${limit || 'all'}_${tag || 'all'}`;
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setPosts(parsed);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const fetchPosts = async () => {
      try {
        const url = new URL('http://localhost:5000/posts');

        if (limit) url.searchParams.append('limit', String(limit));
        if (tag && tag.trim() !== '')
          url.searchParams.append('tag', tag);

        const response = await fetch(url.toString());
        if (!response.ok)
          throw new Error(`Erro HTTP: ${response.status}`);
        const freshPosts = await response.json();
        setPosts(freshPosts);
        localStorage.setItem(storageKey, JSON.stringify(freshPosts));
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, [limit, tag]);

  return posts;
}
