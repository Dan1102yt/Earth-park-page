import { motion } from 'framer-motion'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'

const stations = [
  { emoji: '🛕', title: 'Pirámide de los Teguas', desc: 'Un tributo a la sabiduría ancestral indígena', image: '/images/estaciones/estacion-piramide.jpeg' },
  { emoji: '🦋', title: 'Mariposa 89 Columpio', desc: 'Símbolo de libertad y el infinito de la vida', image: '/images/estaciones/estacion-mariposa.jpeg' },
  { emoji: '🔥', title: 'Los Cuatro Elementos', desc: 'Agua, Tierra, Aire y Fuego: experiencia sensorial', image: '/images/estaciones/estacion-fuego.jpeg' },
  { emoji: '🚀', title: 'Rover Lunar', desc: 'Viaja al futuro sin salir de la Tierra', image: '/images/estaciones/estacion-rover.jpeg' },
  { emoji: '🌕', title: 'Luna 360°', desc: 'Estructura inmersiva que gira contigo', image: '/images/estaciones/estacion-luna360.jpeg' },
  // PLACEHOLDER: sin foto real todavía — swap por fotografía real de Earth Park
  { emoji: '🌿', title: 'Vivero & Café', desc: 'Gastronomía local al aire libre, rodeada de plantas, cactus y suculentas', image: 'https://picsum.photos/seed/earthpark-station-vivero/600/450' },
  { emoji: '🎨', title: 'Galería de Arte', desc: 'En Earth Park los residuos los transformamos en arte.', image: '/images/estaciones/estaciones-galeria-de-arte.webp' },
]

// Sin modal: cada estación es una sola frase de descripción, no amerita una vista de detalle aparte
export function StationsPage() {
  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title="Las 7 Estaciones"
        subtitle="Cada rincón de Earth Park cuenta una historia única"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-2xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-11 h-11 flex items-center justify-center">
                  {s.emoji}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1">{s.title}</h3>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
