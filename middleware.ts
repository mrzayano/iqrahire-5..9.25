import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
])

// now matches both the UI and the API
const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/api/onboarding(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const url = new URL(req.url)
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete

  // protect all non‑public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // If user is onboarded, send them off /onboarding → /feed
  if (userId && isOnboardingRoute(req) && onboardingComplete) {
    const redirectTo = url.searchParams.get('redirectTo') || '/feed'
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // If user is logged in but hasn't onboarded yet, and is NOT on the onboarding route…
  if (userId && !onboardingComplete && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  // Otherwise, let the request go through
})

export const config = {
  matcher: [
    // Apply to all public pages (except static assets)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Also always run for API routes under /api/*
    '/api/:path*',
    '/trpc/:path*',
  ],
}
