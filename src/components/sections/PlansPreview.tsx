import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export interface Plan {
  title: string
  price: string
  duration?: string
  badge?: string
  description: string
  includes: string[]
  excludes: string
  image: string
  imagePosition?: string
}

// PLACEHOLDER: sin foto real — swap por fotografía real de Earth Park
const PLACEHOLDER_RAICES = 'https://picsum.photos/seed/earthpark-plan-raices/768/615'
// PLACEHOLDER: sin foto real — swap por fotografía real de Earth Park
const PLACEHOLDER_HUELLA = 'https://picsum.photos/seed/earthpark-plan-huella/768/615'

export const plans: Plan[] = [
  {
    title: 'Tesoros del Valle de Tenza',
    price: '$870.000',
    duration: '3 días - 2 noches',
    badge: 'MÁS COMPLETO',
    description:
      'Un viaje que trasciende lo turístico… para vivir, aprender y conectar con la esencia del campo. Este plan está diseñado para quienes buscan una experiencia auténtica: sumergirse en las tradiciones, compartir con la comunidad campesina y descubrir los verdaderos tesoros culturales y naturales que resguarda el Valle de Tenza.',
    includes: [
      'Talleres tradicionales: molienda manual de caña, preparación de chicharrones de cuajada, cestería artesanal',
      'Visita a casa campesina y aprisco',
      'Recorrido por 4 miradores: Mano del Minero, Hollywood boyacense, Don Isaías, El Cristo',
      'Paseo en lancha entre montañas y cascadas en el Embalse La Esmeralda',
      'Alimentación completa: 3 desayunos, 3 almuerzos, 2 cenas, 2 refrigerios',
      'Alojamiento: 2 noches en habitación múltiple',
      'Acompañamiento local (guianza con sentido humano)',
      'Seguro turístico',
      'Helado local, almuerzo típico, recorrido por Sutatenza/Somondoco/Macanal',
    ],
    excludes: 'transporte y guía',
    image: '/images/planes/planes-tesoros-del-valle-de-tenza.png',
  },
  {
    title: 'Conoce y descansa en Macanal',
    price: '$340.000',
    duration: '2 días - 1 noche',
    badge: 'MÁS POPULAR',
    description:
      'Vive una escapada inolvidable en el corazón del Valle de Tenza. Navega por las tranquilas aguas del embalse La Esmeralda, contempla las imponentes vistas desde los miradores más emblemáticos de Macanal y saborea los sabores auténticos de la región.',
    includes: [
      '2 desayunos (1 por día)',
      'Tour en lancha',
      'Entrada al parque Earth Park',
      'Visita al Mirador del Cielo y al Mirador "Mano del Minero"',
      'Almuerzo local',
      'Visita a la Cascada La 70',
      'Alojamiento en Earth Park o aliados (*sujeto a elección y disponibilidad)',
      'Caminata guiada a Casa Campesina y refrigerio',
      'Seguro turístico',
    ],
    excludes: 'transporte y guía',
    image: '/images/planes/planes-Conoce%20y%20descansa%20en%20Macanal.jpg',
    imagePosition: '50% 22%',
  },
  {
    title: 'Conoce el Hollywood Boyacense',
    price: '$140.000',
    duration: '1 día',
    badge: 'IDEAL PARA EMPEZAR',
    description:
      'Navega las serenas aguas del embalse La Esmeralda, contempla las vistas imponentes desde los miradores más emblemáticos de Macanal y deléitate con la gastronomía típica preparada por manos locales. Todo en un solo día.',
    includes: [
      'Desayuno',
      'Tour en lancha',
      'Entrada al parque Earth Park',
      'Visita al Mirador del Cielo',
      'Postre tradicional del valle',
      'Almuerzo local',
      'Visita a la Cascada La 70',
      'Seguro turístico',
    ],
    excludes: 'transporte y guía',
    image: '/images/planes/planes-Conoce-el-Hollywood-Boyacense.jpg',
    imagePosition: '50% 55%',
  },
  {
    title: 'Vive Earth Park',
    price: '$40.000',
    description:
      'Disfruta de un acceso exclusivo al parque Earth Park, con una experiencia sensorial única que te conectará con la naturaleza.',
    includes: [
      'Entrada al parque Earth Park',
      'Experiencia sensorial con guía',
      'Souvenir',
      'Refrigerio',
      'Seguro turístico',
    ],
    excludes: 'transporte',
    image: '/images/planes/planes-vive-earth-park.jpeg',
  },
  {
    title: 'Raíces y Tradición del Valle de Tenza',
    price: '$100.000',
    description:
      'Vive una experiencia auténtica guiada por las manos y saberes de la gente local. Conocerás la tradición de la cestería en un taller artesanal, con un helado típico y almuerzo casero, mientras exploras Sutatenza, Somondoco y/o Macanal.',
    includes: [
      'Taller de cestería',
      'Helado local',
      'Almuerzo típico',
      'Recorrido por los pueblos de Sutatenza, Somondoco y/o Macanal',
      'Seguro turístico',
    ],
    excludes: 'transporte y guía',
    image: PLACEHOLDER_RAICES,
  },
  {
    title: 'Deja tu huella',
    price: '$75.000',
    description:
      '¿Te imaginas disfrutar de un café artesanal, rodeado de naturaleza, mientras pintas tu propia obra de arte? Una actividad para todas las edades donde podrás relajarte, crear y reconectar contigo mismo y con tu entorno.',
    includes: [
      'Una bebida artesanal (café o infusión de hierbas del parque)',
      '1 figura de cerámica a elegir',
      '5 pinturas acrílicas de colores variados',
      'Uso de pinceles y materiales necesarios',
      'Acompañamiento de guía artístico',
      'Entrada al parque Earth Park',
      'Tiempo libre para exposición y fotos con tu creación',
      'Seguro turístico',
    ],
    excludes: 'transporte',
    image: PLACEHOLDER_HUELLA,
  },
]

export function PlansPreview() {
  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">Nuestros Planes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              className="bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={plan.image} alt={plan.title} loading="lazy" className="w-full h-full object-cover" />
                {plan.badge && (
                  <span className="absolute top-3 right-3 bg-dorado text-carbon font-inter text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-fraunces text-lg text-bosque dark:text-crema mb-1 leading-tight">{plan.title}</h3>
                {plan.duration && <p className="font-inter text-carbon/60 dark:text-crema/60 text-xs mb-2">{plan.duration}</p>}
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
