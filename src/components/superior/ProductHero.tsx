'use client'

import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import { t } from '@/i18n/ui'
import type { Product } from '@/payload-types'
import { Media } from '@/components/Media'
import { CtaButton } from '@/components/CtaButton'
import { useQuote } from '@/providers/Quote'

type Props = {
  locale: Locale
  phone?: string | null
  product: Product
}

export const ProductHero: React.FC<Props> = ({ locale, phone, product }) => {
  const { openQuote } = useQuote()
  const tel = (phone || '877-439-7433').replace(/\D/g, '')

  return (
    <section className="relative h-[95svh] max-h-[95svh] -mt-[var(--header-height)] flex items-end overflow-hidden bg-background">
      {product.heroImage && typeof product.heroImage === 'object' && (
        <div className="absolute inset-0 animate-ken-burns">
          <Media
            fill
            className="absolute inset-0 size-full"
            imgClassName="object-cover"
            pictureClassName="absolute inset-0 size-full"
            priority
            resource={product.heroImage}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background pointer-events-none" />

      <div className="container relative z-10 flex max-w-3xl flex-col gap-2 pb-24 pt-[calc(var(--header-height)+1rem)] md:gap-3 md:pb-10">
        <Link
          className="w-fit text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
          href={localizedHref('/', locale)}
        >
          ← {t(locale, 'backHome')}
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
          {product.category}
        </p>
        <h1 className="font-display text-[clamp(2rem,5.4vw,3.5rem)] leading-[0.92] uppercase text-balance">
          {product.name}
        </h1>
        {product.blurb && (
          <p className="max-w-[52ch] text-sm md:text-base text-muted-foreground text-pretty line-clamp-3">
            {product.blurb}
          </p>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          <CtaButton onClick={() => openQuote({ productSlug: product.slug })} type="button">
            {t(locale, 'quoteThis')}
          </CtaButton>
          <CtaButton asChild variant="outline">
            <a href={`tel:${tel}`}>{t(locale, 'callNow')}</a>
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
