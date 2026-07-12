import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Stats } from '../components/sections/Stats'
import { Stations } from '../components/sections/Stations'
import { PlansPreview } from '../components/sections/PlansPreview'
import { Testimonials } from '../components/sections/Testimonials'
import { Location } from '../components/sections/Location'
import { CTAReserva } from '../components/sections/CTAReserva'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Stations />
      <PlansPreview />
      <Testimonials />
      <Location />
      <CTAReserva />
    </>
  )
}
