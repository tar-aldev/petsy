import { authConfig } from '@petsy/auth-config/server';
import NextAuth from 'next-auth';

import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

const apiAuthPrefix = '/api/auth';

const middleware = auth((req) => {
  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return NextResponse.next();
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
