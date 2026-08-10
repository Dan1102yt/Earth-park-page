import { HashRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AnimatedFauna } from './components/ui/AnimatedFauna'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'
import { StationsPage } from './pages/StationsPage'
import { GalleryShop } from './pages/GalleryShop'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Lodging } from './pages/Lodging'
import { Gastronomy } from './pages/Gastronomy'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AnimatedFauna />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planes-turisticos" element={<Plans />} />
            <Route path="/estaciones" element={<StationsPage />} />
            <Route path="/galeria-arte" element={<GalleryShop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
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
