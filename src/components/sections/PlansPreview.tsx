import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'
import type { IncludeSection } from '../../config/plans'

export interface PlanMeta {
  slug: string
  price?: number
  images: string[]
  imagePosition?: string
  institutional?: boolean
}

export interface PlanText {
  title: string
  duration?: string
  badge?: string
  description: string
  includes?: Partial<Record<IncludeSection, string[]>>
  /** Ítem de "Incluye" que se resalta (ej. Souvenir) */
  highlight?: string
  excludes?: string
}

export type Plan = PlanMeta & PlanText

/**
 * Formatea un precio en COP según el idioma.
 * es → "$60.000"   ·   en → "COP $60,000" (para que no se lea como dólares)
 */
export function formatPrice(value: number, lang: string): string {
  const isEn = lang.startsWith('en')
  const digits = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, isEn ? ',' : '.')
  return isEn ? `COP $${digits}` : `$${digits}`
}

const numbered = (slug: string, count: number, ext = 'webp') =>
  Array.from({ length: count }, (_, i) => asset(`/images/planes/${slug}/${slug}-${i + 1}.${ext}`))

// Valores por persona en COP — tarifa vigente desde el 22 de noviembre de 2026
// (Hollywood Boyacense actualizado a $233.000).
// (Fecha solo como referencia interna; no se muestra en la web.)
export const planMetas: PlanMeta[] = [
  {
    slug: 'tesoros-del-valle-de-tenza',
    price: 954000,
    images: numbered('tesoros-del-valle-de-tenza', 12),
  },
  {
    slug: 'conoce-y-descansa-en-macanal',
    price: 543000,
    images: numbered('conoce-y-descansa-en-macanal', 18),
    imagePosition: '50% 22%',
  },
  {
    slug: 'hollywood-boyacense',
    price: 233000,
    images: [asset('/images/planes/planes-Conoce-el-Hollywood-Boyacense.jpg')],
    imagePosition: '50% 55%',
  },
  {
    slug: 'vive-earth-park',
    price: 60000,
    images: numbered('vive-earth-park', 9),
  },
  {
    slug: 'plan-empresas-instituciones',
    images: numbered('instituciones', 6),
    institutional: true,
  },
]

export function usePlans(): Plan[] {
  const { t } = useTranslation()
  const texts = t('plans.items', { returnObjects: true }) as Record<string, PlanText>
  return planMetas.map((meta) => ({ ...meta, ...texts[meta.slug] }))
}

export function PlansPreview() {
  const { t, i18n } = useTranslation()
  const plans = usePlans()

  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">{t('plansTeaser.heading')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={plan.images[0]} alt={plan.title} loading="lazy" className="w-full h-full object-cover" />
                {plan.badge && (
                  <span className="absolute top-3 right-3 bg-dorado text-carbon font-heading text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h3>
                {plan.duration && <p className="font-body text-carbon/60 dark:text-crema/60 text-xs mb-2">{plan.duration}</p>}
                {plan.price && <p className="font-heading text-2xl text-terracota dark:text-dorado">{formatPrice(plan.price, i18n.language)}</p>}
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
