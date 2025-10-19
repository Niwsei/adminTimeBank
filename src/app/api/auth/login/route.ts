import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: username, password, remember: true }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    const response = NextResponse.json(data);

    // Forward the Set-Cookie header from the backend
    const cookie = backendResponse.headers.get('Set-Cookie');
    if (cookie) {
      response.headers.set('Set-Cookie', cookie);
    }

    return response;

  } catch (error) {
    console.error('[LOGIN_API_ROUTE]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
