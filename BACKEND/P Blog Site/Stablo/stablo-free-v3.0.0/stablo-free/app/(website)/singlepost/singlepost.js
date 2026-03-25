"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";

export default function SinglePost({ searchParams }) {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      try {
        const res = await fetch(`https://bharat-blog.onrender.com/api/blogs/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!post) return <div className="text-center py-20 text-red-500">Post not found.</div>;

  const imageUrl = post.image;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-gray-500 mb-6">
        <time dateTime={post.createdAt}>
          {format(parseISO(post.createdAt), "MMMM dd, yyyy")}
        </time>
      </div>

      {imageUrl && (
        <div className="mb-6">
          <Image
            src={imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <p>{post.description}</p>
        {/* You can render more fields like post.content if available */}
      </div>
    </div>
  );
}
