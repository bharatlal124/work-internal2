// app/api/admin/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { success: true },
    {
      headers: {
        'Set-Cookie': `adminToken=; Path=/; HttpOnly; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    }
  );
}