import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Sincroniza meta description, og:description y <html lang> con el idioma activo. */
export function SeoMeta() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const description = t('seo.description')
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'es'
  }, [t, i18n.language])

  return null
}
