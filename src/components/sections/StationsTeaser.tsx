import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

const stations = [
  { id: 'mariposa-89', emoji: '🦋' },
  { id: 'piramide', emoji: '🛕' },
  { id: 'cuatro-elementos', emoji: '🔥' },
  { id: 'luna-360', emoji: '🌕' },
]

export function StationsTeaser() {
  const { t } = useTranslation()
  const items = t('stationsTeaser.items', { returnObjects: true }) as Record<string, { title: string; desc: string }>

  return (
    <section className="py-24 bg-bosque dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-crema text-center mb-12">{t('stationsTeaser.heading')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stations.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-crema/10 rounded-2xl p-6 border border-crema/10"
            >
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-fraunces text-lg text-crema mb-1">{items[s.id].title}</h3>
              <p className="font-inter text-crema/70 text-sm">{items[s.id].desc}</p>
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
