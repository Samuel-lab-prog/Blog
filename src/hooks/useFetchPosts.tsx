import { useState, useEffect } from 'react';

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
export default function useFetchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:5000/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
  }, []);
  return posts;
}