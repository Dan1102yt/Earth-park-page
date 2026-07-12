import { Location } from '../components/sections/Location'

export function PlanVisit() {
  return (
    <div className="min-h-screen">
      <div className="bg-bosque pt-32 pb-16 px-4 text-center">
        <h1 className="font-fraunces text-4xl md:text-5xl text-crema mb-3">Planea tu Visita</h1>
        <p className="font-inter text-crema/80 max-w-xl mx-auto">
          Todo lo que necesitas saber para llegar y disfrutar Earth Park
        </p>
      </div>
      <Location />
    </div>
  )
}
