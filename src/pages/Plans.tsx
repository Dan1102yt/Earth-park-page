import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { plans } from '../components/sections/PlansPreview'

export function Plans() {
  return (
    <div className="min-h-screen bg-crema dark:bg-bosque-deep">
      <PageHeaderBand
        title="Planes Turísticos"
        subtitle="Escoge la experiencia que más te inspire"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
            className="bg-white dark:bg-bosque-surface rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="relative h-80 sm:h-96 lg:h-[28rem] overflow-hidden">
              <img
                src={plan.image}
                alt={plan.title}
                loading="lazy"
                className="w-full h-full object-cover"
                style={plan.imagePosition ? { objectPosition: plan.imagePosition } : undefined}
              />
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                  {plan.badge}
                </span>
              )}
            </div>

            <div className="p-8 md:p-10">
              {plan.duration && (
                <div className="flex justify-center -mt-16 mb-6 relative z-10">
                  <span className="font-fraunces font-semibold text-2xl md:text-3xl bg-terracota text-crema px-8 py-3 rounded-2xl shadow-xl">
                    {plan.duration}
                  </span>
                </div>
              )}
              <h2 className="font-fraunces text-3xl text-bosque dark:text-crema mb-2">{plan.title}</h2>
              <p className="font-fraunces text-4xl text-terracota dark:text-dorado mb-4">{plan.price}</p>
              <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed mb-6">{plan.description}</p>

              <h3 className="font-inter font-bold text-bosque dark:text-crema text-sm uppercase tracking-wide mb-3">Incluye</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2 font-inter text-carbon/80 dark:text-crema/80 text-sm leading-snug">
                    <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-inter text-carbon/40 dark:text-crema/40 text-xs italic mb-6">No incluye: {plan.excludes}</p>

              <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer" className="w-fit block">
                <Button variant="whatsapp" size="lg">
                  <MessageCircle size={20} />
                  Reservar por WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
