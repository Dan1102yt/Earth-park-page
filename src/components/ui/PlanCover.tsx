import type { CSSProperties, ReactNode } from 'react'
import type { PlanMeta } from '../sections/PlansPreview'
import { coverMobileOf, coverOf, COVER_DESKTOP_MEDIA, DEFAULT_POSITION, planSrcSet } from '../../config/planImages'

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
 * <768px usa coverMobile con coverPositionMobile; ≥768px usa cover con coverPositionDesktop.
 */
export function PlanCover({ plan, alt, sizes, eager = false, children }: PlanCoverProps) {
  const desktop = coverOf(plan)
  const mobile = coverMobileOf(plan)
  const style = {
    '--pos-m': plan.coverPositionMobile ?? DEFAULT_POSITION,
    '--pos-d': plan.coverPositionDesktop ?? plan.coverPositionMobile ?? DEFAULT_POSITION,
  } as CSSProperties

  return (
    <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/10]">
      <picture>
        {mobile !== desktop && (
          <source media={COVER_DESKTOP_MEDIA} srcSet={planSrcSet(desktop) ?? desktop} sizes={sizes} />
        )}
        <img
          src={mobile}
          srcSet={planSrcSet(mobile)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={style}
          className="w-full h-full object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
        />
      </picture>
      {children}
    </div>
  )
}
