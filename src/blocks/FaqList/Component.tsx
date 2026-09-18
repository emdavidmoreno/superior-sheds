import React from 'react'

import type { FaqListBlock as FaqListBlockProps } from '@/payload-types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FaqListBlock: React.FC<FaqListBlockProps> = ({ title, items }) => {
  return (
    <section className="container py-16 flex flex-col gap-8 max-w-3xl">
      {title && <h1 className="font-display text-4xl uppercase">{title}</h1>}
      <Accordion className="w-full" type="single" collapsible>
        {(items || []).map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
