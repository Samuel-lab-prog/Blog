import PostPreviewCard from '../components/PostPreviewCard';
import useFetchPosts from '../hooks/useFetchPosts';

export default function Home() {
  const posts = useFetchPosts();
  return (
    <main className="absolute w-full h-full left-0 top-20 flex flex-col items-center">
      <section className="p-4 xl:p-12 w-full">
        <h1 className="text-4xl mb-4 xl:mb-8 text-center">
          Latest posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
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
