import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface TravelTime {
  city: string
  distance: string
  time: string
}

// Distancias/tiempos reales desde ciudades principales hasta Earth Park (Macanal, Boyacá)
export const travelTimes: TravelTime[] = [
  { city: 'Bogotá', distance: '130 km', time: '2h 54min' },
  { city: 'Tunja', distance: '138 km', time: '3h 10min' },
  { city: 'Villanueva', distance: '99 km', time: '2h 42min' },
  { city: 'Yopal', distance: '199 km', time: '3h 56min' },
]

export function TravelTimesCarousel() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const current = travelTimes[index]

  return (
    <div className="relative max-w-md mx-auto px-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white dark:bg-bosque-surface rounded-2xl p-8 shadow-sm text-center min-h-[10rem] flex flex-col items-center justify-center"
        >
          <MapPin size={22} className="mx-auto mb-3 text-terracota dark:text-dorado" />
          <p className="font-fraunces text-2xl text-bosque dark:text-crema mb-2">{current.city}</p>
          <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm">{current.distance} · {current.time}</p>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + travelTimes.length) % travelTimes.length)}
        aria-label={t('contact.prevCity')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-bosque-surface/90 shadow rounded-full p-1.5 text-bosque/60 dark:text-crema/60 hover:text-terracota dark:hover:text-dorado transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % travelTimes.length)}
        aria-label={t('contact.nextCity')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-bosque-surface/90 shadow rounded-full p-1.5 text-bosque/60 dark:text-crema/60 hover:text-terracota dark:hover:text-dorado transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {travelTimes.map((c, i) => (
          <button
            key={c.city}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={c.city}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-terracota dark:bg-dorado' : 'bg-carbon/20 dark:bg-crema/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
