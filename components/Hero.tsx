'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const slides = [
  { src: '/gallery/real-1.jpg', label: 'Sala con vista al lago' },
  { src: '/gallery/real-2.jpg', label: 'Residencia de piedra natural' },
  { src: '/gallery/real-3.jpg', label: 'Terraza con alberca premium' },
  { src: '/gallery/real-4.jpg', label: 'Jardín tropical con alberca' },
  { src: '/gallery/real-5.jpg', label: 'Sala con techo de cristal' },
  { src: '/gallery/real-6.jpg', label: 'Sala abierta al jardín' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setCurrent(i => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent(i => (i + dir + slides.length) % slides.length)
  }

  return (
    <section id="inicio" className="relative min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">

      {/* ── IZQUIERDA: CONTENIDO ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-32 lg:py-0 lg:w-[52%] bg-white">

        {/* Línea dorada lateral */}
        <div className="absolute right-0 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-dark border border-cream-border mb-8 w-fit"
        >
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold-dark text-xs tracking-[0.2em] uppercase font-semibold">
            Querétaro · Toluca · México
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6 text-ink"
        >
          Bienes Raíces{' '}
          <br />
          <span className="gold-gradient">sin letra</span>{' '}
          <span className="gold-gradient">chica.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-ink-40 text-lg leading-relaxed max-w-lg mb-10"
        >
          +17 años en el mercado local. Rentas, preventas, terrenos, casas y más.
          Operaciones honestas con precios claros desde el inicio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-md"
          >
            Habla con nosotros <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#servicios"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-white text-ink font-semibold text-sm border border-cream-border hover:border-gold/50 hover:text-gold transition-all shadow-sm"
          >
            Ver servicios
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-5 text-sm text-ink-40 mb-12"
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            Plaza Xentric Zibatá, Querétaro
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-gold" />
            +52 442 200 4936
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4 max-w-md"
        >
          {[
            { value: '+17', label: 'Años de experiencia' },
            { value: '8', label: 'Servicios' },
            { value: '45d', label: 'Cierre promedio' },
          ].map((s, i) => (
            <div key={i} className="text-center py-4 px-2 rounded-2xl border border-cream-border bg-cream-dark">
              <div className="gold-gradient font-display text-2xl font-bold mb-0.5">{s.value}</div>
              <div className="text-ink-40 text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── DERECHA: CARRUSEL ── */}
      <div className="relative lg:w-[48%] h-[55vw] lg:h-auto min-h-[400px] overflow-hidden bg-cream-dark">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[current].src}
              alt={slides[current].label}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

        {/* Controles */}
        <button onClick={() => go(-1)} aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white transition-all shadow-sm">
          <ChevronLeft size={18} className="text-ink" />
        </button>
        <button onClick={() => go(1)} aria-label="Siguiente"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white transition-all shadow-sm">
          <ChevronRight size={18} className="text-ink" />
        </button>

        {/* Dots + label */}
        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-2 z-10">
          <div className="flex gap-2 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/60 hover:bg-white'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
            >
              {slides[current].label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-6 right-6 z-10">
          <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-cream-border">
            <div className="w-7 h-7 rounded-sm bg-gradient-gold flex items-center justify-center">
              <span className="text-white font-black text-[10px]">NH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
