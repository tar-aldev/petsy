import { authConfig } from '@petsy/auth-config/server';
import NextAuth from 'next-auth';

import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

const apiAuthPrefix = '/api/auth';

const publicRoutes = ['/'];
const authRoutes = ['/login', '/signup'];
const profileRoute = '/user/profile/animals';

const middleware = auth((req) => {
  const { nextUrl, url, auth } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAuthenticated = !!auth;

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(profileRoute, url));
    }
    return NextResponse.next();
  }

  if (!auth && !publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', url));
  }
  // TODO: Add authorization based on roles
  return NextResponse.next();
});

export default middleware;
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
