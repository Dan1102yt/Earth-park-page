import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

// Selección diversa del pool hero-galeria-1..29: paisaje, familia, animal, cascada, actividad, flor
const images = [
  '/images/hero/hero-galeria-8.jpeg',
  '/images/hero/hero-galeria-18.jpeg',
  '/images/hero/hero-galeria-11.jpeg',
  '/images/hero/hero-galeria-19.jpeg',
  '/images/hero/hero-galeria-24.jpeg',
  '/images/hero/hero-galeria-16.jpeg',
]

export function GalleryPreview() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">Galería</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
              className="aspect-square rounded-xl overflow-hidden"
            >
              <img src={src} alt="Earth Park" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/galeria-arte">
            <Button variant="terracota" size="lg">Ver galería completa</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
