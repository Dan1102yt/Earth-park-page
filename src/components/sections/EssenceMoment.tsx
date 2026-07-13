import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { asset } from '../../lib/asset'

export function EssenceMoment() {
  const { t } = useTranslation()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
      <img
        src={asset('/images/hero/hero-fondo-frase-impactante.jpg')}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-bosque/62 dark:bg-bosque-deep/68" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 font-fraunces text-4xl md:text-6xl text-crema text-center max-w-3xl leading-tight px-8 py-6 rounded-2xl bg-bosque/35 dark:bg-bosque-deep/40 backdrop-blur-sm"
      >
        {t('essence.title')}
      </motion.p>
    </section>
  )
}
