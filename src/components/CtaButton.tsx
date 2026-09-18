'use client'

import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

import { ctaClassName } from '@/components/ctaClassName'

export { ctaClassName }

export const CtaButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <Button className={cn(ctaClassName, className)} {...props} />
}
