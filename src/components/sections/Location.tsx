import { motion } from 'framer-motion'
import { MapPin, Clock, Car, PawPrint, Users } from 'lucide-react'

export function Location() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-3">¿Cómo llegar?</h2>
          <p className="font-inter text-carbon/70 dark:text-crema/70 text-lg">Te esperamos en el corazón de Boyacá</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <MapPin size={24} className="text-terracota dark:text-dorado shrink-0 mt-1" />
              <div>
                <h4 className="font-fraunces text-bosque dark:text-crema text-lg mb-1">Dirección</h4>
                <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm leading-relaxed">
                  Vereda El Dátil, Macanal, Boyacá<br />
                  Km 18.5 vía Guateque–Santa María
                </p>
              </div>
            </div>

            {/* Routes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-bosque-surface rounded-xl p-4 border border-carbon/10 dark:border-crema/10">
                <p className="font-inter text-xs text-carbon/50 dark:text-crema/50 mb-1">Desde Bogotá</p>
                <p className="font-fraunces text-2xl text-terracota dark:text-dorado">2.5 hrs</p>
                <p className="font-inter text-xs text-carbon/60 dark:text-crema/60 mt-1">Vía Chocontá o La Calera</p>
              </div>
              <div className="bg-white dark:bg-bosque-surface rounded-xl p-4 border border-carbon/10 dark:border-crema/10">
                <p className="font-inter text-xs text-carbon/50 dark:text-crema/50 mb-1">Desde Tunja</p>
                <p className="font-fraunces text-2xl text-terracota dark:text-dorado">2.5 hrs</p>
                <p className="font-inter text-xs text-carbon/60 dark:text-crema/60 mt-1">Vía Ramiriquí</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock size={24} className="text-terracota dark:text-dorado shrink-0 mt-1" />
              <div>
                <h4 className="font-fraunces text-bosque dark:text-crema text-lg mb-2">Horarios</h4>
                <p className="font-inter font-bold text-musgo dark:text-dorado text-sm mb-3 leading-relaxed">
                  Abierto jueves, viernes, sábado, domingo y festivos.<br />
                  Cerrado lunes, martes y miércoles.
                </p>
                <div className="space-y-1 font-inter text-carbon/70 dark:text-crema/70 text-sm">
                  <p><span className="text-bosque dark:text-crema">Parque:</span> Jue–Dom y lunes festivos · 9:00 am – 9:00 pm</p>
                  <p><span className="text-bosque dark:text-crema">Reservas L–V:</span> 7:00 am – 5:00 pm</p>
                  <p><span className="text-bosque dark:text-crema">Reservas Sáb:</span> 8:00 am – 12:00 pm</p>
                  <p><span className="text-bosque dark:text-crema">Dom y festivos:</span> Cerrado (sin reservas)</p>
                </div>
              </div>
            </div>

            {/* Extra info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-bosque-surface rounded-xl p-3 border border-carbon/10 dark:border-crema/10 text-center">
                <Car size={20} className="text-dorado mx-auto mb-2" />
                <p className="font-inter text-xs text-carbon/70 dark:text-crema/70 leading-snug">Parqueadero incluido con tu alojamiento</p>
              </div>
              <div className="bg-white dark:bg-bosque-surface rounded-xl p-3 border border-carbon/10 dark:border-crema/10 text-center">
                <PawPrint size={20} className="text-musgo mx-auto mb-2" />
                <p className="font-inter text-xs text-carbon/70 dark:text-crema/70">Pet Friendly</p>
                <p className="font-fraunces text-sm text-musgo">✅</p>
              </div>
              <div className="bg-white dark:bg-bosque-surface rounded-xl p-3 border border-carbon/10 dark:border-crema/10 text-center">
                <Users size={20} className="text-musgo mx-auto mb-2" />
                <p className="font-inter text-xs text-carbon/70 dark:text-crema/70">Menores de 12</p>
                <p className="font-fraunces text-sm text-musgo">Con adulto</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="rounded-2xl overflow-hidden border border-carbon/10 dark:border-crema/10 shadow-lg"
          >
            <iframe
              src="https://maps.google.com/maps?q=5.0156303,-73.3556643&z=17&output=embed"
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
