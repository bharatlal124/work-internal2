// app/(admin)/posts/[id]/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditPost({ params }) {
  const { id } = params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`https://bharat-blog.onrender.com/api/blogs/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setTitle(data.title);
          setContent(data.content);
          setExcerpt(data.excerpt || '');
        } else {
          router.push('/wp-admin/posts');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/wp-admin/posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch(`https://bharat-blog.onrender.com/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          // Add other fields to update
        }),
      });

      if (response.ok) {
        router.push('/wp-admin/posts');
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading post...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Same form fields as NewPost component */}
        {/* ... */}
      </form>
    </div>
  );
}