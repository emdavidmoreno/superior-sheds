'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import type { Header, Product } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: Locale
  products: Product[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale, products }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header
      className="sticky top-0 z-30 h-[var(--header-height)] border-b border-border/80 bg-background/90 backdrop-blur-md"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container h-full flex justify-between items-center gap-4">
        <Link href={localizedHref('/', locale)}>
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} locale={locale} products={products} />
      </div>
    </header>
  )
}
