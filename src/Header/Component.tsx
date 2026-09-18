import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

export async function Header({ locale = defaultLocale }: { locale?: Locale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()
  const payload = await getPayload({ config: configPromise })
  const { docs: products } = await payload.find({
    collection: 'products',
    locale,
    depth: 0,
    limit: 20,
    sort: 'sortOrder',
    where: { published: { equals: true } },
  })

  return <HeaderClient data={headerData} locale={locale} products={products} />
}
