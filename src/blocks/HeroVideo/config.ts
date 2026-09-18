import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const HeroVideo: Block = {
  slug: 'heroVideo',
  interfaceName: 'HeroVideoBlock',
  fields: [
    { name: 'kicker', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    { name: 'videoUrl', type: 'text' },
    { name: 'poster', type: 'upload', relationTo: 'media' },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 2 },
    }),
  ],
  labels: { singular: 'Hero video', plural: 'Hero videos' },
}
