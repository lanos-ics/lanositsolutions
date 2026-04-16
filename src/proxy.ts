import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === '/admin/login';
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;

  // Already logged in → redirect away from login page
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin/blog', req.url));
  }

  // Login page is always accessible
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Protect admin pages → redirect to login
  if (isAdminPage && !session) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin API routes → 401
  if (isAdminApi && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
