import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ModalGalleryProps {
  images: string[]
  alt: string
  initialIndex?: number
  objectPositions?: (string | undefined)[] // encuadre por foto, opcional (default: center)
  /**
   * Galería responsive (Planes): celular = carrusel deslizable 4/5 con puntos y contador;
   * escritorio (md+) = visor 4/3 con flechas y miniaturas. Sin esto se mantiene la galería clásica
   * (Blog, Hospedaje).
   */
  responsive?: boolean
  /** Encuadre por foto en el carrusel vertical del celular (default: objectPositions) */
  objectPositionsMobile?: (string | undefined)[]
  /** srcset por foto (solo las que tienen variantes) */
  srcSets?: (string | undefined)[]
  sizes?: string
  /**
   * Ajuste por foto en el carrusel del celular. 'contain' muestra la foto completa sobre un
   * fondo desenfocado de la misma foto (para panorámicas). Default: 'cover'.
   */
  mobileFits?: ('cover' | 'contain')[]
  /** Versión liviana de cada foto para el fondo desenfocado (default: la misma foto) */
  blurSrcs?: (string | undefined)[]
}

export function ModalGallery(props: ModalGalleryProps) {
  return props.responsive ? <ResponsiveGallery {...props} /> : <ClassicGallery {...props} />
}

function ClassicGallery({ images, alt, initialIndex = 0, objectPositions }: ModalGalleryProps) {
  const [index, setIndex] = useState(initialIndex)

  return (
    <div>
      <div className="relative h-72 sm:h-96 bg-carbon/10">
        <img
          src={images[index]}
          alt={`${alt} — foto ${index + 1}`}
          loading="lazy"
          style={{ objectPosition: objectPositions?.[index] }}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === index ? 'border-terracota dark:border-dorado' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                style={{ objectPosition: objectPositions?.[i] }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ResponsiveGallery({
  images,
  alt,
  initialIndex = 0,
  objectPositions,
  objectPositionsMobile,
  srcSets,
  sizes,
  mobileFits,
  blurSrcs,
}: ModalGalleryProps) {
  const total = images.length
  const multi = total > 1
  const [index, setIndex] = useState(initialIndex)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const firstSync = useRef(true)
  // Foto a la que el carrusel se está moviendo por código (teclado / puntos); mientras tanto
  // se ignoran los eventos de scroll para que la animación no cambie el índice a medio camino.
  const scrollTarget = useRef<number | null>(null)

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  // Teclado: flechas cambian de foto (Esc lo maneja el Modal)
  useEffect(() => {
    if (!multi) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); setIndex((i) => (i + 1) % total) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setIndex((i) => (i - 1 + total) % total) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [multi, total])

  // Celular: lleva el carrusel a la foto activa (teclado / puntos). Oculto en escritorio → clientWidth 0.
  useEffect(() => {
    const track = trackRef.current
    if (track && track.clientWidth) {
      const current = Math.round(track.scrollLeft / track.clientWidth)
      if (current !== index) {
        scrollTarget.current = index
        // Paso a la foto vecina: animado. Saltos largos (puntos, vuelta al inicio): directo.
        const smooth = !firstSync.current && Math.abs(current - index) === 1
        track.scrollTo({ left: index * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' })
      }
    }
    firstSync.current = false
    // Escritorio: mantiene visible la miniatura activa
    const strip = thumbsRef.current
    const thumb = strip?.children[index] as HTMLElement | undefined
    if (strip && thumb && strip.clientWidth) {
      strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: 'smooth' })
    }
  }, [index])

  useEffect(() => () => window.clearTimeout(settleTimer.current), [])

  // Al deslizar con el dedo: actualiza el índice cuando el scroll se detiene
  const onTrackScroll = () => {
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current
      if (!track || !track.clientWidth) return
      const settled = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)))
      if (scrollTarget.current !== null) {
        if (settled === scrollTarget.current) scrollTarget.current = null
        return
      }
      setIndex(settled)
    }, 120)
  }
  // Si el usuario toca el carrusel, manda su gesto sobre cualquier movimiento por código
  const releaseTarget = () => { scrollTarget.current = null }

  const imgProps = (i: number) => ({
    src: images[i],
    srcSet: srcSets?.[i],
    sizes: srcSets?.[i] ? sizes : undefined,
    alt: `${alt} — foto ${i + 1}`,
    loading: (i === 0 ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: 'async' as const,
  })

  return (
    <div>
      {/* Celular: carrusel deslizable */}
      <div className="md:hidden">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={multi ? onTrackScroll : undefined}
            onTouchStart={multi ? releaseTarget : undefined}
            onPointerDown={multi ? releaseTarget : undefined}
            role="region"
            aria-roledescription="carrusel"
            aria-label={alt}
            className="flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((img, i) => (
              <div
                key={img}
                role="group"
                aria-roledescription="foto"
                aria-label={`${i + 1} / ${total}`}
                className="relative overflow-hidden w-full shrink-0 snap-center snap-always aspect-[4/5] max-h-[70svh] bg-carbon/10"
              >
                {mobileFits?.[i] === 'contain' && (
                  <img
                    src={blurSrcs?.[i] ?? img}
                    alt=""
                    aria-hidden="true"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl brightness-90"
                  />
                )}
                <img
                  {...imgProps(i)}
                  draggable={false}
                  style={{ objectPosition: objectPositionsMobile?.[i] ?? objectPositions?.[i] }}
                  className={`relative w-full h-full ${mobileFits?.[i] === 'contain' ? 'object-contain' : 'object-cover'}`}
                />
              </div>
            ))}
          </div>
          {multi && (
            <span
              aria-live="polite"
              className="absolute top-3 left-3 bg-carbon/60 text-crema font-heading text-xs font-semibold px-2.5 py-1 rounded-full tabular-nums"
            >
              {index + 1}/{total}
            </span>
          )}
        </div>
        {multi && (
          <div className="flex flex-wrap justify-center gap-0.5 px-3 pt-2">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                className="p-1"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? 'w-5 bg-terracota dark:bg-dorado' : 'w-2 bg-carbon/25 dark:bg-crema/30'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Escritorio: visor 4/3 con flechas y miniaturas */}
      <div className="hidden md:block">
        <div className="relative aspect-[4/3] bg-carbon/10">
          <img
            {...imgProps(index)}
            style={{ objectPosition: objectPositions?.[index] }}
            className="w-full h-full object-cover"
          />
          {multi && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-11 h-11 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-11 h-11 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
        {multi && (
          <div ref={thumbsRef} className="relative flex gap-2 p-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === index
                    ? 'border-terracota dark:border-dorado ring-2 ring-terracota/30 dark:ring-dorado/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: objectPositions?.[i] }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
