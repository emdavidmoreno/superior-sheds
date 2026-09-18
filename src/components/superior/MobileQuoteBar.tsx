'use client'

import React from 'react'

import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/ui'

import { CtaButton } from '@/components/CtaButton'
import { useQuote } from '@/providers/Quote'

type Props = {
  locale: Locale
  phone: string
}

export const MobileQuoteBar: React.FC<Props> = ({ locale, phone }) => {
  const { openQuote } = useQuote()

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card p-3 flex gap-2 md:hidden">
        <CtaButton asChild className="flex-1" variant="outline">
          <a href={`tel:${phone.replace(/\D/g, '')}`}>{t(locale, 'call')}</a>
        </CtaButton>
        <CtaButton className="flex-1" onClick={() => openQuote()} type="button">
          {t(locale, 'getQuote')}
        </CtaButton>
      </div>
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-1">
        <CtaButton onClick={() => openQuote()} size="lg" type="button">
          {t(locale, 'getQuote')}
        </CtaButton>
        <span className="text-xs text-muted-foreground">
          {t(locale, 'orCall')} {phone}
        </span>
      </div>
    </>
  )
}
