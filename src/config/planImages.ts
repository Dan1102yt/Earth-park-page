import { asset } from '../lib/asset'
import type { PlanMeta } from '../components/sections/PlansPreview'

export const DEFAULT_POSITION = '50% 50%'

/** Portada del plan (default: primera foto) */
export const coverOf = (plan: PlanMeta) => plan.cover ?? plan.images[0]

/**
 * Encuadre de cada foto del modal. Una posición propia (objectPositions) manda;
 * si no hay, la portada usa coverPositionMobile / coverPositionDesktop.
 */
export function galleryPositions(plan: PlanMeta, mode: 'mobile' | 'desktop'): (string | undefined)[] {
  const coverPos = mode === 'mobile' ? plan.coverPositionMobile : plan.coverPositionDesktop
  return plan.images.map((img, i) => plan.objectPositions?.[i] ?? (img === coverOf(plan) ? coverPos : undefined))
}

/**
 * Variantes WebP de las portadas de los planes, en public/images/planes/portadas/
 * (<nombre>-480.webp, <nombre>-800.webp). Solo existen las que son más angostas
 * que el original: nunca se escala hacia arriba. El original entra al srcset con
 * su ancho real.
 *
 * Clave: ruta del original dentro de public/. Valor: ancho real y variantes generadas.
 */
const RESPONSIVE: Record<string, { width: number; variants: number[] }> = {
  '/images/planes/tesoros-del-valle-de-tenza/tesoros-del-valle-de-tenza-1.webp': { width: 1200, variants: [480, 800] },
  '/images/planes/conoce-y-descansa-en-macanal/conoce-y-descansa-en-macanal-1.webp': { width: 738, variants: [480] },
  '/images/planes/planes-Conoce-el-Hollywood-Boyacense.jpg': { width: 1017, variants: [480, 800] },
  '/images/planes/vive-earth-park/vive-earth-park-1.webp': { width: 1200, variants: [480, 800] },
  '/images/planes/instituciones/instituciones-1.webp': { width: 1200, variants: [480, 800] },
}

/** srcset de una foto de plan (URL ya pasada por asset()), o undefined si no tiene variantes */
export function planSrcSet(url: string): string | undefined {
  const base = import.meta.env.BASE_URL
  const key = '/' + (url.startsWith(base) ? url.slice(base.length) : url).replace(/^\//, '')
  const entry = RESPONSIVE[key]
  if (!entry) return undefined
  const name = key.split('/').pop()!.replace(/\.[^.]+$/, '')
  return [
    ...entry.variants.map((w) => `${asset(`/images/planes/portadas/${name}-${w}.webp`)} ${w}w`),
    `${url} ${entry.width}w`,
  ].join(', ')
}

/** sizes de la foto en la tarjeta de Planes (grid 1 / 2 / 3 columnas en max-w-7xl) */
export const PLAN_CARD_SIZES = '(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 128px) / 3), (min-width: 640px) calc((100vw - 80px) / 2), calc(100vw - 32px)'

/** sizes de la foto en la tarjeta del Home (grid 1 / 3 columnas desde md) */
export const PLAN_TEASER_SIZES = '(min-width: 1280px) 384px, (min-width: 768px) calc((100vw - 112px) / 3), calc(100vw - 32px)'

/** sizes de la foto en el modal (max-w-3xl con p-4) */
export const PLAN_MODAL_SIZES = '(min-width: 800px) 768px, calc(100vw - 32px)'
