import { useState, useEffect } from 'react';
import type { Post } from '../types/types';

export default function useFetchPosts(
  limit?: number,
  tag?: string | null
): Post[] {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = new URL('http://localhost:5000/posts');

        if (limit) {
          url.searchParams.append('limit', limit.toString());
        }
        if (tag && tag.trim() !== '') {
          url.searchParams.append('tag', tag);
        }
        const response = await fetch(url.toString());
        if (!response.ok)
          throw new Error(
            'Network response was not ok' + response.statusText
          );

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(
          'There was a problem with the fetch operation:',
          error
        );
      }
    }
    fetchPosts();
  }, [limit, tag]);
  return posts;
}
