'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Facebook, Instagram, ExternalLink } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" className="py-28 relative overflow-hidden bg-dark-100">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.06] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Contáctanos</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              ¿Listo para el{' '}
              <span className="gold-gradient">siguiente paso?</span>
            </h2>

            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Sin presión y sin letra chica. Cuéntanos qué necesitas y te respondemos con opciones concretas.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: 'Teléfono / WhatsApp',
                  value: '+52 442 200 4936',
                  href: 'tel:+524422004936',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'nhernandez@nhgroup.com.mx',
                  href: 'mailto:nhernandez@nhgroup.com.mx',
                },
                {
                  icon: MapPin,
                  label: 'Oficina',
                  value: 'Plaza Xentric Zibatá, Querétaro C.P 76269',
                  href: 'https://maps.google.com/?q=Plaza+Xentric+Zibata+Queretaro',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-white/35 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-white/80 text-sm group-hover:text-gold transition-colors">{item.value}</div>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/nhbienesraices', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/nh_propiedadydiseno/', label: 'Instagram' },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-gold/40 transition-all duration-300"
                  >
                    <Icon size={18} className="text-white/60 hover:text-gold" />
                  </motion.a>
                )
              })}
              <motion.a
                href="https://app.nhgroup.com.mx/login"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/50 hover:text-gold text-xs font-medium hover:border-gold/30 transition-all"
              >
                <ExternalLink size={14} />
                Portal Admin
              </motion.a>
            </div>
          </motion.div>

          {/* Right: CTA cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/524422004936?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20inmobiliarios."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(37,211,102,0.15)' }}
              className="block glass rounded-2xl p-6 border border-[#25D166]/20 hover:border-[#25D166]/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#25D166]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D166]/25 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#25D166]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-0.5">Escribir por WhatsApp</div>
                  <div className="text-white/45 text-sm">Respuesta rápida · Atención directa</div>
                </div>
                <div className="text-[#25D166]/60 group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </motion.a>

            {/* Email CTA */}
            <motion.a
              href="mailto:nhernandez@nhgroup.com.mx?subject=Asesoría%20inmobiliaria"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(201,168,76,0.1)' }}
              className="block glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Mail size={24} className="text-gold" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-0.5">Enviar correo</div>
                  <div className="text-white/45 text-sm">nhernandez@nhgroup.com.mx</div>
                </div>
                <div className="text-gold/60 group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </motion.a>

            {/* Info card */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="text-white/40 text-sm leading-relaxed text-center">
                <span className="text-white/70 font-semibold">El proceso claro. El resultado, tuyo.</span>
                <br />
                NHGroup Bienes Raíces — Operaciones honestas desde el primer día.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
