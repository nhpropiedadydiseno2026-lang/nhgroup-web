'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&fit=crop',
    label: 'Residencias de lujo',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&fit=crop',
    label: 'Casas en venta',
  },
  {
    src: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=85&fit=crop',
    label: 'Propiedades premium',
  },
  {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=85&fit=crop',
    label: 'Tu próxima inversión',
  },
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&fit=crop',
    label: 'Construcción residencial',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&fit=crop',
    label: 'Arquitectura moderna',
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=85&fit=crop',
    label: 'Estilo de vida premium',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85&fit=crop',
    label: 'Desarrollos residenciales',
  },
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
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* ── CARRUSEL FONDO COMPLETO ── */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
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

        {/* Overlay: oscuro izquierda para texto, transparente derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* ── CONTROLES ── */}
      <button onClick={() => go(-1)} aria-label="Anterior"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button onClick={() => go(1)} aria-label="Siguiente"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-7 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── LOGO OFICIAL sobre el carrusel ── */}
      <div className="absolute top-6 right-20 z-20 hidden md:block">
        <motion.img
          src="/gallery/Logo NH Premium.png"
          alt="NHGroup Logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="h-16 w-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Label actual */}
      <AnimatePresence mode="wait">
        <motion.div key={`lbl-${current}`}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-8 right-8 z-20 hidden md:block">
          <div className="bg-black/35 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
            <span className="text-white/80 text-xs font-medium">{slides[current].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENIDO CENTRADO ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="max-w-2xl">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 mb-7">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold-light text-xs tracking-[0.2em] uppercase font-semibold">Querétaro · Toluca</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-white drop-shadow-lg">
              Bienes Raíces{' '}
              <span className="gold-gradient">sin letra</span>{' '}
              <span className="gold-gradient">chica.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              +17 años en el mercado. Rentas, preventas, terrenos, casas y más.
              Operaciones honestas con precios claros desde el inicio.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12">
              <motion.a href="#contacto"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.5)' }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-lg">
                Habla con nosotros <ArrowRight size={16} />
              </motion.a>
              <motion.a href="#servicios"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 backdrop-blur-sm text-white font-semibold text-sm border border-white/30 hover:bg-white/25 transition-all">
                Ver servicios
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 text-sm text-white/65">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-gold-light" />Plaza Xentric Zibatá, Querétaro</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-gold-light" />+52 442 200 4936</div>
            </motion.div>
          </div>

          {/* Stats esquina inferior derecha */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute bottom-20 right-8 hidden lg:flex gap-4">
            {[
              { value: '+17', label: 'Años' },
              { value: '8', label: 'Servicios' },
              { value: '45d', label: 'Cierre' },
            ].map((s, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
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
