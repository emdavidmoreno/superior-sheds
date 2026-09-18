import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const ProductOptions: CollectionConfig = {
  slug: 'product-options',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'price', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({ fieldToUse: 'label' }),
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Products that offer this add-on.',
      },
    },
  ],
}
