import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/user(.*)']);
const authRoutes = ['/sign-in', '/sign-up'];
const DEFAULT_LOGIN_REDIRECT = '/user/profile/animals';

export default clerkMiddleware(async (auth, req) => {
  const { nextUrl, url } = req;
  console.log('MIDDLEWARE', nextUrl.pathname);

  const authState = await auth();

  console.log('authState', authState);

  // return;
  if (authRoutes.includes(nextUrl.pathname) && !!authState.userId) {
    console.log('REDIRECT');

    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url));
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
