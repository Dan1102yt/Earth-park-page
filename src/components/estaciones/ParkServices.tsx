import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CigaretteOff, PawPrint, ShoppingBag, SquareParking, Toilet, UtensilsCrossed, Wifi, type LucideIcon } from 'lucide-react'

// Servicios del parque: solo etiquetas cortas, sin condiciones (horarios, costos, etc.)
const SERVICES: { key: string; icon: LucideIcon }[] = [
  { key: 'parking', icon: SquareParking },
  { key: 'pets', icon: PawPrint },
  { key: 'restaurant', icon: UtensilsCrossed },
  { key: 'restrooms', icon: Toilet },
  { key: 'shop', icon: ShoppingBag },
  { key: 'smokeFree', icon: CigaretteOff },
  { key: 'wifi', icon: Wifi },
]

export function ParkServices() {
  const { t } = useTranslation()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="font-heading text-3xl md:text-4xl text-bosque dark:text-crema text-center mb-10">{t('services.heading')}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {SERVICES.map(({ key, icon: Icon }, i) => (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-start gap-3 text-center rounded-2xl border border-bosque/10 dark:border-crema/10 bg-white dark:bg-bosque-surface shadow-sm px-3 py-5"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-musgo/15 dark:bg-dorado/15">
              <Icon size={24} strokeWidth={1.75} className="text-bosque dark:text-dorado" aria-hidden />
            </span>
            <span className="font-heading font-medium text-base leading-snug text-carbon dark:text-crema">{t(`services.items.${key}`)}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
