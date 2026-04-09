import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/locale'

// constants
const PROTECTED = ['/products']
const AUTH_ONLY = ['/auth']

// helper
function isMatchingRoute(routes: string[], pathname: string): boolean {
  return routes.some((route) => pathname.startsWith(route))
}

// internationalization middleware
const intlMiddleware = createMiddleware(routing)

// middleware
export default function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const pathname = request.nextUrl.pathname

  const localePattern = new RegExp(`^\\/(${routing.locales.join('|')})`)
  const localeMatch = pathname.match(localePattern)
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale

  const barePathname = pathname.replace(localePattern, '') || '/'

  if (isMatchingRoute(PROTECTED, barePathname) && !token) {
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url))
  }

  if (isMatchingRoute(AUTH_ONLY, barePathname) && token) {
    return NextResponse.redirect(new URL(`/${locale}/products`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
