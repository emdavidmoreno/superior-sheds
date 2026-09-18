import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { GalleryGridBlock as GalleryGridBlockProps } from '@/payload-types'

import { GalleryProductLink } from './Component'

type Props = GalleryGridBlockProps & { locale?: Locale }

export async function GalleryGridAsync({
  title,
  intro,
  locale = 'en',
}: Props): Promise<React.ReactElement> {
  const payload = await getPayload({ config: configPromise })
  const { docs: products } = await payload.find({
    collection: 'products',
    locale,
    depth: 1,
    limit: 20,
    sort: 'sortOrder',
    where: { published: { equals: true } },
    select: { name: true, slug: true, heroImage: true },
  })

  return (
    <section className="container py-16 flex flex-col gap-8">
      {title && <h1 className="font-display text-4xl uppercase">{title}</h1>}
      {intro && <p className="text-muted-foreground max-w-2xl">{intro}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <GalleryProductLink
            key={product.id}
            heroImage={product.heroImage}
            locale={locale}
            name={product.name}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  )
}
