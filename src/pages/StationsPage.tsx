import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { Modal } from '../components/ui/Modal'
import { asset } from '../lib/asset'

const MAP_IMAGE = asset('/images/estaciones/mapa-earth-park.png')

interface Station {
  id: string
  x: number
  y: number
  image?: string
}

// Coordenadas en % ajustadas a ojo sobre la ilustracion real del mapa —
// el texto pintado en la imagen tiene inconsistencias menores, por eso se
// ubican por posicion visual relativa en vez de confiar en las etiquetas.
const stations: Station[] = [
  { id: 'piramide', x: 91, y: 15, image: asset('/images/estaciones/estacion-piramide.jpeg') },
  { id: 'mariposa-88', x: 76, y: 31, image: asset('/images/estaciones/estacion-mariposa.jpeg') },
  { id: 'aire', x: 63, y: 52 },
  { id: 'agua', x: 88, y: 68 },
  { id: 'fuego', x: 50, y: 75, image: asset('/images/estaciones/estacion-fuego.jpeg') },
  { id: 'tierra', x: 22, y: 53 },
  { id: 'luna-360', x: 68, y: 15, image: asset('/images/estaciones/estacion-luna360.jpeg') },
  { id: 'rover-lunar', x: 56, y: 13, image: asset('/images/estaciones/estacion-rover.jpeg') },
]

const zones: { id: string; x: number; y: number }[] = [
  { id: 'parqueadero', x: 10, y: 15 },
  { id: 'restaurante', x: 18, y: 28 },
  { id: 'casa-principal', x: 36, y: 25 },
  { id: 'hotel', x: 14, y: 45 },
  { id: 'hamacas', x: 41, y: 16 },
  { id: 'vivero-cafe', x: 53, y: 23 },
  { id: 'camping', x: 42, y: 74 },
  { id: 'mariposario', x: 74, y: 78 },
  { id: 'bosque', x: 50, y: 92 },
  { id: 'salida', x: 29, y: 80 },
]

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
              <p className="font-inter text-carbon/70 dark:text-crema/70 leading-relaxed">{t('stationsPage.placeholderDesc')}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
