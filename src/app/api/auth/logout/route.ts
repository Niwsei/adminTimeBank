import { NextResponse } from 'next/server';
import { deleteCookie } from 'cookies-next';

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });
  deleteCookie('auth_token', { req: request as any, res: response as any });
  return response;
}
