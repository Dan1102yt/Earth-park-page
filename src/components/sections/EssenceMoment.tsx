import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function EssenceMoment() {
  const { t } = useTranslation()

  return (
    <section className="h-screen flex items-center justify-center bg-bosque px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="font-fraunces text-4xl md:text-6xl text-crema text-center max-w-3xl leading-tight"
      >
        {t('essence.title')}
      </motion.p>
    </section>
  )
}
