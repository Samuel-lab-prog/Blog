import { useState, useEffect } from 'react';
type Tag = string;
export default function useFetchTags(): Tag[] {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    if (localStorage.getItem('tags')) {
      setTags(JSON.parse(localStorage.getItem('tags') || '[]'));
    }
    const fetchTags = async () => {
      const response = await fetch(
        'http://localhost:5000/posts/tags'
      );
      const tags = await response.json();
      setTags(tags);
      localStorage.setItem('tags', JSON.stringify(tags));
    };
    fetchTags();
  }, []);
  return tags;
}
