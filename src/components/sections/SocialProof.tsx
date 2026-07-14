import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { TestimonialsCarousel, testimonials } from '../ui/TestimonialsCarousel'

export function SocialProof() {
  const { t } = useTranslation()
  const stats = t('socialProof.stats', { returnObjects: true }) as { value: string; label: string }[]

  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema text-center mb-10">
            {t('socialProof.heading')}
          </h2>

          <TestimonialsCarousel items={testimonials} />

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-carbon/10 dark:border-crema/10 pt-8 mt-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-fraunces text-3xl text-terracota dark:text-dorado">{s.value}</p>
                <p className="font-inter text-carbon/60 dark:text-crema/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
