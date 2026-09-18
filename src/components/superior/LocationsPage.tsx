'use client'

import React, { useMemo, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import { t } from '@/i18n/ui'
import type { Location, SiteSetting } from '@/payload-types'

import { CtaButton } from '@/components/CtaButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type Props = {
  locale: Locale
  locations: Location[]
  siteSettings: SiteSetting
}

export const LocationsPageClient: React.FC<Props> = ({ locale, locations, siteSettings }) => {
  const [zip, setZip] = useState('')
  const [checked, setChecked] = useState(false)
  const [region, setRegion] = useState<string>('all')

  const filtered = useMemo(() => {
    if (region === 'all') return locations
    return locations.filter((l) => l.region === region)
  }, [locations, region])

  return (
    <div className="container py-16 flex flex-col gap-12">
      <div className="max-w-2xl flex flex-col gap-4">
        <h1 className="font-display text-4xl uppercase">Built here. Delivered statewide.</h1>
        <p className="text-muted-foreground">
          Our plant and main yard are in Orange City. Delivery crews cover Florida — enter your zip and
          we will confirm your window.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md">
        <Input
          onChange={(e) => setZip(e.target.value)}
          placeholder={t(locale, 'zipPlaceholder')}
          value={zip}
        />
        <CtaButton onClick={() => setChecked(true)} type="button">
          {t(locale, 'checkZip')}
        </CtaButton>
      </div>
      {checked && (
        <p className="text-success text-sm max-w-lg">
          {siteSettings.zipSuccessMessage ||
            'We deliver to your area. Typical install window: 3–5 weeks after permit approval.'}
        </p>
      )}

      <div className="bg-card border border-border p-6 max-w-xl flex flex-col gap-2">
        <h2 className="font-semibold">{siteSettings.hqTitle}</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{siteSettings.hqAddress}</p>
        <a className="text-sm" href={`tel:${(siteSettings.phone || '').replace(/\D/g, '')}`}>
          {siteSettings.phone}
        </a>
        {siteSettings.email && (
          <a className="text-sm text-accent" href={`mailto:${siteSettings.email}`}>
            {siteSettings.email}
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'central', 'north', 'tampaBay', 'southGulf'].map((r) => (
          <Button
            key={r}
            onClick={() => setRegion(r)}
            size="sm"
            type="button"
            variant={region === r ? 'default' : 'outline'}
          >
            {r === 'all' ? 'All regions' : r}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((loc) => (
          <Link
            key={loc.id}
            className="bg-card border border-border p-5 flex flex-col gap-2 hover:border-accent transition-colors"
            href={localizedHref(`/locations/${loc.slug}`, locale)}
          >
            <span className="text-xs uppercase text-muted-foreground">{loc.type}</span>
            <h3 className="font-semibold">{loc.name}</h3>
            {loc.city && <p className="text-sm text-muted-foreground">{loc.city}</p>}
            {loc.phone && <p className="text-sm">{loc.phone}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
