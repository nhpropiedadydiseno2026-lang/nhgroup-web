'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, TrendingUp, MapPin, Building2, Layers, Tag, Hammer, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Rentas',
    sub: 'Opciones a tu medida',
    desc: 'Opciones flexibles que se ajustan a tu presupuesto real. Sin forzar categorías que no encajan con tu situación.',
    accent: '#C9A84C',
  },
  {
    icon: TrendingUp,
    title: 'Preventas',
    sub: 'Precio fijo antes del mercado',
    desc: 'Invierte desde el inicio y asegura el precio antes de que se mueva. Estrategia, no suerte.',
    accent: '#E4C97E',
  },
  {
    icon: MapPin,
    title: 'Terrenos',
    sub: 'El espacio para tu proyecto',
    desc: 'Terrenos verificados con documentación en orden. Opciones que ya pasaron el filtro.',
    accent: '#C9A84C',
  },
  {
    icon: Building2,
    title: 'Casas en Venta',
    sub: 'Las mejores ubicaciones',
    desc: 'Casas seleccionadas por ubicación y precio justo. Comparas lo que existe, decides con información clara.',
    accent: '#E4C97E',
  },
  {
    icon: Layers,
    title: 'Depas en Venta',
    sub: 'Departamentos listos para ti',
    desc: 'Departamentos modernos con todo en regla. Precio, entrega y condiciones explicadas desde el primer contacto.',
    accent: '#C9A84C',
  },
  {
    icon: Tag,
    title: 'Vende con Nosotros',
    sub: 'Tu propiedad vendida, rápido',
    desc: 'Precio correcto, difusión dirigida, cierre limpio. Gestionamos el proceso para que no tengas que hacerlo tú.',
    accent: '#E4C97E',
  },
  {
    icon: Hammer,
    title: 'Construcción',
    sub: 'Proyectos residenciales',
    desc: 'Servicio de construcción integral orientado a proyectos residenciales y de inversión.',
    accent: '#C9A84C',
  },
  {
    icon: BarChart3,
    title: 'Inversión Estratégica',
    sub: 'Planes personalizados',
    desc: 'Planes de inversión inmobiliaria personalizados según tu presupuesto, ingresos y objetivos.',
    accent: '#E4C97E',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04] rounded-full"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Lo que hacemos</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            8 servicios.{' '}
            <span className="gold-gradient">Un solo equipo.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Todo el ciclo inmobiliario cubierto. Precios directos y proceso explicado desde el inicio hasta el cierre.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(201,168,76,0.4)',
                  boxShadow: '0 20px 60px rgba(201,168,76,0.1)',
                }}
                className="glass rounded-2xl p-6 transition-all duration-300 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.accent}18` }}
                >
                  <Icon size={22} style={{ color: s.accent }} />
                </div>
                <div className="text-white font-bold text-base mb-1">{s.title}</div>
                <div className="text-gold/60 text-xs font-medium mb-3 tracking-wide uppercase">{s.sub}</div>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-dark font-bold text-sm tracking-wide"
          >
            Solicitar asesoría
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
