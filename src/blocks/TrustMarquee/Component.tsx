import React from 'react'

import type { TrustMarqueeBlock as TrustMarqueeBlockProps } from '@/payload-types'

export const TrustMarqueeBlock: React.FC<TrustMarqueeBlockProps> = ({ items }) => {
  const labels = (items || []).map((item) => item.label).filter(Boolean) as string[]
  const doubled = [...labels, ...labels]

  return (
    <section className="border-y border-border bg-card overflow-hidden py-4">
      <div className="flex gap-10 animate-[mq_40s_linear_infinite] whitespace-nowrap w-max">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            ◆ {label}
          </span>
        ))}
      </div>
    </section>
  )
}
