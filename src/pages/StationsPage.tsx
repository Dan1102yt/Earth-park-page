import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Wind, Droplet, Flame, Mountain } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Modal } from '../components/ui/Modal'
import { asset } from '../lib/asset'

const MAP_IMAGE = asset('/images/estaciones/mapa-earth-park.jpeg')

interface Station {
  id: string
  x: number
  y: number
  image?: string
}

// Coordenadas en % ajustadas a ojo sobre la ilustracion real del mapa —
// afinar despues comparando visualmente si alguna queda desalineada.
const stations: Station[] = [
  { id: 'piramide', x: 93, y: 8, image: asset('/images/estaciones/estacion-piramide.jpeg') },
  { id: 'mariposa-88', x: 76, y: 30, image: asset('/images/estaciones/estacion-mariposa.jpeg') },
  { id: 'cuatro-elementos', x: 50, y: 47, image: asset('/images/estaciones/estacion-fuego.jpeg') },
  { id: 'luna-360', x: 62, y: 10, image: asset('/images/estaciones/estacion-luna360.jpeg') },
  { id: 'rover-lunar', x: 77, y: 43, image: asset('/images/estaciones/estacion-rover.jpeg') },
  { id: 'vivero-cafe', x: 54, y: 17 },
]

const zones: { id: string; x: number; y: number }[] = [
  { id: 'hotel', x: 13, y: 34 },
  { id: 'restaurante', x: 17, y: 21 },
  { id: 'hamacas', x: 39, y: 8 },
  { id: 'camping', x: 57, y: 35 },
  { id: 'bosque', x: 49, y: 73 },
  { id: 'parqueadero', x: 21, y: 8 },
]

const elementIcons = { aire: Wind, agua: Droplet, fuego: Flame, tierra: Mountain } as const

export function StationsPage() {
  const { t } = useTranslation()
  const [activeStation, setActiveStation] = useState<Station | null>(null)
  const [activeZone, setActiveZone] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <PageHeaderBand title={t('stationsPage.heading')} subtitle={t('stationsPage.subtitle')} />

      <div className="max-w-2xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="font-inter text-carbon/70 dark:text-crema/70">{t('stationsPage.intro')}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-lg select-none" onClick={() => setActiveZone(null)}>
          <img src={MAP_IMAGE} alt={t('stationsPage.heading')} className="w-full h-auto block" />

          {stations.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setActiveZone(null)
                setActiveStation(s)
              }}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-dorado border-2 border-crema shadow-md flex items-center justify-center font-fraunces font-bold text-carbon text-sm md:text-base hover:scale-110 transition-transform"
              aria-label={t(`stationsPage.items.${s.id}.title`)}
            >
              {i + 1}
            </button>
          ))}

          {zones.map((z) => (
            <div key={z.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: `${z.x}%`, top: `${z.y}%` }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveZone((current) => (current === z.id ? null : z.id))
                }}
                aria-label={t(`stationsPage.zones.${z.id}`)}
                className="w-3.5 h-3.5 rounded-full bg-carbon/60 dark:bg-crema/80 border border-crema dark:border-bosque-deep shadow-sm hover:scale-125 transition-transform"
              />
              {activeZone === z.id && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-carbon text-crema text-xs font-inter px-2 py-1 rounded-md shadow-md">
                  {t(`stationsPage.zones.${z.id}`)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal open={activeStation !== null} onClose={() => setActiveStation(null)}>
        {activeStation && (
          <div>
            <div className="h-56 sm:h-72 overflow-hidden bg-gradient-to-br from-bosque to-musgo dark:from-bosque-deep dark:to-bosque flex items-center justify-center">
              {activeStation.image ? (
                <img src={activeStation.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <MapPin className="w-16 h-16 text-crema/40" />
              )}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-fraunces text-3xl text-bosque dark:text-crema mb-3">
                {t(`stationsPage.items.${activeStation.id}.title`)}
              </h2>
              {activeStation.id === 'cuatro-elementos' && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Object.keys(elementIcons) as (keyof typeof elementIcons)[]).map((el) => {
                    const ElIcon = elementIcons[el]
                    return (
                      <span
                        key={el}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-musgo/15 dark:bg-crema/10 text-bosque dark:text-crema text-sm font-inter"
                      >
                        <ElIcon size={14} /> {t(`stationsPage.elements.${el}`)}
                      </span>
                    )
                  })}
                </div>
              )}
              <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed">{t('stationsPage.placeholderDesc')}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
