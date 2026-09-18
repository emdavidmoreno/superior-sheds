'use client'

import React from 'react'

import type { FinancingBandBlock as FinancingBandBlockProps } from '@/payload-types'

import { CtaButton } from '@/components/CtaButton'
import { useQuote } from '@/providers/Quote'

export const FinancingBandBlock: React.FC<FinancingBandBlockProps> = ({
  kicker,
  title,
  body,
  ctaLabel,
}) => {
  const { openQuote } = useQuote()

  return (
    <section className="bg-card border-y border-border">
      <div className="container py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-xl">
          {kicker && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{kicker}</p>
          )}
          {title && <h2 className="font-display text-3xl uppercase">{title}</h2>}
          {body && <p className="text-muted-foreground">{body}</p>}
        </div>
        {ctaLabel && (
          <CtaButton onClick={() => openQuote()} type="button" variant="outline">
            {ctaLabel}
          </CtaButton>
        )}
      </div>
    </section>
  )
}
