const G = 'https://www.superiorsheds.com/wp-content/gallery/'

function sq(label: string) {
  const [w, l] = label.split('×').map(Number)
  return { label, sqft: (w || 8) * (l || 10) }
}

export type ProductSeed = {
  slug: string
  name: { en: string; es: string }
  category: { en: string; es: string }
  short: { en: string; es: string }
  blurb: { en: string; es: string }
  basePrice: number
  rate: number
  optionSlugs: string[]
  sizes: Array<{ label: string; sqft: number }>
  quick: {
    en: Array<{ label: string; value: string }>
    es: Array<{ label: string; value: string }>
  }
  specs: {
    en: Array<{ label: string; value: string }>
    es: Array<{ label: string; value: string }>
  }
  heroUrl: string
  galleryUrls: string[]
}

export const productSeedData: ProductSeed[] = [
  {
    slug: 'bungalow',
    name: { en: 'The Bungalow', es: 'El Bungalow' },
    category: { en: 'Aluminum shed', es: 'Shed de aluminio' },
    short: { en: 'Classic gable roof', es: 'Techo a dos aguas clásico' },
    blurb: {
      en: 'The Bungalow is a classically styled building with a gable roof. Lap-sided aluminum with a baked-on enamel finish means minimal maintenance — it still looks as good as it did rolling off the factory line. Optional Floridian eave available.',
      es: 'El Bungalow es un edificio clásico con techo a dos aguas. Aluminio de siding solapado con esmalte horneado: mantenimiento mínimo y aspecto de fábrica por décadas. Alero Floridian opcional.',
    },
    basePrice: 3295,
    rate: 26,
    optionSlugs: ['garage', 'windows', 'ramp', 'electrical', 'shelving', 'floor125'],
    sizes: [
      '6×8',
      '6×10',
      '6×12',
      '8×10',
      '8×12',
      '8×16',
      '10×12',
      '10×16',
      '10×20',
      '12×16',
      '12×24',
      '14×28',
    ].map(sq),
    quick: {
      en: [
        { label: 'Widths', value: '6′–14′' },
        { label: 'Lengths', value: 'to 40′' },
        { label: 'Wind load', value: '170 MPH' },
        { label: 'Floor load', value: '75 psf' },
      ],
      es: [
        { label: 'Anchos', value: '6′–14′' },
        { label: 'Largos', value: 'hasta 40′' },
        { label: 'Viento', value: '170 MPH' },
        { label: 'Piso', value: '75 psf' },
      ],
    },
    specs: {
      en: [
        { label: 'Sizes available', value: '6′, 8′, 10′, 12′, 14′ widths — lengths to 40′' },
        {
          label: 'Truss system',
          value: 'Manufactured 2″×4″ trusses, press plates, hurricane straps, approx. 24″ centers',
        },
        {
          label: 'Skids / floor joists',
          value:
            '4″×4″ pressure treated skids; 2″×6″ PT floor joists with Simpson hurricane fastening, 16″–24″ centers',
        },
        {
          label: 'Decking',
          value: '3/4″ tongue & groove Sturdi-Floor (treated) or Advantech, optional gray acrylic deck paint',
        },
        { label: 'Siding', value: '24″ lap siding, aluminum, baked enamel finish' },
        { label: 'Wind load', value: '170 MPH per Florida Building Code ASCE7-98, 3-second gusts' },
        { label: 'Floor load', value: '75 lbs per sq ft; optional 125 lbs per sq ft' },
        {
          label: 'State approval',
          value: 'Florida State approved and inspected; insignia and data plate in every building (FL Statute 553.37)',
        },
        {
          label: 'Permits',
          value: 'Local municipalities require permits — Superior guides the homeowner through the whole process',
        },
        { label: 'Options', value: 'Entry doors, garage doors, windows, vents, ramps and electrical packages' },
      ],
      es: [
        { label: 'Medidas', value: 'Anchos 6′, 8′, 10′, 12′, 14′ — largos hasta 40′' },
        {
          label: 'Cerchas',
          value: 'Cerchas 2″×4″ de fábrica, placas, correas de huracán, ~24″ al centro',
        },
        {
          label: 'Patines / viguetas',
          value: 'Patines 4″×4″ tratados; viguetas 2″×6″ con anclaje Simpson, 16″–24″ al centro',
        },
        {
          label: 'Piso',
          value: 'Sturdi-Floor 3/4″ machihembrado o Advantech, pintura acrílica gris opcional',
        },
        { label: 'Revestimiento', value: 'Siding de aluminio 24″, esmalte horneado' },
        { label: 'Viento', value: '170 MPH según código de Florida ASCE7-98, ráfagas de 3 segundos' },
        { label: 'Carga de piso', value: '75 lbs/pie²; opcional 125 lbs/pie²' },
        {
          label: 'Aprobación',
          value: 'Aprobado e inspeccionado por el Estado de Florida; insignia y placa en cada edificio',
        },
        { label: 'Permisos', value: 'Superior acompaña el trámite municipal' },
        { label: 'Opciones', value: 'Puertas, garaje, ventanas, respiraderos, rampas y paquete eléctrico' },
      ],
    },
    heroUrl: G + 'bungalow-shed-gallery/20130423_164055.jpg',
    galleryUrls: [
      G + 'bungalow-shed-gallery/400471_335287329815764_2092667552_n.jpg',
      G + 'bungalow-shed-gallery/402383_335287073149123_162319869_n.jpg',
      G + 'bungalow-shed-gallery/405225_335286283149202_98032605_n.jpg',
      G + 'bungalow-shed-gallery/20130423_164055.jpg',
      G + 'bungalow-shed-gallery/20130425_181514.jpg',
    ],
  },
  {
    slug: 'country-inn',
    name: { en: 'Country Inn', es: 'Country Inn' },
    category: { en: 'Aluminum shed', es: 'Shed de aluminio' },
    short: { en: 'Steeper roof, cottage look', es: 'Techo alto, estilo cottage' },
    blurb: {
      en: 'Designed for people who need storage but want something with more style — or a deed restriction that requires it. Vinyl, Perma Board (stucco or wood grain) or aluminum lap siding, plus shingle, Perma Tile, Advantage Panel or aluminum-lap roofs. Optional porch.',
      es: 'Para quien necesita almacenamiento con más estilo, o una restricción de escritura. Vinyl, Perma Board (estuco o veta) o aluminio, y techos de shingle, Perma Tile, Advantage Panel o aluminio. Porche opcional.',
    },
    basePrice: 3890,
    rate: 29,
    optionSlugs: ['garage', 'windows', 'electrical', 'ramp'],
    sizes: [
      '8×10',
      '8×12',
      '8×16',
      '10×12',
      '10×16',
      '10×20',
      '12×16',
      '12×20',
      '12×24',
      '14×24',
      '14×30',
      '14×40',
    ].map(sq),
    quick: {
      en: [
        { label: 'Widths', value: '8′–14′' },
        { label: 'Lengths', value: 'to 40′' },
        { label: 'Wind load', value: '170 MPH' },
        { label: 'Roof', value: 'High-pitch gable' },
      ],
      es: [
        { label: 'Anchos', value: '8′–14′' },
        { label: 'Largos', value: 'hasta 40′' },
        { label: 'Viento', value: '170 MPH' },
        { label: 'Techo', value: 'Dos aguas alto' },
      ],
    },
    specs: {
      en: [
        { label: 'Sizes available', value: '8′, 10′, 12′ & 14′ widths — lengths from 8′ to 40′' },
        {
          label: 'Roof options',
          value: 'Shingles, Perma Tile steel, Advantage Panel steel with 1/2″ plywood, or aluminum lap',
        },
        { label: 'Truss system', value: 'Manufactured truss with overhang — 84″ sidewalls, 24″ or 16″ centers' },
        {
          label: 'Siding',
          value: 'Vinyl with vapor barrier, Perma Board stucco/wood grain, or aluminum lap with baked enamel',
        },
        { label: 'Decking', value: '3/4″ tongue & groove Sturdi-Floor standard; Advantech available' },
        { label: 'Wind load', value: '170 MPH ASCE7-98 Exposure C; 200 MPH Exposure D available' },
        { label: 'Floor load', value: '75 lbs per sq ft; optional 125 lbs per sq ft' },
        { label: 'State approval', value: 'Florida State approved and inspected; data plate in every building' },
        { label: 'Permits', value: 'Permit package and engineered drawings provided' },
        { label: 'Options', value: 'Doors, garage doors, windows, vents, ramps, electrical, porch' },
      ],
      es: [
        { label: 'Medidas', value: 'Anchos 8′, 10′, 12′ y 14′ — largos de 8′ a 40′' },
        {
          label: 'Techos',
          value: 'Shingles, Perma Tile, Advantage Panel con plywood 1/2″, o aluminio',
        },
        { label: 'Cerchas', value: 'Cercha de fábrica con alero — paredes 84″, 24″ o 16″ al centro' },
        {
          label: 'Revestimiento',
          value: 'Vinyl con barrera de vapor, Perma Board estuco/veta, o aluminio esmaltado',
        },
        { label: 'Piso', value: 'Sturdi-Floor 3/4″ de serie; Advantech disponible' },
        { label: 'Viento', value: '170 MPH ASCE7-98 Exposure C; 200 MPH Exposure D disponible' },
        { label: 'Carga de piso', value: '75 lbs/pie²; opcional 125 lbs/pie²' },
        { label: 'Aprobación', value: 'Aprobado e inspeccionado por Florida; placa en cada edificio' },
        { label: 'Permisos', value: 'Paquete de permisos y planos sellados' },
        { label: 'Opciones', value: 'Puertas, garaje, ventanas, rampas, eléctrico, porche' },
      ],
    },
    heroUrl: G + 'country-inn/1.jpg',
    galleryUrls: [
      G + 'country-inn/1.jpg',
      G + 'country-inn/2.jpg',
      G + 'country-inn/8X12-With-Porch.JPG',
      G + 'country-inn/8X12-With-Porch-2.JPG',
      G + 'country-inn/12X18-Country-Inn.jpg',
    ],
  },
  {
    slug: 'cabana',
    name: { en: 'Cabana', es: 'Cabana' },
    category: { en: 'Aluminum shed', es: 'Shed de aluminio' },
    short: { en: 'Pool & patio favorite', es: 'Favorito de piscina y patio' },
    blurb: {
      en: 'Island flair with a hip roof and a vaulted feel. Same roofing and siding options as the Country Inn, with optional Bahama-style windows and doors. Built to sit beside a pool deck as storage, changing room, bar or workshop.',
      es: 'Aire isleño con techo a cuatro aguas y sensación de bóveda. Mismas opciones de techo y siding que el Country Inn, con ventanas y puertas estilo Bahama. Pensado para el borde de la piscina: almacenamiento, vestidor, bar o taller.',
    },
    basePrice: 3590,
    rate: 27,
    optionSlugs: ['windows', 'electrical', 'ramp', 'shelving'],
    sizes: [
      '8×10',
      '8×12',
      '8×16',
      '10×12',
      '10×16',
      '10×20',
      '12×16',
      '12×20',
      '12×24',
      '14×20',
      '14×24',
    ].map(sq),
    quick: {
      en: [
        { label: 'Widths', value: '8′–14′' },
        { label: 'Lengths', value: 'to 40′' },
        { label: 'Wind load', value: '170 MPH' },
        { label: 'Roof', value: 'Hip / low-profile' },
      ],
      es: [
        { label: 'Anchos', value: '8′–14′' },
        { label: 'Largos', value: 'hasta 40′' },
        { label: 'Viento', value: '170 MPH' },
        { label: 'Techo', value: 'Hip / perfil bajo' },
      ],
    },
    specs: {
      en: [
        { label: 'Sizes available', value: '8′, 10′, 12′ & 14′ widths — lengths up to 40′' },
        { label: 'Hip roof options', value: 'Shingles, Perma Tile steel, Advantage Panel steel with 1/2″ plywood' },
        { label: 'Truss system', value: 'Conventional framing, 24″ or 16″ centers — 84″ side walls with hip roof' },
        {
          label: 'Siding options',
          value: 'Vinyl with vapor barrier, Perma Board stucco/wood grain, lapped aluminum, or Hardi Plank',
        },
        { label: 'Decking', value: '3/4″ tongue & groove Sturdi-Floor or Advantech (gray acrylic paint optional)' },
        { label: 'Wind load', value: '170 MPH ASCE7-98 3-second gusts (200 MPH Exposure D available)' },
        { label: 'Floor load', value: '75 lbs per sq ft; optional 125 lbs per sq ft' },
        { label: 'State approval', value: 'Florida State approved and inspected' },
        { label: 'Permits', value: 'Superior handles the permit paperwork with you' },
        { label: 'Options', value: 'Doors, screened openings, Bahama windows, electrical, porch' },
      ],
      es: [
        { label: 'Medidas', value: 'Anchos 8′, 10′, 12′ y 14′ — largos hasta 40′' },
        { label: 'Techo hip', value: 'Shingles, Perma Tile, Advantage Panel con plywood 1/2″' },
        { label: 'Estructura', value: 'Entramado convencional, 24″ o 16″ al centro — paredes 84″' },
        {
          label: 'Revestimiento',
          value: 'Vinyl, Perma Board estuco/veta, aluminio solapado o Hardi Plank',
        },
        { label: 'Piso', value: 'Sturdi-Floor 3/4″ o Advantech (pintura acrílica gris opcional)' },
        { label: 'Viento', value: '170 MPH ASCE7-98 (200 MPH Exposure D disponible)' },
        { label: 'Carga de piso', value: '75 lbs/pie²; opcional 125 lbs/pie²' },
        { label: 'Aprobación', value: 'Aprobado e inspeccionado por Florida' },
        { label: 'Permisos', value: 'Superior gestiona el papeleo contigo' },
        { label: 'Opciones', value: 'Puertas, mosquitero, ventanas Bahama, eléctrico, porche' },
      ],
    },
    heroUrl: G + 'cabana-shed/10X16-Cabana.jpg',
    galleryUrls: [
      G + 'cabana-shed/10X16-Cabana.jpg',
      G + 'cabana-shed/10X16-Cabana-Yellow.jpg',
      G + 'cabana-shed/12X14-Cabana.jpg',
      G + 'cabana-shed/12X14-Cabana-Hardi-Painted.jpg',
      G + 'cabana-shed/12X16-Cabana-Yellow.jpg',
    ],
  },
  {
    slug: 'double-wide',
    name: { en: 'Double Wide', es: 'Doble Ancho' },
    category: { en: 'Garage & workshop', es: 'Garaje y taller' },
    short: { en: 'Garage-grade footprint', es: 'Tamaño de garaje' },
    blurb: {
      en: 'Need more than a single-wide? Every shed model is available as a double wide — up to 20′×36′ (720 sq ft) with 90″ sidewalls. Prefabricated, split for transport, then bolted back together on site as a bungalow, Floridian, Country Inn or Cabana.',
      es: '¿Necesitas más que un módulo? Todos los modelos salen en doble ancho — hasta 20′×36′ (720 pies²) con paredes de 90″. Prefabricado, separado para transporte y atornillado en sitio como bungalow, Floridian, Country Inn o Cabana.',
    },
    basePrice: 6950,
    rate: 24,
    optionSlugs: ['garage', 'electrical', 'floor125', 'windows', 'ramp'],
    sizes: ['20×20', '20×24', '20×30', '20×36'].map(sq),
    quick: {
      en: [
        { label: 'Footprints', value: '20×20 – 20×36' },
        { label: 'Sidewall', value: '90″' },
        { label: 'Wind load', value: '190 MPH' },
        { label: 'Floor load', value: '75 psf' },
      ],
      es: [
        { label: 'Huellas', value: '20×20 – 20×36' },
        { label: 'Pared', value: '90″' },
        { label: 'Viento', value: '190 MPH' },
        { label: 'Piso', value: '75 psf' },
      ],
    },
    specs: {
      en: [
        { label: 'Sizes available', value: '20×20, 20×24, 20×30, 20×36' },
        { label: 'Sidewall height', value: '90″ only — extra overhead for garage doors' },
        { label: 'Doors', value: 'Mobile-home style or roll-up garage' },
        {
          label: 'Door / window placement',
          value: 'Must coincide with bolt-together sections; at least two feet from end or any connection',
        },
        { label: 'Truss system', value: 'Manufactured truss, hurricane strap 2″×4″, approx. 16″ centers' },
        { label: 'Decking', value: '3/4″ tongue & groove Sturdi-Floor or Advantech' },
        { label: 'Wind load', value: '190 MPH per 2017 Florida Building Code ASCE7-98, 3-second gusts' },
        { label: 'Floor load', value: '75 lbs per sq ft; optional 125 lbs per sq ft' },
        { label: 'State approval', value: 'Florida State approved and inspected' },
        { label: 'Styles available', value: 'Bungalow / Floridian / Country Inn / Cabana' },
      ],
      es: [
        { label: 'Medidas', value: '20×20, 20×24, 20×30, 20×36' },
        { label: 'Altura de pared', value: '90″ solamente — más altura para puertas de garaje' },
        { label: 'Puertas', value: 'Estilo casa móvil o enrollable de garaje' },
        {
          label: 'Ubicación de puertas/ventanas',
          value: 'Deben coincidir con las secciones atornilladas; mínimo dos pies del extremo o unión',
        },
        { label: 'Cerchas', value: 'Cercha de fábrica, correa de huracán 2″×4″, ~16″ al centro' },
        { label: 'Piso', value: 'Sturdi-Floor 3/4″ o Advantech' },
        { label: 'Viento', value: '190 MPH según código 2017 ASCE7-98, ráfagas de 3 segundos' },
        { label: 'Carga de piso', value: '75 lbs/pie²; opcional 125 lbs/pie²' },
        { label: 'Aprobación', value: 'Aprobado e inspeccionado por Florida' },
        { label: 'Estilos', value: 'Bungalow / Floridian / Country Inn / Cabana' },
      ],
    },
    heroUrl: G + 'double-wide/20X24-Double-Wide.jpg',
    galleryUrls: [
      G + 'double-wide/20X24-Double-Wide.jpg',
      G + 'double-wide/20x20-Cabana.jpg',
      G + 'double-wide/20X20-Dbl-Wide-Country-Inn-Hardi.JPG',
      G + 'double-wide/20X24-Double-Wide-With-Optional-Garage-Door.jpg',
    ],
  },
  {
    slug: 'gazebos',
    name: { en: 'Gazebos', es: 'Gazebos' },
    category: { en: 'Outdoor living', es: 'Vida al aire libre' },
    short: { en: 'Square, oblong, octagon', es: 'Cuadrado, ovalado, octagonal' },
    blurb: {
      en: 'Pressure treated Southern Yellow Pine, delivered fully assembled on skids. Square, oblong or octagon — metal, shingle or cedar roof, sealed or stained, and screened in to beat the bugs.',
      es: 'Pino amarillo del sur tratado a presión, entregado armado sobre patines. Cuadrado, ovalado u octagonal — techo metálico, shingle o cedro, sellado o teñido, y con mosquitero para los insectos.',
    },
    basePrice: 4450,
    rate: 42,
    optionSlugs: ['electrical'],
    sizes: ['8×8', '8×10', '8×12', '10×10', '10×12', '10×14', '10×16', '10×20'].map(sq),
    quick: {
      en: [
        { label: 'Shapes', value: 'Square / oblong / octagon' },
        { label: 'Sizes', value: '8×8 – 10×20' },
        { label: 'Wind load', value: '150 MPH' },
        { label: 'Lumber', value: 'PT Southern Yellow Pine' },
      ],
      es: [
        { label: 'Formas', value: 'Cuadrado / ovalado / octagonal' },
        { label: 'Medidas', value: '8×8 – 10×20' },
        { label: 'Viento', value: '150 MPH' },
        { label: 'Madera', value: 'Pino tratado' },
      ],
    },
    specs: {
      en: [
        { label: 'Most popular sizes', value: '8×8, 8×10, 8×12, 10×10, 10×12, 10×14, 10×16, 10×20 — custom on request' },
        { label: 'Lumber', value: 'Pressure treated Southern Yellow Pine (non-arsenic treating)' },
        { label: 'Roof options', value: 'Metal, shingles or cedar' },
        { label: 'Finish', value: 'Sealed or painted; multiple wood stains' },
        { label: 'Delivery', value: 'Transportable, fully assembled on skids' },
        { label: 'Wind load', value: 'Rated to 150 MPH, ASCE7-98 3-second gusts' },
        { label: 'Code', value: 'Manufactured to meet Florida Building Code' },
        { label: 'Permitting', value: 'Sealed drawings issued for permitting' },
        { label: 'Installation', value: 'Blocked and anchored to Florida code by Superior installers' },
        { label: 'Options', value: 'Screening, bench seating, railing styles, roof shapes' },
      ],
      es: [
        { label: 'Medidas populares', value: '8×8 a 10×20 — a medida bajo pedido' },
        { label: 'Madera', value: 'Pino amarillo del sur tratado (sin arsénico)' },
        { label: 'Techos', value: 'Metal, shingles o cedro' },
        { label: 'Acabado', value: 'Sellado o pintado; varios tintes' },
        { label: 'Entrega', value: 'Transportable, armado sobre patines' },
        { label: 'Viento', value: '150 MPH, ASCE7-98 ráfagas de 3 segundos' },
        { label: 'Código', value: 'Fabricado para cumplir el Florida Building Code' },
        { label: 'Permisos', value: 'Planos sellados para el trámite' },
        { label: 'Instalación', value: 'Bloqueado y anclado a código por instaladores de Superior' },
        { label: 'Opciones', value: 'Mosquitero, bancos, barandas, formas de techo' },
      ],
    },
    heroUrl: G + 'gazebos/10-X-16-1.jpg',
    galleryUrls: [
      G + 'gazebos/10-X-16-1.jpg',
      G + 'gazebos/10-X-16-2.jpg',
      G + 'gazebos/10-X-16-3.jpg',
      G + 'gazebos/10-X-16-4.jpg',
      G + 'gazebos/3620904_orig.jpg',
    ],
  },
  {
    slug: 'carports',
    name: { en: 'Carports & Steel', es: 'Carports y Acero' },
    category: { en: 'Steel structures', es: 'Estructuras de acero' },
    short: { en: 'Cover a car, RV or crew', es: 'Cubre auto, RV o equipo' },
    blurb: {
      en: 'Galvanized steel frames for open carports, RV covers and fully enclosed buildings. Protect cars, boats, motorcycles, tractors or a workshop from Florida weather — the fastest, lowest-cost way to get cover on site.',
      es: 'Estructuras de acero galvanizado para carports abiertos, cubiertas de RV y edificios cerrados. Protege autos, botes, motos, tractores o un taller del clima de Florida — la forma más rápida y económica de cubrir.',
    },
    basePrice: 1295,
    rate: 14,
    optionSlugs: ['ramp', 'electrical'],
    sizes: [
      '12×21',
      '12×26',
      '18×21',
      '18×26',
      '18×31',
      '20×26',
      '24×31',
      '24×41',
      '30×41',
      '30×51',
    ].map(sq),
    quick: {
      en: [
        { label: 'Widths', value: '12′–30′' },
        { label: 'Lengths', value: 'to 51′' },
        { label: 'Frame', value: 'Galvanized steel' },
        { label: 'Use', value: 'Open / enclosed' },
      ],
      es: [
        { label: 'Anchos', value: '12′–30′' },
        { label: 'Largos', value: 'hasta 51′' },
        { label: 'Estructura', value: 'Acero galvanizado' },
        { label: 'Uso', value: 'Abierto / cerrado' },
      ],
    },
    specs: {
      en: [
        { label: 'Sizes available', value: '12′ to 30′ widths — lengths to 51′ and beyond on request' },
        { label: 'Frame', value: 'Galvanized steel tubing, certified engineering available' },
        { label: 'Panels', value: '29-gauge painted steel roof and side panels' },
        { label: 'Anchoring', value: 'Ground, asphalt or concrete anchors to Florida code' },
        { label: 'Wind rating', value: 'Certified units available to local wind requirements' },
        { label: 'Configurations', value: 'Open carport, partially enclosed, fully enclosed garage, RV cover' },
        { label: 'Permits', value: 'Certified drawings available for permitting' },
        { label: 'Install', value: 'Installed on a level site by Superior crews' },
        { label: 'Lead time', value: 'Typically the fastest product to deliver' },
        { label: 'Options', value: 'Walk doors, roll-up doors, windows, extra bracing' },
      ],
      es: [
        { label: 'Medidas', value: 'Anchos 12′ a 30′ — largos hasta 51′ y más bajo pedido' },
        { label: 'Estructura', value: 'Tubo de acero galvanizado; ingeniería certificada disponible' },
        { label: 'Paneles', value: 'Acero 29 gauge pintado en techo y laterales' },
        { label: 'Anclaje', value: 'Tierra, asfalto o concreto a código de Florida' },
        { label: 'Viento', value: 'Unidades certificadas según requisito local' },
        { label: 'Configuraciones', value: 'Abierto, parcial, garaje cerrado, cubierta de RV' },
        { label: 'Permisos', value: 'Planos certificados para el trámite' },
        { label: 'Instalación', value: 'En sitio nivelado por equipos de Superior' },
        { label: 'Entrega', value: 'Normalmente la línea más rápida' },
        { label: 'Opciones', value: 'Puertas peatonales, enrollables, ventanas, refuerzos' },
      ],
    },
    heroUrl: G + 'carports/2-car-carports.jpg',
    galleryUrls: [
      G + 'carports/1-Carolina-20x21x8-boxed.JPG',
      G + 'carports/1-Longwood-24x21x9-Vertical.JPG',
      G + 'carports/2-car-carports.jpg',
      G + 'carports/2-carport-metal.jpg',
      G + 'carports/2-Longwood-24x21x9-Vertical.JPG',
    ],
  },
]
