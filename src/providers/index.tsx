import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { QuoteProvider } from './Quote'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <QuoteProvider>{children}</QuoteProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
