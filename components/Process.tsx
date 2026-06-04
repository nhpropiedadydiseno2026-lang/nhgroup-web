'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, FileSignature, Key } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    sub: 'Evaluamos tu situación',
    desc: 'Revisamos el inmueble, el contexto del mercado y tu objetivo real. Te decimos qué es factible y en qué plazo.',
  },
  {
    number: '02',
    icon: FileSignature,
    title: 'Acuerdo',
    sub: 'Pactamos todo por escrito',
    desc: 'Comisión, alcance y cronograma quedan documentados antes de iniciar. No hay cargos adicionales que descubrir después.',
  },
  {
    number: '03',
    icon: Key,
    title: 'Cierre',
    sub: 'Entregamos el resultado acordado',
    desc: 'Coordinamos cada paso legal y administrativo hasta la firma final. Tú recibes lo que se pactó, en el plazo establecido.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proceso" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-200 to-dark" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Cómo trabajamos</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Tres pasos.{' '}
            <span className="gold-gradient">Sin sorpresas.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Un proceso claro y documentado desde el diagnóstico hasta la firma final.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Step number */}
                <div className="relative z-10 w-[104px] h-[104px] rounded-full glass flex flex-col items-center justify-center mb-8 mx-auto border border-gold/20 group-hover:border-gold/50 transition-all duration-300">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0%, rgba(201,168,76,0.2) 25%, transparent 50%)',
                    }}
                  />
                  <Icon size={28} className="text-gold mb-1" />
                  <span className="text-gold/60 text-xs font-bold">{step.number}</span>
                </div>

                <div className="glass rounded-2xl p-8 group-hover:border-gold/25 transition-all duration-300">
                  <div className="text-gold/40 font-display text-5xl font-bold mb-3 leading-none">
                    {step.number}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{step.title}</h3>
                  <div className="text-gold text-xs font-medium tracking-wide uppercase mb-4">{step.sub}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-5">
            <p className="text-white/40 text-sm">
              Sin presión y sin letra chica. Cuéntanos qué necesitas.
            </p>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(201,168,76,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full bg-gradient-gold text-dark font-bold text-sm tracking-wide"
            >
              Decide invertir bien
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
