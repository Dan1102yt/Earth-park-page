import { motion } from 'framer-motion'

const stats = [
  { value: '+500', label: 'Visitantes felices' },
  { value: '7', label: 'Estaciones temáticas' },
  { value: '6', label: 'Planes disponibles' },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white dark:bg-bosque-surface rounded-3xl p-10 md:p-12 shadow-sm text-center"
        >
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-dorado text-xl">★</span>
            ))}
          </div>
          <p className="font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema leading-snug mb-6">
            "Una muy bella e inolvidable experiencia con la familia y lo mejor son pet friendly"
          </p>
          <p className="font-inter text-carbon/60 dark:text-crema/60 text-sm mb-10">Juan Pablo Rodríguez — Visitante verificado</p>

          <div className="grid grid-cols-3 gap-6 border-t border-carbon/10 dark:border-crema/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-fraunces text-3xl text-terracota dark:text-dorado">{s.value}</p>
                <p className="font-inter text-carbon/60 dark:text-crema/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
