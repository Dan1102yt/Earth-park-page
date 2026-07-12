import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

// PLACEHOLDER: sin foto real — swap por imagen de naturaleza de Earth Park
const HERO_IMAGE = 'https://picsum.photos/seed/earthpark-about-hero/1600/1000'
// PLACEHOLDER: sin foto real — swap por fotografía real de la familia fundadora
const FAMILY_IMAGE = 'https://picsum.photos/seed/earthpark-about-familia/768/922'

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const

export function About() {
  return (
    <div className="min-h-screen">
      {/* Bloque 1 — Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO_IMAGE} alt="Naturaleza en Earth Park" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-bosque-deep/90 via-bosque-deep/80 to-bosque-deep/90" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <h1 className="font-fraunces font-semibold text-5xl md:text-7xl text-crema leading-tight mb-6">
            Bienvenidos a Earth Park
          </h1>
          <p className="font-inter text-crema/90 text-xl md:text-2xl">
            Este no es solo un parque, es un llamado a la conciencia
          </p>
        </motion.div>
      </section>

      {/* Bloque 2 — Texto centrado */}
      <section className="bg-crema dark:bg-bosque-deep py-24 px-4">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="font-inter text-carbon/80 dark:text-crema/80 text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto"
        >
          Te damos la bienvenida a un espacio donde la vida natural es la protagonista, y tú eres parte de su
          historia. Ven a sentir, pensar y actuar por un planeta que nos lo da todo
        </motion.p>
      </section>

      {/* Bloque 3 — ¿Quiénes somos? */}
      <section className="bg-white dark:bg-bosque-surface py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-6">¿Quiénes somos?</h2>
            <div className="space-y-5 font-inter text-carbon/80 dark:text-crema/80 text-lg leading-relaxed">
              <p>
                Somos una familia colombiana que decidió rendir homenaje al planeta Tierra, creando un espacio vivo
                para honrarla, protegerla y compartir su belleza con todos.
              </p>
              <p>
                Nuestro sueño es construir un refugio sagrado para la conservación de la flora y fauna de nuestro
                territorio. Un lugar donde cada visitante —niños, jóvenes, adultos y abuelos— pueda reconectar con
                la naturaleza, despertar conciencia y encontrar el equilibrio entre el cuidado del planeta y el
                cuidado de sí mismo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl"
          >
            <img src={FAMILY_IMAGE} alt="La familia detrás de Earth Park" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Bloque 4 — Cita destacada */}
      <section className="bg-bosque dark:bg-bosque-deep py-28 px-4">
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
          className="font-fraunces text-3xl md:text-5xl text-center text-crema max-w-4xl mx-auto leading-snug"
        >
          "Aquí, la <span className="text-dorado">Tierrita</span> nos enseña que protegerla es también proteger
          nuestra propia existencia."
        </motion.blockquote>
      </section>

      {/* Bloque 5 — Cierre emocional + CTA */}
      <section className="bg-crema dark:bg-bosque-deep py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeIn}
        >
          <p className="font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema mb-10">
            🌎 Porque cuidar el planeta también puede ser emocionante.
          </p>
          <Link to="/planes-turisticos">
            <Button variant="terracota" size="lg">Vive la experiencia</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
