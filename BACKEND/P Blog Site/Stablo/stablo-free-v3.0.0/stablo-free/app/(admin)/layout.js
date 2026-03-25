// app/(admin)/layout.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/check-auth');
        const data = await response.json();
        
        if (response.ok && data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/wp-admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/wp-admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}