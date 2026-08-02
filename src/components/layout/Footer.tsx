import { Link } from 'react-router-dom'
import { MessageCircle, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { asset } from '../../lib/asset'
import { usePlans } from '../sections/PlansPreview'

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

const FOOTER_BG = asset('/images/hero/hero-galeria-8.jpeg')
const WHATSAPP_URL = 'https://wa.me/573228697438'

const menuLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/nosotros' },
  { key: 'nav.stations', to: '/estaciones' },
  { key: 'nav.lodging', to: '/hospedaje' },
  { key: 'nav.gastronomy', to: '/gastronomia' },
  { key: 'nav.gallery', to: '/galeria-arte' },
  { key: 'nav.contact', to: '/contacto' },
]

const colTitle = 'font-inter text-dorado text-xs font-bold uppercase tracking-widest mb-5'
const linkStyle = 'font-inter text-crema/60 hover:text-crema text-sm transition-colors'

export function Footer() {
  const { t } = useTranslation()
  const plans = usePlans()

  return (
    <footer className="relative border-t-2 border-dorado/40 overflow-hidden">
      <img src={FOOTER_BG} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-bosque/95 dark:bg-bosque-deep/96" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Earth Park */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={asset('/images/logo.png')} alt="Earth Park" className="h-12 w-auto object-contain" />
              <span className="font-fraunces text-xl text-crema">Earth Park</span>
            </div>
            <p className="font-inter text-crema/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Col 2: Menú */}
          <div>
            <h4 className={colTitle}>{t('footer.navHeading')}</h4>
            <ul className="space-y-2.5">
              {menuLinks.map(({ key, to }) => (
                <li key={to}>
                  <Link to={to} className={linkStyle}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Planes */}
          <div>
            <h4 className={colTitle}>{t('nav.plans')}</h4>
            <ul className="space-y-2.5">
              {plans.map((plan) => (
                <li key={plan.slug}>
                  <Link to="/planes-turisticos" className={linkStyle}>{plan.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div>
            <h4 className={colTitle}>{t('footer.contactHeading')}</h4>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-crema/80 hover:text-crema text-sm transition-colors mb-4"
            >
              <MessageCircle size={16} className="shrink-0 text-dorado" />
              {t('ctaReserva.button')}
            </a>
            <Link
              to="/contacto"
              className="flex items-start gap-2 font-inter text-crema/60 hover:text-crema text-sm transition-colors mb-6"
            >
              <MapPin size={16} className="shrink-0 text-dorado mt-0.5" />
              {t('contact.addressLine1')}
            </Link>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/earthpark.co" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram" className="text-crema/60 hover:text-dorado transition-colors">
                <IconInstagram />
              </a>
              <a href="https://tiktok.com/@earthpark.co" target="_blank" rel="noopener noreferrer"
                aria-label="TikTok" className="text-crema/60 hover:text-dorado transition-colors">
                <IconTikTok />
              </a>
              <a href="https://facebook.com/earthpark" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" className="text-crema/60 hover:text-dorado transition-colors">
                <IconFacebook />
              </a>
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
