import type { Plan } from '../sections/PlansPreview'

// El sitio usa HashRouter en GitHub Pages, por eso la ruta lleva "#/"
const PLANS_URL = 'https://dan1102yt.github.io/Earth-park-page/#/planes-turisticos'

const provider = {
  '@type': 'TouristAttraction',
  name: 'Earth Park',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vereda El Dátil',
    addressLocality: 'Macanal',
    addressRegion: 'Boyacá',
    addressCountry: 'CO',
  },
  telephone: '+57 322 869 7438',
}

/**
 * Datos estructurados (schema.org) de los planes turísticos.
 * Se generan desde planMetas, así que los precios siempre coinciden con la web.
 * price va numérico (sin puntos) y priceCurrency "COP".
 * El plan institucional se lista sin oferta porque se cotiza a la medida.
 */
export function PlansJsonLd({ plans }: { plans: Plan[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Planes turísticos Earth Park',
    itemListElement: plans.map((plan, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: plan.title,
        description: plan.description,
        url: PLANS_URL,
        provider,
        ...(plan.price !== undefined && {
          offers: {
            '@type': 'Offer',
            price: plan.price,
            priceCurrency: 'COP',
            availability: 'https://schema.org/InStock',
            url: PLANS_URL,
          },
        }),
      },
    })),
  }

  // Escapa "<" para que ningún texto pueda cerrar la etiqueta <script>
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
