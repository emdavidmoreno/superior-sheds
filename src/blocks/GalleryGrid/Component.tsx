import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/config'
import type { GalleryGridBlock as GalleryGridBlockProps, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { GalleryGridAsync } from './Component.async'

type Props = GalleryGridBlockProps & { locale?: Locale }

export const GalleryGridBlock: React.FC<Props> = (props) => {
  return <GalleryGridAsync {...props} />
}

export function GalleryProductLink({
  heroImage,
  locale,
  name,
  slug,
}: {
  heroImage?: number | MediaType | null
  locale: Locale
  name: string
  slug: string
}) {
  return (
    <Link
      className="group bg-card border border-border overflow-hidden flex flex-col"
      href={localizedHref(`/products/${slug}#gallery`, locale)}
    >
      {heroImage && typeof heroImage === 'object' && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Media fill imgClassName="object-cover group-hover:scale-105 transition-transform duration-500" resource={heroImage} />
        </div>
      )}
      <div className="p-6 font-semibold group-hover:text-accent transition-colors">{name}</div>
    </Link>
  )
}
