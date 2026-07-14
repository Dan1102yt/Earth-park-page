import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

export interface PlanMeta {
  slug: string
  price?: string
  images: string[]
  imagePosition?: string
  institutional?: boolean
}

export interface PlanText {
  title: string
  duration?: string
  badge?: string
  description: string
  includes?: string[]
  excludes?: string
}

export type Plan = PlanMeta & PlanText

// PLACEHOLDER: sin foto real — swap por fotografía real de Earth Park
const PLACEHOLDER_HUELLA = 'https://picsum.photos/seed/earthpark-plan-huella/768/615'

const numbered = (slug: string, count: number, ext = 'jpeg') =>
  Array.from({ length: count }, (_, i) => asset(`/images/planes/${slug}/${slug}-${i + 1}.${ext}`))

export const planMetas: PlanMeta[] = [
  {
    slug: 'tesoros-del-valle-de-tenza',
    price: '$870.000',
    images: [
      ...numbered('tesoros-del-valle-de-tenza', 9, 'jpg'),
      ...Array.from({ length: 3 }, (_, i) => asset(`/images/planes/tesoros-del-valle-de-tenza/tesoros-del-valle-de-tenza-${i + 10}.jpeg`)),
    ],
  },
  {
    slug: 'conoce-y-descansa-en-macanal',
    price: '$340.000',
    images: numbered('conoce-y-descansa-en-macanal', 18),
    imagePosition: '50% 22%',
  },
  {
    slug: 'hollywood-boyacense',
    price: '$140.000',
    images: [asset('/images/planes/planes-Conoce-el-Hollywood-Boyacense.jpg')],
    imagePosition: '50% 55%',
  },
  {
    slug: 'vive-earth-park',
    price: '$40.000',
    images: numbered('vive-earth-park', 9),
  },
  {
    slug: 'raices-y-tradicion',
    price: '$100.000',
    images: numbered('raices-y-tradicion', 1),
  },
  {
    slug: 'deja-tu-huella',
    price: '$75.000',
    images: [PLACEHOLDER_HUELLA],
  },
  {
    slug: 'plan-institucional',
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
  const { t } = useTranslation()
  const plans = usePlans()

  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">{t('plansTeaser.heading')}</h2>

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
                  <span className="absolute top-3 right-3 bg-dorado text-carbon font-inter text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-fraunces text-lg text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h3>
                {plan.duration && <p className="font-inter text-carbon/60 dark:text-crema/60 text-xs mb-2">{plan.duration}</p>}
                {plan.price && <p className="font-fraunces text-2xl text-terracota dark:text-dorado">{plan.price}</p>}
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
