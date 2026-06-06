'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, BedDouble, Bath, Maximize, ExternalLink, Building2, Loader2 } from 'lucide-react'

const SUPABASE_URL = 'https://tsjykudvusxbrwspfrhn.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzanlrdWR2dXN4YnJ3c3BmcmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzM1NzEsImV4cCI6MjA5NTI0OTU3MX0.N9aHc0sNH8ETDQUnq5aYebugWYq0k7sXsFmG5iGxMHo'

const INMUEBLES24_URL = 'https://www.inmuebles24.com/inmobiliarias/nh-bienes-raices'

type Propiedad = {
  id: string
  fuente: 'CRM' | 'EasyBroker'
  titulo: string
  tipo: string
  operacion: 'Venta' | 'Renta' | string
  precio: number
  moneda: string
  ciudad: string
  colonia: string
  recamaras?: number
  banos?: number
  m2: number | null
  foto: string | null
  link?: string | null
}

function formatPrecio(precio: number, moneda: string) {
  if (!precio) return 'Precio a consultar'
  const fmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: moneda || 'MXN', maximumFractionDigits: 0 })
  return fmt.format(precio)
}

export default function Catalogo() {
  const [props, setProps] = useState<Propiedad[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroOperacion, setFiltroOperacion] = useState<'Todas' | 'Venta' | 'Renta'>('Todas')
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [filtroCiudad, setFiltroCiudad] = useState('Todas')
  const [visibles, setVisibles] = useState(9)

  useEffect(() => {
    let activo = true

    async function cargarCRM(): Promise<Propiedad[]> {
      try {
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/propiedades?select=id,titulo,tipo,operacion_tipo,precio,moneda,status,ciudad,colonia,recamaras,banos,m2_construccion,m2_terreno,fotos&status=eq.disponible&order=destacada.desc,created_at.desc&limit=60`,
          { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
        )
        if (!r.ok) return []
        const data = await r.json()
        return (Array.isArray(data) ? data : []).map((p: any): Propiedad => ({
          id: `crm-${p.id}`,
          fuente: 'CRM',
          titulo: p.titulo,
          tipo: p.tipo || 'Propiedad',
          operacion: p.operacion_tipo || 'Venta',
          precio: Number(p.precio) || 0,
          moneda: p.moneda || 'MXN',
          ciudad: p.ciudad || '',
          colonia: p.colonia || '',
          recamaras: p.recamaras || 0,
          banos: p.banos || 0,
          m2: p.m2_construccion || p.m2_terreno || null,
          foto: Array.isArray(p.fotos) && p.fotos.length > 0 ? (typeof p.fotos[0] === 'string' ? p.fotos[0] : p.fotos[0]?.url) : null,
          link: null,
        }))
      } catch {
        return []
      }
    }

    async function cargarEasyBroker(): Promise<Propiedad[]> {
      try {
        const r = await fetch('/api/easybroker?limit=30')
        if (!r.ok) return []
        const data = await r.json()
        const lista = Array.isArray(data?.content) ? data.content : []
        return lista.map((p: any): Propiedad => {
          const op = Array.isArray(p.operations) ? p.operations[0] : null
          return {
            id: `eb-${p.public_id}`,
            fuente: 'EasyBroker',
            titulo: p.title || p.public_id,
            tipo: p.property_type || 'Propiedad',
            operacion: op?.type === 'rental' ? 'Renta' : 'Venta',
            precio: Number(op?.formatted_amount || op?.amount) || 0,
            moneda: op?.currency || 'MXN',
            ciudad: p.location?.name || '',
            colonia: p.location?.name || '',
            recamaras: p.bedrooms || 0,
            banos: p.bathrooms || 0,
            m2: p.construction_size || p.lot_size || null,
            foto: p.title_image_full || p.title_image_thumb || null,
            link: p.public_url || null,
          }
        })
      } catch {
        return []
      }
    }

    Promise.all([cargarCRM(), cargarEasyBroker()]).then(([crm, eb]) => {
      if (!activo) return
      setProps([...crm, ...eb])
      setLoading(false)
    })

    return () => { activo = false }
  }, [])

  const ciudades = useMemo(() => {
    const set = new Set(props.map(p => p.ciudad).filter(Boolean))
    return ['Todas', ...Array.from(set)]
  }, [props])

  const tipos = useMemo(() => {
    const set = new Set(props.map(p => p.tipo).filter(Boolean))
    return ['Todos', ...Array.from(set)]
  }, [props])

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return props.filter(p => {
      if (filtroOperacion !== 'Todas' && p.operacion !== filtroOperacion) return false
      if (filtroTipo !== 'Todos' && p.tipo !== filtroTipo) return false
      if (filtroCiudad !== 'Todas' && p.ciudad !== filtroCiudad) return false
      if (q) {
        const haystack = `${p.titulo} ${p.tipo} ${p.ciudad} ${p.colonia}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [props, busqueda, filtroOperacion, filtroTipo, filtroCiudad])

  return (
    <section id="catalogo" className="bg-cream py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold-dark uppercase tracking-[0.2em] text-sm font-medium">Catálogo</span>
          <h2 className="font-display text-3xl md:text-5xl text-ink mt-2">Propiedades disponibles</h2>
          <p className="text-ink-40 mt-3 max-w-2xl mx-auto">
            Resultados combinados de nuestro CRM, EasyBroker e Inmuebles24 — actualizados directamente desde cada fuente.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="bg-white border border-cream-border rounded-2xl p-4 md:p-6 mb-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-20" size={18} />
            <input
              type="text"
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); setVisibles(9) }}
              placeholder="Buscar por título, tipo, colonia o ciudad..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-cream-border bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/40 text-ink"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={filtroOperacion} onChange={e => { setFiltroOperacion(e.target.value as any); setVisibles(9) }}
              className="px-3 py-2.5 rounded-xl border border-cream-border bg-cream/50 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40">
              <option value="Todas">Todas las operaciones</option>
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>
            <select value={filtroTipo} onChange={e => { setFiltroTipo(e.target.value); setVisibles(9) }}
              className="px-3 py-2.5 rounded-xl border border-cream-border bg-cream/50 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40">
              {tipos.map(t => <option key={t} value={t}>{t === 'Todos' ? 'Todos los tipos' : t}</option>)}
            </select>
            <select value={filtroCiudad} onChange={e => { setFiltroCiudad(e.target.value); setVisibles(9) }}
              className="px-3 py-2.5 rounded-xl border border-cream-border bg-cream/50 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40">
              {ciudades.map(c => <option key={c} value={c}>{c === 'Todas' ? 'Todas las ciudades' : c}</option>)}
            </select>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-ink-40">
            <Loader2 className="animate-spin mb-3" size={28} />
            <p>Cargando propiedades...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-24 text-ink-40">
            <Building2 size={36} className="mx-auto mb-3 opacity-50" />
            <p>No encontramos propiedades con esos filtros. Intenta con otra búsqueda.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtrados.slice(0, visibles).map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 9) * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-52 bg-ink-20/10 overflow-hidden">
                    {p.foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.foto} alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ink-20">
                        <Building2 size={40} />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-ink/80 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                      {p.operacion}
                    </span>
                    <span className="absolute top-3 right-3 bg-gold text-ink text-xs px-3 py-1 rounded-full font-medium">
                      {p.fuente}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ink line-clamp-1">{p.titulo}</h3>
                    <p className="text-ink-40 text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {[p.colonia, p.ciudad].filter(Boolean).join(', ') || 'Querétaro'}
                    </p>
                    <p className="text-gold-dark font-semibold text-xl mt-3">{formatPrecio(p.precio, p.moneda)}</p>
                    <div className="flex items-center gap-4 text-ink-40 text-sm mt-3">
                      {!!p.recamaras && <span className="flex items-center gap-1"><BedDouble size={15} /> {p.recamaras}</span>}
                      {!!p.banos && <span className="flex items-center gap-1"><Bath size={15} /> {p.banos}</span>}
                      {!!p.m2 && <span className="flex items-center gap-1"><Maximize size={15} /> {p.m2} m²</span>}
                    </div>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink font-medium hover:text-gold-dark transition-colors">
                        Ver en {p.fuente} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            {visibles < filtrados.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibles(v => v + 9)}
                  className="px-8 py-3 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-white transition-colors font-medium"
                >
                  Ver más propiedades
                </button>
              </div>
            )}
          </>
        )}

        {/* Inmuebles24 — sin API pública, enlace directo al perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-ink rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-2xl text-white">¿Buscas más opciones?</h3>
            <p className="text-white/60 mt-1 max-w-xl">
              Consulta también nuestro catálogo completo publicado en Inmuebles24, actualizado constantemente con nuevas propiedades.
            </p>
          </div>
          <a
            href={INMUEBLES24_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 rounded-full font-medium hover:bg-gold-light transition-colors"
          >
            Ver en Inmuebles24 <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
