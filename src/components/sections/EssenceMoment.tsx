import { useTranslation } from 'react-i18next'

// El fondo, overlay y fade-in ahora los controla ScrollExpandMedia (Home.tsx) —
// este componente es solo el contenido revelado al 100% de la expansión.
export function EssenceMoment() {
  const { t } = useTranslation()

  return (
    <p className="font-heading text-base md:text-xl text-crema text-center max-w-3xl leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
      {t('essence.title')}
    </p>
  )
}
