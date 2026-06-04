'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, TrendingUp, MapPin, Building2, Layers, Tag, Hammer, BarChart3 } from 'lucide-react'

const services = [
  { icon: Home, title: 'Rentas', sub: 'Opciones a tu medida', desc: 'Opciones flexibles que se ajustan a tu presupuesto real. Sin forzar categorías que no encajan con tu situación.' },
  { icon: TrendingUp, title: 'Preventas', sub: 'Precio fijo antes del mercado', desc: 'Invierte desde el inicio y asegura el precio antes de que se mueva. Estrategia, no suerte.' },
  { icon: MapPin, title: 'Terrenos', sub: 'El espacio para tu proyecto', desc: 'Terrenos verificados con documentación en orden. Opciones que ya pasaron el filtro.' },
  { icon: Building2, title: 'Casas en Venta', sub: 'Las mejores ubicaciones', desc: 'Casas seleccionadas por ubicación y precio justo. Decides con información clara.' },
  { icon: Layers, title: 'Depas en Venta', sub: 'Departamentos listos', desc: 'Departamentos modernos con todo en regla. Precio y entrega explicados desde el primer contacto.' },
  { icon: Tag, title: 'Vende con Nosotros', sub: 'Tu propiedad vendida', desc: 'Precio correcto, difusión dirigida, cierre limpio. Gestionamos el proceso completo.' },
  { icon: Hammer, title: 'Construcción', sub: 'Proyectos residenciales', desc: 'Servicio integral orientado a proyectos residenciales y de inversión.' },
  { icon: BarChart3, title: 'Inversión Estratégica', sub: 'Planes personalizados', desc: 'Planes de inversión inmobiliaria según tu presupuesto, ingresos y objetivos.' },
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
      {/* Gold accent top */}
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
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.5)' }}
                className="bg-white rounded-2xl p-6 border border-cream-border shadow-sm transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon size={22} className="text-gold" />
                </div>
                <div className="text-ink font-bold text-base mb-1">{s.title}</div>
                <div className="text-gold-dark text-xs font-semibold mb-3 tracking-wide uppercase">{s.sub}</div>
                <p className="text-ink-40 text-sm leading-relaxed">{s.desc}</p>
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
