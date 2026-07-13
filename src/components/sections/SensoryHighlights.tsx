import { motion } from 'framer-motion'

const highlights = [
  {
    title: 'Mariposas',
    text: 'Símbolo de libertad y el infinito de la vida.',
    image: '/images/hero/hero-mariposa.jpg',
  },
  {
    title: 'Naturaleza',
    text: 'Un espacio donde la vida natural es la protagonista.',
    image: '/images/hero/hero-naturaleza.jpg',
  },
  {
    title: 'Familia',
    text: 'Una experiencia inolvidable en familia — y pet friendly.',
    image: '/images/hero/hero-familia.jpg',
  },
  {
    title: 'Gastronomía',
    text: 'Gastronomía local al aire libre entre árboles.',
    image: '/images/hero/hero-gastronomia.jpg',
  },
]

export function SensoryHighlights() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden bg-carbon/5 dark:bg-bosque-surface"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1">{item.title}</h3>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
