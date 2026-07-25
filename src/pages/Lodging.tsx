import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Modal } from '../components/ui/Modal'
import { ModalGallery } from '../components/ui/ModalGallery'
import { GlowCard } from '../components/ui/GlowCard'
import { asset } from '../lib/asset'

const MARIPOSA_IMAGES = Array.from({ length: 10 }, (_, i) => asset(`/images/hospedaje/hospedaje-${i + 1}.jpeg`))

interface RoomMeta {
  id: string
  emoji: string
  status: 'available' | 'coming-soon'
  image?: string
  images?: string[]
}

interface RoomText {
  name: string
  concept: string
  designNote?: string
  amenities?: string[]
}

type Room = RoomMeta & RoomText

// PLACEHOLDER: sin fotos reales de las habitaciones aún — swap por fotografía real de Earth Park
const roomMetas: RoomMeta[] = [
  { id: 'mariposa', emoji: '🦋', status: 'available', images: MARIPOSA_IMAGES },
  { id: 'ancestros', emoji: '🌾', status: 'available', image: 'https://picsum.photos/seed/earthpark-room-ancestros/700/560' },
  { id: 'colibri', emoji: '🐦', status: 'coming-soon', image: 'https://picsum.photos/seed/earthpark-room-colibri/700/560' },
  { id: 'orquidea', emoji: '🌸', status: 'coming-soon', image: 'https://picsum.photos/seed/earthpark-room-orquidea/700/560' },
  { id: 'frailejon', emoji: '🌿', status: 'coming-soon', image: 'https://picsum.photos/seed/earthpark-room-frailejon/700/560' },
]

function RoomCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="relative w-full h-full group/carousel">
      <img src={images[index]} alt={`${alt} — foto ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length) }}
        aria-label="Foto anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex((i) => (i + 1) % images.length) }}
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

function RoomModalContent({ room, statusLabel, detailsLabel }: { room: Room; statusLabel: string; detailsLabel: string }) {
  return (
    <div>
      <ModalGallery images={room.images ?? [room.image!]} alt={room.name} />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{room.emoji}</span>
          <h2 className="font-fraunces text-3xl text-bosque dark:text-crema">{room.name}</h2>
          <span
            className={`ml-auto font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
              room.status === 'available' ? 'bg-musgo text-crema' : 'bg-dorado text-carbon'
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed mb-6">{room.concept}</p>

        {room.amenities && (
          <>
            <h3 className="font-inter font-bold text-bosque dark:text-crema text-sm uppercase tracking-wide mb-3">{detailsLabel}</h3>
            <ul className="space-y-2 mb-2">
              {room.amenities.map((item) => (
                <li key={item} className="flex gap-2 font-inter text-carbon/80 dark:text-crema/80 text-sm leading-snug">
                  <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {room.designNote && (
          <p className="font-inter text-dorado/90 dark:text-dorado text-sm italic leading-relaxed mt-2">
            {room.designNote}
          </p>
        )}
      </div>
    </div>
  )
}

export function Lodging() {
  const { t } = useTranslation()
  const texts = t('lodging.rooms', { returnObjects: true }) as Record<string, RoomText>
  const rooms: Room[] = roomMetas.map((meta) => ({ ...meta, ...texts[meta.id] }))
  const statusLabels = { available: t('lodging.statusAvailable'), 'coming-soon': t('lodging.statusComingSoon') }
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title={t('lodging.heading')}
        subtitle={t('lodging.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <GlowCard key={room.id} glowColor={i % 2 === 0 ? 'yellow' : 'neon'} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedRoom(room)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRoom(room) } }}
                className={`relative z-10 h-full bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                  room.status === 'coming-soon' ? 'ring-2 ring-dorado/40' : ''
                }`}
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  {room.images ? (
                    <RoomCarousel images={room.images} alt={room.name} />
                  ) : (
                    <img src={room.image} alt={room.name} loading="lazy" className="w-full h-full object-cover" />
                  )}
                  {room.status === 'coming-soon' && (
                    <div className="absolute inset-0 bg-carbon/15" />
                  )}
                  <span className="absolute top-4 left-4 text-3xl bg-white/90 dark:bg-bosque-surface/90 rounded-full w-12 h-12 flex items-center justify-center">
                    {room.emoji}
                  </span>
                  <span
                    className={`absolute top-4 right-4 font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full ${
                      room.status === 'available' ? 'bg-musgo text-crema' : 'bg-dorado text-carbon'
                    }`}
                  >
                    {statusLabels[room.status]}
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
            </GlowCard>
          ))}
        </div>
      </div>

      <Modal open={selectedRoom !== null} onClose={() => setSelectedRoom(null)}>
        {selectedRoom && (
          <RoomModalContent room={selectedRoom} statusLabel={statusLabels[selectedRoom.status]} detailsLabel={t('lodging.detailsLabel')} />
        )}
      </Modal>
    </div>
  )
}
