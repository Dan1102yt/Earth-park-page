import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { StationCard } from '../estaciones/StationCard'
import { ESTACIONES } from '../../data/estaciones'

// Las 7 estaciones del recorrido (datos en src/data/estaciones.ts); cada tarjeta enlaza a /estaciones/<slug>
export function StationsTeaser() {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-bosque dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl md:text-5xl text-crema text-center mb-3">{t('stationsTeaser.heading')}</h2>
        <p className="font-body text-crema/90 text-body text-center mb-12">{t('stationsTeaser.intro')}</p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {ESTACIONES.map((e, i) => (
            <motion.div
              key={e.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <StationCard estacion={e} tone="dark" />
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
