import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Car, PawPrint, Users } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'

export function Location() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="¿Cómo llegar?"
          subtitle="Te esperamos en el corazón de Boyacá"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <MapPin size={24} className="text-forest-light shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-cream text-lg mb-1">Dirección</h4>
                <p className="font-body text-cream/70 text-sm leading-relaxed">
                  Vereda El Dátil, Macanal, Boyacá<br />
                  Km 18.5 vía Guateque–Santa María
                </p>
              </div>
            </div>

            {/* Routes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark rounded-xl p-4 border border-cream/10">
                <p className="font-body text-xs text-cream/50 mb-1">Desde Bogotá</p>
                <p className="font-display text-2xl text-forest-light">2.5 hrs</p>
                <p className="font-body text-xs text-cream/60 mt-1">Vía Chocontá o La Calera</p>
              </div>
              <div className="bg-dark rounded-xl p-4 border border-cream/10">
                <p className="font-body text-xs text-cream/50 mb-1">Desde Tunja</p>
                <p className="font-display text-2xl text-forest-light">2.5 hrs</p>
                <p className="font-body text-xs text-cream/60 mt-1">Vía Ramiriquí</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock size={24} className="text-forest-light shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-cream text-lg mb-2">Horarios</h4>
                <div className="space-y-1 font-body text-cream/70 text-sm">
                  <p><span className="text-cream">Parque:</span> Jue–Dom y lunes festivos · 9:00 am – 9:00 pm</p>
                  <p><span className="text-cream">Reservas L–V:</span> 7:00 am – 5:00 pm</p>
                  <p><span className="text-cream">Reservas Sáb:</span> 8:00 am – 12:00 pm</p>
                  <p><span className="text-cream">Dom y festivos:</span> Cerrado (sin reservas)</p>
                </div>
              </div>
            </div>

            {/* Extra info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-dark rounded-xl p-3 border border-cream/10 text-center">
                <Car size={20} className="text-gold mx-auto mb-2" />
                <p className="font-body text-xs text-cream/70">Parqueadero</p>
                <p className="font-display text-sm text-gold">$2.000</p>
              </div>
              <div className="bg-dark rounded-xl p-3 border border-cream/10 text-center">
                <PawPrint size={20} className="text-forest-light mx-auto mb-2" />
                <p className="font-body text-xs text-cream/70">Pet Friendly</p>
                <p className="font-display text-sm text-forest-light">✅</p>
              </div>
              <div className="bg-dark rounded-xl p-3 border border-cream/10 text-center">
                <Users size={20} className="text-forest-light mx-auto mb-2" />
                <p className="font-body text-xs text-cream/70">Menores de 12</p>
                <p className="font-display text-sm text-forest-light">Con adulto</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl"
          >
            <iframe
              src="https://maps.google.com/maps?q=Macanal,+Boyac%C3%A1,+Colombia&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Earth Park — Macanal, Boyacá"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
