import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sprout, Leaf } from 'lucide-react'
import { asset } from '../../lib/asset'
import { FaunaSprite } from '../ui/FaunaSprite'

const TREASURE_ICON = asset('/images/Mariposas/6.png')
const RETURN_ICON = asset('/images/Mariposas/5.png')

// Trazo con leve ondulación, en un viewBox angosto: preserveAspectRatio="none"
// lo estira para llenar la altura real de la columna sin importar el largo del texto.
const TRAIL_PATH = 'M12,0 C4,10 20,18 12,28 C4,38 20,46 12,56 C4,66 20,74 12,84 C4,92 20,97 12,100'

// Fauna decorativa junto al trazo, reutilizando FaunaSprite (mismo sistema que
// AnimatedFauna): distinta de los íconos de marcador para no repetir motivo.
const TRAIL_FAUNA = [
  { img: 3, top: '14%', side: 'left' as const, size: 'w-14', duration: 7.5, drift: [10, 8] as [number, number], delay: 0.2 },
  { img: 4, top: '48%', side: 'right' as const, size: 'w-16', duration: 8.5, drift: [-12, 10] as [number, number], delay: 0.7, flip: true },
  { img: 1, top: '78%', side: 'left' as const, size: 'w-14', duration: 7, drift: [10, -10] as [number, number], delay: 0.4 },
]

const STOPS = [
  { titleKey: 'stop1', paragraphs: ['p1', 'p2'] },
  { titleKey: 'stop2', paragraphs: [], quote: 'quote1' },
  { titleKey: 'stop3', paragraphs: ['p3'] },
  { titleKey: 'stop4', paragraphs: ['p4', 'p5'] },
  { titleKey: 'stop5', paragraphs: ['p6', 'p7'], quoteLead: 'quote2Lead', quote: 'quote2' },
  { titleKey: 'stop6', paragraphs: ['p8'], closing: 'closing', isFinal: true },
] as const

interface StopProps {
  index: number
  titleKey: string
  paragraphs: readonly string[]
  quote?: string
  quoteLead?: string
  closing?: string
  isFinal?: boolean
}

// Ícono de marcador por parada: distinto según el momento de la historia,
// en vez de repetir el mismo glifo. 1 y 2 se dejan como número/interrogante
// (arranque abstracto, antes de que la vida empiece a regresar).
function MarkerIcon({ index, isFinal }: { index: number; isFinal?: boolean }) {
  if (isFinal) return <img src={TREASURE_ICON} alt="" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
  if (index === 2) return <Sprout className="w-4 h-4 md:w-5 md:h-5 text-dorado" strokeWidth={2} />
  if (index === 3) return <img src={RETURN_ICON} alt="" className="w-6 h-6 md:w-7 md:h-7 object-contain" />
  if (index === 4) return <Leaf className="w-4 h-4 md:w-5 md:h-5 text-dorado" strokeWidth={2} />
  if (index === 1) return <span className="font-fraunces text-dorado text-base md:text-lg">?</span>
  return <span className="font-fraunces text-dorado text-sm md:text-base">{index + 1}</span>
}

// Cada parada rastrea su propia entrada al viewport (en fracciones de la
// altura del viewport, no de la altura total de la sección) para que la
// velocidad de revelación no dependa de cuánto más alta es la sección en
// móvil por el text-wrap de una columna angosta — mismo feel en cualquier
// pantalla, a diferencia de rebanar una única scrollYProgress de sección.
function Stop({ index, titleKey, paragraphs, quote, quoteLead, closing, isFinal }: StopProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'start 0.42'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [22, 0])
  const markerOpacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 1])
  const markerScale = useTransform(scrollYProgress, [0, 0.4], [0.75, 1])

  return (
    <div ref={ref} className="relative pl-14 md:pl-20">
      <motion.div
        style={{ opacity: markerOpacity, scale: markerScale }}
        className={`absolute left-0 md:left-0.5 top-0 rounded-full bg-crema dark:bg-bosque-surface border-2 border-dorado flex items-center justify-center z-10 ${
          isFinal
            ? 'w-12 h-12 md:w-14 md:h-14 shadow-[0_0_20px_rgba(212,162,78,0.65)]'
            : 'w-9 h-9 md:w-11 md:h-11 shadow-md'
        }`}
      >
        <MarkerIcon index={index} isFinal={isFinal} />
      </motion.div>

      <motion.div style={{ opacity, y }}>
        <h3 className="font-fraunces text-2xl md:text-3xl text-bosque dark:text-crema mb-3">
          {t(`about.historia.stops.${titleKey}.title`)}
        </h3>
        <div className="space-y-4 font-inter text-carbon dark:text-crema text-base md:text-lg leading-relaxed">
          {paragraphs.map((p) => (
            <p key={p}>{t(`about.historia.${p}`)}</p>
          ))}
          {quoteLead && <p>{t(`about.historia.${quoteLead}`)}</p>}
        </div>
        {quote && (
          <blockquote className="mt-5 border-l-4 border-dorado pl-5 md:pl-6 font-fraunces italic text-xl md:text-2xl text-bosque dark:text-crema leading-snug">
            {t(`about.historia.${quote}`)}
          </blockquote>
        )}
        {closing && (
          <p className="mt-6 font-fraunces text-xl md:text-2xl text-bosque dark:text-crema leading-relaxed">
            {t(`about.historia.${closing}`)}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export function HistoriaSendero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.9', 'end 0.25'] })
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 })

  return (
    <section ref={sectionRef} className="relative bg-white/80 dark:bg-bosque-surface/80 py-24 px-4 overflow-hidden">
      {TRAIL_FAUNA.map((f, i) => (
        <FaunaSprite
          key={i}
          img={f.img}
          size={f.size}
          duration={f.duration}
          drift={f.drift}
          delay={f.delay}
          flip={f.flip}
          className="hidden lg:block opacity-70"
          style={{ top: f.top, [f.side]: '4%' }}
        />
      ))}

      <div className="max-w-3xl mx-auto relative">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema mb-16 text-center">
          {t('about.historia.heading')}
        </h2>

        <div className="relative">
          <svg
            aria-hidden
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            className="absolute left-2 md:left-3 top-1 w-6 md:w-8 h-[calc(100%-0.5rem)]"
          >
            <path
              d={TRAIL_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="0.5 4"
              strokeLinecap="round"
              className="text-musgo/40 dark:text-musgo/50"
            />
            <motion.path d={TRAIL_PATH} fill="none" stroke="url(#senderoGradient)" strokeWidth={2} strokeLinecap="round" style={{ pathLength }} />
            <defs>
              <linearGradient id="senderoGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A24E" />
                <stop offset="100%" stopColor="#6B8F5A" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col gap-14 md:gap-28">
            {STOPS.map((s, i) => (
              <Stop key={s.titleKey} index={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
