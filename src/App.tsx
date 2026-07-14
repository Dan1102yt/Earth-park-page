import { HashRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'
import { StationsPage } from './pages/StationsPage'
import { GalleryShop } from './pages/GalleryShop'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Lodging } from './pages/Lodging'
import { Gastronomy } from './pages/Gastronomy'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-crema dark:bg-bosque-deep flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planes-turisticos" element={<Plans />} />
            <Route path="/estaciones" element={<StationsPage />} />
            <Route path="/galeria-arte" element={<GalleryShop />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/hospedaje" element={<Lodging />} />
            <Route path="/gastronomia" element={<Gastronomy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
