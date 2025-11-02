import { useParams } from 'react-router-dom';
import useGetPostBySlug from '../hooks/useGetPostBySlug';

export default function PostPage() {
  const { slug } = useParams();
  const post = useGetPostBySlug(slug as string);

  if (!post) {
    return <div className="max-w-3xl mx-auto p-4">Loading...</div>;
  }
  return (
    <main className="p-4 mt-20">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-block bg-gray-200 mr-2 text-gray-400 "
        >
          {tag}
        </span>
      ))}
      <p className="mb-4 text-justify mt-4 wrap-break-word">
        {post.content}
      </p>
    </main>
  );
}
