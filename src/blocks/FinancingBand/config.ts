import type { Block } from 'payload'

export const FinancingBand: Block = {
  slug: 'financingBand',
  interfaceName: 'FinancingBandBlock',
  fields: [
    { name: 'kicker', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
  ],
  labels: { singular: 'Financing band', plural: 'Financing bands' },
}
