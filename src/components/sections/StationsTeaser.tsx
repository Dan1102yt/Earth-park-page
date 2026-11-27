import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

// Las 7 estaciones del recorrido; cada tarjeta enlaza a /estaciones/<slug>
const stations = [
  { slug: 'piramide-teguas', image: asset('/images/estaciones/estacion-piramide.jpeg') },
  { slug: 'mariposa-88', image: asset('/images/estaciones/estacion-mariposa.jpeg') },
  { slug: 'aire', image: asset('/images/estaciones/estacion-aire.webp') },
  { slug: 'agua', image: asset('/images/estaciones/estacion-agua.webp') },
  { slug: 'fuego', image: asset('/images/estaciones/estacion-fuego.jpeg') },
  { slug: 'tierra', image: asset('/images/estaciones/estacion-tierra.webp') },
  { slug: 'luna-360', image: asset('/images/estaciones/estacion-luna360.jpeg') },
]

export function StationsTeaser() {
  const { t } = useTranslation()
  const items = t('stationsTeaser.items', { returnObjects: true }) as Record<string, { title: string; desc: string }>

  return (
    <section className="py-24 bg-bosque dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl md:text-5xl text-crema text-center mb-3">{t('stationsTeaser.heading')}</h2>
        <p className="font-body text-crema/90 text-body text-center mb-12">{t('stationsTeaser.intro')}</p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {stations.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <Link
                to={`/estaciones/${s.slug}`}
                className="group block h-full bg-crema/10 rounded-2xl overflow-hidden border border-crema/10 hover:border-dorado/60 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={items[s.slug].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-crema mb-1">{items[s.slug].title}</h3>
                  <p className="font-body text-crema/90 text-body">{items[s.slug].desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/estaciones">
            <Button variant="terracota" size="lg">{t('stationsTeaser.cta')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
