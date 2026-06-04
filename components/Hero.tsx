'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-cream to-cream-dark opacity-80" />
        {/* Gold shimmer top right */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-dark border border-cream-border mb-8"
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
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-ink"
          >
            Bienes Raíces{' '}
            <span className="gold-gradient">sin letra</span>{' '}
            <span className="gold-gradient">chica.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-ink-40 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
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
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-md transition-all duration-300"
            >
              Habla con nosotros
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-white text-ink font-semibold text-sm tracking-wide border border-cream-border hover:border-gold/50 hover:text-gold transition-all duration-300 shadow-sm"
            >
              Ver servicios
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 text-sm text-ink-40"
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
        </div>

        {/* Right: Stats */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '+17', label: 'Años en el mercado', sub: 'Experiencia local' },
              { value: '8', label: 'Servicios activos', sub: 'Un solo equipo' },
              { value: '45', label: 'Días de cierre', sub: 'Promedio real' },
              { value: '100%', label: 'Documentado', sub: 'Desde el primer día' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.5)', boxShadow: '0 12px 40px rgba(201,168,76,0.12)' }}
                className="bg-white rounded-2xl p-6 border border-cream-border shadow-sm transition-all duration-300 cursor-default"
              >
                <div className="gold-gradient font-display text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-ink font-semibold text-sm">{stat.label}</div>
                <div className="text-ink-40 text-xs mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -left-8 bg-white rounded-2xl px-5 py-3 hidden lg:flex items-center gap-3 border border-cream-border shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-white font-black text-xs shadow-sm">
              NH
            </div>
            <div>
              <div className="text-ink text-sm font-semibold">Asesoría sin costo</div>
              <div className="text-ink-40 text-xs">Diagnóstico honesto</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-ink-20 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
