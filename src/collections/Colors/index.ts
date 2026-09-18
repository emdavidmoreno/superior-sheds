import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

const colorGroups = [
  { label: 'Aluminum', value: 'aluminum' },
  { label: 'Vinyl siding', value: 'vinyl' },
  { label: 'Perma tile', value: 'permaTile' },
  { label: 'Advantage panel', value: 'advantagePanel' },
  { label: 'Roof shingles', value: 'shingles' },
  { label: 'Wood / stucco', value: 'woodStucco' },
] as const

export const Colors: CollectionConfig = {
  slug: 'colors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'hex'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({ fieldToUse: 'name' }),
    {
      name: 'group',
      type: 'select',
      options: [...colorGroups],
      required: true,
    },
    {
      name: 'hex',
      type: 'text',
      admin: {
        description: 'Optional hex swatch (e.g. #F5A524)',
      },
    },
    {
      name: 'swatch',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
  ],
}
