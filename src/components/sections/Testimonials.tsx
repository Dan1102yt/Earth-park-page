import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '../ui/SectionTitle'

const testimonials = [
  {
    name: 'Juan Pablo Rodríguez',
    initial: 'J',
    text: 'Una muy bella e inolvidable experiencia con la familia y lo mejor son pet friendly',
    stars: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Lo que dicen nuestros visitantes"
          subtitle="Experiencias reales de quienes nos han visitado"
        />

        <div className="flex justify-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-dark rounded-3xl p-12 max-w-2xl w-full relative overflow-hidden"
            >
              {/* Decorative quote — top left */}
              <div className="font-display text-8xl text-gold/30 leading-none absolute top-4 left-6 select-none pointer-events-none">
                "
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-gold text-xl">★</span>
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-body text-cream/90 text-xl leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-cream font-display text-lg shrink-0 shadow-lg shadow-forest/30">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-body font-bold text-cream">{t.name}</p>
                    <p className="font-body text-cream/50 text-xs mt-0.5">Visitante verificado</p>
                  </div>
                </div>
              </div>

              {/* Decorative quote — bottom right */}
              <div className="font-display text-8xl text-gold/30 leading-none absolute bottom-0 right-6 select-none pointer-events-none rotate-180">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
