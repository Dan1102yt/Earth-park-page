import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { ModalGallery } from '../components/ui/ModalGallery'
import { GlowCard } from '../components/ui/GlowCard'
import { usePlans, formatPrice, type Plan } from '../components/sections/PlansPreview'
import { PlanCover } from '../components/ui/PlanCover'
import { galleryPositions, planMobileFit, planSmallSrc, planSrcSet, PLAN_CARD_SIZES, PLAN_MODAL_SIZES } from '../config/planImages'
import { INCLUDE_SECTIONS } from '../config/plans'
import { PlansJsonLd } from '../components/seo/PlansJsonLd'

const WHATSAPP_URL = 'https://wa.me/573228697438'

export function Plans() {
  const { t, i18n } = useTranslation()
  const plans = usePlans()
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const institutionalWhatsapp = `${WHATSAPP_URL}?text=${encodeURIComponent(t('plans.institutionalWhatsapp'))}`

  return (
    <div className="min-h-screen">
      <PlansJsonLd plans={plans} />
      <PageHeaderBand
        title={t('plans.heading')}
        subtitle={t('plans.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-body text-body text-carbon dark:text-crema text-center mb-10">
          {t('plans.pricingNote')}
        </p>
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
                <PlanCover plan={plan} alt={plan.title} sizes={PLAN_CARD_SIZES} eager={i === 0}>
                  {plan.badge && (
                    <span className="absolute top-3 right-3 bg-dorado text-carbon font-heading text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </PlanCover>
                <div className="p-6">
                  <h2 className="font-heading text-xl text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h2>
                  {plan.duration && <p className="font-body text-carbon/60 dark:text-crema/60 text-xs mb-2">{plan.duration}</p>}
                  {plan.price && (
                    <p className="font-heading text-2xl text-terracota dark:text-dorado">
                      {formatPrice(plan.price, i18n.language)}<span className="text-sm font-heading text-terracota/70 dark:text-dorado/70">{t('plans.perPerson')}</span>
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
            <ModalGallery
              key={activePlan.slug}
              responsive
              images={activePlan.images}
              alt={activePlan.title}
              objectPositions={galleryPositions(activePlan, 'desktop')}
              objectPositionsMobile={galleryPositions(activePlan, 'mobile')}
              srcSets={activePlan.images.map(planSrcSet)}
              sizes={PLAN_MODAL_SIZES}
              mobileFits={activePlan.images.map(planMobileFit)}
              blurSrcs={activePlan.images.map(planSmallSrc)}
            />

            <div className="p-8 md:p-10">
              {activePlan.duration && (
                <span className="inline-block font-heading font-semibold text-xl bg-terracota text-crema px-6 py-2 rounded-2xl shadow mb-4">
                  {activePlan.duration}
                </span>
              )}
              <h2 className="font-heading text-3xl text-bosque dark:text-crema mb-2">{activePlan.title}</h2>
              {activePlan.price && (
                <>
                  <p className="font-heading text-4xl text-terracota dark:text-dorado mb-1">
                    {formatPrice(activePlan.price, i18n.language)}<span className="text-lg font-heading text-terracota/70 dark:text-dorado/70">{t('plans.perPerson')}</span>
                  </p>
                  <p className="font-body text-sm text-carbon/60 dark:text-crema/60 mb-4">{t('plans.kidsFree')}</p>
                </>
              )}
              <p className="font-body text-carbon dark:text-crema text-body mb-6">{activePlan.description}</p>

              {activePlan.includes && (
                <>
                  <h3 className="font-heading font-bold text-bosque dark:text-crema text-sm uppercase tracking-wide mb-4">{t('plans.includesLabel')}</h3>
                  {/* Flujo por apartados, siempre en el mismo orden (INCLUDE_SECTIONS) */}
                  <div className="space-y-5 mb-5">
                    {INCLUDE_SECTIONS.filter((key) => activePlan.includes?.[key]?.length).map((key) => (
                      <div key={key}>
                        <h4 className="font-heading font-semibold text-terracota dark:text-dorado text-base mb-2">
                          {t(`plans.includeSections.${key}`)}
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                          {activePlan.includes![key]!.map((item) =>
                            item === activePlan.highlight ? (
                              <li key={item} className="flex">
                                <span className="inline-flex items-center gap-2 bg-dorado/90 text-carbon font-heading font-bold text-sm px-3 py-1 rounded-full">
                                  <Check size={16} className="shrink-0" />
                                  {item}
                                </span>
                              </li>
                            ) : (
                              <li key={item} className="flex gap-2 font-body text-carbon dark:text-crema text-sm leading-snug">
                                <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activePlan.excludes && (
                <p className="font-body text-carbon/40 dark:text-crema/40 text-xs italic mb-6">{t('plans.excludesLabel')}: {activePlan.excludes}</p>
              )}

              <a
                href={activePlan.institutional ? institutionalWhatsapp : WHATSAPP_URL}
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
