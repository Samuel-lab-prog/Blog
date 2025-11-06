import { createContext, useContext, useState } from "react";
import type { Post } from "../types/types";

const PostsContext = createContext(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Omit<Post, 'content' | 'authorId'>[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts deve ser usado dentro de PostsProvider");
  }
  return context;
}
