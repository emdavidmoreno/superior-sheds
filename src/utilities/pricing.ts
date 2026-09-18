export function parseSqftFromSizeLabel(label: string): number {
  const normalized = label.replace(/×/g, 'x').replace(/′/g, '').replace(/'/g, '')
  const parts = normalized.split('x').map((p) => parseFloat(p.trim()))
  if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) {
    return 96
  }
  return parts[0] * parts[1]
}

export function calculateEstimateRange(params: {
  basePrice: number
  pricePerSqFt: number
  sqft: number
  optionsTotal: number
}): { low: number; high: number } {
  const subtotal = params.basePrice + params.sqft * params.pricePerSqFt + params.optionsTotal
  const low = Math.round(subtotal * 0.95 / 50) * 50
  const high = Math.round(subtotal * 1.12 / 50) * 50
  return { low, high }
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
