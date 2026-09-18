import type { Block } from 'payload'

export const FaqList: Block = {
  slug: 'faqList',
  interfaceName: 'FaqListBlock',
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
  labels: { singular: 'FAQ list', plural: 'FAQ lists' },
}
