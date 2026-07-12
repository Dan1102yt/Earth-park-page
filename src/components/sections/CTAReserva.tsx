import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'

export function CTAReserva() {
  return (
    <section className="py-24 bg-bosque dark:bg-bosque-deep relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-musgo/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-carbon/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-fraunces text-5xl md:text-6xl text-crema mb-4">
            Reserva tu experiencia
          </h2>
          <p className="font-inter text-crema/80 text-xl mb-10">
            Cupos limitados — experiencia exclusiva con reserva previa
          </p>

          <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="lg">
              <MessageCircle size={20} />
              Escribir por WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
