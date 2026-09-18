import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

const regions = [
  { label: 'Central Florida', value: 'central' },
  { label: 'North Florida', value: 'north' },
  { label: 'Tampa Bay', value: 'tampaBay' },
  { label: 'South & Gulf', value: 'southGulf' },
] as const

const locationTypes = [
  { label: 'Factory direct', value: 'factory' },
  { label: 'Retail lot', value: 'retail' },
  { label: 'Authorized dealer', value: 'dealer' },
] as const

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'region', 'city'],
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
      name: 'type',
      type: 'select',
      options: [...locationTypes],
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      options: [...regions],
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'esSpoken',
      type: 'checkbox',
      label: 'Spanish spoken',
      defaultValue: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
