import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact & HQ',
          fields: [
            {
              name: 'phone',
              type: 'text',
              defaultValue: '877-439-7433',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'info@superiorsheds.com',
            },
            {
              name: 'hqTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Plant & main yard',
            },
            {
              name: 'hqAddress',
              type: 'textarea',
              localized: true,
              defaultValue: '2323 S. Volusia Avenue\nOrange City, Florida 32763',
            },
            {
              name: 'zipSuccessMessage',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Quote drawer',
          fields: [
            {
              name: 'quoteHeadline',
              type: 'text',
              localized: true,
            },
            {
              name: 'quoteFormNote',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'quoteSentTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'quoteSentBody',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'estimateDisclaimer',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'showPrices',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerBlurb',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'approvalsLine',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
