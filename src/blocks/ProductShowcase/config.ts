import type { Block } from 'payload'

export const ProductShowcase: Block = {
  slug: 'productShowcase',
  interfaceName: 'ProductShowcaseBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
  ],
  labels: { singular: 'Product showcase', plural: 'Product showcases' },
}
