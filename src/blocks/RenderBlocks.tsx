import React, { Fragment } from 'react'

import type { Locale } from '@/i18n/config'
import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FaqListBlock } from '@/blocks/FaqList/Component'
import { FinancingBandBlock } from '@/blocks/FinancingBand/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GalleryGridBlock } from '@/blocks/GalleryGrid/Component'
import { HeroVideoBlock } from '@/blocks/HeroVideo/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductShowcaseBlock } from '@/blocks/ProductShowcase/Component'
import { RegionGridBlock } from '@/blocks/RegionGrid/Component'
import { TrustMarqueeBlock } from '@/blocks/TrustMarquee/Component'
import { WhyGridBlock } from '@/blocks/WhyGrid/Component'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  faqList: FaqListBlock,
  financingBand: FinancingBandBlock,
  formBlock: FormBlock,
  galleryGrid: GalleryGridBlock,
  heroVideo: HeroVideoBlock,
  mediaBlock: MediaBlock,
  productShowcase: ProductShowcaseBlock,
  regionGrid: RegionGridBlock,
  trustMarquee: TrustMarqueeBlock,
  whyGrid: WhyGridBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale?: Locale
}> = (props) => {
  const { blocks, locale = 'en' } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-0" key={index}>
                  {/* @ts-expect-error block props vary */}
                  <Block {...block} disableInnerContainer locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
