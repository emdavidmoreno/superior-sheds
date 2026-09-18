import type { Block } from 'payload'

export const WhyGrid: Block = {
  slug: 'whyGrid',
  interfaceName: 'WhyGridBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
    { name: 'ctaLabel', type: 'text', localized: true },
  ],
  labels: { singular: 'Why grid', plural: 'Why grids' },
}
