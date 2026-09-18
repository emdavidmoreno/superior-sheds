'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref, localeLabels, stripLocaleFromPathname } from '@/i18n/config'
import { t } from '@/i18n/ui'
import type { Header as HeaderType, Product } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { CtaButton } from '@/components/CtaButton'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { formatUsd } from '@/utilities/pricing'
import { useQuote } from '@/providers/Quote'

type Props = {
  data: HeaderType
  locale: Locale
  products: Product[]
}

export const HeaderNav: React.FC<Props> = ({ data, locale, products }) => {
  const pathname = usePathname()
  const { openQuote } = useQuote()
  const [menuOpen, setMenuOpen] = useState(false)
  const phone = data.phone || '877-439-7433'

  const switchLocale = (target: Locale) => {
    const { path } = stripLocaleFromPathname(pathname)
    return localizedHref(path, target)
  }

  const navItems = data.navItems || []
  const navTextClass = 'font-semibold uppercase tracking-[0.04em]'

  return (
    <>
      <nav className="hidden lg:flex items-center gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTextClass}>
                {t(locale, 'navProducts')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[520px] grid-cols-2 gap-2 p-4">
                  {products.map((product) => (
                    <li key={product.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block rounded-md border border-border p-3 hover:border-accent"
                          href={localizedHref(`/products/${product.slug}`, locale)}
                        >
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.short}</div>
                          {product.showPrice !== false && (
                            <div className="text-sm text-primary mt-1">
                              {t(locale, 'fromPrice')} {formatUsd(product.basePrice)}
                            </div>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" className={navTextClass} />
        ))}

        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link
            className={locale === 'en' ? 'text-accent' : 'text-muted-foreground'}
            href={switchLocale('en')}
          >
            {localeLabels.en}
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link
            className={locale === 'es' ? 'text-accent' : 'text-muted-foreground'}
            href={switchLocale('es')}
          >
            {localeLabels.es}
          </Link>
        </div>

        <a
          className="flex items-center gap-2 text-sm font-semibold"
          href={`tel:${phone.replace(/\D/g, '')}`}
        >
          <span className="size-2 rounded-full bg-success animate-pulse" />
          {phone}
        </a>

        <CtaButton onClick={() => openQuote()} type="button">
          {data.quoteLabel || t(locale, 'getQuote')}
        </CtaButton>
      </nav>

      <div className="flex lg:hidden items-center gap-2">
        <Sheet onOpenChange={setMenuOpen} open={menuOpen}>
          <SheetTrigger asChild>
            <Button size="sm" type="button" variant="outline">
              {t(locale, 'menu')}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6" side="left">
            <SheetHeader>
              <SheetTitle>{t(locale, 'menu')}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                {t(locale, 'navProducts')}
              </p>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={localizedHref(`/products/${product.slug}`, locale)}
                  onClick={() => setMenuOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
              {navItems.map(({ link }, i) => (
                <div key={i} onClick={() => setMenuOpen(false)}>
                  <CMSLink {...link} className={navTextClass} />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href={switchLocale('en')} onClick={() => setMenuOpen(false)}>
                {localeLabels.en}
              </Link>
              <Link href={switchLocale('es')} onClick={() => setMenuOpen(false)}>
                {localeLabels.es}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <CtaButton onClick={() => openQuote()} size="sm" type="button">
          {t(locale, 'getQuote')}
        </CtaButton>
      </div>
    </>
  )
}
