import { useState } from 'react'
import { Link, useLocation, type Location } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

interface NavChild { key: string; to: string }
interface NavLink { key: string; to: string; children?: NavChild[] }

const navLinks: NavLink[] = [
  { key: 'nav.home', to: '/' },
  {
    key: 'nav.about',
    to: '/nosotros',
    children: [
      { key: 'nav.ourHistory', to: '/nosotros' },
      { key: 'nav.themePark', to: '/estaciones' },
      { key: 'nav.lodging', to: '/hospedaje' },
      { key: 'nav.gastronomy', to: '/gastronomia' },
    ],
  },
  { key: 'nav.plans', to: '/planes-turisticos' },
  { key: 'nav.gallery', to: '/galeria-arte' },
  { key: 'nav.contact', to: '/contacto' },
]

function DesktopNavItem({ link, scrolled, location, t }: { link: NavLink; scrolled: boolean; location: Location; t: TFunction }) {
  const [open, setOpen] = useState(false)
  const active = link.to === location.pathname || (link.children?.some((c) => c.to === location.pathname) ?? false)
  const colorClass = active
    ? 'text-terracota dark:text-dorado'
    : scrolled
      ? 'text-carbon/80 hover:text-bosque dark:text-crema/80 dark:hover:text-crema'
      : 'text-crema/80 hover:text-crema'

  if (!link.children) {
    return (
      <Link key={link.key} to={link.to} className={`font-inter text-base font-medium transition-colors duration-200 ${colorClass}`}>
        {t(link.key)}
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        to={link.to}
        className={`flex items-center gap-1 font-inter text-base font-medium transition-colors duration-200 ${colorClass}`}
      >
        {t(link.key)}
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 pt-3 min-w-[13rem]"
          >
            <div className="bg-crema dark:bg-bosque-deep rounded-xl shadow-lg border border-bosque/10 dark:border-crema/10 py-2 overflow-hidden">
              {link.children.map((child) => (
                <Link
                  key={child.key}
                  to={child.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 font-inter text-sm transition-colors ${
                    location.pathname === child.to
                      ? 'text-terracota dark:text-dorado bg-carbon/5 dark:bg-crema/5'
                      : 'text-carbon/80 dark:text-crema/80 hover:bg-carbon/5 dark:hover:bg-crema/5 hover:text-bosque dark:hover:text-crema'
                  }`}
                >
                  {t(child.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileNavItem({ link, t, onNavigate }: { link: NavLink; t: TFunction; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)

  if (!link.children) {
    return (
      <Link
        to={link.to}
        className="font-inter text-lg font-medium text-carbon/80 hover:text-bosque dark:text-crema/80 dark:hover:text-crema py-3 border-b border-bosque/10 dark:border-crema/10 last:border-0 transition-colors"
        onClick={onNavigate}
      >
        {t(link.key)}
      </Link>
    )
  }

  return (
    <div className="border-b border-bosque/10 dark:border-crema/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full font-inter text-lg font-medium text-carbon/80 hover:text-bosque dark:text-crema/80 dark:hover:text-crema py-3 transition-colors"
      >
        {t(link.key)}
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-2 pl-4">
              {link.children.map((child) => (
                <Link
                  key={child.key}
                  to={child.to}
                  onClick={onNavigate}
                  className="font-inter text-base text-carbon/70 dark:text-crema/70 hover:text-bosque dark:hover:text-crema py-2.5 transition-colors"
                >
                  {t(child.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
        scrolled
          ? 'bg-crema/95 dark:bg-bosque-deep/95 backdrop-blur-md shadow-lg border-b border-bosque/10 dark:border-crema/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={asset('/images/logo.png')}
              alt="Earth Park"
              className={`h-14 sm:h-16 w-auto object-contain transition-all duration-300 ${
                scrolled ? '' : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.key} link={link} scrolled={scrolled} location={location} t={t} />
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
            <a href="https://wa.me/573228697438" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
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
              {navLinks.map((link) => (
                <MobileNavItem key={link.key} link={link} t={t} onNavigate={() => setMobileOpen(false)} />
              ))}
              <a
                href="https://wa.me/573228697438"
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
