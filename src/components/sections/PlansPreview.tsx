import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'

const plans = [
  {
    title: 'Tesoros del Valle de Tenza',
    price: '$870.000',
    duration: '3 días 2 noches',
    badge: 'MÁS COMPLETO',
    badgeColor: 'bg-gold text-dark',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/macanal-A0xjlLKanJsZVzg7.jpeg',
  },
  {
    title: 'Conoce y descansa en Macanal',
    price: '$340.000',
    duration: '2 días 1 noche',
    badge: 'MÁS POPULAR',
    badgeColor: 'bg-forest text-cream',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=584,fit=crop/Yg2ya4gl5Rtg3nyW/3-m5Kn28Lb7pCzlQ2V.jpeg',
  },
  {
    title: 'Conoce el Hollywood Boyacense',
    price: '$140.000',
    duration: '1 día',
    badge: 'IDEAL PARA EMPEZAR',
    badgeColor: 'bg-earth text-cream',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/whatsapp-image-2026-04-17-at-12.04.48-pm-NgGfq4uQdNwlxl0H.jpeg',
  },
]

export function PlansPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nuestros Planes"
          subtitle="Escoge la experiencia que más te inspire"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="group"
            >
              <div className="bg-dark rounded-2xl overflow-hidden border border-cream/10 hover:border-forest/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/20 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  {/* Badge */}
                  <span className={`absolute top-3 right-3 text-xs font-body font-bold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-cream mb-2 leading-tight">{plan.title}</h3>
                  <p className="font-body text-cream/60 text-sm mb-4">{plan.duration}</p>
                  <div className="mt-auto">
                    <p className="font-display text-3xl text-gold mb-4">{plan.price}</p>
                    <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full">Reservar</Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/planes-turisticos">
            <Button variant="outline" size="lg">Ver todos los planes</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
