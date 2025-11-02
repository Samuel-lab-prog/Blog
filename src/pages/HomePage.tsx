import { useEffect, useState } from "react";
import PostPreviewCard from "../components/PostPreviewCard";

export type postType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  authorId: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  tags: string[];
};

export default function Home() {
  const [posts, setPosts] = useState<postType[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const posts = await response.json()
        setPosts(posts);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      }
    fetchPosts();
  }, []);
  
  return (
    <main className="absolute w-full h-full left-0 top-20 flex flex-col items-center">
      <section className="p-4 xl:p-12 w-full">
        <h1 className="text-4xl mb-4 xl:mb-8 text-center">Latest posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostPreviewCard
            key={post.id}
            title={post.title}
            excerpt="This is a brief excerpt of the post."
            tags={post.tags}
            postUrl={`/posts/${post.id}`}
            imageUrl="../assets/closeIcon.svg"
          />
        ))}
        </div>
      </section>
    </main>
  );
}
