/**
 * Tipografía de marca.
 *
 * false (por defecto, lo que se publica): toda la web usa Figtree (libre, OFL,
 *   autoalojada con @fontsource). Matura MT y Helvetica Light NO se cargan y
 *   vite.config.ts las elimina de dist/.
 * true: Matura (títulos cortos de marca) + Figtree (H2/H3, menú, botones,
 *   precios) + Helvetica Light (párrafos). Solo activar con licencia web.
 *
 * Todo el CSS usa --font-display / --font-heading / --font-body, así que el
 * cambio es solo esta línea.
 */
export const USE_LICENSED_FONTS = false

/**
 * Clase para un título: usa --font-display (Matura con licencia) solo si el
 * texto tiene como máximo 4 palabras; si es más largo usa --font-heading en
 * negrita, porque la script en mayúsculas cuesta leerla en frases largas.
 * Los títulos que la usan tienen tamaño >= 28px.
 */
export const displayClass = (text: string) =>
  text.trim().split(/\s+/).length <= 4 ? 'font-display' : 'font-heading font-bold'
