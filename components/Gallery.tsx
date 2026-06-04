'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const properties = [
  { src: '/gallery/interior-1.jpg', alt: 'Sala de estar con vista al lago', category: 'Interior' },
  { src: '/gallery/interior-2.jpg', alt: 'Residencia con muros de piedra y jardín', category: 'Interior' },
  { src: '/gallery/exterior-1.jpg', alt: 'Terraza con alberca y área de fogón', category: 'Exterior' },
  { src: '/gallery/exterior-2.jpg', alt: 'Jardín tropical con alberca y bar', category: 'Exterior' },
  { src: '/gallery/interior-3.jpg', alt: 'Sala con techo de cristal y bosque', category: 'Interior' },
  { src: '/gallery/interior-4.jpg', alt: 'Sala abierta con patio y jardín', category: 'Interior' },
]

const filters = ['Todos', 'Interior', 'Exterior']

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('Todos')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'Todos' ? properties : properties.filter(p => p.category === active)

  const prev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  const next = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null)

  return (
    <section id="galeria" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold-dark text-xs tracking-[0.25em] uppercase font-semibold">Propiedades</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
              Espacios que{' '}
              <span className="gold-gradient">inspiran.</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === f
                    ? 'bg-gradient-gold text-white shadow-md'
                    : 'bg-cream-dark border border-cream-border text-ink-60 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
                onClick={() => setLightbox(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border border-cream-border group ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-square'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 inline-block">
                    <span className="text-ink text-xs font-semibold">{img.alt}</span>
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-gold-dark text-xs font-semibold">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                className="object-cover"
                sizes="90vw"
              />
              {/* Controls */}
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <X size={18} className="text-ink" />
              </button>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft size={18} className="text-ink" />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight size={18} className="text-ink" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-ink text-sm font-medium">{filtered[lightbox].alt}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
