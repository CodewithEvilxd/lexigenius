import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public access to PWA files, auth pages, and the root page
  if (
    pathname.startsWith('/manifest.json') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/auth') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // This is a generic check. A real app would check for a valid session token.
  // We assume that if there's any cookie named 'session' (a common name),
  // the user is authenticated. This might need to be adjusted based on your actual auth implementation.
  const session = request.cookies.get('session');

  if (pathname.startsWith('/dashboard') && !session) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!api|_next/static|_next/image).*)',
  ],
};
