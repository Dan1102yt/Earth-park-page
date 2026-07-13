import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'

const MARIPOSA_IMAGES = Array.from({ length: 10 }, (_, i) => `/images/hospedaje/hospedaje-${i + 1}.jpeg`)

interface Room {
  name: string
  emoji: string
  concept: string
  status: 'Disponible' | 'Próximamente'
  designNote?: string
  image?: string
  images?: string[]
}

// PLACEHOLDER: sin fotos reales de las habitaciones aún — swap por fotografía real de Earth Park
const rooms: Room[] = [
  {
    name: 'Habitación Mariposa',
    emoji: '🦋',
    concept: 'El vuelo de la transformación. Ligereza, color y el asombro de ver la vida cambiar de forma ante tus ojos.',
    status: 'Disponible',
    images: MARIPOSA_IMAGES,
  },
  {
    name: 'Habitación Los Ancestros',
    emoji: '🌾',
    concept: 'Raíces profundas, memoria viva. El peso cálido de la herencia campesina en cada rincón.',
    status: 'Disponible' as const,
    image: 'https://picsum.photos/seed/earthpark-room-ancestros/700/560',
  },
  {
    name: 'Habitación Colibrí',
    emoji: '🐦',
    concept: 'Energía pura en movimiento. Color, velocidad y la alegría de estar vivo.',
    status: 'Próximamente' as const,
    designNote: 'Acentos turquesa/magenta, formas orgánicas, mucha luz natural.',
    image: 'https://picsum.photos/seed/earthpark-room-colibri/700/560',
  },
  {
    name: 'Habitación Orquídea',
    emoji: '🌸',
    concept: 'Elegancia silenciosa. La delicadeza que florece cuando se le da tiempo y cuidado.',
    status: 'Próximamente' as const,
    designNote: 'Tonos lila/blanco suave, iluminación cálida y tenue.',
    image: 'https://picsum.photos/seed/earthpark-room-orquidea/700/560',
  },
  {
    name: 'Habitación Frailejón',
    emoji: '🌿',
    concept: 'El guardián silencioso del agua. Paciencia, protección, y la certeza de que lo esencial crece despacio.',
    status: 'Próximamente' as const,
    designNote: 'Verde-plata suave, texturas aterciopeladas, luz difusa.',
    image: 'https://picsum.photos/seed/earthpark-room-frailejon/700/560',
  },
]

function RoomCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="relative w-full h-full group/carousel">
      <img src={images[index]} alt={`${alt} — foto ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); setIndex((i) => (i - 1 + images.length) % images.length) }}
        aria-label="Foto anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); setIndex((i) => (i + 1) % images.length) }}
        aria-label="Foto siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-crema' : 'bg-crema/40'}`} />
        ))}
      </div>
    </div>
  )
}

export function Lodging() {
  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title="Hospedaje"
        subtitle="Cinco habitaciones, cinco formas de conectar con la naturaleza"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
              className={`bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                room.status === 'Próximamente' ? 'ring-2 ring-dorado/40' : ''
              }`}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                {room.images ? (
                  <RoomCarousel images={room.images} alt={room.name} />
                ) : (
                  <img src={room.image} alt={room.name} loading="lazy" className="w-full h-full object-cover" />
                )}
                {room.status === 'Próximamente' && (
                  <div className="absolute inset-0 bg-carbon/15" />
                )}
                <span className="absolute top-4 left-4 text-3xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-12 h-12 flex items-center justify-center">
                  {room.emoji}
                </span>
                <span
                  className={`absolute top-4 right-4 font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
                    room.status === 'Disponible' ? 'bg-musgo text-crema' : 'bg-dorado text-carbon'
                  }`}
                >
                  {room.status}
                </span>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-fraunces text-2xl text-bosque dark:text-crema mb-3">{room.name}</h3>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm leading-relaxed mb-3">
                  {room.concept}
                </p>
                {room.designNote && (
                  <p className="font-inter text-dorado/90 dark:text-dorado text-xs italic leading-relaxed">
                    {room.designNote}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
