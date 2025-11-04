import { useParams } from 'react-router-dom';
import useGetPostBySlug from '../hooks/useGetPostBySlug';

export default function PostPage() {
  const { slug } = useParams();
  const post = useGetPostBySlug(slug as string);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-gray-800">
        Loading...
      </div>
    );
  }

  return (
    <main className="px-4 py-12 absolute top-20 w-full flex flex-col items-center gap-y-12 ">
      <section className="max-w-xl w-full">
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        {post.tags.map((tag, i) => (
          <i
            key={`${tag}-${i}`}
            className="inline-block bg-gray-200 mr-2 text-gray-400 "
          >
            {tag}
          </i>
        ))}
      </section>
      <section
        className="max-w-xl w-full text-justify"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
