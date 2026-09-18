'use client'

import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import { t } from '@/i18n/ui'
import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { CtaButton } from '@/components/CtaButton'
import { formatUsd } from '@/utilities/pricing'
import { useQuote } from '@/providers/Quote'

type Props = {
  locale: Locale
  products: Product[]
  title?: string | null
  subtitle?: string | null
}

export const ProductStackSection: React.FC<Props> = ({ locale, products, title, subtitle }) => {
  const { openQuote } = useQuote()

  return (
    <section className="flex flex-col gap-4 py-12">
      <div className="container flex flex-col gap-3 max-w-2xl">
        {title && <h2 className="font-display text-4xl uppercase">{title}</h2>}
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {products.map((product) => (
        <article
          key={product.id}
          className="relative min-h-[70vh] flex items-end border-b border-border overflow-hidden"
        >
          {product.heroImage && typeof product.heroImage === 'object' && (
            <div className="absolute inset-0">
              <Media fill imgClassName="object-cover" resource={product.heroImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>
          )}
          <div className="container relative z-10 grid lg:grid-cols-[1fr_280px] gap-8 pb-12 pt-32">
            <div className="flex flex-col gap-4 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                {product.category}
              </p>
              <h3 className="font-display text-5xl uppercase">{product.name}</h3>
              {(product.blurb || product.short) && (
                <p className="text-muted-foreground">{product.blurb || product.short}</p>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <CtaButton asChild>
                  <Link href={localizedHref(`/products/${product.slug}`, locale)}>
                    {t(locale, 'explore')}
                  </Link>
                </CtaButton>
                <CtaButton
                  onClick={() => openQuote({ productSlug: product.slug })}
                  type="button"
                  variant="outline"
                >
                  {t(locale, 'quoteThis')}
                </CtaButton>
              </div>
            </div>
            <div className="bg-card border border-border p-5 flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t(locale, 'specsLabel')}
                </span>
                {product.showPrice !== false && (
                  <span className="font-display text-2xl text-primary">
                    {t(locale, 'fromPrice')} {formatUsd(product.basePrice)}
                  </span>
                )}
              </div>
              {(product.quickSpecs || []).slice(0, 4).map((spec, i) => (
                <div key={i} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
