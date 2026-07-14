import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { ModalGallery } from '../components/ui/ModalGallery'
import { usePlans, type Plan } from '../components/sections/PlansPreview'

const INSTITUTIONAL_WHATSAPP =
  'https://wa.me/573228697438?text=' +
  encodeURIComponent('Hola, quiero cotizar un plan institucional/educativo para mi grupo (universidad, SENA, colegio, etc.).')

export function Plans() {
  const { t } = useTranslation()
  const plans = usePlans()
  const [galleryPlan, setGalleryPlan] = useState<Plan | null>(null)

  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title={t('plans.heading')}
        subtitle={t('plans.subtitle')}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
            className="bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setGalleryPlan(plan)}
              aria-label={`Ver fotos de ${plan.title}`}
              className="relative w-full h-80 sm:h-96 lg:h-[28rem] overflow-hidden cursor-pointer"
            >
              <img
                src={plan.images[0]}
                alt={plan.title}
                loading="lazy"
                className="w-full h-full object-cover"
                style={plan.imagePosition ? { objectPosition: plan.imagePosition } : undefined}
              />
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                  {plan.badge}
                </span>
              )}
            </button>

            <div className="p-8 md:p-10">
              {plan.duration && (
                <div className="flex justify-center -mt-16 mb-6 relative z-10">
                  <span className="font-fraunces font-semibold text-2xl md:text-3xl bg-terracota text-crema px-8 py-3 rounded-2xl shadow-xl">
                    {plan.duration}
                  </span>
                </div>
              )}
              <h2 className="font-fraunces text-3xl text-bosque dark:text-crema mb-2">{plan.title}</h2>
              {plan.price && <p className="font-fraunces text-4xl text-terracota dark:text-dorado mb-4">{plan.price}</p>}
              <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed mb-6">{plan.description}</p>

              {plan.includes && (
                <>
                  <h3 className="font-inter font-bold text-bosque dark:text-crema text-sm uppercase tracking-wide mb-3">{t('plans.includesLabel')}</h3>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2 font-inter text-carbon/80 dark:text-crema/80 text-sm leading-snug">
                        <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {plan.excludes && (
                <p className="font-inter text-carbon/40 dark:text-crema/40 text-xs italic mb-6">{t('plans.excludesLabel')}: {plan.excludes}</p>
              )}

              <a
                href={plan.institutional ? INSTITUTIONAL_WHATSAPP : 'https://wa.me/573228697438'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block"
              >
                <Button variant="whatsapp" size="lg">
                  <MessageCircle size={20} />
                  {plan.institutional ? t('plans.institutionalButton') : t('plans.reserveButton')}
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={galleryPlan !== null} onClose={() => setGalleryPlan(null)}>
        {galleryPlan && <ModalGallery images={galleryPlan.images} alt={galleryPlan.title} />}
      </Modal>
    </div>
  )
}
