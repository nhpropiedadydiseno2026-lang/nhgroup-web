'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, FileSignature, Key } from 'lucide-react'

const steps = [
  { number: '01', icon: Search, title: 'Diagnóstico', sub: 'Evaluamos tu situación', desc: 'Revisamos el inmueble, el contexto del mercado y tu objetivo real. Te decimos qué es factible y en qué plazo.' },
  { number: '02', icon: FileSignature, title: 'Acuerdo', sub: 'Pactamos todo por escrito', desc: 'Comisión, alcance y cronograma documentados antes de iniciar. Sin cargos adicionales después.' },
  { number: '03', icon: Key, title: 'Cierre', sub: 'Entregamos el resultado', desc: 'Coordinamos cada paso legal hasta la firma final. Tú recibes lo que se pactó, en el plazo establecido.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proceso" className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold-dark text-xs tracking-[0.25em] uppercase font-semibold">Cómo trabajamos</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-5">
            Tres pasos.{' '}
            <span className="gold-gradient">Sin sorpresas.</span>
          </h2>
          <p className="text-ink-40 text-lg max-w-xl mx-auto">
            Un proceso claro y documentado desde el diagnóstico hasta la firma final.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.4)' }}
                className="bg-white rounded-2xl p-8 border border-cream-border shadow-sm transition-all duration-300 group"
              >
                {/* Step circle */}
                <div className="w-16 h-16 rounded-full bg-cream-dark border-2 border-cream-border flex flex-col items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                  <Icon size={22} className="text-gold" />
                </div>

                <div className="text-gold/20 font-display text-6xl font-bold mb-3 leading-none select-none">
                  {step.number}
                </div>
                <h3 className="text-ink font-bold text-xl mb-1">{step.title}</h3>
                <div className="text-gold-dark text-xs font-semibold tracking-wide uppercase mb-4">{step.sub}</div>
                <p className="text-ink-40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-ink-40 text-sm mb-5">Sin presión y sin letra chica. Cuéntanos qué necesitas.</p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-md inline-block"
          >
            Decide invertir bien
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
