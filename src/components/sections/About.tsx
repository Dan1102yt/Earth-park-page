import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-8">
              Bienvenidos a Earth Park
            </h2>
            <div className="space-y-5 font-body text-cream/80 text-lg leading-relaxed">
              <p>
                Este no es solo un parque, es un llamado a la conciencia. Te damos la bienvenida a un espacio donde la vida natural es la protagonista, y tú eres parte de su historia.
              </p>
              <p>
                Somos una familia colombiana que decidió rendir homenaje al planeta Tierra, creando un espacio vivo para honrarla, protegerla y compartir su belleza con todos.
              </p>
              <p>
                Nuestro sueño es construir un refugio sagrado para la conservación de la flora y fauna de nuestro territorio.
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 bg-forest/20 border border-forest/30 text-cream/90 font-body text-sm px-5 py-3 rounded-full">
              🌎 Porque cuidar el planeta también puede ser emocionante
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-dark/50">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=922,fit=crop/Yg2ya4gl5Rtg3nyW/ptv6-dJobZpwzLnFrMEzM.jpeg"
                alt="Earth Park — naturaleza viva"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-forest/30 rounded-full blur-2xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
