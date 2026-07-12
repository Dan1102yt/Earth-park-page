import { HashRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'
import { PlanVisit } from './pages/PlanVisit'
import { StationsPage } from './pages/StationsPage'
import { GalleryShop } from './pages/GalleryShop'
import { Contact } from './pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-dark flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planes-turisticos" element={<Plans />} />
            <Route path="/planea-tu-visita" element={<PlanVisit />} />
            <Route path="/estaciones" element={<StationsPage />} />
            <Route path="/galeria-arte" element={<GalleryShop />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
