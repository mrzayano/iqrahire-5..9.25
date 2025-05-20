import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
])

const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/api/onboarding(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { pathname, search } = req.nextUrl

  // ✅ Redirect to lowercase if path contains uppercase letters
  if (pathname !== pathname.toLowerCase()) {
    const lowercaseURL = `${pathname.toLowerCase()}${search}`
    return NextResponse.redirect(new URL(lowercaseURL, req.url))
  }

  const { userId, sessionClaims } = await auth()
  const url = new URL(req.url)
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete

  // 🔒 Protect all non‑public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // 🚀 If onboarded, redirect from onboarding to jobs
  if (userId && isOnboardingRoute(req) && onboardingComplete) {
    const redirectTo = url.searchParams.get('redirectTo') || '/jobs'
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // 🚧 If not onboarded, force them to onboarding route
  if (userId && !onboardingComplete && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }



  return NextResponse.next()
})

export const config = {
  matcher: [
    // Only match routes excluding static files and assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/:path*',
    '/trpc/:path*',
  ],
}
