import { useState } from 'react';
import PostPreviewCard from '../components/PostPreviewCard';
import useFetchPosts from '../hooks/useFetchPosts';
import useFetchTags from '../hooks/useFetchTags';
import Button from '../components/Button';
import SelectInput from '../components/SelectInput';

export default function Home() {
  const [tag, setTag] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(3);
  const posts = useFetchPosts(limit, tag);
  const tags = useFetchTags();

  return (
    <main className="absolute left-0 top-20 flex flex-col items-center ">
      <section className="p-4 xl:p-12">
        <h2 className="my-4 w-fit">Todos os posts</h2>
        <div className="max-w-md">
          <SelectInput
            label="Filtrar por categoria"
            placeholder="Selecione uma tag"
            options={tags.map((tag) => ({ value: tag, label: tag }))}
            name="tag"
            onChange={(e) => {
              const value = e.target.value;
              setTag(value === '' ? null : value);
              setLimit(3);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-4">
          {posts.length === 0 && <p>Nenhum post encontrado.</p>}
          {posts.map((post) => (
            <PostPreviewCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              tags={post.tags}
              postUrl={post.slug}
            />
          ))}
        </div>
        <Button onClick={() => setLimit((prev) => prev + 6)}>
          Ver mais
        </Button>
      </section>
    </main>
  );
}
