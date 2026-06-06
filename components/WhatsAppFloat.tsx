'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/524422004936?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20propiedades.'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg shadow-black/20 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-0" />
      <MessageCircle size={24} className="relative fill-white text-[#25D366]" strokeWidth={0} />
      <span className="relative font-semibold text-sm hidden sm:inline">Escríbenos</span>
    </motion.a>
  )
}
