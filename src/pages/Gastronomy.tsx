import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Modal } from '../components/ui/Modal'
import { asset } from '../lib/asset'

interface Dish {
  name: string
  emoji: string
  description: string
  side?: string
  featured?: boolean
  image: string
}

// PLACEHOLDER: sin fotos reales de los platos aún — swap por fotografía real de Earth Park
const breakfast: Dish[] = [
  {
    name: 'Caldo de Costilla Earth Park',
    emoji: '🍲',
    featured: true,
    description:
      'Un caldo de costilla de res con papa criolla, arveja verde y cilantro fresco, preparado desde las 6:00 de la mañana para recibirte con el primer aroma del día. El único desayuno que se sirve así, pensado para llenarte de energía antes de salir a explorar.',
    side: 'Bebida caliente (chocolate Colanta o aromática de hierbas), arepa dorada en budare y fruta de temporada.',
    image: 'https://picsum.photos/seed/earthpark-food-caldo/700/560',
  },
  {
    name: 'Arepa con Queso y Mantequilla',
    emoji: '🫓',
    description:
      'Arepa de maíz cocida a fuego lento en budare, servida caliente con queso campesino derritiéndose y mantequilla artesanal. Un clásico sencillo hecho con calma.',
    side: 'Tinto o aromática.',
    image: 'https://picsum.photos/seed/earthpark-food-arepa/700/560',
  },
  {
    name: 'Huevos al Gusto',
    emoji: '🍳',
    description:
      'Revueltos, fritos o pericos con tomate y cebolla cabezona — preparados al momento en que los pides, exactamente como te gustan.',
    side: 'Arepa y bebida caliente.',
    image: 'https://picsum.photos/seed/earthpark-food-huevos/700/560',
  },
]

const dinner: Dish[] = [
  {
    name: 'Hamburguesa Earth Park',
    emoji: '🍔',
    featured: true,
    description:
      'Nuestra hamburguesa insignia: carne especialidad de la casa a la plancha, huevo, lechuga fresca, tomate, tocineta crocante, queso derretido y jamón, todo en pan tostado. Acompañada de papa frita o en cascos. Una experiencia completa para cerrar el día.',
    image: asset('/images/gastronomia/gastronomia-hamburguesa-earth-park.jpg'),
  },
  {
    name: 'Pechuga a la Plancha',
    emoji: '🍗',
    description:
      'Pechuga marinada por 30 minutos en limón, ajo y especias, cocida a la plancha hasta el punto justo. Acompañada de papa frita o en cascos — ligera, jugosa y llena de sabor.',
    image: 'https://picsum.photos/seed/earthpark-food-pechuga/700/560',
  },
  {
    name: 'Cena del Valle',
    emoji: '🍽️',
    description:
      'El plato del chef, distinto cada temporada: carnes al caldero, mazamorra chiquita o la proteína del día, siempre con ingredientes locales. Pregunta por la opción disponible al hacer tu check-in — cada visita puede traer una sorpresa distinta.',
    image: 'https://picsum.photos/seed/earthpark-food-valle/700/560',
  },
]

// Galería extensible: agregar más fotos aquí a medida que estén disponibles
const otherFlavors: { image: string; alt: string; title: string }[] = [
  { image: asset('/images/gastronomia/gastronomia-otros-helados.jpeg'), alt: 'Helados artesanales Earth Park', title: 'Helados Artesanales del Valle' },
]

function DishModalContent({ dish }: { dish: Dish }) {
  return (
    <div>
      <div className="relative h-64 sm:h-80">
        <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
        {dish.featured && (
          <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
            Especialidad de la casa
          </span>
        )}
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{dish.emoji}</span>
          <h2 className="font-fraunces text-3xl text-bosque dark:text-crema">{dish.name}</h2>
        </div>
        <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed">{dish.description}</p>
        {dish.side && (
          <p className="font-inter text-terracota dark:text-dorado text-sm italic leading-relaxed mt-4">
            {dish.side}
          </p>
        )}
      </div>
    </div>
  )
}

function DishCard({ dish, i, dark, onSelect }: { dish: Dish; i: number; dark?: boolean; onSelect: (dish: Dish) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(dish)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(dish) } }}
      className={`cursor-pointer ${
        dark
          ? 'bg-crema/5 border border-crema/10 backdrop-blur-sm rounded-3xl overflow-hidden'
          : 'bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
      }`}
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
        <span className="absolute top-4 left-4 text-3xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-12 h-12 flex items-center justify-center">
          {dish.emoji}
        </span>
        {dish.featured && (
          <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
            Especialidad de la casa
          </span>
        )}
      </div>

      <div className="p-6 md:p-8">
        <h3 className={`font-fraunces text-2xl ${dark ? 'text-crema' : 'text-bosque dark:text-crema'}`}>
          {dish.name}
        </h3>
      </div>
    </motion.div>
  )
}

export function Gastronomy() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  return (
    <div className="min-h-screen">
      <PageHeaderBand
        title="Gastronomía"
        subtitle="Sabores locales que acompañan cada momento del día en Earth Park"
      />

      {/* Desayuno — tono cálido, amanecer */}
      <section className="bg-gradient-to-b from-dorado/15 via-crema to-crema dark:from-terracota/10 dark:via-bosque-deep dark:to-bosque-deep py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-2">Desayuno</h2>
            <p className="font-inter text-terracota dark:text-dorado text-sm uppercase tracking-wide">
              7:00 AM – 9:00 AM
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {breakfast.map((dish, i) => (
              <DishCard key={dish.name} dish={dish} i={i} onSelect={setSelectedDish} />
            ))}
          </div>
        </div>
      </section>

      {/* Cena — tono profundo, atardecer/noche */}
      <section className="bg-bosque dark:bg-bosque-deep py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-carbon/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-crema mb-2">Cena</h2>
            <p className="font-inter text-dorado text-sm uppercase tracking-wide">7:00 PM – 9:00 PM</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dinner.map((dish, i) => (
              <DishCard key={dish.name} dish={dish} i={i} dark onSelect={setSelectedDish} />
            ))}
          </div>
        </div>
      </section>

      {/* Otros sabores de Earth Park */}
      <section className="bg-crema dark:bg-bosque-deep py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12"
          >
            Otros sabores de Earth Park
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {otherFlavors.map((item, i) => (
              <motion.div
                key={item.image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <img src={item.image} alt={item.alt} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/80 to-transparent px-3 pt-8 pb-3">
                  <p className="font-inter text-crema text-sm font-semibold leading-tight">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Modal open={selectedDish !== null} onClose={() => setSelectedDish(null)}>
        {selectedDish && <DishModalContent dish={selectedDish} />}
      </Modal>
    </div>
  )
}
