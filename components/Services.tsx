'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, TrendingUp, MapPin, Building2, Layers, Tag, Hammer, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Rentas',
    sub: 'Opciones a tu medida',
    desc: 'Opciones flexibles que se ajustan a tu presupuesto real. Sin forzar categorías que no encajan.',
    img: '/gallery/real-6.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Preventas',
    sub: 'Precio fijo antes del mercado',
    desc: 'Invierte desde el inicio y asegura el precio antes de que se mueva. Estrategia, no suerte.',
    img: '/gallery/aerial-1.jpg',
  },
  {
    icon: MapPin,
    title: 'Terrenos',
    sub: 'El espacio para tu proyecto',
    desc: 'Terrenos verificados con documentación en orden. Opciones que ya pasaron el filtro.',
    img: '/gallery/aerial-2.jpg',
  },
  {
    icon: Building2,
    title: 'Casas en Venta',
    sub: 'Las mejores ubicaciones',
    desc: 'Casas seleccionadas por ubicación y precio justo. Decides con información clara.',
    img: '/gallery/real-2.jpg',
  },
  {
    icon: Layers,
    title: 'Depas en Venta',
    sub: 'Departamentos listos',
    desc: 'Departamentos modernos con todo en regla. Precio y entrega explicados desde el primer contacto.',
    img: '/gallery/real-1.jpg',
  },
  {
    icon: Tag,
    title: 'Vende con Nosotros',
    sub: 'Tu propiedad vendida',
    desc: 'Precio correcto, difusión dirigida, cierre limpio. Gestionamos el proceso completo.',
    img: '/gallery/real-4.jpg',
  },
  {
    icon: Hammer,
    title: 'Construcción',
    sub: 'Proyectos residenciales',
    desc: 'Servicio integral orientado a proyectos residenciales y de inversión.',
    img: '/gallery/real-3.jpg',
  },
  {
    icon: BarChart3,
    title: 'Inversión Estratégica',
    sub: 'Planes personalizados',
    desc: 'Planes de inversión inmobiliaria según tu presupuesto, ingresos y objetivos.',
    img: '/gallery/real-5.jpg',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold-dark text-xs tracking-[0.25em] uppercase font-semibold">Lo que hacemos</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-5">
            8 servicios.{' '}
            <span className="gold-gradient">Un solo equipo.</span>
          </h2>
          <p className="text-ink-40 text-lg leading-relaxed">
            Todo el ciclo inmobiliario cubierto. Precios directos y proceso explicado de inicio a cierre.
          </p>
        </motion.div>

        {/* Grid con imágenes */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -8, boxShadow: '0 24px 50px rgba(0,0,0,0.13)' }}
                className="bg-white rounded-2xl overflow-hidden border border-cream-border shadow-sm transition-all duration-300 group cursor-default"
              >
                {/* Imagen del servicio */}
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.parentElement!.style.background = 'linear-gradient(135deg, #f2efe8 0%, #e8e4dc 100%)'
                      el.style.display = 'none'
                    }}
                  />
                  {/* Overlay suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Icono sobre imagen */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Icon size={18} className="text-gold" />
                  </div>
                </div>

                {/* Texto */}
                <div className="p-5">
                  <div className="text-ink font-bold text-base mb-1">{s.title}</div>
                  <div className="text-gold-dark text-xs font-semibold mb-3 tracking-wide uppercase">{s.sub}</div>
                  <p className="text-ink-40 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-md"
          >
            Solicitar asesoría
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
