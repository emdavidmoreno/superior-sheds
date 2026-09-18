export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/** Path prefix for non-default locale (e.g. `/es`). Default locale has no prefix. */
export function localePathPrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}

export function localizedHref(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) {
    return normalized === '' ? '/' : normalized
  }
  if (normalized === '/') {
    return '/es'
  }
  return `/es${normalized}`
}

export function stripLocaleFromPathname(pathname: string): { locale: Locale; path: string } {
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const path = pathname === '/es' ? '/' : pathname.slice(3) || '/'
    return { locale: 'es', path }
  }
  return { locale: 'en', path: pathname }
}
