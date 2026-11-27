import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { planMetas, formatPrice } from './PlansPreview'
import { PlanCover } from '../ui/PlanCover'
import { PLAN_TEASER_SIZES } from '../../config/planImages'

// Precio y portada se toman de planMetas (fuente única) para no duplicarlos aquí.
const TEASER_SLUGS = ['tesoros-del-valle-de-tenza', 'conoce-y-descansa-en-macanal', 'hollywood-boyacense']
const plans = TEASER_SLUGS.map((slug) => planMetas.find((p) => p.slug === slug)!)

export function PlansTeaser() {
  const { t, i18n } = useTranslation()
  const items = t('plansTeaser.items', { returnObjects: true }) as Record<string, { title: string; duration: string; badge: string }>

  return (
    <section className="py-24 bg-crema/80 dark:bg-bosque-deep/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">{t('plansTeaser.heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <PlanCover plan={plan} alt={items[plan.slug].title} sizes={PLAN_TEASER_SIZES}>
                <span className="absolute top-3 right-3 bg-dorado text-carbon font-heading text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  {items[plan.slug].badge}
                </span>
              </PlanCover>
              <div className="p-6">
                <h3 className="font-heading text-xl text-bosque dark:text-crema mb-1 leading-tight">{items[plan.slug].title}</h3>
                <p className="font-body text-carbon/60 dark:text-crema/60 text-sm mb-3">{items[plan.slug].duration}</p>
                <p className="font-heading text-2xl text-terracota dark:text-dorado">
                  {formatPrice(plan.price ?? 0, i18n.language)}<span className="text-sm font-heading text-terracota/70 dark:text-dorado/70">{t('plans.perPerson')}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/planes-turisticos">
            <Button variant="terracota" size="lg">{t('plansTeaser.cta')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
