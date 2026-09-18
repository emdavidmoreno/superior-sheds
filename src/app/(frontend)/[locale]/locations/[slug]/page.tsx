import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { isLocale, localizedHref, type Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'locations',
    locale: 'en',
    limit: 200,
    select: { slug: true },
    where: { published: { equals: true } },
  })
  return ['en', 'es'].flatMap((locale) =>
    docs.map((doc) => ({ locale, slug: doc.slug })),
  )
}

export default async function LocationDetailPage({ params }: Args) {
  const { locale: localeParam, slug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    locale,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const location = result.docs[0]
  if (!location) notFound()

  return (
    <article className="container py-16 flex flex-col gap-6 max-w-2xl">
      <Link className="text-sm text-accent" href={localizedHref('/locations', locale)}>
        ← All locations
      </Link>
      <p className="text-xs uppercase text-muted-foreground">{location.type}</p>
      <h1 className="font-display text-4xl uppercase">{location.name}</h1>
      {location.address && (
        <p className="text-muted-foreground whitespace-pre-line">{location.address}</p>
      )}
      {location.phone && (
        <a className="font-semibold" href={`tel:${location.phone.replace(/\D/g, '')}`}>
          {location.phone}
        </a>
      )}
      {location.email && (
        <a className="text-accent" href={`mailto:${location.email}`}>
          {location.email}
        </a>
      )}
    </article>
  )
}
