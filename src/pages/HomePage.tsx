import PostPreviewCard from '../components/PostPreviewCard';
import useFetchPosts from '../hooks/useFetchPosts';
import useUser from '../hooks/useUser';

export default function Home() {
  const posts = useFetchPosts(3);
  const user = useUser();
  return (
    <main className="absolute left-0 top-20 flex flex-col w-full">
      <section className="p-4 xl:p-12 h-70 flex flex-col justify-center items-start">
        <h5 className="text-gray-600">
          Bem-vindo(a) {user?.firstName} {user?.lastName}!
        </h5>
        <h2 className="xl:text-7xl">The Blog</h2>
        <p className="my-4">
          Esse é o meu blog pessoal, onde são compartilhadas ideias e
          experiências de um indivíduo chamado Samuel Gomes Monni.
        </p>

      </section>
      <section className="p-4 xl:p-12 flex flex-col items-start">
        <h2 className="my-4 lg:text-5xl">Últimos posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          { posts.map((post) => (
            <PostPreviewCard
              key={post.title}
              title={post.title}
              excerpt={post.excerpt}
              tags={post.tags}
              postUrl={`posts/${post.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
