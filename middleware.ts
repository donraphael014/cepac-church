import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const path = request.nextUrl.pathname;

  // Si c'est la page de login
  if (path === '/admin/login') {
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Si c'est une route admin (sauf login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};