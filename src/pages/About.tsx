import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { asset } from '../lib/asset'

const QUOTE_IMAGE = asset('/images/nosotros/fondo-campo-papa.jpg')
const FAMILY_IMAGE = asset('/images/nosotros/nosotros-quienes-spmps.jpg')

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const

export function About() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Bloque 1 — Apertura humanizada */}
      <section className="bg-bosque dark:bg-bosque-deep pt-36 pb-20 px-4">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="font-fraunces text-3xl md:text-5xl text-crema leading-snug text-center max-w-3xl mx-auto"
        >
          {t('about.intro')}
        </motion.h1>
      </section>

      {/* Bloque 3 — ¿Quiénes somos? */}
      <section className="bg-white dark:bg-bosque-surface py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-6">{t('about.quienesHeading')}</h2>
            <div className="space-y-5 font-inter text-carbon/80 dark:text-crema/80 text-lg leading-relaxed">
              <p>{t('about.quienesP1')}</p>
              <p>{t('about.quienesP2')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl"
          >
            <img src={FAMILY_IMAGE} alt="La familia detrás de Earth Park" loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Bloque 4 — Cita destacada */}
      <section className="relative py-28 px-4 overflow-hidden">
        <img src={QUOTE_IMAGE} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bosque/90 dark:bg-bosque-deep/92" />
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="relative z-10 font-fraunces text-3xl md:text-5xl text-center text-crema max-w-4xl mx-auto leading-snug"
        >
          {t('about.quotePre')} <span className="text-dorado">{t('about.quoteHighlight')}</span> {t('about.quotePost')}
        </motion.blockquote>
      </section>

      {/* Bloque 5 — Cierre emocional + CTA */}
      <section className="bg-crema dark:bg-bosque-deep py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
        >
          <p className="font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema mb-10">
            {t('about.closing')}
          </p>
          <Link to="/planes-turisticos">
            <Button variant="terracota" size="lg">{t('about.closingCta')}</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
