import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Testimonial {
  name: string
  rating: number
  quote: string
  localGuide?: boolean
}

// Reseñas reales de Google Maps
export const testimonials: Testimonial[] = [
  {
    name: 'Natalie Bonilla Pesca',
    rating: 5,
    quote:
      'Es un parque temático hermoso con una vista espectacular hacia el embalse, sus bellas flores y plantas atraen unas mariposas muy lindas que también adornan el lugar... Debo resaltar que la amabilidad, carisma y gentileza con la que nos recibieron el señor Oscar Martín Roa y su bonita familia propician una estadía acogedora y muy agradable.',
  },
  {
    name: 'Julio César Pinzón',
    rating: 5,
    localGuide: true,
    quote:
      'Un lugar mágico lleno de flores y naturaleza, con un paisaje espectacular en un mirador para relajarte. Sus propietarios don Oscar y Olga e hijos son seres humanos maravillosos que transmiten una energía muy bonita.',
  },
  {
    name: 'Oscar Velásquez',
    rating: 5,
    localGuide: true,
    quote:
      'Excelente experiencia, un lugar maravilloso, los propietarios hacen que la estadía sea aún más especial, sin duda alguna lo recomiendo y espero volver muy pronto.',
  },
  {
    name: 'Juan Pablo Rodríguez',
    rating: 5,
    localGuide: true,
    quote: 'Una muy bella e inolvidable experiencia con la familia y lo mejor son pet friendly.',
  },
  {
    name: 'Laura Natalia Pinilla Barahona',
    rating: 5,
    quote: 'La experiencia es renovadora, reflexiva y permite encontrar un espacio y anfitriones maravillosos.',
  },
  {
    name: 'Maria Angelica Silva Rojas',
    rating: 5,
    localGuide: true,
    quote:
      'Tuvimos la oportunidad de disfrutar de la Semana Santa en familia en el Valle de Tenza... definitivamente lo mejor que nos pudo suceder fue haber contado con la compañía, asesoría y profesionalismo del Señor Oscar Martín Roa.',
  },
  {
    name: 'ed casher',
    rating: 5,
    localGuide: true,
    quote:
      'Excelente lugar para vivir una experiencia única de conexión con la naturaleza y del propósito de ser humano en este planeta. Hermosos paisajes, actividades de esparcimiento familiar.',
  },
]

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
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
          <p className="font-inter text-carbon/80 dark:text-crema/80 leading-relaxed mb-5">"{current.quote}"</p>
          <p className="font-fraunces text-bosque dark:text-crema text-lg">{current.name}</p>
          {current.localGuide && (
            <span className="inline-block mt-2 font-inter text-[11px] font-bold uppercase tracking-wide text-musgo dark:text-dorado bg-musgo/10 dark:bg-dorado/10 px-3 py-1 rounded-full">
              Local Guide
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
