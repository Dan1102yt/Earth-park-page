import { motion } from 'framer-motion'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'

// Datos reales tomados de components/sections/Stations.tsx
// PLACEHOLDER: no existen fotos reales de las estaciones aún — swap por fotografía real de Earth Park
const stations = [
  { emoji: '🛕', title: 'Pirámide de los Teguas', desc: 'Un tributo a la sabiduría ancestral indígena', image: 'https://picsum.photos/seed/earthpark-station-piramide/600/450' },
  { emoji: '🦋', title: 'Mariposa 89 Columpio', desc: 'Símbolo de libertad y el infinito de la vida', image: 'https://picsum.photos/seed/earthpark-station-mariposa/600/450' },
  { emoji: '🔥', title: 'Los Cuatro Elementos', desc: 'Agua, Tierra, Aire y Fuego: experiencia sensorial', image: 'https://picsum.photos/seed/earthpark-station-elementos/600/450' },
  { emoji: '🚀', title: 'Rover Lunar', desc: 'Viaja al futuro sin salir de la Tierra', image: 'https://picsum.photos/seed/earthpark-station-rover/600/450' },
  { emoji: '🌕', title: 'Luna 360°', desc: 'Estructura inmersiva que gira contigo', image: 'https://picsum.photos/seed/earthpark-station-luna/600/450' },
  { emoji: '🌿', title: 'Vivero & Café', desc: 'Gastronomía local al aire libre entre árboles', image: 'https://picsum.photos/seed/earthpark-station-vivero/600/450' },
  { emoji: '🎨', title: 'Galería de Arte', desc: 'Objetos reciclados transformados en arte local', image: 'https://picsum.photos/seed/earthpark-station-galeria/600/450' },
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
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
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
