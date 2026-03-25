// singlepost/[id]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

export default async function SinglePostPage({ params }) {
  const { id } = params;

  const res = await fetch(`https://bharat-blog.onrender.com/api/blogs/${id}`);
  if (!res.ok) return notFound();

  const post = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-6">
        <time dateTime={post.createdAt}>
          {format(parseISO(post.createdAt), "MMMM dd, yyyy")}
        </time>
      </div>
      {post.image && (
        <div className="mb-6">
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none">
        <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
      </div>
    </div>
  );
}
