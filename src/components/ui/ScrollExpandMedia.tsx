import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  bgImageSrc: string
  title?: string
  scrollHint?: string
  children: ReactNode
}

// Sensibilidad del scroll-jack: mayor = expansion mas lenta/suave. Calibrado a mano
// para que no se sienta brusco (probado con rueda de mouse y touch en Playwright).
const WHEEL_DELTA_DIVISOR = 3200
const TOUCH_DELTA_DIVISOR = 900

// Adaptado de un componente de referencia para Next.js (scroll-expand hero media):
// sin 'use client', sin next/image, mismo patron de wheel/touch para expandir el
// media hasta pantalla completa y revelar contenido al terminar.
export function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  bgImageSrc,
  title,
  scrollHint,
  children,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(false)
  const touchStartY = useRef(0)

  // Solo "engancha" el scroll cuando la sección ya está mayormente visible
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.6 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active || expanded) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setProgress((p) => {
        const next = Math.min(1, Math.max(0, p + e.deltaY / WHEEL_DELTA_DIVISOR))
        if (next >= 1) setExpanded(true)
        return next
      })
    }
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const delta = touchStartY.current - e.touches[0].clientY
      touchStartY.current = e.touches[0].clientY
      setProgress((p) => {
        const next = Math.min(1, Math.max(0, p + delta / TOUCH_DELTA_DIVISOR))
        if (next >= 1) setExpanded(true)
        return next
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [active, expanded])

  const mediaScale = 0.6 + progress * 0.4
  const mediaRadius = 32 * (1 - progress)
  const titleOpacity = Math.max(0, 1 - progress / 0.4)
  const contentOpacity = Math.max(0, (progress - 0.7) / 0.3)

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      <img src={bgImageSrc} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-bosque/50 dark:bg-bosque-deep/60" />

      <div
        style={{ transform: `scale(${mediaScale})`, borderRadius: mediaRadius }}
        className="relative w-full h-full overflow-hidden shadow-2xl will-change-transform"
      >
        {mediaType === 'video' ? (
          <video src={mediaSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={mediaSrc} alt="" loading="lazy" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-bosque/40 dark:bg-bosque-deep/50" />
      </div>

      {title && (
        <h2
          style={{ opacity: titleOpacity }}
          className="absolute z-10 font-fraunces font-semibold text-3xl md:text-5xl text-crema text-center px-6 pointer-events-none"
        >
          {title}
        </h2>
      )}

      {scrollHint && (
        <p
          style={{ opacity: Math.max(0, 1 - progress / 0.15) }}
          className="absolute bottom-8 z-10 font-inter text-crema/70 dark:text-dorado/70 text-sm animate-bounce pointer-events-none"
        >
          {scrollHint}
        </p>
      )}

      <div
        style={{ opacity: contentOpacity, pointerEvents: contentOpacity > 0.05 ? 'auto' : 'none' }}
        className="absolute inset-0 z-20 flex items-center justify-center px-4"
      >
        {children}
      </div>
    </section>
  )
}
