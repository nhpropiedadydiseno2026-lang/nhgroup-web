'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const CLIENTE_PORTAL_URL = 'https://app.nhgroup.com.mx/?modo=cliente&vista=registro'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proceso', href: '#proceso-completo' },
  { label: '🏦 Crédito', href: '#precalificador' },
  { label: '👤 Portal de Clientes', href: CLIENTE_PORTAL_URL, externo: true },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#inicio" whileHover={{ scale: 1.03 }} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gallery/Logo NH Premium.png"
              alt="NHGroup Bienes Raíces"
              className="h-20 w-auto object-contain drop-shadow-sm"
            />
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                {...(link.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                whileHover={{ y: -1 }}
                className="text-ink-60 hover:text-gold text-sm tracking-wide transition-colors duration-200 relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://app.nhgroup.shop"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm bg-gradient-gold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Administración
            </motion.a>
            <button onClick={() => setOpen(!open)} className="md:hidden text-ink-60 hover:text-gold transition-colors">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                {...(link.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(false)}
                className="text-2xl font-display text-ink hover:text-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="https://app.nhgroup.shop"
              target="_blank"
              className="mt-4 px-8 py-3 rounded-full text-white font-bold bg-gradient-gold text-sm"
              onClick={() => setOpen(false)}
            >
              Administración
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
