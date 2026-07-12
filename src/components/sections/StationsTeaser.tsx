import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const stations = [
  { emoji: '🦋', title: 'Mariposa 89 Columpio', desc: 'Símbolo de libertad y el infinito de la vida' },
  { emoji: '🛕', title: 'Pirámide de los Teguas', desc: 'Un tributo a la sabiduría ancestral indígena' },
  { emoji: '🔥', title: 'Los Cuatro Elementos', desc: 'Agua, Tierra, Aire y Fuego: experiencia sensorial' },
  { emoji: '🌕', title: 'Luna 360°', desc: 'Estructura inmersiva que gira contigo' },
]

export function StationsTeaser() {
  return (
    <section className="py-24 bg-bosque dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-crema text-center mb-12">Las 7 Estaciones</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-crema/10 rounded-2xl p-6 border border-crema/10"
            >
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-fraunces text-lg text-crema mb-1">{s.title}</h3>
              <p className="font-inter text-crema/70 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/estaciones">
            <Button variant="terracota" size="lg">Explora todas las estaciones</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
