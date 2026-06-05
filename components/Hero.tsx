'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const slides = [
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&fit=crop', label: 'Residencias de lujo' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&fit=crop', label: 'Casas en venta' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=85&fit=crop', label: 'Tu próxima inversión' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85&fit=crop', label: 'Desarrollos residenciales' },
  { src: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=85&fit=crop', label: 'Propiedades premium' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=85&fit=crop', label: 'Estilo de vida premium' },
  { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&q=85&fit=crop', label: 'Casa familiar moderna' },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=85&fit=crop', label: 'Diseño contemporáneo' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85&fit=crop', label: 'Interiores modernos' },
  { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=85&fit=crop', label: 'Sala de estar de lujo' },
  { src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1920&q=85&fit=crop', label: 'Cocina de diseño' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85&fit=crop', label: 'Alberca privada' },
  { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=85&fit=crop', label: 'Terraza con vista' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&fit=crop', label: 'Construcción residencial' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&fit=crop', label: 'Minimalismo residencial' },
  { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1920&q=85&fit=crop', label: 'Recámaras premium' },
  { src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=85&fit=crop', label: 'Casas con jardín' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=85&fit=crop', label: 'Baños de lujo' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&fit=crop', label: 'Arquitectura moderna' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85&fit=crop', label: 'Espacios luminosos' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setCurrent(i => (i + 1) % slides.length)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent(i => (i + dir + slides.length) % slides.length)
  }

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[500px] overflow-hidden">

      {/* ── CARRUSEL FONDO ── */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[current].src}
              alt={slides[current].label}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* ── LOGO sobre imagen — solo desktop ── */}
      <div className="absolute top-24 right-6 z-20 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gallery/Logo NH Premium.png" alt="NHGroup" className="h-14 w-auto object-contain drop-shadow-lg" />
      </div>

      {/* ── CONTROLES ── */}
      <button onClick={() => go(-1)} aria-label="Anterior"
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronLeft size={18} className="text-white" />
      </button>
      <button onClick={() => go(1)} aria-label="Siguiente"
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Dots — solo 5 visibles en mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
        {slides.slice(0, 10).map((_, i) => (
          <button key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Label — solo desktop */}
      <AnimatePresence mode="wait">
        <motion.div key={`lbl-${current}`}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="absolute bottom-6 right-5 z-20 hidden md:block">
          <div className="bg-black/35 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5">
            <span className="text-white/80 text-xs font-medium">{slides[current].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-5 md:px-10 lg:px-16 max-w-7xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-light text-[11px] tracking-[0.15em] uppercase font-semibold">Querétaro · Toluca</span>
          </motion.div>

          {/* Título */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 md:mb-6 text-white drop-shadow-lg max-w-2xl">
            Bienes Raíces{' '}
            <span className="gold-gradient">sin letra</span>{' '}
            <span className="gold-gradient">chica.</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-7 max-w-lg">
            +17 años en el mercado. Rentas, preventas, terrenos, casas y más.
            Operaciones honestas con precios claros.
          </motion.p>

          {/* Botones */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-8">
            <motion.a href="#contacto"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-white font-bold text-sm shadow-lg">
              Habla con nosotros <ArrowRight size={15} />
            </motion.a>
            <motion.a href="#servicios"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-sm text-white font-semibold text-sm border border-white/30 hover:bg-white/25 transition-all">
              Ver servicios
            </motion.a>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 text-sm text-white/65">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-gold-light flex-shrink-0" />
              <span className="text-xs md:text-sm">Plaza Xentric Zibatá, Querétaro</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-gold-light flex-shrink-0" />
              <span className="text-xs md:text-sm">+52 442 200 4936</span>
            </div>
          </motion.div>

          {/* Stats — solo desktop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute bottom-16 right-6 hidden lg:flex gap-3">
            {[{ value: '+17', label: 'Años' }, { value: '8', label: 'Servicios' }, { value: '45d', label: 'Cierre' }].map((s, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                <div className="font-display text-2xl font-bold gold-gradient">{s.value}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
