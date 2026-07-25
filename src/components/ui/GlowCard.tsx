import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

type GlowColor = 'yellow' | 'neon'

// Degradado amarillo -> verde neón para el spotlight (en rgb, para rgba() en el gradiente)
const GLOW_RGB: Record<GlowColor, string> = {
  yellow: '212, 225, 87', // #D4E157
  neon: '57, 255, 20', // #39FF14
}

interface GlowCardProps {
  children: ReactNode
  glowColor?: GlowColor
  className?: string
}

// Spotlight que sigue el cursor: una capa de brillo suave sobre el fondo y un anillo
// de brillo en el borde (recortado con mask-composite), ambos posicionados via --x/--y.
export function GlowCard({ children, glowColor = 'yellow', className = '' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rgb = GLOW_RGB[glowColor]

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current?.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`group relative isolate rounded-3xl ${className}`}
      style={{ '--x': '50%', '--y': '50%' } as CSSProperties}
    >
      {/* Brillo de fondo, suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--x) var(--y), rgba(${rgb}, 0.22), transparent 70%)`,
        }}
      />
      {/* Anillo de brillo en el borde */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          {
            padding: 1,
            background: `radial-gradient(220px circle at var(--x) var(--y), rgba(${rgb}, 0.9), transparent 70%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          } as CSSProperties
        }
      />
      {children}
    </div>
  )
}
