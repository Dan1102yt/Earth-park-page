import { motion } from 'framer-motion'
import { faunaImg } from '../../lib/asset'

export interface FaunaSpriteProps {
  img: number
  size?: string
  duration?: number
  drift?: [number, number]
  delay?: number
  flip?: boolean
  className?: string
  style?: React.CSSProperties
}

// Deriva de posicion (loop largo) + aleteo por rotacion (loop corto). Compartido
// entre AnimatedFauna (decoracion fija de pagina) y secciones que quieran fauna
// posicionada dentro de su propio flujo (ej. HistoriaSendero).
export function FaunaSprite({ img, size = 'w-12 sm:w-16', duration = 7, drift = [12, 10], delay = 0, flip, className = '', style }: FaunaSpriteProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={style}
      animate={{ x: [0, drift[0], 0], y: [0, drift[1], 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <motion.img
        src={faunaImg(img)}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`${size} object-contain opacity-80 select-none ${flip ? '-scale-x-100' : ''}`}
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }}
      />
    </motion.div>
  )
}
