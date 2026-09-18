'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { Locale } from '@/i18n/config'
import type { Product, ProductOption, SiteSetting } from '@/payload-types'

import { CtaButton } from '@/components/CtaButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { calculateEstimateRange, formatUsd, parseSqftFromSizeLabel } from '@/utilities/pricing'
import { useQuote } from '@/providers/Quote'

const timelines = {
  en: ['ASAP', 'Next 30 days', '1–3 months', 'Just researching'],
  es: ['Lo antes posible', 'Próximos 30 days', '1–3 meses', 'Solo investigando'],
}

type Props = {
  locale: Locale
  siteSettings: SiteSetting
  products: Product[]
}

export const QuoteDrawer: React.FC<Props> = ({ locale, siteSettings, products }) => {
  const { isOpen, closeQuote, sent, markSent, prefill, resetSent } = useQuote()
  const [productSlug, setProductSlug] = useState(prefill.productSlug || products[0]?.slug || '')
  const [sizeLabel, setSizeLabel] = useState(prefill.sizeLabel || '')
  const [selectedOptions, setSelectedOptions] = useState<Array<string | number>>(
    prefill.optionIds || [],
  )
  const [timeline, setTimeline] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (isOpen) {
      setProductSlug(prefill.productSlug || products[0]?.slug || '')
      setSizeLabel(prefill.sizeLabel || '')
      setSelectedOptions(prefill.optionIds || [])
      resetSent()
    }
  }, [isOpen, prefill, products, resetSent])

  const product = products.find((p) => p.slug === productSlug)
  const options = useMemo(() => {
    const rel = product?.options
    if (!rel || !Array.isArray(rel)) return []
    return rel.filter((o): o is ProductOption => typeof o === 'object' && o !== null)
  }, [product])

  const estimate = useMemo(() => {
    if (!product || !sizeLabel) return null
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
    <Sheet onOpenChange={(open) => !open && closeQuote()} open={isOpen}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{siteSettings.quoteHeadline || 'Build your quote'}</SheetTitle>
          <SheetDescription>{siteSettings.quoteFormNote}</SheetDescription>
        </SheetHeader>

        {sent ? (
          <div className="flex flex-col gap-3 py-8">
            <h3 className="text-xl font-semibold">{siteSettings.quoteSentTitle}</h3>
            <p className="text-muted-foreground">{siteSettings.quoteSentBody}</p>
            <CtaButton onClick={closeQuote} type="button">
              OK
            </CtaButton>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <Label>Product</Label>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <Button
                    key={p.id}
                    onClick={() => {
                      setProductSlug(p.slug)
                      setSizeLabel('')
                    }}
                    size="sm"
                    type="button"
                    variant={productSlug === p.slug ? 'default' : 'outline'}
                  >
                    {p.name}
                  </Button>
                ))}
              </div>
            </div>

            {product && (product.sizes?.length || 0) > 0 && (
              <div className="flex flex-col gap-2">
                <Label>Size</Label>
                <select
                  className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                  onChange={(e) => setSizeLabel(e.target.value)}
                  value={sizeLabel}
                >
                  <option value="">Select size</option>
                  {(product.sizes || []).map((s) => (
                    <option key={s.id || s.label} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {options.length > 0 && (
              <div className="flex flex-col gap-2">
                <Label>Options</Label>
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

            <div className="flex flex-col gap-2">
              <Label>Timeline</Label>
              <div className="flex flex-wrap gap-2">
                {timelines[locale].map((label, i) => (
                  <Button
                    key={label}
                    onClick={() => setTimeline(i)}
                    size="sm"
                    type="button"
                    variant={timeline === i ? 'default' : 'outline'}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {estimate && siteSettings.showPrices !== false && (
              <div className="bg-card border border-border p-4 rounded-md flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Estimated range
                </span>
                <span className="font-display text-2xl text-primary">
                  {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
                </span>
                <p className="text-xs text-muted-foreground">{siteSettings.estimateDisclaimer}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Input onChange={(e) => setName(e.target.value)} placeholder="Full name" value={name} />
              <Input onChange={(e) => setPhone(e.target.value)} placeholder="Phone" value={phone} />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                value={email}
              />
              <Input onChange={(e) => setZip(e.target.value)} placeholder="ZIP" value={zip} />
              <Textarea
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                value={notes}
              />
            </div>

            <CtaButton
              onClick={() => markSent()}
              type="button"
            >
              Send my quote request
            </CtaButton>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
