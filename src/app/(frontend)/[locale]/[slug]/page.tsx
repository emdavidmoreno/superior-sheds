import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { isLocale, type Locale } from '@/i18n/config'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'

import PageClient from './page.client'

const RESERVED = new Set([
  'products',
  'locations',
  'en',
  'es',
  'home',
  'next',
  'admin',
  'api',
])

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    locale: 'en',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const slugs =
    pages.docs
      ?.filter((doc) => doc.slug && doc.slug !== 'home' && !RESERVED.has(doc.slug))
      .map((doc) => doc.slug as string) || []

  return ['en', 'es'].flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export default async function Page({ params }: Args) {
  const { locale: localeParam, slug: rawSlug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale
  const slug = decodeURIComponent(rawSlug)
  if (RESERVED.has(slug)) notFound()

  const { isEnabled: draft } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    return <PayloadRedirects url={`/${slug}`} />
  }

  const { hero, layout } = page

  return (
    <article className="pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={`/${slug}`} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale: localeParam, slug: rawSlug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale
  const slug = decodeURIComponent(rawSlug)
  const page = await queryPageBySlug({ slug, locale })
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
