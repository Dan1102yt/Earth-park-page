import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Modal } from '../components/ui/Modal'
import { GlowCard } from '../components/ui/GlowCard'
import { asset } from '../lib/asset'

interface DishMeta {
  id: string
  emoji: string
  featured?: boolean
  image: string
}

interface DishText {
  name: string
  description: string
  side?: string
}

type Dish = DishMeta & DishText

// PLACEHOLDER: sin fotos reales de los platos aún — swap por fotografía real de Earth Park
const breakfastMetas: DishMeta[] = [
  { id: 'caldo', emoji: '🍲', featured: true, image: 'https://picsum.photos/seed/earthpark-food-caldo/700/560' },
  { id: 'arepa', emoji: '🫓', image: 'https://picsum.photos/seed/earthpark-food-arepa/700/560' },
  { id: 'huevos', emoji: '🍳', image: 'https://picsum.photos/seed/earthpark-food-huevos/700/560' },
]

const dinnerMetas: DishMeta[] = [
  { id: 'hamburguesa', emoji: '🍔', featured: true, image: asset('/images/gastronomia/gastronomia-hamburguesa-earth-park.jpg') },
  { id: 'pechuga', emoji: '🍗', image: 'https://picsum.photos/seed/earthpark-food-pechuga/700/560' },
  { id: 'cenaValle', emoji: '🍽️', image: 'https://picsum.photos/seed/earthpark-food-valle/700/560' },
]

// Galería extensible: agregar más fotos aquí a medida que estén disponibles
const otherFlavorMetas = [
  { id: 'helados', image: asset('/images/gastronomia/gastronomia-otros-helados.jpeg') },
]

function DishModalContent({ dish, featuredBadge }: { dish: Dish; featuredBadge: string }) {
  return (
    <div>
      <div className="relative h-64 sm:h-80">
        <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
        {dish.featured && (
          <span className="absolute top-4 left-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
            {featuredBadge}
          </span>
        )}
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{dish.emoji}</span>
          <h2 className="font-fraunces text-3xl text-bosque dark:text-crema">{dish.name}</h2>
        </div>
        <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed">{dish.description}</p>
        {dish.side && (
          <p className="font-inter text-terracota dark:text-dorado text-sm italic leading-relaxed mt-4">
            {dish.side}
          </p>
        )}
      </div>
    </div>
  )
}

function DishCard({ dish, i, dark, onSelect, featuredBadge }: { dish: Dish; i: number; dark?: boolean; onSelect: (dish: Dish) => void; featuredBadge: string }) {
  return (
    <GlowCard glowColor={i % 2 === 0 ? 'yellow' : 'neon'} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(dish)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(dish) } }}
        className={`relative z-10 h-full cursor-pointer ${
          dark
            ? 'bg-crema/5 border border-crema/10 backdrop-blur-sm rounded-3xl overflow-hidden'
            : 'bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
        }`}
      >
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 text-3xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-12 h-12 flex items-center justify-center">
            {dish.emoji}
          </span>
          {dish.featured && (
            <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
              {featuredBadge}
            </span>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h3 className={`font-fraunces text-2xl ${dark ? 'text-crema' : 'text-bosque dark:text-crema'}`}>
            {dish.name}
          </h3>
        </div>
      </motion.div>
    </GlowCard>
  )
}

export function Gastronomy() {
  const { t } = useTranslation()
  const dishTexts = t('gastronomy.dishes', { returnObjects: true }) as Record<string, DishText>
  const flavorTexts = t('gastronomy.otherFlavors', { returnObjects: true }) as Record<string, { title: string }>
  const breakfast: Dish[] = breakfastMetas.map((m) => ({ ...m, ...dishTexts[m.id] }))
  const dinner: Dish[] = dinnerMetas.map((m) => ({ ...m, ...dishTexts[m.id] }))
  const otherFlavors = otherFlavorMetas.map((m) => ({ ...m, title: flavorTexts[m.id].title }))
  const featuredBadge = t('gastronomy.featuredBadge')
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  return (
    <div className="min-h-screen">
      <PageHeaderBand
        title={t('gastronomy.heading')}
        subtitle={t('gastronomy.subtitle')}
      />

      {/* Desayuno — tono cálido, amanecer */}
      <section className="bg-gradient-to-b from-dorado/15 via-crema to-crema dark:from-terracota/10 dark:via-bosque-deep dark:to-bosque-deep py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-2">{t('gastronomy.breakfastHeading')}</h2>
            <p className="font-inter text-terracota dark:text-dorado text-sm uppercase tracking-wide">
              {t('gastronomy.breakfastHours')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {breakfast.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} i={i} onSelect={setSelectedDish} featuredBadge={featuredBadge} />
            ))}
          </div>
        </div>
      </section>

      {/* Cena — tono profundo, atardecer/noche */}
      <section className="bg-bosque dark:bg-bosque-deep py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-carbon/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-crema mb-2">{t('gastronomy.dinnerHeading')}</h2>
            <p className="font-inter text-dorado text-sm uppercase tracking-wide">{t('gastronomy.dinnerHours')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dinner.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} i={i} dark onSelect={setSelectedDish} featuredBadge={featuredBadge} />
            ))}
          </div>
        </div>
      </section>

      {/* Otros sabores de Earth Park */}
      <section className="bg-crema dark:bg-bosque-deep py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12"
          >
            {t('gastronomy.otherFlavorsHeading')}
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {otherFlavors.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/80 to-transparent px-3 pt-8 pb-3">
                  <p className="font-inter text-crema text-sm font-semibold leading-tight">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Modal open={selectedDish !== null} onClose={() => setSelectedDish(null)}>
        {selectedDish && <DishModalContent dish={selectedDish} featuredBadge={featuredBadge} />}
      </Modal>
    </div>
  )
}
