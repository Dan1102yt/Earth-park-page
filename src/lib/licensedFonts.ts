import { asset } from './asset'

/**
 * Registra Matura MT (display) y Helvetica Light (cuerpo) y activa las
 * variables de [data-fonts="licensed"] en index.css.
 * Solo se llama si USE_LICENSED_FONTS es true; con false Rollup elimina este
 * código del bundle.
 */
export function loadLicensedFonts() {
  const css = `
@font-face {
  font-family: 'Matura Brand';
  src: url('${asset('/fonts/matura.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Helvetica Light Brand';
  src: url('${asset('/fonts/helvetica-light.woff2')}') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}`
  const style = document.createElement('style')
  style.dataset.licensedFonts = ''
  style.textContent = css
  document.head.appendChild(style)
  document.documentElement.dataset.fonts = 'licensed'
}
