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

// https://vite.dev/config/
export default defineConfig({
  base: '/Earth-park-page/',
  plugins: [react(), excludeLicensedFonts()],
})
