import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '573228697438'

const btnBase =
  'inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-heading font-bold text-base transition-colors duration-200'

/** Franja compacta bajo el hero: acciones principales + horario (no tapa el video). */
export function HeroActions() {
  const { t } = useTranslation()
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('heroActions.whatsappMessage'))}`

  return (
    <section className="bg-crema dark:bg-bosque-deep border-b border-bosque/10 dark:border-crema/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link to="/planes-turisticos" className={`${btnBase} bg-terracota hover:bg-terracota/90 text-crema shadow-md`}>
            {t('heroActions.plans')}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} border-2 border-bosque text-bosque hover:bg-bosque hover:text-crema dark:border-crema dark:text-crema dark:hover:bg-crema dark:hover:text-bosque-deep`}
          >
            <MessageCircle size={18} className="shrink-0" />
            {t('heroActions.whatsapp')}
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 font-heading font-medium text-base text-carbon dark:text-crema text-center">
          <Clock size={18} className="shrink-0 text-terracota dark:text-dorado" />
          {t('heroActions.hours')}
        </p>
      </div>
    </section>
  )
}
