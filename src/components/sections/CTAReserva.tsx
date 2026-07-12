import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export function CTAReserva() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-forest-dark to-dark relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-forest-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-dark/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-display text-5xl md:text-6xl text-cream mb-4">
            Reserva tu experiencia
          </h2>
          <p className="font-body text-cream/80 text-xl mb-10">
            Cupos limitados — experiencia exclusiva con reserva previa
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg">
                <MessageCircle size={20} />
                Escribir por WhatsApp
              </Button>
            </a>
            <Link to="/contacto">
              <Button variant="outline" size="lg">Contáctanos</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
