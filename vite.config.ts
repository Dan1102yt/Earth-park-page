import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

// Lee el flag de src/config/fonts.ts (fuente única de verdad)
const USE_LICENSED_FONTS = /USE_LICENSED_FONTS\s*=\s*true/.test(
  readFileSync(resolve(__dirname, 'src/config/fonts.ts'), 'utf8'),
)

// Sin licencia web, Matura y Helvetica Light no deben quedar en dist/
// (Vite copia public/ completo al build).
function excludeLicensedFonts(): Plugin {
  return {
    name: 'exclude-licensed-fonts',
    apply: 'build',
    closeBundle() {
      if (USE_LICENSED_FONTS) return
      for (const f of ['matura.woff2', 'helvetica-light.woff2']) {
        rmSync(resolve(__dirname, 'dist/fonts', f), { force: true })
      }
    },
  }
}

// Lee el flag de src/config/map.ts
const SHOW_MAP = /SHOW_MAP\s*=\s*true/.test(readFileSync(resolve(__dirname, 'src/config/map.ts'), 'utf8'))

// Con el mapa oculto, la imagen (archivo-mapa/, 4,8 MB) no debe llegar a dist/: las
// importaciones dinámicas se emiten aunque estén en una rama muerta, así que la
// reemplazamos por un módulo vacío.
function excludeHiddenMap(): Plugin {
  const EMPTY = '\0hidden-map'
  return {
    name: 'exclude-hidden-map',
    enforce: 'pre',
    resolveId(source) {
      if (!SHOW_MAP && source.endsWith('archivo-mapa/mapa-earth-park.png')) return EMPTY
    },
    load(id) {
      if (id === EMPTY) return 'export default ""'
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), excludeLicensedFonts(), excludeHiddenMap()],
})
