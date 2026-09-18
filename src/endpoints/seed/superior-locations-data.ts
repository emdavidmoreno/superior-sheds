type Row = {
  slug: string
  name: string
  nameEs?: string
  type: 'factory' | 'retail' | 'dealer'
  region: 'central' | 'north' | 'tampaBay' | 'southGulf'
  city?: string
  phone?: string
}

const wpLots: Omit<Row, 'region' | 'type'>[] = [
  { slug: 'superior-sheds-retail-orange-city', name: 'Orange City — Factory', city: 'Orange City' },
  { slug: 'superior-sheds-retail-fort-myers', name: 'Fort Myers', city: 'Fort Myers' },
  { slug: 'superior-sheds-retail-hialeah-gardens', name: 'Miami & Hialeah Gardens', city: 'Hialeah' },
  { slug: 'superior-sheds-dealer-jacksonville', name: 'Jacksonville', city: 'Jacksonville' },
  { slug: 'superior-sheds-retail-longwood', name: 'Longwood', city: 'Longwood' },
  { slug: 'superior-sheds-dealer-lakeland', name: 'Lakeland', city: 'Lakeland' },
  { slug: 'superior-sheds-retail-naples', name: 'Naples', city: 'Naples' },
  { slug: 'superior-sheds-dealer-sarasota', name: 'Sarasota', city: 'Sarasota' },
  { slug: 'superior-sheds-retail-ocala-2', name: 'Ocala', city: 'Ocala' },
  { slug: 'superior-sheds-dealer-port-orange', name: 'Port Orange', city: 'Port Orange' },
  { slug: 'superior-sheds-retail-lake-worth', name: 'Lake Worth', city: 'Lake Worth' },
  { slug: 'superior-sheds-retail-fort-pierce', name: 'Fort Pierce', city: 'Fort Pierce' },
  { slug: 'superior-sheds-dealer-inverness', name: 'Inverness', city: 'Inverness' },
  { slug: 'superior-sheds-retail-brooksville', name: 'Brooksville', city: 'Brooksville' },
  { slug: 'superior-sheds-dealer-deland', name: 'Deland', city: 'Deland' },
  { slug: 'superior-sheds-retail-cocoa', name: 'Cocoa', city: 'Cocoa' },
  { slug: 'superior-sheds-dealer-sebring', name: 'Sebring', city: 'Sebring' },
  { slug: 'superior-sheds-retail-wildwood', name: 'Wildwood', city: 'Wildwood' },
  { slug: 'superior-sheds-dealer-apopka-fl', name: 'Apopka', city: 'Apopka' },
  { slug: 'superior-sheds-retail-port-charlotte', name: 'Port Charlotte', city: 'Port Charlotte' },
]

function inferRegion(city: string): Row['region'] {
  const south = ['Fort Myers', 'Naples', 'Homestead', 'Hialeah', 'Lake Worth', 'Fort Pierce']
  const tampa = ['Brooksville', 'Lakeland', 'Zephyrhills', 'Land O’Lakes']
  const north = ['Jacksonville', 'Palatka', 'Lake City']
  if (south.some((c) => city.includes(c))) return 'southGulf'
  if (tampa.some((c) => city.includes(c))) return 'tampaBay'
  if (north.some((c) => city.includes(c))) return 'north'
  return 'central'
}

export const locationSeedRows: Row[] = wpLots.map((lot, i) => ({
  ...lot,
  type: lot.slug.includes('dealer') ? 'dealer' : i === 0 ? 'factory' : 'retail',
  region: inferRegion(lot.city || 'Orange City'),
  phone: '877-439-7433',
}))
