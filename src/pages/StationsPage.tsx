import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { StationCard } from '../components/estaciones/StationCard'
import { ESTACIONES } from '../data/estaciones'
import { SHOW_MAP } from '../config/map'

// Fuera del bundle inicial: con SHOW_MAP = false Rollup elimina esta importación.
const StationsMap = SHOW_MAP ? lazy(() => import('../components/estaciones/StationsMap')) : null

export function StationsPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      <PageHeaderBand title={t('stationsPage.heading')} subtitle={t('stationsPage.subtitle')} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-wrap justify-center gap-6">
          {ESTACIONES.map((e, i) => (
            <motion.div
              key={e.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease: 'easeOut' }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <StationCard estacion={e} />
            </motion.div>
          ))}
        </div>
      </section>

      {StationsMap && (
        <Suspense fallback={null}>
          <StationsMap />
        </Suspense>
      )}
    </div>
  )
}
