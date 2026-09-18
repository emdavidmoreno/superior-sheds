'use client'

import React from 'react'

import type { WhyGridBlock as WhyGridBlockProps } from '@/payload-types'

import { CtaButton } from '@/components/CtaButton'
import { useQuote } from '@/providers/Quote'

export const WhyGridBlock: React.FC<WhyGridBlockProps> = ({ title, subtitle, items, ctaLabel }) => {
  const { openQuote } = useQuote()

  return (
    <section className="container py-20 flex flex-col gap-10">
      <div className="max-w-2xl flex flex-col gap-4">
        {title && <h2 className="font-display text-4xl uppercase">{title}</h2>}
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-0 border-t border-border">
        {(items || []).map((item, i) => (
          <div
            key={i}
            className="grid md:grid-cols-[4rem_1fr] gap-4 py-8 border-b border-border"
          >
            <span className="font-display text-2xl text-accent">{item.number}</span>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
      {ctaLabel && (
        <CtaButton onClick={() => openQuote()} type="button">
          {ctaLabel}
        </CtaButton>
      )}
    </section>
  )
}
