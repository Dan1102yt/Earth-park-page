import { asset } from '../lib/asset'
import type { PlanMeta } from '../components/sections/PlansPreview'

export const DEFAULT_POSITION = '50% 50%'

/** Punto de corte celular / escritorio de las portadas (Tailwind md) */
export const COVER_DESKTOP_MEDIA = '(min-width: 768px)'

/** Portada del plan en escritorio (default: primera foto) */
export const coverOf = (plan: PlanMeta) => plan.cover ?? plan.images[0]

/** Portada del plan en celular (<768px). Default: la misma de escritorio */
export const coverMobileOf = (plan: PlanMeta) => plan.coverMobile ?? coverOf(plan)

/**
 * Encuadre de cada foto del modal. Una posición propia (objectPositions) manda;
 * si no hay, la portada de cada modo usa su coverPosition.
 */
export function galleryPositions(plan: PlanMeta, mode: 'mobile' | 'desktop'): (string | undefined)[] {
  const cover = mode === 'mobile' ? coverMobileOf(plan) : coverOf(plan)
  const coverPos = mode === 'mobile' ? plan.coverPositionMobile : plan.coverPositionDesktop
  return plan.images.map((img, i) => plan.objectPositions?.[i] ?? (img === cover ? coverPos : undefined))
}

interface ResponsiveEntry {
  /** ancho real del archivo de la clave */
  width: number
  /** alto real (si se conoce: permite detectar panorámicas) */
  height?: number
  /** anchos de las variantes <nombre>-<ancho>.webp (solo menores al original: nunca se escala hacia arriba) */
  variants: number[]
  /** carpeta de las variantes (default: /images/planes/portadas) */
  dir?: string
}

const MACANAL_DIR = '/images/planes/conoce-y-descansa-en-macanal'
// Fotos de Macanal: <nombre>.webp es la variante grande (1600 px, o el ancho original si es menor),
// con <nombre>-480/-800/-1200.webp en la misma carpeta. Origen: fotos-seleccionadas/macanal/
const macanal = (name: string, width: number, height: number): [string, ResponsiveEntry] => [
  `${MACANAL_DIR}/${name}.webp`,
  { width, height, variants: [480, 800, 1200], dir: MACANAL_DIR },
]

/**
 * Variantes WebP de las fotos de planes. El archivo de la clave entra al srcset con su ancho real.
 * Clave: ruta dentro de public/.
 */
const RESPONSIVE: Record<string, ResponsiveEntry> = Object.fromEntries([
  ['/images/planes/tesoros-del-valle-de-tenza/tesoros-del-valle-de-tenza-1.webp', { width: 1200, variants: [480, 800] }],
  ['/images/planes/planes-Conoce-el-Hollywood-Boyacense.jpg', { width: 1017, variants: [480, 800] }],
  ['/images/planes/vive-earth-park/vive-earth-park-1.webp', { width: 1200, variants: [480, 800] }],
  ['/images/planes/instituciones/instituciones-1.webp', { width: 1200, variants: [480, 800] }],
  macanal('macanal-piscina-lago-h', 1600, 722),
  macanal('macanal-lancha', 1600, 722),
  macanal('macanal-piscina-lago-v', 1600, 3548),
  macanal('macanal-parque', 1600, 722),
  macanal('macanal-cascada', 1472, 3264),
  macanal('macanal-atardecer-h', 1600, 722),
  macanal('macanal-atardecer-v', 1600, 3548),
  macanal('macanal-moto-acuatica', 1600, 722),
])

function lookup(url: string) {
  const base = import.meta.env.BASE_URL
  const key = '/' + (url.startsWith(base) ? url.slice(base.length) : url).replace(/^\//, '')
  const entry = RESPONSIVE[key]
  if (!entry) return undefined
  const name = key.split('/').pop()!.replace(/\.[^.]+$/, '')
  const variant = (w: number) => asset(`${entry.dir ?? '/images/planes/portadas'}/${name}-${w}.webp`)
  return { entry, variant }
}

/** srcset de una foto de plan (URL ya pasada por asset()), o undefined si no tiene variantes */
export function planSrcSet(url: string): string | undefined {
  const found = lookup(url)
  if (!found) return undefined
  return [...found.entry.variants.map((w) => `${found.variant(w)} ${w}w`), `${url} ${found.entry.width}w`].join(', ')
}

/** Versión más liviana de la foto (para el fondo desenfocado) */
export function planSmallSrc(url: string): string {
  const found = lookup(url)
  return found?.entry.variants.length ? found.variant(found.entry.variants[0]) : url
}

/**
 * Ajuste en el carrusel del celular: las panorámicas (más de 1.4:1) se muestran completas
 * (contain sobre fondo desenfocado); el resto, cover. Sin dimensiones conocidas: cover.
 */
export function planMobileFit(url: string): 'cover' | 'contain' {
  const entry = lookup(url)?.entry
  return entry?.height && entry.width / entry.height > 1.4 ? 'contain' : 'cover'
}

/** sizes de la foto en la tarjeta de Planes (grid 1 / 2 / 3 columnas en max-w-7xl) */
export const PLAN_CARD_SIZES = '(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 128px) / 3), (min-width: 640px) calc((100vw - 80px) / 2), calc(100vw - 32px)'

/** sizes de la foto en la tarjeta del Home (grid 1 / 3 columnas desde md) */
export const PLAN_TEASER_SIZES = '(min-width: 1280px) 384px, (min-width: 768px) calc((100vw - 112px) / 3), calc(100vw - 32px)'

/** sizes de la foto en el modal (max-w-3xl con p-4) */
export const PLAN_MODAL_SIZES = '(min-width: 800px) 768px, calc(100vw - 32px)'
