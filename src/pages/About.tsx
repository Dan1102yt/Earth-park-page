import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { asset } from '../lib/asset'

const QUOTE_IMAGE = asset('/images/nosotros/fondo-campo-papa.jpg')
const FAMILY_IMAGE = asset('/images/hero/hero-familia.jpg')

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const

export function About() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Bloque 0 — Apertura institucional: qué es Earth Park */}
      <section className="bg-white/80 dark:bg-bosque-surface/80 pt-36 pb-16 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <p className="font-inter text-carbon dark:text-crema text-lg md:text-xl leading-relaxed text-center">
            {t('about.parkStatement')}
          </p>
        </motion.div>
      </section>
      {/* Bloque 0.5 — Nuestra Historia: de una tierra agotada a un refugio para la vida */}
      <section className="bg-white/80 dark:bg-bosque-surface/80 py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-10 text-center">
            {t('about.historia.heading')}
          </h2>

          <div className="space-y-5 font-inter text-carbon dark:text-crema text-lg md:text-xl leading-relaxed">
            <p>{t('about.historia.p1')}</p>
            <p>{t('about.historia.p2')}</p>
          </div>

          <blockquote className="my-10 border-l-4 border-dorado pl-6 md:pl-8 font-fraunces italic text-2xl md:text-3xl text-bosque dark:text-crema leading-snug">
            {t('about.historia.quote1')}
          </blockquote>

          <div className="space-y-5 font-inter text-carbon dark:text-crema text-lg md:text-xl leading-relaxed">
            <p>{t('about.historia.p3')}</p>
            <p>{t('about.historia.p4')}</p>
            <p>{t('about.historia.p5')}</p>
            <p>{t('about.historia.p6')}</p>
            <p>{t('about.historia.p7')}</p>
            <p>{t('about.historia.quote2Lead')}</p>
          </div>

          <blockquote className="my-10 border-l-4 border-dorado pl-6 md:pl-8 font-fraunces italic text-2xl md:text-3xl text-bosque dark:text-crema leading-snug">
            {t('about.historia.quote2')}
          </blockquote>

          <div className="space-y-5 font-inter text-carbon dark:text-crema text-lg md:text-xl leading-relaxed">
            <p>{t('about.historia.p8')}</p>
          </div>

          <p className="mt-10 font-fraunces text-2xl md:text-3xl text-center text-bosque dark:text-crema leading-relaxed">
            {t('about.historia.closing')}
          </p>

          <div className="w-16 h-[3px] bg-dorado mt-10 mx-auto" />
        </motion.div>
      </section>

      {/* Bloque 1 — Apertura humanizada, tratamiento editorial */}
      <section className="bg-bosque dark:bg-bosque-deep pt-16 pb-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="relative max-w-3xl mx-auto"
        >
          <span aria-hidden className="absolute -top-14 -left-2 md:-left-10 font-fraunces text-8xl md:text-9xl text-dorado/30 leading-none select-none">
            "
          </span>
          <h1 className="relative font-fraunces text-3xl md:text-5xl text-crema leading-relaxed md:leading-relaxed text-justify">
            {t('about.intro')}
          </h1>
          <div className="w-16 h-[3px] bg-dorado mt-8 mx-auto" />
        </motion.div>
      </section>

      {/* Bloque 3 — ¿Quiénes somos? */}
      <section className="bg-white/80 dark:bg-bosque-surface/80 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-6">{t('about.quienesHeading')}</h2>
            <div className="space-y-5 font-inter text-carbon dark:text-crema text-xl leading-relaxed">
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

      {/* Bloque 4 — Cita destacada + CTA */}
      <section className="relative py-28 px-4 overflow-hidden text-center">
        <img src={QUOTE_IMAGE} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bosque/90 dark:bg-bosque-deep/92" />
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="relative z-10 font-fraunces text-3xl md:text-5xl text-center text-crema max-w-4xl mx-auto leading-snug mb-10"
        >
          {t('about.quotePre')} <span className="text-dorado">{t('about.quoteHighlight')}</span> {t('about.quotePost')}
        </motion.blockquote>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="relative z-10"
        >
          <Link to="/planes-turisticos">
            <Button variant="terracota" size="lg">{t('about.closingCta')}</Button>
          </Link>
        </motion.div>
      </section>

      {/* Bloque 5 — Invitación a ser parte del sueño */}
      <section className="bg-white/80 dark:bg-bosque-surface/80 py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="font-fraunces text-2xl md:text-3xl text-carbon dark:text-crema leading-relaxed text-justify">
            {t('about.invitation')}
          </p>
          <div className="w-16 h-[3px] bg-dorado mt-8 mx-auto" />
        </motion.div>
      </section>
    </div>
  )
}
