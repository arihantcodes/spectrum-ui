import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn   = !!req.auth

  // Temporarily disabled — not production ready yet
  const hiddenRoutes = ['/dashboard', '/pro']
  const isHidden = hiddenRoutes.some(r => pathname === r || pathname.startsWith(r + '/'))
  if (isHidden) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const protectedRoutes = ['/create-user', '/profile']
  const isProtected = protectedRoutes.some(r => pathname === r || pathname.startsWith(r + '/'))

  // Redirect to sign in if not logged in
  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL('/sign-in', req.url)
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search
    signInUrl.searchParams.set('callbackUrl', callbackUrl)
    return NextResponse.redirect(signInUrl)
  }

  // pro.spectrumhq.in → rewrite to /pro
  const host = req.headers.get('host') ?? ''
  if (host.startsWith('pro.') && pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/pro'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
