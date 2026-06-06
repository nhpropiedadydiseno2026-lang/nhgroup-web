import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Catalogo from '@/components/Catalogo'
import Services from '@/components/Services'
import About from '@/components/About'
import Process from '@/components/Process'
import Precalificador from '@/components/Precalificador'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Catalogo />
      <Services />
      <About />
      <Process />
      <Precalificador />
      <Contact />
      <Footer />
    </main>
  )
}
