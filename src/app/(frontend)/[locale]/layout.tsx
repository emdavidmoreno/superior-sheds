import type { Metadata } from 'next'
import { Anton, Archivo } from 'next/font/google'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { MobileQuoteBar } from '@/components/superior/MobileQuoteBar'
import { QuoteDrawerLoader } from '@/components/superior/QuoteDrawerLoader'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { isLocale, type Locale } from '@/i18n/config'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params
  if (!isLocale(localeParam)) {
    notFound()
  }
  const locale = localeParam as Locale
  const { isEnabled } = await draftMode()
  const siteSettings = await getCachedGlobal('site-settings', 0, locale)()
  const phone = siteSettings?.phone || '877-439-7433'

  return (
    <html
      className={cn(archivo.variable, anton.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="font-sans pb-20 md:pb-0">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <React.Suspense fallback={null}>
            <QuoteDrawerLoader locale={locale} />
          </React.Suspense>
          <MobileQuoteBar locale={locale} phone={phone} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    default: 'Superior Sheds',
    template: '%s | Superior Sheds',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}
