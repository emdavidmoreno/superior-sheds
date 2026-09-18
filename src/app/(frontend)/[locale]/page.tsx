import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { isLocale, type Locale } from '@/i18n/config'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'

import PageClient from './[slug]/page.client'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Args) {
  const { locale: localeParam } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({ slug: 'home', locale })

  if (!page) {
    return <PayloadRedirects url="/" />
  }

  const { hero, layout } = page

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale: localeParam } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale
  const page = await queryPageBySlug({ slug: 'home', locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: Locale }) => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      locale,
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: { slug: { equals: slug } },
    })
    return (result.docs?.[0] as RequiredDataFromCollectionSlug<'pages'>) || null
  },
)
