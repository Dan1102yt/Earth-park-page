import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { asset } from '../lib/asset'

const stations = [
  { id: 'piramide', emoji: '🛕', image: asset('/images/estaciones/estacion-piramide.jpeg') },
  { id: 'mariposa-89', emoji: '🦋', image: asset('/images/estaciones/estacion-mariposa.jpeg') },
  { id: 'cuatro-elementos', emoji: '🔥', image: asset('/images/estaciones/estacion-fuego.jpeg') },
  { id: 'rover-lunar', emoji: '🚀', image: asset('/images/estaciones/estacion-rover.jpeg') },
  { id: 'luna-360', emoji: '🌕', image: asset('/images/estaciones/estacion-luna360.jpeg') },
  // PLACEHOLDER: sin foto real todavía — swap por fotografía real de Earth Park
  { id: 'vivero-cafe', emoji: '🌿', image: 'https://picsum.photos/seed/earthpark-station-vivero/600/450' },
  { id: 'galeria-arte', emoji: '🎨', image: asset('/images/estaciones/estaciones-galeria-de-arte.webp') },
]

// Sin modal: cada estación es una sola frase de descripción, no amerita una vista de detalle aparte
export function StationsPage() {
  const { t } = useTranslation()
  const items = t('stationsPage.items', { returnObjects: true }) as Record<string, { title: string; desc: string }>

  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title={t('stationsPage.heading')}
        subtitle={t('stationsPage.subtitle')}
      />

      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <span aria-hidden className="absolute -top-10 -left-2 md:-left-8 font-fraunces text-7xl md:text-8xl text-terracota/20 dark:text-dorado/25 leading-none select-none">
            "
          </span>
          <p className="relative font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema leading-relaxed text-justify">
            {t('stationsPage.intro')}
          </p>
          <div className="w-16 h-[3px] bg-terracota dark:bg-dorado mt-6 mx-auto" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={s.image} alt={items[s.id].title} loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-2xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-11 h-11 flex items-center justify-center">
                  {s.emoji}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1">{items[s.id].title}</h3>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm">{items[s.id].desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
