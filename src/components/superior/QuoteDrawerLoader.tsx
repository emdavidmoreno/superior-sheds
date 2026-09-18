import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { QuoteDrawer } from './QuoteDrawer'

export async function QuoteDrawerLoader({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config: configPromise })
  const [siteSettings, productsResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', locale, depth: 0 }),
    payload.find({
      collection: 'products',
      locale,
      depth: 2,
      limit: 20,
      sort: 'sortOrder',
      where: { published: { equals: true } },
    }),
  ])

  return (
    <QuoteDrawer locale={locale} products={productsResult.docs} siteSettings={siteSettings} />
  )
}
