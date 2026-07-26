import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { ModalGallery } from '../components/ui/ModalGallery'
import { GlowCard } from '../components/ui/GlowCard'
import { usePlans, type Plan } from '../components/sections/PlansPreview'

const INSTITUTIONAL_WHATSAPP =
  'https://wa.me/573228697438?text=' +
  encodeURIComponent('Hola, quiero cotizar un plan institucional/educativo para mi grupo (universidad, SENA, colegio, etc.).')

export function Plans() {
  const { t } = useTranslation()
  const plans = usePlans()
  const [activePlan, setActivePlan] = useState<Plan | null>(null)

  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title={t('plans.heading')}
        subtitle={t('plans.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <GlowCard key={plan.slug} glowColor={i % 2 === 0 ? 'yellow' : 'neon'} className="h-full">
              <motion.button
                type="button"
                onClick={() => setActivePlan(plan)}
                aria-label={`Ver detalle de ${plan.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 w-full h-full text-left bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={plan.images[0]}
                    alt={plan.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={plan.imagePosition ? { objectPosition: plan.imagePosition } : undefined}
                  />
                  {plan.badge && (
                    <span className="absolute top-3 right-3 bg-dorado text-carbon font-inter text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-fraunces text-xl text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h2>
                  {plan.duration && <p className="font-inter text-carbon/60 dark:text-crema/60 text-xs mb-2">{plan.duration}</p>}
                  {plan.price && (
                    <p className="font-fraunces text-2xl text-terracota dark:text-dorado">
                      {plan.price}<span className="text-sm font-inter text-terracota/70 dark:text-dorado/70">{t('plans.perPerson')}</span>
                    </p>
                  )}
                </div>
              </motion.button>
            </GlowCard>
          ))}
        </div>
      </div>

      <Modal open={activePlan !== null} onClose={() => setActivePlan(null)}>
        {activePlan && (
          <div>
            <ModalGallery images={activePlan.images} alt={activePlan.title} />

            <div className="p-8 md:p-10">
              {activePlan.duration && (
                <span className="inline-block font-fraunces font-semibold text-xl bg-terracota text-crema px-6 py-2 rounded-2xl shadow mb-4">
                  {activePlan.duration}
                </span>
              )}
              <h2 className="font-fraunces text-3xl text-bosque dark:text-crema mb-2">{activePlan.title}</h2>
              {activePlan.price && (
                <p className="font-fraunces text-4xl text-terracota dark:text-dorado mb-4">
                  {activePlan.price}<span className="text-lg font-inter text-terracota/70 dark:text-dorado/70">{t('plans.perPerson')}</span>
                </p>
              )}
              <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed mb-6">{activePlan.description}</p>

              {activePlan.includes && (
                <>
                  <h3 className="font-inter font-bold text-bosque dark:text-crema text-sm uppercase tracking-wide mb-3">{t('plans.includesLabel')}</h3>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                    {activePlan.includes.map((item) => (
                      <li key={item} className="flex gap-2 font-inter text-carbon/80 dark:text-crema/80 text-sm leading-snug">
                        <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activePlan.excludes && (
                <p className="font-inter text-carbon/40 dark:text-crema/40 text-xs italic mb-6">{t('plans.excludesLabel')}: {activePlan.excludes}</p>
              )}

              <a
                href={activePlan.institutional ? INSTITUTIONAL_WHATSAPP : 'https://wa.me/573228697438'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block"
              >
                <Button variant="whatsapp" size="lg">
                  <MessageCircle size={20} />
                  {activePlan.institutional ? t('plans.institutionalButton') : t('plans.reserveButton')}
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
