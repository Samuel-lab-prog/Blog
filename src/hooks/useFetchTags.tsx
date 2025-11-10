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
        `${API_URL}/posts/tags`
      );
      if (!response.ok) {
      console.error('❌ Erro na resposta:', response.status, await response.text());
      return;
    }
      const tags = await response.json();
      if (!Array.isArray(tags)) {
      console.error('❌ Resposta não é array:', tags);
      return;
    }
      setTags(tags);
      localStorage.setItem('tags', JSON.stringify(tags));
    };
    fetchTags();
  }, []);
  return tags;
}
