import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
// Figtree (OFL), autoalojada: pesos 300/400/500/700, solo latin + latin-ext
import '@fontsource/figtree/latin-300.css'
import '@fontsource/figtree/latin-ext-300.css'
import '@fontsource/figtree/latin-400.css'
import '@fontsource/figtree/latin-ext-400.css'
import '@fontsource/figtree/latin-500.css'
import '@fontsource/figtree/latin-ext-500.css'
import '@fontsource/figtree/latin-700.css'
import '@fontsource/figtree/latin-ext-700.css'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { USE_LICENSED_FONTS } from './config/fonts'
import { loadLicensedFonts } from './lib/licensedFonts'

if (USE_LICENSED_FONTS) loadLicensedFonts()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
