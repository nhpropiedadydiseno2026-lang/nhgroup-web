'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const slides = [
  { src: '/gallery/interior-1.jpg', label: 'Sala con vista al lago' },
  { src: '/gallery/exterior-1.jpg', label: 'Terraza con alberca premium' },
  { src: '/gallery/interior-2.jpg', label: 'Residencia de piedra natural' },
  { src: '/gallery/aerial-1.jpg', label: 'Desarrollo residencial Querétaro' },
  { src: '/gallery/exterior-2.jpg', label: 'Jardín tropical con alberca' },
  { src: '/gallery/interior-4.jpg', label: 'Sala abierta al jardín' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => { setDirection(1); setCurrent(i => (i + 1) % slides.length) }, 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent(i => (i + dir + slides.length) % slides.length)
  }

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

      {/* ── FULL SCREEN CAROUSEL ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[current].src}
              alt={slides[current].label}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.background = 'linear-gradient(135deg, #f8f6f1 0%, #e8e4dc 100%)'
                el.src = ''
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay oscuro degradado — legibilidad + elegancia */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* ── CONTROLES ── */}
      <button onClick={() => go(-1)} aria-label="Anterior"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button onClick={() => go(1)} aria-label="Siguiente"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all">
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`transition-all duration-400 rounded-full ${i === current ? 'w-7 h-2 bg-gold' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide label */}
      <AnimatePresence mode="wait">
        <motion.div key={`lbl-${current}`}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="absolute bottom-8 right-6 z-20 hidden md:block">
          <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
            <span className="text-white/80 text-xs font-medium">{slides[current].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 mb-7">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-light text-xs tracking-[0.2em] uppercase font-semibold">Querétaro · Toluca · México</span>
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
            className="flex flex-wrap gap-5 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-light" />
              Plaza Xentric Zibatá, Querétaro
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gold-light" />
              +52 442 200 4936
            </div>
          </motion.div>
        </div>

        {/* Stats flotantes — esquina derecha */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
          {[
            { value: '+17', label: 'Años en el mercado' },
            { value: '8', label: 'Servicios activos' },
            { value: '45d', label: 'Cierre promedio' },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ x: -4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 text-right transition-all">
              <div className="font-display text-3xl font-bold gold-gradient">{s.value}</div>
              <div className="text-white/70 text-xs">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
