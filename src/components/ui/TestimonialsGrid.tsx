import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, StarHalf } from 'lucide-react'

export interface Testimonial {
  id: string
  name: string
  rating: number
  category: 'servicio' | 'paisajes' | 'familiar'
  localGuide?: boolean
}

// Reseñas reales de Google Maps — texto en src/i18n/es.json y en.json bajo testimonials.items
export const testimonials: Testimonial[] = [
  { id: 'natalie', name: 'Natalie Bonilla Pesca', rating: 5, category: 'familiar' },
  { id: 'julio', name: 'Julio César Pinzón', rating: 5, category: 'paisajes', localGuide: true },
  { id: 'oscarv', name: 'Oscar Velásquez', rating: 5, category: 'servicio', localGuide: true },
  { id: 'juanpablo', name: 'Juan Pablo Rodríguez', rating: 5, category: 'familiar', localGuide: true },
  { id: 'laura', name: 'Laura Natalia Pinilla Barahona', rating: 5, category: 'servicio' },
  { id: 'mariaangelica', name: 'Maria Angelica Silva Rojas', rating: 5, category: 'familiar', localGuide: true },
  { id: 'ed', name: 'ed casher', rating: 5, category: 'paisajes', localGuide: true },
]

const categoryOrder = ['all', 'servicio', 'paisajes', 'familiar'] as const
type Category = (typeof categoryOrder)[number]

function GoogleIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.348 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}

export function GoogleRatingBadge({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <div className={`inline-flex items-center gap-3 bg-white dark:bg-bosque-surface rounded-2xl px-6 py-4 shadow-sm ${className}`}>
      <GoogleIcon size={32} className="shrink-0" />
      <div>
        <p className="font-inter font-extrabold text-bosque dark:text-crema text-sm uppercase tracking-wide">
          {t('testimonials.trustBadge.title')}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} size={14} className="fill-dorado text-dorado" />
            ))}
            <StarHalf size={14} className="fill-dorado text-dorado" />
          </div>
          <span className="font-inter text-carbon/60 dark:text-crema/60 text-xs">{t('testimonials.trustBadge.basedOn')}</span>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsGrid({ items }: { items: Testimonial[] }) {
  const { t } = useTranslation()
  const [category, setCategory] = useState<Category>('all')

  const filtered = category === 'all' ? items : items.filter((item) => item.category === category)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryOrder.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`font-inter text-sm px-4 py-2 rounded-full transition-colors ${
              category === cat
                ? 'bg-terracota dark:bg-dorado text-crema dark:text-carbon'
                : 'bg-carbon/5 dark:bg-crema/10 text-carbon/70 dark:text-crema/70 hover:bg-carbon/10 dark:hover:bg-crema/20'
            }`}
          >
            {t(`testimonials.categories.${cat}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            className="bg-white dark:bg-bosque-surface rounded-2xl p-6 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-musgo text-crema font-fraunces text-lg flex items-center justify-center shrink-0">
                {item.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-inter font-semibold text-bosque dark:text-crema text-sm truncate">{item.name}</p>
                {item.localGuide && (
                  <span className="inline-block font-inter text-[10px] font-bold uppercase tracking-wide text-musgo dark:text-dorado">
                    {t('testimonials.localGuide')}
                  </span>
                )}
              </div>
              <GoogleIcon size={18} className="shrink-0" />
            </div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: item.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-dorado text-dorado" />
              ))}
            </div>
            <p className="font-inter text-carbon/80 dark:text-crema/80 text-sm leading-relaxed">
              "{t(`testimonials.items.${item.id}`)}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
