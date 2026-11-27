import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pick, type Estacion } from '../../data/estaciones'

/** Tarjeta de estación: foto, nombre y resumen, enlazada a /estaciones/<slug> */
export function StationCard({ estacion, tone = 'light' }: { estacion: Estacion; tone?: 'light' | 'dark' }) {
  const { i18n } = useTranslation()
  const nombre = pick(estacion.nombre, i18n.language)
  const dark = tone === 'dark'

  return (
    <Link
      to={`/estaciones/${estacion.slug}`}
      className={`group block h-full rounded-2xl overflow-hidden border transition-colors ${
        dark
          ? 'bg-crema/10 border-crema/10 hover:border-dorado/60'
          : 'bg-white dark:bg-bosque-surface border-bosque/10 dark:border-crema/10 hover:border-dorado/70 shadow-sm hover:shadow-lg'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={estacion.fotos[0]}
          alt={nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className={`font-heading text-lg mb-1 ${dark ? 'text-crema' : 'text-bosque dark:text-crema'}`}>{nombre}</h3>
        <p className={`font-body text-body ${dark ? 'text-crema/90' : 'text-carbon dark:text-crema'}`}>
          {pick(estacion.resumen, i18n.language)}
        </p>
      </div>
    </Link>
  )
}
