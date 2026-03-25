// app/api/admin/login/route.js
import { NextResponse } from 'next/server';

// In a real app, you would store this in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword';

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': `adminToken=${'your-secure-token'}; Path=/; HttpOnly; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}`,
        },
      }
    );
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}