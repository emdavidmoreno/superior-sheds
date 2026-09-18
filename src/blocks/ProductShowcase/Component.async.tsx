import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { ProductShowcaseBlock as ProductShowcaseBlockProps } from '@/payload-types'

import { ProductStackSection } from '@/components/superior/ProductStackSection'

type Props = ProductShowcaseBlockProps & {
  locale?: Locale
}

export async function ProductShowcaseAsync({
  title,
  subtitle,
  locale = 'en',
}: Props): Promise<React.ReactElement> {
  const payload = await getPayload({ config: configPromise })
  const { docs: products } = await payload.find({
    collection: 'products',
    locale,
    depth: 2,
    limit: 20,
    sort: 'sortOrder',
    where: { published: { equals: true } },
  })

  return (
    <ProductStackSection locale={locale} products={products} subtitle={subtitle} title={title} />
  )
}
