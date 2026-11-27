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
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-end justify-center px-4 pb-6 md:pb-8">
      {mediaType === 'video' ? (
        <video src={mediaSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <img src={mediaSrc} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {/* Degradado oscuro solo en el 15% inferior: el centro de la imagen queda libre */}
      <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/75 to-transparent" />
      <motion.div style={{ scale, opacity }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  )
}
