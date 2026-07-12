import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '../ui/SectionTitle'

const stations = [
  { emoji: '🛕', title: 'Pirámide de los Teguas', desc: 'Un tributo a la sabiduría ancestral indígena' },
  { emoji: '🦋', title: 'Mariposa 89 Columpio', desc: 'Símbolo de libertad y el infinito de la vida' },
  { emoji: '🔥', title: 'Los Cuatro Elementos', desc: 'Agua, Tierra, Aire y Fuego: experiencia sensorial' },
  { emoji: '🚀', title: 'Rover Lunar', desc: 'Viaja al futuro sin salir de la Tierra' },
  { emoji: '🌕', title: 'Luna 360°', desc: 'Estructura inmersiva que gira contigo' },
  { emoji: '🌿', title: 'Vivero & Café', desc: 'Gastronomía local al aire libre entre árboles' },
  { emoji: '🎨', title: 'Galería de Arte', desc: 'Objetos reciclados transformados en arte local' },
]

export function Stations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Las 7 Estaciones"
          subtitle="Cada rincón de Earth Park cuenta una historia única"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station, i) => {
            const isLast = i === stations.length - 1
            return (
              <motion.div
                key={station.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                className={isLast ? 'lg:col-start-2' : ''}
              >
                <div className="relative p-6 h-full bg-dark-soft rounded-2xl border border-transparent transition-all duration-300 hover:border-forest/50 hover:bg-forest/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/20">
                  {/* Order number */}
                  <span className="absolute top-4 right-4 text-xs text-gold/50 font-body font-bold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="text-5xl mb-4">{station.emoji}</div>
                  <h3 className="font-display text-xl text-cream mb-2">{station.title}</h3>
                  <p className="font-body text-cream/60 text-sm leading-relaxed">{station.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
