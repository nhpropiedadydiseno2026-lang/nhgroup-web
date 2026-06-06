'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Flag, Award } from 'lucide-react'

const fases = [
  {
    titulo: 'Inicio',
    sub: 'Captación y diagnóstico',
    icon: Flag,
    pasos: [
      'Evaluar sus necesidades',
      'Diagnóstico legal y fiscal',
      'Determinar el mejor precio',
      'Firma de Contrato',
      'Entrega de Garantía de Servicios',
    ],
  },
  {
    titulo: 'Promoción',
    sub: 'Difusión y prospección',
    pasos: [
      'Preparar Plan de Publicidad',
      'Colocar Rótulo',
      'Atender Prospectos',
      'Calificar Prospectos',
      'Demostración de la Propiedad',
    ],
  },
  {
    titulo: 'Negociación',
    sub: 'De la propuesta al acuerdo',
    pasos: [
      'Recibir Propuesta',
      'Negociar Propuesta',
      'Aceptación de Propuesta',
      'Preparar Contrato de Compraventa',
      'Firma de Contrato',
    ],
  },
  {
    titulo: 'Servicio Post Venta',
    sub: 'Cierre y acompañamiento legal',
    icon: Award,
    pasos: [
      'Entrega del inmueble',
      'Firma de Escrituras',
      'Seguimiento notarial',
      'Entrega de documentos al Notario',
    ],
  },
]

export default function ProcesoCompleto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  let contador = 0

  return (
    <section id="proceso-completo" className="py-28 bg-ink relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

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
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-semibold">Nuestro proceso completo</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            De la captación al cierre.{' '}
            <span className="gold-gradient">Y más allá.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Así acompañamos cada propiedad: desde el primer diagnóstico hasta la entrega de escrituras y el seguimiento posterior. Cada paso documentado, sin sorpresas.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-12">
          {fases.map((fase, fi) => (
            <motion.div
              key={fase.titulo}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: fi * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gold/40 text-gold font-display font-bold text-sm">
                  {String(fi + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{fase.titulo}</h3>
                  <p className="text-gold/70 text-xs uppercase tracking-wider">{fase.sub}</p>
                </div>
              </div>

              <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-0 lg:overflow-x-auto pb-2">
                {fase.pasos.map((paso, pi) => {
                  contador += 1
                  const esUltimoDeFase = pi === fase.pasos.length - 1
                  return (
                    <div key={paso} className="flex items-center flex-1 min-w-[180px]">
                      <motion.div
                        whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.5)' }}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 backdrop-blur-sm transition-colors"
                      >
                        <div className="text-gold/50 font-display text-xs font-bold mb-1.5">
                          {String(contador).padStart(2, '0')}
                        </div>
                        <p className="text-white text-sm font-medium leading-snug">{paso}</p>
                      </motion.div>
                      {!esUltimoDeFase && (
                        <ChevronRight size={18} className="text-gold/30 mx-1.5 hidden lg:block flex-shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-5">
            {contador} pasos, un solo acompañamiento. Así sabes exactamente en qué etapa va tu propiedad.
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-gradient-gold text-white font-bold text-sm tracking-wide shadow-md inline-block"
          >
            Quiero que acompañen mi proceso
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
