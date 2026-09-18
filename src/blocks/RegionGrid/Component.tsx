import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import type { RegionGridBlock as RegionGridBlockProps } from '@/payload-types'

type Props = RegionGridBlockProps & { locale?: Locale }

export const RegionGridBlock: React.FC<Props> = ({ title, ctaLabel, regions, locale = 'en' }) => {
  return (
    <section className="container py-20 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        {title && <h2 className="font-display text-3xl uppercase">{title}</h2>}
        {ctaLabel && (
          <Link
            className="text-sm font-bold uppercase tracking-wider text-accent border-b border-accent pb-1"
            href={localizedHref('/locations', locale)}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(regions || []).map((region, i) => (
          <div key={i} className="bg-card border border-border p-6 flex flex-col gap-2">
            <h3 className="font-semibold">{region.name}</h3>
            <p className="text-sm text-muted-foreground">{region.cities}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
