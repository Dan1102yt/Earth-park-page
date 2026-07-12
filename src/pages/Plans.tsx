import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'
import { plans } from '../components/sections/PlansPreview'

export function Plans() {
  return (
    <div className="min-h-screen bg-crema">
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
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
              {plan.duration && (
                <span className="absolute top-4 left-4 bg-bosque/90 text-crema font-inter text-xs font-bold px-3 py-1.5 rounded-full">
                  {plan.duration}
                </span>
              )}
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-dorado text-carbon font-inter text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                  {plan.badge}
                </span>
              )}
            </div>

            <div className="p-8 md:p-10">
              <h2 className="font-fraunces text-3xl text-bosque mb-2">{plan.title}</h2>
              <p className="font-fraunces text-4xl text-terracota mb-4">{plan.price}</p>
              <p className="font-inter text-carbon/70 leading-relaxed mb-6">{plan.description}</p>

              <h3 className="font-inter font-bold text-bosque text-sm uppercase tracking-wide mb-3">Incluye</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2 font-inter text-carbon/80 text-sm leading-snug">
                    <Check size={16} className="text-musgo shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-inter text-carbon/40 text-xs italic mb-6">No incluye: {plan.excludes}</p>

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
