import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

type Tag = string;
export default function useFetchTags(): Tag[] {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    if (localStorage.getItem('tags')) {
      setTags(JSON.parse(localStorage.getItem('tags') || '[]'));
    }
    const fetchTags = async () => {
      const response = await fetch(
        `${API_URL}/tags`
      );
      const tags = await response.json();
      setTags(tags);
      localStorage.setItem('tags', JSON.stringify(tags));
    };
    fetchTags();
  }, []);
  return tags;
}
