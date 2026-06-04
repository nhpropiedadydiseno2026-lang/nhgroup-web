'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Clock, FileText, Shield } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Claridad antes que confianza ciega',
    desc: 'No vendemos expectativas. Cada asesoría parte de datos reales del mercado local: precios vigentes, tiempos de cierre reales, condiciones documentadas.',
  },
  {
    icon: FileText,
    title: 'Comisión fija acordada por escrito',
    desc: 'Acordamos alcance, comisión y cronograma antes de firmar cualquier cosa. Lo que se pactó al inicio es lo que se entrega al final.',
  },
  {
    icon: Clock,
    title: 'Plazo promedio de cierre: 45 días',
    desc: 'Coordinamos cada paso legal y administrativo hasta la firma final. Sin sorpresas ni tiempos indefinidos.',
  },
  {
    icon: CheckCircle2,
    title: 'Sin costo hasta concretar',
    desc: 'No pagas hasta concretar la renta o venta. Nuestro equipo trabaja con estrategias personalizadas garantizando resultados.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nosotros" className="py-28 relative overflow-hidden bg-dark-100">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Nuestra filosofía</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              +17 años en el{' '}
              <span className="gold-gradient">mercado local</span>
            </h2>

            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Operamos donde el mercado se mueve: ciudades en desarrollo inmobiliario.
              Conocemos el terreno, los precios y los tiempos reales.
              Cada operación arranca con un diagnóstico honesto.
            </p>

            <p className="text-white/55 text-lg leading-relaxed mb-10">
              <span className="text-white font-semibold">Querétaro / Toluca.</span>{' '}
              Presencia directa en los mercados de mayor plusvalía en México central.
            </p>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 transition-all duration-300"
            >
              Habla con el equipo
            </motion.a>
          </motion.div>

          {/* Right: value cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.35)' }}
                  className="glass rounded-2xl p-5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div className="text-white font-semibold text-sm mb-2">{v.title}</div>
                  <p className="text-white/45 text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
