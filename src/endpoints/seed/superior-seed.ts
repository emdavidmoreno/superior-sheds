import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'
import sharp from 'sharp'

import { colorSeedData } from './superior-colors-data'
import { locationSeedRows } from './superior-locations-data'
import { productSeedData } from './superior-products-data'

const collections: CollectionSlug[] = [
  'pages',
  'form-submissions',
  'products',
  'product-options',
  'colors',
  'locations',
  'redirects',
  'forms',
  'media',
  'users',
]

const globals: GlobalSlug[] = ['header', 'footer', 'site-settings']

export async function seedSuperior({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> {
  payload.logger.info('— Clearing Superior Sheds data...')

  for (const global of globals) {
    await payload.updateGlobal({
      req,
      slug: global,
      data: {},
      depth: 0,
    })
  }

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info('— Creating admin user...')
  await payload.create({
    req,
    collection: 'users',
    data: {
      name: 'Superior Admin',
      email: 'admin@superiorsheds.com',
      password: 'password',
    },
  })

  payload.logger.info('— Seeding media placeholders...')
  const heroMedia = await payload.create({
    req,
    collection: 'media',
    data: {
      alt: 'Superior Sheds hero',
    },
    file: await fetchFileByURL(
      'https://www.superiorsheds.com/wp-content/gallery/bungalow-shed-gallery/20130423_164055.jpg',
      payload,
    ),
  })

  const createProductImage = async (url: string, alt: string) =>
    payload.create({
      req,
      collection: 'media',
      data: { alt },
      file: await fetchFileByURL(url, payload),
    })

  payload.logger.info('— Product options...')
  const optionDefs = [
    { slug: 'garage', label: { en: 'Garage door', es: 'Puerta de garaje' }, price: 1450 },
    { slug: 'windows', label: { en: 'Windows (2)', es: 'Ventanas (2)' }, price: 420 },
    { slug: 'ramp', label: { en: 'Ramp', es: 'Rampa' }, price: 340 },
    { slug: 'electrical', label: { en: 'Electrical package', es: 'Paquete eléctrico' }, price: 890 },
    { slug: 'shelving', label: { en: 'Shelving', es: 'Estantería' }, price: 260 },
    { slug: 'floor125', label: { en: '125 psf floor', es: 'Piso 125 psf' }, price: 510 },
  ]

  const optionDocs = []
  for (const opt of optionDefs) {
    const doc = await payload.create({
      req,
      collection: 'product-options',
      data: {
        slug: opt.slug,
        label: opt.label.en,
        price: opt.price,
      },
      locale: 'en',
    })
    await payload.update({
      req,
      collection: 'product-options',
      id: doc.id,
      data: { label: opt.label.es },
      locale: 'es',
    })
    optionDocs.push(doc)
  }

  payload.logger.info('— Colors...')
  const colorIds: number[] = []
  for (const color of colorSeedData) {
    const doc = await payload.create({
      req,
      collection: 'colors',
      data: {
        slug: color.slug,
        name: color.name.en,
        group: color.group,
        hex: color.hex,
      },
      locale: 'en',
    })
    await payload.update({
      req,
      collection: 'colors',
      id: doc.id,
      data: { name: color.name.es },
      locale: 'es',
    })
    colorIds.push(doc.id)
  }

  payload.logger.info('— Products...')
  const productIds: Record<string, string | number> = {}
  let sort = 0
  for (const p of productSeedData) {
    sort += 1
    const heroImage = await createProductImage(p.heroUrl, p.name.en)
    const gallery = []
    for (const url of p.galleryUrls.slice(0, 4)) {
      gallery.push({ image: (await createProductImage(url, p.name.en)).id })
    }

    const optionIds = optionDocs
      .filter((o) => p.optionSlugs.includes(String(o.slug)))
      .map((o) => o.id)

    const doc = await payload.create({
      req,
      collection: 'products',
      data: {
        slug: p.slug,
        name: p.name.en,
        category: p.category.en,
        short: p.short.en,
        blurb: p.blurb.en,
        basePrice: p.basePrice,
        pricePerSqFt: p.rate,
        sortOrder: sort,
        sizes: p.sizes,
        quickSpecs: p.quick.en,
        fullSpecs: p.specs.en,
        heroImage: heroImage.id,
        gallery,
        options: optionIds,
        colors: colorIds,
        published: true,
      },
      locale: 'en',
    })

    const withIds = (
      rows: Array<{ id?: string | null }> | null | undefined,
      localized: Array<{ label: string; value: string }>,
    ) =>
      (rows || []).map((row, i) => ({
        id: row.id ?? undefined,
        label: localized[i]?.label,
        value: localized[i]?.value,
      }))

    await payload.update({
      req,
      collection: 'products',
      id: doc.id,
      data: {
        quickSpecs: withIds(doc.quickSpecs, p.quick.en),
        fullSpecs: withIds(doc.fullSpecs, p.specs.en),
      },
      locale: 'en',
    })

    await payload.update({
      req,
      collection: 'products',
      id: doc.id,
      data: {
        name: p.name.es,
        category: p.category.es,
        short: p.short.es,
        blurb: p.blurb.es,
        quickSpecs: withIds(doc.quickSpecs, p.quick.es),
        fullSpecs: withIds(doc.fullSpecs, p.specs.es),
      },
      locale: 'es',
    })

    productIds[p.slug] = doc.id
  }

  const allProductIds = Object.values(productIds)
  for (const colorId of colorIds) {
    await payload.update({
      req,
      collection: 'colors',
      id: colorId,
      data: { products: allProductIds as number[] },
    })
  }

  for (const opt of optionDocs) {
    const slug = String(opt.slug)
    const linked = productSeedData
      .filter((p) => p.optionSlugs.includes(slug))
      .map((p) => productIds[p.slug])
    await payload.update({
      req,
      collection: 'product-options',
      id: opt.id,
      data: { products: linked as number[] },
    })
  }

  payload.logger.info('— Locations...')
  for (const row of locationSeedRows) {
    const doc = await payload.create({
      req,
      collection: 'locations',
      data: {
        slug: row.slug,
        name: row.name,
        type: row.type,
        region: row.region,
        city: row.city,
        phone: row.phone,
        published: true,
      },
      locale: 'en',
    })
    if (row.nameEs) {
      await payload.update({
        collection: 'locations',
        id: doc.id,
        data: { name: row.nameEs },
        locale: 'es',
      })
    }
  }

  payload.logger.info('— Pages...')
  const homeLayout = {
    en: [
      {
        blockType: 'heroVideo',
        kicker: 'Florida built since 1998',
        title: 'Buildings that outlast the storm.',
        subtitle:
          'Sheds, garages, gazebos and steel structures, prefabricated in Orange City and rated to 170 MPH. Priced in minutes, permitted for you, delivered to your slab.',
        videoUrl:
          'https://videos.pexels.com/video-files/35834495/15194926_2730_1440_30fps.mp4',
        poster: heroMedia.id,
        links: [
          { link: { type: 'custom', label: 'Build my quote', url: '#quote' } },
          { link: { type: 'custom', label: 'Call 877-439-7433', url: 'tel:8774397433' } },
        ],
      },
      {
        blockType: 'trustMarquee',
        items: [
          { label: '170 MPH rated' },
          { label: '100,000+ buildings delivered' },
          { label: '25+ years in Florida' },
          { label: 'Permitting handled for you' },
          { label: 'Manufactured in Orange City, FL' },
          { label: 'Installation included' },
        ],
      },
      {
        blockType: 'productShowcase',
        title: 'Six ways to get the space you need.',
        subtitle:
          'Every model is state approved, inspected before it leaves the plant, and quoted with permit work included.',
      },
      {
        blockType: 'whyGrid',
        title: 'Why people stop shopping after Superior.',
        subtitle: 'Twenty-five years of Florida building code, one factory, one crew.',
        ctaLabel: 'Start my quote',
        items: [
          {
            number: '01',
            title: 'Built in a plant, not a driveway',
            body: 'Every phase is inspected before your building leaves Orange City.',
          },
          {
            number: '02',
            title: 'Permits are our job',
            body: 'Sealed engineered drawings and help with your municipality.',
          },
          {
            number: '03',
            title: '170 MPH and a data plate to prove it',
            body: 'Florida DCA / DBPR insignia in every building.',
          },
          {
            number: '04',
            title: 'One number for service, forever',
            body: 'Same factory, same crews when you need service.',
          },
        ],
      },
      {
        blockType: 'financingBand',
        kicker: 'Financing',
        title: 'Pay over time.',
        body: 'Rent-to-own and financing options let you take delivery now and pay monthly.',
        ctaLabel: 'See my options',
      },
      {
        blockType: 'regionGrid',
        title: 'Delivered across Florida.',
        ctaLabel: 'All locations',
        regions: [
          { name: 'Central Florida', cities: 'Orlando · Deltona · Sanford · Ocala' },
          { name: 'North Florida', cities: 'Jacksonville · Gainesville · St. Augustine' },
          { name: 'Tampa Bay', cities: 'Tampa · St. Petersburg · Brandon · Lakeland' },
          { name: 'South & Gulf', cities: 'Fort Myers · Naples · Port St. Lucie · Palm Beach' },
        ],
      },
    ],
  }

  await payload.create({
    req,
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      hero: { type: 'none' },
      layout: homeLayout.en as never,
      _status: 'published',
    },
    locale: 'en',
  })

  const homeEsLayout = [
    {
      blockType: 'heroVideo',
      kicker: 'Hecho en Florida desde 1998',
      title: 'Estructuras que aguantan la tormenta.',
      subtitle:
        'Sheds, garajes, gazebos y estructuras de acero prefabricados en Orange City y certificados a 170 MPH. Precio en minutos, permisos por nosotros, entrega en tu losa.',
      videoUrl: 'https://videos.pexels.com/video-files/35834495/15194926_2730_1440_30fps.mp4',
      poster: heroMedia.id,
      links: [
        { link: { type: 'custom', label: 'Armar cotización', url: '#quote' } },
        { link: { type: 'custom', label: 'Llamar 877-439-7433', url: 'tel:8774397433' } },
      ],
    },
    {
      blockType: 'trustMarquee',
      items: [
        { label: 'Certificado 170 MPH' },
        { label: '100,000+ estructuras entregadas' },
        { label: '25+ años en Florida' },
        { label: 'Permisos gestionados por nosotros' },
        { label: 'Fabricado en Orange City, FL' },
        { label: 'Instalación incluida' },
      ],
    },
    {
      blockType: 'productShowcase',
      title: 'Seis maneras de tener el espacio que necesitas.',
      subtitle:
        'Cada modelo está aprobado por el estado, inspeccionado antes de salir de planta y cotizado con el trámite de permisos incluido.',
    },
    {
      blockType: 'whyGrid',
      title: 'Por qué dejan de buscar después de Superior.',
      subtitle: 'Veinticinco años de código de construcción de Florida, una fábrica, un equipo.',
      ctaLabel: 'Empezar cotización',
      items: [
        {
          number: '01',
          title: 'Hecho en planta, no en el patio',
          body: 'Cada fase se inspecciona antes de salir de Orange City: nada se improvisa en tu propiedad.',
        },
        {
          number: '02',
          title: 'Los permisos son nuestro trabajo',
          body: 'Te entregamos planos sellados y te acompañamos en el trámite con tu municipio.',
        },
        {
          number: '03',
          title: '170 MPH con placa que lo comprueba',
          body: 'Insignia de Florida DCA / DBPR en cada estructura: inspectores y aseguradoras dejan de preguntar.',
        },
        {
          number: '04',
          title: 'Un solo número para servicio, siempre',
          body: 'Misma fábrica, mismos equipos. El servicio lo atiende quien la construyó.',
        },
      ],
    },
    {
      blockType: 'financingBand',
      kicker: 'Financiamiento',
      title: 'Paga a plazos.',
      body: 'Opciones de renta con opción a compra y financiamiento: recibe tu estructura ahora y paga mensual.',
      ctaLabel: 'Ver opciones',
    },
    {
      blockType: 'regionGrid',
      title: 'Entregamos en toda Florida.',
      ctaLabel: 'Todas las ubicaciones',
      regions: [
        { name: 'Florida Central', cities: 'Orlando · Deltona · Sanford · Ocala' },
        { name: 'Norte de Florida', cities: 'Jacksonville · Gainesville · St. Augustine' },
        { name: 'Tampa Bay', cities: 'Tampa · St. Petersburg · Brandon · Lakeland' },
        { name: 'Sur y Golfo', cities: 'Fort Myers · Naples · Port St. Lucie · Palm Beach' },
      ],
    },
  ]
  const homeFind = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: 'home' } },
  })
  const homeId = homeFind.docs[0]?.id
  if (homeId) {
    await payload.update({
      req,
      collection: 'pages',
      id: homeId,
      data: {
        title: 'Inicio',
        layout: homeEsLayout as never,
      },
      locale: 'es',
    })
  }

  const simplePages = [
    {
      slug: 'gallery',
      title: { en: 'Gallery', es: 'Galería' },
      block: 'galleryGrid' as const,
    },
    {
      slug: 'financing',
      title: { en: 'Financing', es: 'Financiamiento' },
      kicker: { en: 'Payment plans', es: 'Planes de pago' },
      body: {
        en: 'Display lots and the internet department accept Visa, Mastercard, Discover, debit and personal checks. Conventional financing is available with approved credit. The Backyard Mini Storage Plan is a convenient lease with monthly payments — plus E-Z Pay with no credit check. Ask a rep which plan fits sheds, garages, gazebos or steel buildings.',
        es: 'Los lotes y el departamento de internet aceptan Visa, Mastercard, Discover, débito y cheques. Financiamiento convencional con crédito aprobado. El plan Backyard Mini Storage es un arrendamiento mensual — más E-Z Pay sin revisión de crédito. Pregunta cuál plan aplica a sheds, garajes, gazebos o acero.',
      },
    },
    {
      slug: 'about',
      title: { en: 'About us', es: 'Nosotros' },
      kicker: { en: 'Why choose us', es: 'Por qué elegirnos' },
      body: {
        en: 'Superior Sheds, Inc. designs, assembles and delivers portable storage buildings across Florida. Many new customers are neighbors or friends of people we already served. Every building is inspected before it leaves the plant, Miami-Dade approved, rated to 170 MPH, and certified under Florida DBPR manufactured buildings ID MFT-113.',
        es: 'Superior Sheds, Inc. diseña, ensambla y entrega edificios portátiles en toda Florida. Muchos clientes nuevos llegan por vecinos o amigos ya atendidos. Cada estructura se inspecciona antes de salir de planta, está aprobada en Miami-Dade, certificada a 170 MPH y registrada en Florida DBPR ID MFT-113.',
      },
    },
    {
      slug: 'delivery',
      title: { en: 'Delivery', es: 'Entrega' },
      kicker: { en: 'Installation', es: 'Instalación' },
      body: {
        en: 'Prefabricated and fully assembled in our factory, then brought to your home or business ready to anchor. Crews block and anchor to 170 MPH engineered specs. Tight fit? We crane it over or roll it in. Need a shed moved? Call 877-439-7433 for a quote.',
        es: 'Prefabricados y armados en fábrica, llevados a tu casa o negocio listos para anclar. Los equipos bloquean y anclan a 170 MPH. ¿Espacio justo? Lo pasamos con grúa o lo rodamos. ¿Hay que mover un shed? Llama al 877-439-7433.',
      },
    },
    {
      slug: 'government',
      title: { en: 'Government / major accounts', es: 'Gobierno / cuentas mayores' },
      kicker: { en: 'Agencies', es: 'Agencias' },
      body: {
        en: 'Special programs for agencies and major accounts. Contact Connie Rojas at 877-439-7433 or csibila@superiorsheds.com.',
        es: 'Programas especiales para agencias y cuentas mayores. Contacte a Connie Rojas al 877-439-7433 o csibila@superiorsheds.com.',
      },
    },
  ]

  for (const page of simplePages) {
    const layout =
      page.block === 'galleryGrid'
        ? [
            {
              blockType: 'galleryGrid',
              title: page.title.en,
              intro:
                'Browse photos by product line — Bungalow, Country Inn, Cabana, Double Wide, gazebos and steel.',
            },
          ]
        : [
            {
              blockType: 'financingBand',
              kicker: page.kicker?.en || page.title.en,
              title: page.title.en,
              body: page.body?.en,
              ctaLabel: 'Get a quote',
            },
          ]

    const created = await payload.create({
      req,
      collection: 'pages',
      data: {
        title: page.title.en,
        slug: page.slug,
        hero: { type: 'none' },
        layout: layout as never,
        _status: 'published',
      },
      locale: 'en',
    })

    const esLayout =
      page.block === 'galleryGrid'
        ? [
            {
              blockType: 'galleryGrid',
              title: page.title.es,
              intro: 'Fotos por línea: Bungalow, Country Inn, Cabana, Doble Ancho, gazebos y acero.',
            },
          ]
        : [
            {
              blockType: 'financingBand',
              kicker: page.kicker?.es || page.title.es,
              title: page.title.es,
              body: page.body?.es,
              ctaLabel: 'Cotizar',
            },
          ]

    await payload.update({
      req,
      collection: 'pages',
      id: created.id,
      data: { title: page.title.es, layout: esLayout as never },
      locale: 'es',
    })
  }

  const faqItems = {
    en: [
      {
        question: 'Will I need a permit?',
        answer:
          'Check with your municipality and any deed restrictions. Most cities require permits. Superior furnishes sealed drawings and walks you through the process.',
      },
      {
        question: 'Is State Approval important?',
        answer:
          'Yes — Florida law requires state approval and insignia for portable buildings (Superior Sheds, Inc. ID MFT-113, Chapter 553, max 720 sq ft).',
      },
      {
        question: 'Are all sheds built to the same wind load?',
        answer:
          'No. Sheds must meet the wind load of the install area (110–170 MPH). Superior builds every shed to the highest standard — 170 MPH — so you are covered statewide.',
      },
      {
        question: 'Am I limited on window and door location?',
        answer:
          'No. Superior designs around your needs. Door and window placement can add to or take away usable storage — design it for best use.',
      },
      {
        question: 'Do I need a concrete slab?',
        answer: 'No — our floor/deck/skid and block/anchor system eliminates the need and cost of a slab.',
      },
      {
        question: 'How do I keep the shed looking new?',
        answer:
          'Aluminum lap siding with a baked enamel finish means years of good looks: no paint, no rust. Clean it with anything and it keeps the new look.',
      },
      {
        question: 'How about colors?',
        answer: 'Pick body, roof and trim from the color chart on each product page.',
      },
    ],
    es: [
      {
        question: '¿Necesito permiso?',
        answer:
          'Consulta tu municipio y cualquier restricción de escritura. La mayoría lo exigen. Superior entrega planos sellados y te guía en el trámite.',
      },
      {
        question: '¿Importa la aprobación estatal?',
        answer:
          'Sí — la ley de Florida exige insignia de aprobación estatal (ID MFT-113, Capítulo 553, máximo 720 pies²).',
      },
      {
        question: '¿Todos los sheds se fabrican al mismo viento?',
        answer:
          'No. Deben cumplir el viento de la zona (110–170 MPH). Superior fabrica al estándar más alto — 170 MPH — para cubrir todo el estado.',
      },
      {
        question: '¿Puedo elegir dónde van puertas y ventanas?',
        answer:
          'Sí. Superior diseña alrededor de tu uso. La ubicación suma o resta almacenamiento útil.',
      },
      {
        question: '¿Necesito losa de concreto?',
        answer: 'No — el sistema de piso, patines y anclaje elimina la losa.',
      },
      {
        question: '¿Cómo lo mantengo como nuevo?',
        answer:
          'El aluminio con esmalte horneado no se pinta ni oxida. Limpia con lo que tengas y sigue viéndose nuevo.',
      },
      {
        question: '¿Y los colores?',
        answer: 'Elige cuerpo, techo y molduras en la carta de cada producto.',
      },
    ],
  }

  await payload.create({
    req,
    collection: 'pages',
    data: {
      title: 'FAQ',
      slug: 'faq',
      hero: { type: 'none' },
      layout: [{ blockType: 'faqList', title: 'FAQ', items: faqItems.en }],
      _status: 'published',
    },
    locale: 'en',
  })
  const faqFind = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: 'faq' } },
  })
  if (faqFind.docs[0]?.id) {
    await payload.update({
      req,
      collection: 'pages',
      id: faqFind.docs[0].id,
      data: {
        title: 'Preguntas frecuentes',
        layout: [{ blockType: 'faqList', title: 'FAQ', items: faqItems.es }],
      },
      locale: 'es',
    })
  }

  await payload.create({
    req,
    collection: 'pages',
    data: {
      title: 'Order status',
      slug: 'order-status',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'financingBand',
          title: 'Order status',
          body: 'Enter a valid order number and customer name to see your order status. Fields are case sensitive.',
        },
      ],
      _status: 'published',
    },
    locale: 'en',
  })

  payload.logger.info('— Dealer form...')
  const dealerForm = await payload.create({
    req,
    collection: 'forms',
    data: {
      title: 'Dealer inquiry',
      submitButtonLabel: 'Submit inquiry',
      confirmationType: 'message',
      confirmationMessage: lexicalPlainText(
        'Thank you — a Superior Sheds representative will contact you within two business days.',
      ),
      fields: [
        {
          blockType: 'text',
          name: 'company',
          label: 'Company name',
          required: true,
        },
        {
          blockType: 'text',
          name: 'contactName',
          label: 'Contact name',
          required: true,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email',
          required: true,
        },
        {
          blockType: 'text',
          name: 'phone',
          label: 'Phone',
          required: true,
        },
        {
          blockType: 'textarea',
          name: 'message',
          label: 'Tell us about your market',
          required: false,
        },
      ],
    },
  })

  await payload.create({
    req,
    collection: 'pages',
    data: {
      title: 'Dealer inquiry',
      slug: 'dealer',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'financingBand',
          title: 'Dealer inquiry',
          body: 'Complete the form if you are interested in becoming an authorized Superior Sheds dealer.',
        },
        {
          blockType: 'formBlock',
          form: dealerForm.id,
        },
      ],
      _status: 'published',
    },
    locale: 'en',
  })

  await payload.create({
    req,
    collection: 'pages',
    data: {
      title: 'Privacy policy',
      slug: 'privacy-policy',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'financingBand',
          title: 'Privacy policy',
          body: 'Superior Sheds respects your privacy. We use contact information only to respond to inquiries and fulfill orders.',
        },
      ],
      _status: 'published',
    },
    locale: 'en',
  })

  payload.logger.info('— Globals...')
  const productRefs = Object.values(productIds) as number[]

  await payload.updateGlobal({
    req,
    slug: 'header',
    data: {
      phone: '877-439-7433',
      quoteLabel: 'Get a quote',
      navItems: [
        { link: { type: 'custom', label: 'Locations', url: '/locations' } },
        { link: { type: 'custom', label: 'Gallery', url: '/gallery' } },
        { link: { type: 'custom', label: 'Financing', url: '/financing' } },
      ],
    },
    locale: 'en',
  })

  await payload.updateGlobal({
    req,
    slug: 'header',
    data: {
      quoteLabel: 'Cotizar',
    },
    locale: 'es',
  })

  await payload.updateGlobal({
    req,
    slug: 'footer',
    data: {
      productLinks: productRefs,
      companyLinks: [
        { link: { type: 'custom', label: 'About us', url: '/about' } },
        { link: { type: 'custom', label: 'Delivery', url: '/delivery' } },
        { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
        { link: { type: 'custom', label: 'Become a dealer', url: '/dealer' } },
        { link: { type: 'custom', label: 'Government accounts', url: '/government' } },
        { link: { type: 'custom', label: 'Order status', url: '/order-status' } },
      ],
    },
    locale: 'en',
  })

  await payload.updateGlobal({
    req,
    slug: 'site-settings',
    data: {
      phone: '877-439-7433',
      email: 'info@superiorsheds.com',
      hqTitle: 'Plant & main yard',
      hqAddress: '2323 S. Volusia Avenue\nOrange City, Florida 32763',
      zipSuccessMessage:
        'We deliver to your area. Typical install window: 3–5 weeks after permit approval.',
      quoteHeadline: 'Build your quote',
      quoteFormNote: 'We reply within one business day. No credit check to ask.',
      quoteSentTitle: 'Request received.',
      quoteSentBody:
        'A Superior rep will call you with pricing, delivery window and permit details within one business day.',
      estimateDisclaimer:
        'Placeholder pricing for layout — final price confirmed by your rep.',
      footerBlurb:
        'Prefabricated sheds, garages, gazebos and steel buildings, manufactured in Orange City, Florida.',
      approvalsLine: 'Florida DCA / DBPR approved · Rated to 170 MPH',
      showPrices: true,
    },
    locale: 'en',
  })

  await payload.updateGlobal({
    req,
    slug: 'site-settings',
    data: {
      hqTitle: 'Planta y patio principal',
      zipSuccessMessage:
        'Sí entregamos e instalamos en tu zona. Ventana típica: 3–5 semanas desde la aprobación del permiso.',
      quoteHeadline: 'Arma tu cotización',
      quoteFormNote: 'Respondemos en un día hábil. Preguntar no requiere revisión de crédito.',
      quoteSentTitle: 'Solicitud recibida.',
      quoteSentBody:
        'Un asesor de Superior te llamará con precio, fecha de entrega y detalles de permisos en un día hábil.',
      estimateDisclaimer:
        'Precios de ejemplo para el layout — el precio final lo confirma tu asesor.',
      footerBlurb:
        'Sheds, garajes, gazebos y edificios de acero prefabricados en Orange City, Florida y aprobados en todo el estado.',
      approvalsLine: 'Aprobado por Florida DCA / DBPR · Certificado a 170 MPH',
    },
    locale: 'es',
  })

  payload.logger.info('— Redirects...')
  const redirects = [
    { from: '/products/sheds/bungalow-shed/', to: '/products/bungalow' },
    { from: '/products/sheds/country-inn-shed/', to: '/products/country-inn' },
    { from: '/products/sheds/cabana-shed/', to: '/products/cabana' },
    { from: '/products/sheds/double-wide-shed/', to: '/products/double-wide' },
    { from: '/products/gazebos/', to: '/products/gazebos' },
    { from: '/products/carports-steel-buildings/', to: '/products/carports' },
    { from: '/govermentmajor-accounts/', to: '/government' },
    { from: '/contactus/', to: '/locations' },
    { from: '/get-a-quote/', to: '/' },
    { from: '/about-us/', to: '/about' },
    { from: '/locations/', to: '/locations' },
    { from: '/privacy-policy/', to: '/privacy-policy' },
  ]

  for (const r of redirects) {
    await payload.create({
      req,
      collection: 'redirects',
      data: { from: r.from, to: { type: 'custom', url: r.to } },
    })
  }

  payload.logger.info('Superior Sheds seed complete.')
}

function lexicalPlainText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const fetchedMediaCache = new Map<string, File>()

async function fetchFileByURL(url: string, payload?: Payload): Promise<File> {
  const cached = fetchedMediaCache.get(url)
  if (cached) return cached

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    const data = await res.arrayBuffer()
    const ext = url.split('.').pop()?.split('?')[0] || 'jpg'
    const file: File = {
      name: `seed-${Date.now()}.${ext}`,
      data: Buffer.from(data),
      mimetype: ext === 'png' ? 'image/png' : 'image/jpeg',
      size: data.byteLength,
    }
    fetchedMediaCache.set(url, file)
    return file
  } catch (err) {
    payload?.logger.warn({ err, url, msg: 'Using placeholder image for seed media' })
    const data = await sharp({
      create: {
        width: 1200,
        height: 800,
        channels: 3,
        background: { r: 15, g: 18, b: 24 },
      },
    })
      .jpeg({ quality: 80 })
      .toBuffer()
    const file: File = {
      name: `seed-placeholder-${Date.now()}.jpg`,
      data,
      mimetype: 'image/jpeg',
      size: data.length,
    }
    fetchedMediaCache.set(url, file)
    return file
  }
}
