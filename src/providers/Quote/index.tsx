'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type QuotePrefill = {
  productSlug?: string
  sizeLabel?: string
  optionIds?: Array<string | number>
}

type QuoteContextValue = {
  isOpen: boolean
  sent: boolean
  prefill: QuotePrefill
  openQuote: (prefill?: QuotePrefill) => void
  closeQuote: () => void
  markSent: () => void
  resetSent: () => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [prefill, setPrefill] = useState<QuotePrefill>({})

  const openQuote = useCallback((next?: QuotePrefill) => {
    setPrefill(next || {})
    setSent(false)
    setIsOpen(true)
  }, [])

  const closeQuote = useCallback(() => {
    setIsOpen(false)
  }, [])

  const markSent = useCallback(() => {
    setSent(true)
  }, [])

  const resetSent = useCallback(() => {
    setSent(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      sent,
      prefill,
      openQuote,
      closeQuote,
      markSent,
      resetSent,
    }),
    [isOpen, sent, prefill, openQuote, closeQuote, markSent, resetSent],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext)
  if (!ctx) {
    throw new Error('useQuote must be used within QuoteProvider')
  }
  return ctx
}
