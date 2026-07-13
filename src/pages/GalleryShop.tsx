import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { asset } from '../lib/asset'

const WHATSAPP_NUMBER = '573233195919'

interface ArtPiece {
  name: string
  price: string | null
  image: string
}

// PENDIENTE: precios reales del catálogo — aún no hay lista de precios oficial
const artPieces: ArtPiece[] = [
  { name: 'Mariposa 89', price: null, image: asset('/images/galeria-arte/galeria-de-arte-mariposa-89.jpg') },
  { name: 'Mariposa Blanco', price: null, image: asset('/images/galeria-arte/galeria-de-arte-mariposa-blanco.jpg') },
  { name: 'Mariposa Botesia', price: null, image: asset('/images/galeria-arte/galeria-de-arte-mariposa-botesia.jpg') },
  { name: 'Mariposa Rhetus', price: null, image: asset('/images/galeria-arte/galeria-de-arte-mariposa-rhetus.jpg') },
]

export function GalleryShop() {
  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title="Galería de Arte"
        subtitle="En Earth Park los residuos los transformamos en arte."
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
                  <img src={piece.image} alt={piece.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-fraunces text-lg text-bosque dark:text-crema mb-1">{piece.name}</h3>
                  {piece.price ? (
                    <p className="font-fraunces text-2xl text-terracota dark:text-dorado mb-4">{piece.price}</p>
                  ) : (
                    <p className="font-inter text-carbon/40 dark:text-crema/40 text-xs italic mb-4">Precio disponible al consultar</p>
                  )}
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
