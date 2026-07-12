import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.plans', to: '/planes-turisticos' },
  { key: 'nav.visit', to: '/planea-tu-visita' },
  { key: 'nav.stations', to: '/estaciones' },
  { key: 'nav.gallery', to: '/galeria-arte' },
  { key: 'nav.contact', to: '/contacto' },
]

export function Navbar() {
  const scrolled = useScrollNavbar()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-crema/95 dark:bg-bosque-deep/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`shrink-0 font-fraunces text-2xl font-semibold transition-colors duration-300 ${
              scrolled ? 'text-bosque dark:text-crema' : 'text-crema'
            }`}
          >
            Earth Park
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className={`font-inter text-sm transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-terracota dark:text-dorado'
                    : scrolled
                      ? 'text-carbon/80 hover:text-bosque dark:text-crema/80 dark:hover:text-crema'
                      : 'text-crema/80 hover:text-crema'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className={`p-1.5 rounded-full transition-colors ${
                scrolled
                  ? 'text-carbon/70 hover:text-carbon dark:text-crema/70 dark:hover:text-crema'
                  : 'text-crema/80 hover:text-crema'
              }`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className={`font-inter text-sm transition-colors px-2 py-1 rounded border ${
                scrolled
                  ? 'text-carbon/70 hover:text-carbon border-carbon/20 hover:border-carbon/50 dark:text-crema/70 dark:hover:text-crema dark:border-crema/20 dark:hover:border-crema/50'
                  : 'text-crema/70 hover:text-crema border-crema/20 hover:border-crema/50'
              }`}
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Reserve button */}
            <a href="https://wa.me/573233195919" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button variant="terracota" size="sm">{t('nav.reserve')}</Button>
            </a>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-1 transition-colors duration-300 ${scrolled ? 'text-bosque dark:text-crema' : 'text-crema'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-crema/95 dark:bg-bosque-deep/95 backdrop-blur-md border-t border-bosque/10 dark:border-crema/10"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map(({ key, to }) => (
                <Link
                  key={key}
                  to={to}
                  className="font-inter text-carbon/80 hover:text-bosque dark:text-crema/80 dark:hover:text-crema py-3 border-b border-bosque/10 dark:border-crema/10 last:border-0 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <a
                href="https://wa.me/573233195919"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="terracota" className="w-full">{t('nav.reserve')}</Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
