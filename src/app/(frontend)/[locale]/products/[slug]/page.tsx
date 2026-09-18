import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import { Media } from '@/components/Media'
import { ProductConfigurator } from '@/components/superior/ProductConfigurator'
import { ProductHero } from '@/components/superior/ProductHero'
import { isLocale, localizedHref, type Locale } from '@/i18n/config'
import { getCachedGlobal } from '@/utilities/getGlobals'

import Link from 'next/link'
import { CtaButton } from '@/components/CtaButton'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    locale: 'en',
    limit: 50,
    where: { published: { equals: true } },
    select: { slug: true },
  })
  return ['en', 'es'].flatMap((locale) =>
    docs.map((doc) => ({ locale, slug: doc.slug })),
  )
}

export default async function ProductPage({ params }: Args) {
  const { locale: localeParam, slug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam as Locale

  const payload = await getPayload({ config: configPromise })
  const siteSettings = await getCachedGlobal('site-settings', 0, locale)()

  const result = await payload.find({
    collection: 'products',
    locale,
    depth: 2,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const product = result.docs[0]
  if (!product) notFound()

  return (
    <article>
      <ProductHero locale={locale} phone={siteSettings.phone} product={product} />

      <ProductConfigurator locale={locale} product={product} siteSettings={siteSettings} />

      <section className="container py-12 flex flex-col gap-6" id="gallery">
        <h2 className="font-display text-3xl uppercase">Gallery</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(product.gallery || []).map((item, i) => {
            if (!item.image || typeof item.image !== 'object') return null
            return (
              <div key={item.id || i} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
                <Media fill imgClassName="object-cover" resource={item.image} />
              </div>
            )
          })}
        </div>
      </section>

      {(product.colors?.length || 0) > 0 && (
        <section className="container py-12 flex flex-col gap-6">
          <h2 className="font-display text-3xl uppercase">Color chart</h2>
          <div className="flex flex-wrap gap-4">
            {(product.colors || []).map((color) => {
              if (typeof color !== 'object' || !color) return null
              return (
                <div key={color.id} className="flex flex-col gap-2 items-center">
                  <div
                    className="size-14 rounded-full border border-border"
                    style={{ background: color.hex || '#9BA7B4' }}
                  />
                  <span className="text-xs text-muted-foreground">{color.name}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className="container py-12 flex flex-col gap-6">
        <h2 className="font-display text-3xl uppercase">Full specifications</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {(product.fullSpecs || []).map((spec, i) => (
            <div key={i} className="bg-card border border-border p-4 flex flex-col gap-1">
              <span className="text-xs uppercase text-muted-foreground">{spec.label}</span>
              <span className="text-sm font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-16">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl uppercase">Get a real number today.</h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Tell us the size and zip — pricing, delivery window and permit requirements back the same day.
            </p>
          </div>
          <CtaButton asChild>
            <Link href={localizedHref('/', locale)}>See other models</Link>
          </CtaButton>
        </div>
      </section>
    </article>
  )
}
