// app/api/admin/check-auth/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('adminToken');

  // In a real app, you would verify the token properly
  const isAuthenticated = adminToken?.value === 'your-secure-token';

  return NextResponse.json({ authenticated: isAuthenticated });
}