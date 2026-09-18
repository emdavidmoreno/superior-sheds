import type { Block } from 'payload'

export const GalleryGrid: Block = {
  slug: 'galleryGrid',
  interfaceName: 'GalleryGridBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
  ],
  labels: { singular: 'Gallery grid', plural: 'Gallery grids' },
}
