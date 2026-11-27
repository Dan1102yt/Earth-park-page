import type { CSSProperties, ReactNode } from 'react'
import type { PlanMeta } from '../sections/PlansPreview'
import { coverOf, DEFAULT_POSITION, planSrcSet } from '../../config/planImages'

interface PlanCoverProps {
  plan: PlanMeta
  alt: string
  sizes: string
  /** true solo si la tarjeta aparece en la primera pantalla */
  eager?: boolean
  children?: ReactNode
}

/**
 * Portada de un plan. Proporción: celular 4/5, tablet 4/3, escritorio 16/10.
 * La caja vertical (celular) usa coverPositionMobile; las horizontales
 * (desde sm) usan coverPositionDesktop.
 */
export function PlanCover({ plan, alt, sizes, eager = false, children }: PlanCoverProps) {
  const src = coverOf(plan)
  const style = {
    '--pos-m': plan.coverPositionMobile ?? DEFAULT_POSITION,
    '--pos-d': plan.coverPositionDesktop ?? plan.coverPositionMobile ?? DEFAULT_POSITION,
  } as CSSProperties

  return (
    <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/10]">
      <img
        src={src}
        srcSet={planSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={style}
        className="w-full h-full object-cover [object-position:var(--pos-m)] sm:[object-position:var(--pos-d)]"
      />
      {children}
    </div>
  )
}
