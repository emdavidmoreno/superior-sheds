import React from 'react'

import type { HeroVideoBlock as HeroVideoBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const HeroVideoBlock: React.FC<HeroVideoBlockProps> = ({
  kicker,
  title,
  subtitle,
  videoUrl,
  poster,
  links,
}) => {
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-background">
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            autoPlay
            className="size-full object-cover"
            loop
            muted
            playsInline
            poster={typeof poster === 'object' && poster?.url ? poster.url : undefined}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          poster && <Media fill imgClassName="object-cover" resource={poster} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>
      <div className="container relative z-10 pb-16 pt-32 flex flex-col gap-6 max-w-3xl">
        {kicker && (
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{kicker}</p>
        )}
        {title && (
          <h1 className="font-display text-foreground text-5xl md:text-7xl leading-[0.95] uppercase">
            {title}
          </h1>
        )}
        {subtitle && <p className="text-lg text-muted-foreground max-w-xl">{subtitle}</p>}
        <div className="flex flex-wrap gap-3">
          {(links || []).map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance={link?.appearance || (i === 0 ? 'default' : 'outline')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
