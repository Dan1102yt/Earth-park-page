import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { ESTACIONES, getEstacion, pick } from '../data/estaciones'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'

const navBtn =
  'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-base transition-colors duration-200'
const navBtnSolid = `${navBtn} bg-terracota hover:bg-terracota/90 text-crema`
const navBtnOutline = `${navBtn} border-2 border-bosque text-bosque hover:bg-bosque hover:text-crema dark:border-crema dark:text-crema dark:hover:bg-crema dark:hover:text-bosque-deep`

export function StationDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const estacion = getEstacion(slug)

  if (!estacion) {
    return (
      <div className="min-h-screen">
        <PageHeaderBand title={t('stationDetail.notFoundTitle')} subtitle={t('stationDetail.notFoundText')} />
        <div className="py-16 px-4 text-center">
          <Link to="/estaciones" className={navBtnSolid}>
            <LayoutGrid size={18} />
            {t('stationDetail.all')}
          </Link>
        </div>
      </div>
    )
  }

  const index = ESTACIONES.indexOf(estacion)
  const prev = ESTACIONES[(index - 1 + ESTACIONES.length) % ESTACIONES.length]
  const next = ESTACIONES[(index + 1) % ESTACIONES.length]
  const nombre = pick(estacion.nombre, i18n.language)
  const multi = estacion.fotos.length > 1

  return (
    <div className="min-h-screen">
      {/* Franja oscura arriba: el navbar transparente (texto crema) necesita fondo oscuro */}
      <div className="bg-bosque dark:bg-bosque-deep pt-28 lg:pt-36 pb-12 px-4">
        <div className={`max-w-4xl mx-auto grid gap-4 ${multi ? 'sm:grid-cols-2' : ''}`}>
          {estacion.fotos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? nombre : ''}
              loading="lazy"
              className={`w-full object-cover rounded-3xl shadow-lg ${multi ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}
            />
          ))}
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 pt-10 pb-24">
        <p className="font-heading text-sm uppercase tracking-widest text-terracota dark:text-dorado mb-2">
          {t('stationDetail.counter', { current: index + 1, total: ESTACIONES.length })}
        </p>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-bosque dark:text-crema mb-6">{nombre}</h1>
        <div className="space-y-5 font-body text-body text-carbon dark:text-crema mb-12">
          {pick(estacion.texto, i18n.language).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-bosque/10 dark:border-crema/10 pt-8">
          <Link to={`/estaciones/${prev.slug}`} className={navBtnOutline}>
            <ArrowLeft size={18} className="shrink-0" />
            {t('stationDetail.prev')}
          </Link>
          <Link to="/estaciones" className={navBtnSolid}>
            <LayoutGrid size={18} className="shrink-0" />
            {t('stationDetail.all')}
          </Link>
          <Link to={`/estaciones/${next.slug}`} className={navBtnOutline}>
            {t('stationDetail.next')}
            <ArrowRight size={18} className="shrink-0" />
          </Link>
        </nav>
      </article>
    </div>
  )
}
