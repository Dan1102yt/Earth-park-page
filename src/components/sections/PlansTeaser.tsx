import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

const plans = [
  {
    slug: 'tesoros-del-valle-de-tenza',
    price: '$870.000',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/macanal-A0xjlLKanJsZVzg7.jpeg',
  },
  {
    slug: 'conoce-y-descansa-en-macanal',
    price: '$340.000',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=584,fit=crop/Yg2ya4gl5Rtg3nyW/3-m5Kn28Lb7pCzlQ2V.jpeg',
  },
  {
    slug: 'hollywood-boyacense',
    price: '$140.000',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/whatsapp-image-2026-04-17-at-12.04.48-pm-NgGfq4uQdNwlxl0H.jpeg',
  },
]

export function PlansTeaser() {
  const { t } = useTranslation()
  const items = t('plansTeaser.items', { returnObjects: true }) as Record<string, { title: string; duration: string; badge: string }>

  return (
    <section className="py-24 bg-crema/80 dark:bg-bosque-deep/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">{t('plansTeaser.heading')}</h2>

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
              <div className="relative h-48 overflow-hidden">
                <img src={plan.image} alt={items[plan.slug].title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-dorado text-carbon font-inter text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  {items[plan.slug].badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1 leading-tight">{items[plan.slug].title}</h3>
                <p className="font-inter text-carbon/60 dark:text-crema/60 text-sm mb-3">{items[plan.slug].duration}</p>
                <p className="font-fraunces text-2xl text-terracota dark:text-dorado">{plan.price}</p>
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
