import type { Locale } from './config'

const strings = {
  en: {
    navProducts: 'Products',
    navLocations: 'Locations',
    navGallery: 'Gallery',
    navFinancing: 'Financing',
    getQuote: 'Get a quote',
    explore: 'Explore model',
    quoteThis: 'Quote this model',
    specsLabel: 'Quick specs',
    fromPrice: 'From',
    call: 'Call',
    callNow: 'Call now',
    backHome: 'All products',
    menu: 'Menu',
    language: 'Language',
    freeQuote: 'Free · no obligation',
    orCall: 'or call',
    zipPlaceholder: 'Your ZIP code',
    checkZip: 'Check my area',
    orderStatusTitle: 'Order status',
    orderNumber: 'Order number',
    customerName: 'Customer name',
    checkOrder: 'Check status',
    orderStubMessage:
      'Order lookup is not connected yet. Call 877-439-7433 with your order number.',
  },
  es: {
    navProducts: 'Productos',
    navLocations: 'Ubicaciones',
    navGallery: 'Galería',
    navFinancing: 'Financiamiento',
    getQuote: 'Cotizar',
    explore: 'Ver modelo',
    quoteThis: 'Cotizar este modelo',
    specsLabel: 'Ficha rápida',
    fromPrice: 'Desde',
    call: 'Llamar',
    callNow: 'Llamar ahora',
    backHome: 'Todos los productos',
    menu: 'Menú',
    language: 'Idioma',
    freeQuote: 'Gratis · sin compromiso',
    orCall: 'o llama',
    zipPlaceholder: 'Tu código postal',
    checkZip: 'Revisar mi zona',
    orderStatusTitle: 'Estado de orden',
    orderNumber: 'Número de orden',
    customerName: 'Nombre del cliente',
    checkOrder: 'Consultar estado',
    orderStubMessage:
      'La consulta de órdenes aún no está conectada. Llama al 877-439-7433 con tu número de orden.',
  },
} as const

export type UiKey = keyof (typeof strings)['en']

export function t(locale: Locale, key: UiKey): string {
  return strings[locale][key]
}
