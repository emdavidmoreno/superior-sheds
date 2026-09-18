import type { Block } from 'payload'

export const TrustMarquee: Block = {
  slug: 'trustMarquee',
  interfaceName: 'TrustMarqueeBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
  ],
  labels: { singular: 'Trust marquee', plural: 'Trust marquees' },
}
