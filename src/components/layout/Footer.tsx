import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { asset } from '../../lib/asset'

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.plans', to: '/planes-turisticos' },
  { key: 'nav.stations', to: '/estaciones' },
  { key: 'nav.gallery', to: '/galeria-arte' },
  { key: 'nav.contact', to: '/contacto' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-bosque dark:bg-bosque-deep border-t border-musgo/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={asset('/logo.png')} alt="Earth Park" className="h-12 w-auto object-contain" />
              <span className="font-fraunces text-xl text-crema">Earth Park</span>
            </div>
            <p className="font-inter text-crema/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com/earthpark.co" target="_blank" rel="noopener noreferrer"
                className="text-crema/50 hover:text-dorado transition-colors">
                <IconInstagram />
              </a>
              <a href="https://tiktok.com/@earthpark.co" target="_blank" rel="noopener noreferrer"
                className="text-crema/50 hover:text-dorado transition-colors">
                <IconTikTok />
              </a>
              <a href="https://facebook.com/earthpark" target="_blank" rel="noopener noreferrer"
                className="text-crema/50 hover:text-dorado transition-colors">
                <IconFacebook />
              </a>
              <a href="https://x.com/earthpark" target="_blank" rel="noopener noreferrer"
                className="text-crema/50 hover:text-dorado transition-colors">
                <IconX />
              </a>
            </div>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <h4 className="font-fraunces text-crema text-lg mb-4">{t('footer.navHeading')}</h4>
            <ul className="space-y-2">
              {navLinks.map(({ key, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-inter text-crema/60 hover:text-crema text-sm transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-fraunces text-crema text-lg mb-4">{t('footer.contactHeading')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-crema/60 text-sm">
                <Phone size={16} className="shrink-0 text-dorado" />
                <a href="tel:+573233195919" className="hover:text-crema transition-colors">
                  +57 323 3195919
                </a>
              </li>
              <li className="flex items-center gap-3 text-crema/60 text-sm">
                <Mail size={16} className="shrink-0 text-dorado" />
                <a href="mailto:info@earthpark.com.co" className="hover:text-crema transition-colors">
                  info@earthpark.com.co
                </a>
              </li>
              <li className="flex items-center gap-3 text-crema/60 text-sm">
                <Mail size={16} className="shrink-0 text-dorado" />
                <a href="mailto:earthparkmacanal@gmail.com" className="hover:text-crema transition-colors">
                  earthparkmacanal@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 text-crema/40 text-sm">
              <p>Instagram: @earthpark.co</p>
              <p>TikTok: @earthpark.co</p>
            </div>
          </div>
        </div>

        <div className="border-t border-crema/10 mt-10 pt-6 text-center">
          <p className="font-inter text-crema/40 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
