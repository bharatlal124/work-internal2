"use client"; // ⬅️ Add this at the top if you're using Next.js App Router

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://bharat-blog.onrender.com/api/blogs/all");
        // const res = await fetch("http://localhost:5000/api/blogs/all");
        const data = await res.json();
        const allPosts = Array.isArray(data) ? data : data.data || [];
        setPosts(allPosts.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <>
      {posts?.length > 0 ? (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(0, 6).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/archive"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      ) : (
        <div className="text-center py-20 text-gray-500">No posts found</div>
      )}
    </>
  );
}
