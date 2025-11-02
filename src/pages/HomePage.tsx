import PostPreviewCard from '../components/PostPreviewCard';
import useFetchPosts from '../hooks/useFetchPosts';

export default function Home() {
  const posts = useFetchPosts();
  return (
    <main className="absolute w-full h-full left-0 top-20 flex flex-col items-center">
      <section className="px-4 xl:px-12 w-full">
        <h2 className="my-12 xl:mb-8 w-fit">
          Últimos posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-12">
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
