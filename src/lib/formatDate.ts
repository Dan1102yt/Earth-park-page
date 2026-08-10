export function formatDate(iso: string, lang: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CO', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
