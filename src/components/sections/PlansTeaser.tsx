import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const plans = [
  {
    title: 'Tesoros del Valle de Tenza',
    price: '$870.000',
    duration: '3 días 2 noches',
    badge: 'MÁS COMPLETO',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/macanal-A0xjlLKanJsZVzg7.jpeg',
  },
  {
    title: 'Conoce y descansa en Macanal',
    price: '$340.000',
    duration: '2 días 1 noche',
    badge: 'MÁS POPULAR',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=584,fit=crop/Yg2ya4gl5Rtg3nyW/3-m5Kn28Lb7pCzlQ2V.jpeg',
  },
  {
    title: 'Conoce el Hollywood Boyacense',
    price: '$140.000',
    duration: '1 día',
    badge: 'IDEAL PARA EMPEZAR',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=615,fit=crop/Yg2ya4gl5Rtg3nyW/whatsapp-image-2026-04-17-at-12.04.48-pm-NgGfq4uQdNwlxl0H.jpeg',
  },
]

export function PlansTeaser() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">Nuestros Planes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-dorado text-carbon font-inter text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h3>
                <p className="font-inter text-carbon/60 dark:text-crema/60 text-sm mb-3">{plan.duration}</p>
                <p className="font-fraunces text-2xl text-terracota dark:text-dorado">{plan.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/planes-turisticos">
            <Button variant="terracota" size="lg">Ver todos los planes</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
