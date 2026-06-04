'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, ExternalLink } from 'lucide-react'

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="border-t border-cream-border bg-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gradient-gold flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">NH</span>
            </div>
            <div>
              <div className="text-ink font-bold text-sm tracking-wide">
                NH<span className="gold-gradient">GROUP</span>
              </div>
              <div className="text-ink-40 text-[10px] uppercase tracking-widest">Bienes Raíces</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-ink-40 hover:text-gold text-xs tracking-wide transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a href="https://www.facebook.com/nhbienesraices" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} aria-label="Facebook" className="text-ink-40 hover:text-gold transition-colors">
              <Facebook size={16} />
            </motion.a>
            <motion.a href="https://www.instagram.com/nh_propiedadydiseno/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} aria-label="Instagram" className="text-ink-40 hover:text-gold transition-colors">
              <Instagram size={16} />
            </motion.a>
            <motion.a href="https://app.nhgroup.com.mx/login" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 text-ink-40 hover:text-gold text-xs transition-colors">
              <ExternalLink size={12} />
              Admin
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cream-border text-center">
          <p className="text-ink-20 text-xs">
            © 2026 NHGroup Bienes Raíces · Operaciones honestas desde el primer día · Querétaro · Toluca
          </p>
        </div>
      </div>
    </footer>
  )
}
