import type { Block } from 'payload'

export const RegionGrid: Block = {
  slug: 'regionGrid',
  interfaceName: 'RegionGridBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    {
      name: 'regions',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'cities', type: 'text', required: true, localized: true },
      ],
    },
  ],
  labels: { singular: 'Region grid', plural: 'Region grids' },
}
