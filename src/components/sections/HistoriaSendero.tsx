import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { asset } from '../../lib/asset'

const TREASURE_ICON = asset('/images/Mariposas/5.png')

// Trazo con leve ondulación, en un viewBox angosto: preserveAspectRatio="none"
// lo estira para llenar la altura real de la columna sin importar el largo del texto.
const TRAIL_PATH = 'M12,0 C4,10 20,18 12,28 C4,38 20,46 12,56 C4,66 20,74 12,84 C4,92 20,97 12,100'

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
  total: number
  scrollYProgress: MotionValue<number>
  titleKey: string
  paragraphs: readonly string[]
  quote?: string
  quoteLead?: string
  closing?: string
  isFinal?: boolean
}

function Stop({ index, total, scrollYProgress, titleKey, paragraphs, quote, quoteLead, closing, isFinal }: StopProps) {
  const { t } = useTranslation()
  const start = index / total
  const end = (index + 0.7) / total
  const markerStart = Math.max(0, start - 0.04)
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [28, 0])
  const markerOpacity = useTransform(scrollYProgress, [markerStart, start + 0.02], [0.35, 1])
  const markerScale = useTransform(scrollYProgress, [markerStart, start + 0.02], [0.75, 1])

  return (
    <div className="relative pl-14 md:pl-20">
      <motion.div
        style={{ opacity: markerOpacity, scale: markerScale }}
        className={`absolute left-0 md:left-0.5 top-0 rounded-full bg-crema dark:bg-bosque-surface border-2 border-dorado flex items-center justify-center z-10 ${
          isFinal ? 'w-12 h-12 md:w-14 md:h-14 shadow-[0_0_16px_rgba(212,162,78,0.55)]' : 'w-9 h-9 md:w-11 md:h-11 shadow-md'
        }`}
      >
        {isFinal ? (
          <img src={TREASURE_ICON} alt="" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
        ) : (
          <span className="font-fraunces text-dorado text-sm md:text-base">{index + 1}</span>
        )}
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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 })

  return (
    <section ref={sectionRef} className="relative bg-white/80 dark:bg-bosque-surface/80 py-24 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
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

          <div className="flex flex-col gap-20 md:gap-28">
            {STOPS.map((s, i) => (
              <Stop key={s.titleKey} index={i} total={STOPS.length} scrollYProgress={scrollYProgress} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
