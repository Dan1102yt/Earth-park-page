import { useTranslation } from 'react-i18next'

// El fondo, overlay y fade-in ahora los controla ScrollExpandMedia (Home.tsx) —
// este componente es solo el contenido revelado al 100% de la expansión.
export function EssenceMoment() {
  const { t } = useTranslation()

  return (
    <p className="font-fraunces text-4xl md:text-6xl text-crema text-center max-w-3xl leading-tight px-8 py-6 rounded-2xl bg-bosque/35 dark:bg-bosque-deep/40 backdrop-blur-sm">
      {t('essence.title')}
    </p>
  )
}
