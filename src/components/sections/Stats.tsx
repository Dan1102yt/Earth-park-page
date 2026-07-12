import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

interface StatItem {
  target: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

const stats: StatItem[] = [
  { target: 500, prefix: '+', suffix: '', label: 'Visitantes felices' },
  { target: 7, prefix: '', suffix: '', label: 'Estaciones temáticas' },
  { target: 6, prefix: '', suffix: '', label: 'Planes disponibles' },
  { target: 2.5, decimals: 1, prefix: '', suffix: 'hrs', label: 'Desde Bogotá' },
]

function Counter({ target, decimals = 0, prefix = '', suffix = '' }: StatItem) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const steps = 50
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setCount(decimals ? Math.round(current * 10) / 10 : Math.floor(current))
      if (step >= steps) {
        setCount(target)
        clearInterval(timer)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target, decimals])

  const display = decimals ? count.toFixed(decimals) : count

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="font-display text-5xl text-gold leading-none mb-2">
                <Counter {...stat} />
              </p>
              <p className="font-body text-sm text-cream/80 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
