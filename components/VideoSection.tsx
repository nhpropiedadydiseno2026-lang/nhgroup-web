'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Atom, Shield, Zap, Layers } from 'lucide-react'

const features = [
  {
    icon: Atom,
    title: 'Estructura molecular',
    desc: 'Nanopartículas de sílice y carbono que refuerzan el concreto a nivel molecular, logrando resistencias 3 a 6 veces superiores al estándar.',
  },
  {
    icon: Shield,
    title: 'Durabilidad extrema',
    desc: 'Mayor resistencia a la corrosión, contracción y agrietamiento. Estructuras diseñadas para décadas sin mantenimiento mayor.',
  },
  {
    icon: Zap,
    title: 'Autorreparable',
    desc: 'Tecnología de concreto que detecta y sella microfisuras de forma autónoma, extendiendo significativamente la vida útil de cada construcción.',
  },
  {
    icon: Layers,
    title: 'Sostenible',
    desc: 'Mayor resistencia con menores volúmenes de material. Menos concreto, menos huella de carbono, más eficiencia estructural.',
  },
]

export default function VideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-60px' })

  return (
    <section className="bg-ink overflow-hidden">
      {/* Gold line top */}
      <div className="h-[2px] bg-gradient-gold" />

      {/* ── VIDEO PANTALLA COMPLETA ── */}
      <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '90vh' }}>
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/gallery/video-construccion.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        {/* Badge sobre video */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">Construcción Premium</span>
          </div>
        </motion.div>

        {/* Texto sobre video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="absolute bottom-10 left-8 right-8 md:right-auto md:max-w-xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Construimos con la{' '}
            <span className="gold-gradient">tecnología</span>{' '}
            del futuro.
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Cada proyecto residencial se ejecuta con los más altos estándares de ingeniería.
            Del trazo a la entrega de llaves.
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-white font-bold text-sm shadow-lg"
          >
            Quiero mi proyecto <ArrowRight size={15} />
          </motion.a>
        </motion.div>
      </div>

      {/* ── SECCIÓN CONCRETO MOLECULAR ── */}
      <div ref={textRef} className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-semibold">Innovación</span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Concreto{' '}
              <span className="gold-gradient">Molecular</span>
            </h3>
            <p className="text-white/55 text-lg leading-relaxed">
              La nueva generación de materiales de construcción actúa directamente en la estructura
              molecular del concreto. A través de <span className="text-white/80 font-medium">nanotecnología aplicada</span> —
              nanopartículas de sílice, titanio y nanotubos de carbono — se logra una resistencia
              a la compresión de 3 a 6 veces superior al concreto convencional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-white/50 text-base leading-relaxed">
              En NHGroup aplicamos estas tecnologías en nuestros proyectos residenciales para garantizar
              que cada metro cuadrado construido sea una inversión duradera. El concreto molecular
              no solo es más resistente — es <span className="text-gold font-medium">autorreparable</span>:
              detecta y sella microfisuras de forma autónoma, reduciendo costos de mantenimiento a largo plazo.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Con estructuras más delgadas y ligeras pero de mayor resistencia, se logra mayor
              aprovechamiento del espacio sin sacrificar seguridad. Esto se traduce en propiedades
              más eficientes, con menor huella ambiental y mayor plusvalía para el propietario.
            </p>

            {/* Stats dorados */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '6x', label: 'Mayor resistencia' },
                { value: '50+', label: 'Años de vida útil' },
                { value: '30%', label: 'Menos emisiones' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-xl border border-gold/20 bg-white/[0.03]"
                >
                  <div className="font-display text-3xl font-bold gold-gradient mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)' }}
                className="rounded-2xl p-6 border border-white/10 bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-gold" />
                </div>
                <div className="text-white font-bold text-sm mb-2">{f.title}</div>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="h-[2px] bg-gradient-gold" />
    </section>
  )
}
