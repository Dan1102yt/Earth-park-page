import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Button } from '../components/ui/Button'

// Datos reales tomados de PlansPreview.tsx
const plans = [
  {
    title: 'Tesoros del Valle de Tenza',
    price: '$870.000',
    duration: '3 días 2 noches',
    badge: 'MÁS COMPLETO',
    badgeClass: 'bg-dorado text-carbon',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/macanal-A0xjlLKanJsZVzg7.jpeg',
  },
  {
    title: 'Conoce y descansa en Macanal',
    price: '$340.000',
    duration: '2 días 1 noche',
    badge: 'MÁS POPULAR',
    badgeClass: 'bg-musgo text-crema',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=584,fit=crop/Yg2ya4gl5Rtg3nyW/3-m5Kn28Lb7pCzlQ2V.jpeg',
  },
  {
    title: 'Conoce el Hollywood Boyacense',
    price: '$140.000',
    duration: '1 día',
    badge: 'IDEAL PARA EMPEZAR',
    badgeClass: 'bg-terracota text-crema',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/whatsapp-image-2026-04-17-at-12.04.48-pm-NgGfq4uQdNwlxl0H.jpeg',
  },
]

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
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="h-64 md:h-full overflow-hidden">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className={`inline-block w-fit text-xs font-inter font-bold px-3 py-1 rounded-full mb-4 ${plan.badgeClass}`}>
                {plan.badge}
              </span>
              <h2 className="font-fraunces text-3xl text-bosque mb-2">{plan.title}</h2>
              <p className="font-inter text-carbon/60 mb-4">{plan.duration}</p>
              {/* REVISAR: no existe contenido real de "qué incluye" por plan en el proyecto */}
              <p className="font-fraunces text-4xl text-terracota mb-6">{plan.price}</p>
              <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer" className="w-fit">
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
