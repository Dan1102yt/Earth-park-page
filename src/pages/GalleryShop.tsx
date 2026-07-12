import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'

const WHATSAPP_NUMBER = '573233195919'

// PENDIENTE: reemplazar con catálogo real de piezas cuando Oscar lo proporcione
// PLACEHOLDER: fotos y precios de ejemplo genéricos — no reflejan el catálogo real
const artPieces = [
  { name: 'Mariposa Azul', price: '$45.000', image: 'https://picsum.photos/seed/earthpark-art-1/600/600' },
  { name: 'Vuelo de Alas', price: '$60.000', image: 'https://picsum.photos/seed/earthpark-art-2/600/600' },
  { name: 'Jardín Encantado', price: '$55.000', image: 'https://picsum.photos/seed/earthpark-art-3/600/600' },
  { name: 'Metamorfosis', price: '$70.000', image: 'https://picsum.photos/seed/earthpark-art-4/600/600' },
]

export function GalleryShop() {
  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title="Galería de Arte"
        subtitle="Piezas pintadas a mano inspiradas en las mariposas de Earth Park"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artPieces.map((piece, i) => {
            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa la pieza ${piece.name}`)}`
            return (
              <motion.div
                key={piece.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={piece.image} alt={piece.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-fraunces text-lg text-bosque dark:text-crema mb-1">{piece.name}</h3>
                  <p className="font-fraunces text-2xl text-terracota dark:text-dorado mb-4">{piece.price}</p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="block w-fit">
                    <Button variant="whatsapp" size="sm">
                      <MessageCircle size={16} />
                      Comprar por WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
