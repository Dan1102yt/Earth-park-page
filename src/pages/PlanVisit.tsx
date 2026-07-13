import { Location } from '../components/sections/Location'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { asset } from '../lib/asset'

export function PlanVisit() {
  return (
    <div className="min-h-screen">
      <PageHeaderBand
        title="Planea tu Visita"
        subtitle="Todo lo que necesitas saber para llegar y disfrutar Earth Park"
        image={asset('/images/hero/hero-naturaleza.jpg')}
      />
      <Location />
    </div>
  )
}
