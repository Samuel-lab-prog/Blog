import PostPreviewCard from '../components/PostPreviewCard';
import useFetchPosts from '../hooks/useFetchPosts';
import Input from '../components/Input';
import Button from '../components/Button';
import SelectInput from '../components/SelectInput';

export default function Home() {
  const posts = useFetchPosts(30);
  return (
    <main className="absolute w-full h-full left-0 top-20 flex flex-col items-center">
      <section className="px-4 xl:px-12 w-full">
        <h2 className="my-12 xl:mb-8 w-fit">
          Todos os posts
        </h2>
        <div className='max-w-xl'>
          <SelectInput
            label="Filtrar por categoria"
            placeholder="Selecione uma tag"
            options={[
              { value: 'all', label: 'Todos' },
              { value: 'tech', label: 'Tecnologia' },
              { value: 'lifestyle', label: 'Estilo de Vida' },
              { value: 'business', label: 'Negócios' },
            ]}
          />
          <Input placeholder="Digite o nome" label='Buscar por nome' />
          <Button>Buscar</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 my-12">
          {posts.map((post) => (
            <PostPreviewCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              tags={post.tags}
              postUrl={`/posts/${post.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
