import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { asset } from '../../lib/asset'

const images = [
  asset('/images/hero/hero-mariposa.jpg'),
  asset('/images/hero/hero-naturaleza.jpg'),
  asset('/images/hero/hero-familia.jpg'),
  asset('/images/hero/hero-gastronomia.jpg'),
]

export function SensoryHighlights() {
  const { t } = useTranslation()
  const highlights = (t('sensory.items', { returnObjects: true }) as { title: string; text: string }[]).map((h, i) => ({ ...h, image: images[i] }))

  return (
    <section className="py-24 bg-crema/90 dark:bg-bosque-deep/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden bg-carbon/5 dark:bg-bosque-surface"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1">{item.title}</h3>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
