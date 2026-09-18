import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isLocale } from '@/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

function isExcluded(pathname: string): boolean {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/media') ||
    PUBLIC_FILE.test(pathname)
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isExcluded(pathname)) {
    return NextResponse.next()
  }

  const segment = pathname.split('/').filter(Boolean)[0]
  if (segment && isLocale(segment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap).*)'],
}
