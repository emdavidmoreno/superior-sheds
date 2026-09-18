import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import { LocationsPageClient } from '@/components/superior/LocationsPage'
import { isLocale, type Locale } from '@/i18n/config'
import { getCachedGlobal } from '@/utilities/getGlobals'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function LocationsRoute({ params }: Args) {
  const { locale: localeParam } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale

  const payload = await getPayload({ config: configPromise })
  const [siteSettings, { docs: locations }] = await Promise.all([
    getCachedGlobal('site-settings', 0, locale)(),
    payload.find({
      collection: 'locations',
      locale,
      depth: 0,
      limit: 200,
      where: { published: { equals: true } },
    }),
  ])

  return (
    <LocationsPageClient locale={locale} locations={locations} siteSettings={siteSettings} />
  )
}
