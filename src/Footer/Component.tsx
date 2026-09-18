import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { defaultLocale, localizedHref } from '@/i18n/config'
import { t } from '@/i18n/ui'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const [footerData, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 2, locale)(),
    getCachedGlobal('site-settings', 0, locale)(),
  ])

  const companyLinks = footerData?.companyLinks || []
  const productLinks = footerData?.productLinks || []

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-12 flex flex-col gap-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link href={localizedHref('/', locale)}>
              <Logo />
            </Link>
            {siteSettings?.footerBlurb && (
              <p className="text-sm text-muted-foreground max-w-sm">{siteSettings.footerBlurb}</p>
            )}
            <button
              className="text-left text-sm font-bold text-primary uppercase tracking-wide"
              type="button"
            >
              {t(locale, 'getQuote')}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Products
            </p>
            {productLinks.map((product) => {
              if (typeof product !== 'object' || !product) return null
              return (
                <Link
                  key={product.id}
                  className="text-sm hover:text-accent"
                  href={localizedHref(`/products/${product.slug}`, locale)}
                >
                  {product.name}
                </Link>
              )
            })}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Company
            </p>
            {companyLinks.map(({ link }, i) => (
              <CMSLink key={i} {...link} />
            ))}
            <p className="text-sm text-muted-foreground pt-4">{siteSettings?.hqAddress}</p>
            <a className="text-sm" href={`tel:${(siteSettings?.phone || '').replace(/\D/g, '')}`}>
              {siteSettings?.phone}
            </a>
            {siteSettings?.email && (
              <a className="text-sm text-accent" href={`mailto:${siteSettings.email}`}>
                {siteSettings.email}
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Superior Sheds, Inc.</span>
          {siteSettings?.approvalsLine && <span>{siteSettings.approvalsLine}</span>}
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
