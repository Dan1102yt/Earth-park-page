import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { asset } from '../../lib/asset'

// public/images/Mariposas: 1-6 mariposas, 7-9 pajaros/colibries, 10 abeja
const fauna = (n: number) => asset(`/images/Mariposas/${n}.png`)

interface Spot {
  img: number
  style: React.CSSProperties
  size: string
  duration: number
  drift: [number, number]
  delay: number
  flip?: boolean
  hideMobile?: boolean
}

// Deriva de posicion (loop largo) + aleteo por rotacion (loop corto, ver <motion.img>).
// Distribucion por ruta: esquinas + cercania a los H1 de cada pagina, variando entre
// paginas para que la fauna se sienta viva al navegar.
const routeSpots: Record<string, Spot[]> = {
  '/': [
    { img: 1, style: { top: '17%', left: '4%' }, size: 'w-14 sm:w-20', duration: 8, drift: [16, 10], delay: 0 },
    { img: 3, style: { top: '13%', right: '5%' }, size: 'w-12 sm:w-16', duration: 7, drift: [-14, 12], delay: 0.6, flip: true },
    { img: 7, style: { bottom: '12%', right: '4%' }, size: 'w-14 sm:w-20', duration: 9, drift: [-10, -14], delay: 1.2, hideMobile: true },
    { img: 5, style: { bottom: '18%', left: '5%' }, size: 'w-10 sm:w-14', duration: 6.5, drift: [10, -10], delay: 0.3, hideMobile: true },
  ],
  '/nosotros': [
    { img: 2, style: { top: '18%', left: '4%' }, size: 'w-12 sm:w-16', duration: 7.5, drift: [12, 10], delay: 0.2 },
    { img: 8, style: { top: '22%', right: '5%' }, size: 'w-14 sm:w-18', duration: 8.5, drift: [-14, 8], delay: 0.8, hideMobile: true },
    { img: 5, style: { bottom: '10%', left: '6%' }, size: 'w-10 sm:w-14', duration: 6, drift: [8, -12], delay: 0.5, flip: true },
  ],
  '/planes-turisticos': [
    { img: 3, style: { top: '16%', right: '4%' }, size: 'w-12 sm:w-16', duration: 7, drift: [-12, 10], delay: 0 },
    { img: 6, style: { top: '20%', left: '5%' }, size: 'w-10 sm:w-14', duration: 8, drift: [10, 8], delay: 0.5, flip: true },
    { img: 1, style: { bottom: '8%', right: '6%' }, size: 'w-12 sm:w-16', duration: 6.5, drift: [-10, -10], delay: 1, hideMobile: true },
  ],
  '/estaciones': [
    { img: 4, style: { top: '15%', left: '4%' }, size: 'w-12 sm:w-16', duration: 7.5, drift: [12, 10], delay: 0.1 },
    { img: 5, style: { top: '18%', right: '5%' }, size: 'w-10 sm:w-14', duration: 8, drift: [-10, 12], delay: 0.7, hideMobile: true },
    { img: 10, style: { bottom: '10%', left: '6%' }, size: 'w-8 sm:w-11', duration: 5.5, drift: [8, -8], delay: 0.4 },
  ],
  '/hospedaje': [
    { img: 7, style: { top: '16%', right: '4%' }, size: 'w-14 sm:w-20', duration: 8.5, drift: [-14, 10], delay: 0 },
    { img: 9, style: { top: '20%', left: '5%' }, size: 'w-12 sm:w-16', duration: 7, drift: [10, 12], delay: 0.6, hideMobile: true },
    { img: 2, style: { bottom: '10%', right: '6%' }, size: 'w-10 sm:w-14', duration: 6.5, drift: [-8, -10], delay: 0.3, flip: true },
  ],
  '/gastronomia': [
    { img: 10, style: { top: '17%', left: '5%' }, size: 'w-9 sm:w-12', duration: 5.5, drift: [10, 8], delay: 0 },
    { img: 3, style: { top: '20%', right: '4%' }, size: 'w-12 sm:w-16', duration: 7.5, drift: [-12, 10], delay: 0.6, hideMobile: true },
    { img: 6, style: { bottom: '12%', left: '6%' }, size: 'w-10 sm:w-14', duration: 8, drift: [8, -12], delay: 0.9 },
  ],
  '/galeria-arte': [
    { img: 1, style: { top: '16%', right: '5%' }, size: 'w-12 sm:w-16', duration: 7, drift: [-10, 12], delay: 0 },
    { img: 4, style: { top: '20%', left: '4%' }, size: 'w-10 sm:w-14', duration: 8, drift: [12, 8], delay: 0.5, flip: true, hideMobile: true },
    { img: 6, style: { bottom: '10%', right: '6%' }, size: 'w-12 sm:w-16', duration: 6.5, drift: [-8, -10], delay: 1 },
  ],
  '/contacto': [
    { img: 8, style: { top: '15%', left: '5%' }, size: 'w-14 sm:w-18', duration: 8.5, drift: [12, 10], delay: 0 },
    { img: 9, style: { top: '19%', right: '4%' }, size: 'w-12 sm:w-16', duration: 7, drift: [-10, 12], delay: 0.6, hideMobile: true },
    { img: 5, style: { bottom: '10%', left: '6%' }, size: 'w-10 sm:w-14', duration: 6, drift: [8, -10], delay: 0.4 },
  ],
}

export function AnimatedFauna() {
  const { pathname } = useLocation()
  const spots = routeSpots[pathname] ?? routeSpots['/']

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {spots.map((s, i) => (
        <motion.div
          key={`${pathname}-${s.img}-${i}`}
          className={`absolute ${s.hideMobile ? 'hidden sm:block' : ''}`}
          style={s.style}
          animate={{ x: [0, s.drift[0], 0], y: [0, s.drift[1], 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <motion.img
            src={fauna(s.img)}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`${s.size} object-contain opacity-80 select-none ${s.flip ? '-scale-x-100' : ''}`}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay * 0.4 }}
          />
        </motion.div>
      ))}
    </div>
  )
}
