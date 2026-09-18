import React from 'react'

import type { Locale } from '@/i18n/config'
import type { ProductShowcaseBlock as ProductShowcaseBlockProps } from '@/payload-types'

import { ProductShowcaseAsync } from './Component.async'

type Props = ProductShowcaseBlockProps & {
  locale?: Locale
}

export const ProductShowcaseBlock: React.FC<Props> = (props) => {
  return <ProductShowcaseAsync {...props} />
}
