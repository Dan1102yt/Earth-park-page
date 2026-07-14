import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Testimonial {
  id: string
  name: string
  rating: number
  localGuide?: boolean
}

// Reseñas reales de Google Maps — texto en src/i18n/es.json y en.json bajo testimonials.items
export const testimonials: Testimonial[] = [
  { id: 'natalie', name: 'Natalie Bonilla Pesca', rating: 5 },
  { id: 'julio', name: 'Julio César Pinzón', rating: 5, localGuide: true },
  { id: 'oscarv', name: 'Oscar Velásquez', rating: 5, localGuide: true },
  { id: 'juanpablo', name: 'Juan Pablo Rodríguez', rating: 5, localGuide: true },
  { id: 'laura', name: 'Laura Natalia Pinilla Barahona', rating: 5 },
  { id: 'mariaangelica', name: 'Maria Angelica Silva Rojas', rating: 5, localGuide: true },
  { id: 'ed', name: 'ed casher', rating: 5, localGuide: true },
]

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5500)
    return () => clearInterval(id)
  }, [paused, items.length])

  const current = items[index]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative max-w-2xl mx-auto px-10"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white dark:bg-bosque-surface rounded-2xl p-8 shadow-sm text-center min-h-[15rem] flex flex-col items-center justify-center"
        >
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} size={18} className="fill-dorado text-dorado" />
            ))}
          </div>
          <p className="font-inter text-carbon/80 dark:text-crema/80 leading-relaxed mb-5">"{t(`testimonials.items.${current.id}`)}"</p>
          <p className="font-fraunces text-bosque dark:text-crema text-lg">{current.name}</p>
          {current.localGuide && (
            <span className="inline-block mt-2 font-inter text-[11px] font-bold uppercase tracking-wide text-musgo dark:text-dorado bg-musgo/10 dark:bg-dorado/10 px-3 py-1 rounded-full">
              {t('testimonials.localGuide')}
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
        aria-label="Reseña anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-bosque-surface/90 shadow rounded-full p-1.5 text-bosque/60 dark:text-crema/60 hover:text-terracota dark:hover:text-dorado transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % items.length)}
        aria-label="Siguiente reseña"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-bosque-surface/90 shadow rounded-full p-1.5 text-bosque/60 dark:text-crema/60 hover:text-terracota dark:hover:text-dorado transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir a reseña ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-terracota dark:bg-dorado' : 'bg-carbon/20 dark:bg-crema/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
