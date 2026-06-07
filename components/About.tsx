'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Award, Users, TrendingUp,
  CheckCircle2, Star, MapPin, Clock
} from 'lucide-react'
import Image from 'next/image'

const stats = [
  { value: '+17', label: 'Años de experiencia', icon: Clock },
  { value: '+500', label: 'Clientes satisfechos', icon: Users },
  { value: '+$2B', label: 'En transacciones', icon: TrendingUp },
  { value: '98%', label: 'Tasa de éxito', icon: Star },
]

const credentials = [
  'Licencia inmobiliaria certificada',
  'Miembro de la Asociación Mexicana de Profesionales Inmobiliarios',
  'Especialista en mercados de Querétaro y Toluca',
  'Gestión legal integral sin costos previos',
  'Cierre promedio en 45 días',
  'Comisión fija acordada por escrito',
]

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="nosotros" className="relative py-32 bg-white overflow-hidden">

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background accent */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 left-[-80px] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-20 justify-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold-dark text-xs tracking-[0.3em] uppercase font-semibold">Quiénes somos</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Main Grid: Photo + Bio */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main photo frame */}
            <div className="relative">
              {/* Gold border frame */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-gold/30 z-0" />
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-gold/15 z-0" />

              {/* Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 aspect-[4/5]">
                <Image
                  src="/gallery/nancy.jpg"
                  alt="Nancy Hernández – Directora NH Group"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

                {/* Name card overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="text-white/80 text-xs tracking-widest uppercase">Fundadora & Directora</span>
                    </div>
                    <h3 className="text-white font-display text-2xl font-bold">Nancy Hernández</h3>
                    <p className="text-white/60 text-sm mt-1">NH Group Inmobiliaria</p>
                  </motion.div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -right-6 top-12 bg-white rounded-2xl shadow-xl p-4 border border-cream-border z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cream-dark flex items-center justify-center">
                    <Award size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-ink font-bold text-sm">+17 años</div>
                    <div className="text-ink-40 text-xs">de trayectoria</div>
                  </div>
                </div>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.85 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -left-6 bottom-24 bg-white rounded-2xl shadow-xl p-4 border border-cream-border z-20"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gold" />
                  <div>
                    <div className="text-ink font-semibold text-xs">Querétaro · Toluca</div>
                    <div className="text-ink-40 text-xs">Mercados premium</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-6">
              Más de 17 años<br />
              construyendo{' '}
              <span className="gold-gradient">confianza</span>
            </h2>

            <p className="text-ink-40 text-lg leading-relaxed mb-5">
              NH Group nace de una convicción simple: el cliente merece un aliado, no solo un intermediario.
              Desde 2007, hemos acompañado a cientos de familias e inversionistas a tomar decisiones
              inmobiliarias con claridad, seguridad y respaldo profesional.
            </p>

            <p className="text-ink-40 text-lg leading-relaxed mb-10">
              Operamos en los mercados de <strong className="text-ink">Querétaro y Toluca</strong> —
              dos de las ciudades con mayor plusvalía de México — con un equipo especializado que conoce
              cada colonia, cada precio y cada oportunidad real del terreno.
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-10">
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-gold" />
                  </div>
                  <span className="text-ink-40 text-sm">{cred}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-dark text-white font-semibold text-sm shadow-lg transition-all duration-300"
            >
              <span>Agenda una asesoría gratuita</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.4)', boxShadow: '0 16px 40px rgba(201,168,76,0.1)' }}
                className="bg-white rounded-2xl p-6 border border-cream-border shadow-sm text-center transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon size={20} className="text-gold" />
                </div>
                <div className="font-display text-3xl font-bold text-ink mb-1">{stat.value}</div>
                <div className="text-ink-40 text-xs leading-tight">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
