import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  children: ReactNode
}

// Fondo fijo a tamaño completo (sin animar tamaño): solo el contenido hace
// zoom-in + fade conforme la sección entra en el viewport durante el scroll.
export function ScrollExpandMedia({ mediaType = 'video', mediaSrc, children }: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center px-4">
      {mediaType === 'video' ? (
        <video src={mediaSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <img src={mediaSrc} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-bosque/62 dark:bg-bosque-deep/68" />
      <motion.div style={{ scale, opacity }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  )
}
