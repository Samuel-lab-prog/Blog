import { useState, useEffect } from 'react';
import type { Post } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export default function useFetchPosts(
  limit?: number,
  tag?: string | null
): Omit<Post, 'content' | 'authorId' | 'id'>[] {
  const [posts, setPosts] = useState<
    Omit<Post, 'content' | 'authorId' | 'id'>[]
  >([]);

  const cacheKey = `posts_cache_${limit || 'all'}_${tag || 'none'}`;

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setPosts(parsed);
      } catch {
        console.warn("Cache inválido, ignorando");
      }
    }

    const fetchPosts = async () => {
      try {
        const url = new URL(`${API_URL}/posts`);

        if (limit) url.searchParams.append('limit', String(limit));
        if (tag && tag.trim() !== '')
          url.searchParams.append('tag', String(tag));

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const freshPosts = await response.json();

        setPosts(freshPosts);

        localStorage.setItem(cacheKey, JSON.stringify(freshPosts));
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, [limit, tag, cacheKey]);

  return posts;
}
