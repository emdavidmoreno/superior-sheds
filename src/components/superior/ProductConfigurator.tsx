'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import { t } from '@/i18n/ui'
import type { Product, ProductOption, SiteSetting } from '@/payload-types'

import { CtaButton } from '@/components/CtaButton'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { calculateEstimateRange, formatUsd, parseSqftFromSizeLabel } from '@/utilities/pricing'
import { useQuote } from '@/providers/Quote'

type Props = {
  locale: Locale
  product: Product
  siteSettings: SiteSetting
}

export const ProductConfigurator: React.FC<Props> = ({ locale, product, siteSettings }) => {
  const { openQuote } = useQuote()
  const defaultSize = product.sizes?.[0]?.label || ''
  const [sizeLabel, setSizeLabel] = useState(defaultSize)
  const [selectedOptions, setSelectedOptions] = useState<Array<string | number>>([])

  const options = useMemo(() => {
    const rel = product.options
    if (!rel || !Array.isArray(rel)) return []
    return rel.filter((o): o is ProductOption => typeof o === 'object' && o !== null)
  }, [product.options])

  const estimate = useMemo(() => {
    if (!sizeLabel) return null
    const sqft = parseSqftFromSizeLabel(sizeLabel)
    const optionsTotal = options
      .filter((o) => selectedOptions.includes(o.id))
      .reduce((sum, o) => sum + (o.price || 0), 0)
    return calculateEstimateRange({
      basePrice: product.basePrice,
      pricePerSqFt: product.pricePerSqFt,
      sqft,
      optionsTotal,
    })
  }, [product, sizeLabel, options, selectedOptions])

  const toggleOption = (id: string | number) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  return (
    <section className="container py-16 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl uppercase">Configure</h2>
          <ToggleGroup
            className="flex flex-wrap justify-start gap-2"
            onValueChange={(v) => v && setSizeLabel(v)}
            type="single"
            value={sizeLabel}
          >
            {(product.sizes || []).map((size) => (
              <ToggleGroupItem key={size.id || size.label} value={size.label}>
                {size.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {options.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Add options</h3>
            <div className="flex flex-wrap gap-2">
              {options.map((o) => (
                <Button
                  key={o.id}
                  onClick={() => toggleOption(o.id)}
                  size="sm"
                  type="button"
                  variant={selectedOptions.includes(o.id) ? 'default' : 'outline'}
                >
                  {o.label} (+{formatUsd(o.price)})
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="sticky top-24 bg-card border border-border p-6 flex flex-col gap-4">
        <h3 className="font-display text-xl uppercase">Your build</h3>
        {estimate && siteSettings.showPrices !== false && (
          <div>
            <p className="text-xs uppercase text-muted-foreground">Estimated range</p>
            <p className="font-display text-3xl text-primary">
              {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{siteSettings.estimateDisclaimer}</p>
          </div>
        )}
        <CtaButton
          onClick={() =>
            openQuote({
              productSlug: product.slug,
              sizeLabel,
              optionIds: selectedOptions,
            })
          }
          type="button"
        >
          Send this build
        </CtaButton>
        <CtaButton asChild type="button" variant="outline">
          <a href={`tel:${(siteSettings.phone || '').replace(/\D/g, '')}`}>{t(locale, 'call')}</a>
        </CtaButton>
        <CtaButton asChild type="button" variant="ghost">
          <Link href={localizedHref('/', locale)}>{t(locale, 'explore')}</Link>
        </CtaButton>
      </div>
    </section>
  )
}
