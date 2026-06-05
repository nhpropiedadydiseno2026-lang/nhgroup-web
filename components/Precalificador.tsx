'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight, Building2, TrendingUp, AlertCircle } from 'lucide-react'

const BANCOS = [
  { nombre: 'BBVA',       tasa: 10.5, color: '#004A97', emoji: '🔵' },
  { nombre: 'Banamex',    tasa: 10.8, color: '#CC0000', emoji: '🔴' },
  { nombre: 'HSBC',       tasa: 10.9, color: '#DB0011', emoji: '🟥' },
  { nombre: 'Santander',  tasa: 10.7, color: '#EC0000', emoji: '🔺' },
  { nombre: 'INFONAVIT',  tasa: 12.0, color: '#00723F', emoji: '🟢' },
  { nombre: 'Scotiabank', tasa: 11.2, color: '#EC111A', emoji: '🏦' },
]

function calcular(ingreso: number, gastos: number, enganche: number, plazo: number, edad: number) {
  const ingresoNeto = ingreso - gastos
  const capacidadMensual = ingresoNeto * 0.30
  const meses = plazo * 12
  return BANCOS.map(b => {
    const r = b.tasa / 100 / 12
    const maxCredito = capacidadMensual * (1 - Math.pow(1 + r, -meses)) / r
    const valorPropiedad = maxCredito + enganche
    const mensualidad = maxCredito * r / (1 - Math.pow(1 + r, -meses))
    const viable = (edad + plazo) <= 70 && maxCredito > 0 && ingresoNeto > 0
    return { ...b, maxCredito, valorPropiedad, mensualidad, viable, capacidadMensual }
  })
}

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${Math.round(n).toLocaleString('es-MX')}`

export default function Precalificador() {
  const [ingreso, setIngreso]   = useState('')
  const [gastos, setGastos]     = useState('')
  const [enganche, setEnganche] = useState('')
  const [edad, setEdad]         = useState('')
  const [plazo, setPlazo]       = useState(20)
  const [resultados, setResultados] = useState<ReturnType<typeof calcular> | null>(null)
  const [calculando, setCalculando] = useState(false)

  function handleCalc() {
    if (!ingreso) return
    setCalculando(true)
    setTimeout(() => {
      setResultados(calcular(
        Number(ingreso), Number(gastos || 0),
        Number(enganche || 0), plazo, Number(edad || 35)
      ))
      setCalculando(false)
    }, 600)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-cream-border bg-white text-ink text-sm outline-none focus:border-gold transition-colors placeholder:text-ink-20 font-sans'

  return (
    <section id="precalificador" className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold-dark text-xs tracking-[0.25em] uppercase font-semibold">Herramienta gratuita</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
            Precalificador{' '}
            <span className="gold-gradient">Hipotecario</span>
          </h2>
          <p className="text-ink-40 text-lg max-w-2xl mx-auto">
            Descubre en segundos cuánto crédito puedes obtener con los principales bancos de México. Sin registro, sin compromiso.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-cream-border shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Calculator size={20} className="text-gold" />
              </div>
              <div>
                <div className="font-bold text-ink text-base">Datos del cliente</div>
                <div className="text-ink-20 text-xs">Todos los cálculos son aproximados</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">
                  Ingreso mensual neto *
                </label>
                <input
                  type="number"
                  value={ingreso}
                  onChange={e => setIngreso(e.target.value)}
                  placeholder="Ej: 25,000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">
                  Gastos / deudas mensuales
                </label>
                <input
                  type="number"
                  value={gastos}
                  onChange={e => setGastos(e.target.value)}
                  placeholder="Ej: 5,000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">
                  Enganche disponible
                </label>
                <input
                  type="number"
                  value={enganche}
                  onChange={e => setEnganche(e.target.value)}
                  placeholder="Ej: 200,000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">
                  Edad del solicitante
                </label>
                <input
                  type="number"
                  value={edad}
                  onChange={e => setEdad(e.target.value)}
                  placeholder="Ej: 35"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Plazo */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">
                Plazo del crédito
              </label>
              <div className="flex gap-2">
                {[10, 15, 20, 25, 30].map(p => (
                  <button
                    key={p}
                    onClick={() => setPlazo(p)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      plazo === p
                        ? 'bg-gold/10 border-gold text-gold-dark'
                        : 'bg-white border-cream-border text-ink-40 hover:border-gold/50'
                    }`}
                  >
                    {p} años
                  </button>
                ))}
              </div>
            </div>

            {/* Info tip */}
            <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-6">
              <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 text-xs leading-relaxed">
                Los bancos en México aceptan hasta el <strong>30% del ingreso neto</strong> como pago mensual máximo del crédito.
              </p>
            </div>

            <motion.button
              onClick={handleCalc}
              disabled={!ingreso || calculando}
              whileHover={{ scale: ingreso ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-gradient-gold text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-gold/20 hover:shadow-lg"
            >
              {calculando ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculando...
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  Calcular capacidad de crédito
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!resultados ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-12 border border-cream-border shadow-sm text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-cream-dark border border-cream-border flex items-center justify-center mx-auto mb-6">
                    <Building2 size={36} className="text-gold/60" />
                  </div>
                  <div className="font-bold text-ink text-lg mb-2">Resultados comparativos</div>
                  <p className="text-ink-40 text-sm">
                    Ingresa los datos del cliente y calcula cuánto crédito puede obtener en cada banco.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Capacidad mensual card */}
                  {resultados[0]?.capacidadMensual > 0 && (
                    <div className="bg-gradient-gold rounded-2xl p-5 mb-4 flex justify-between items-center text-white shadow-md">
                      <div>
                        <div className="text-white/70 text-xs uppercase tracking-wider font-semibold mb-1">Capacidad de pago mensual</div>
                        <div className="font-bold text-2xl">{fmt(resultados[0].capacidadMensual)}<span className="text-base font-normal text-white/80"> MXN</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/70 text-xs uppercase tracking-wider mb-1">Plazo</div>
                        <div className="font-bold text-lg">{plazo} años</div>
                        <div className="text-white/70 text-xs">{plazo * 12} meses</div>
                      </div>
                    </div>
                  )}

                  {/* Bank results */}
                  <div className="space-y-3">
                    {resultados.map((r, i) => (
                      <motion.div
                        key={r.nombre}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${
                          r.viable
                            ? 'border-cream-border hover:border-gold/30 hover:shadow-sm'
                            : 'border-red-100 bg-red-50/50 opacity-60'
                        }`}
                      >
                        <div className="text-2xl flex-shrink-0">{r.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-ink text-sm">{r.nombre}</span>
                            <span className="text-ink-20 text-xs">{r.tasa}% anual</span>
                          </div>
                          {r.viable ? (
                            <div className="flex gap-4 flex-wrap">
                              <div>
                                <div className="text-ink-20 text-[10px] uppercase tracking-wider">Crédito máx.</div>
                                <div className="font-bold text-green-700 text-sm">{fmt(r.maxCredito)}</div>
                              </div>
                              <div>
                                <div className="text-ink-20 text-[10px] uppercase tracking-wider">Valor propiedad</div>
                                <div className="font-bold text-gold-dark text-sm">{fmt(r.valorPropiedad)}</div>
                              </div>
                              <div>
                                <div className="text-ink-20 text-[10px] uppercase tracking-wider">Mensualidad</div>
                                <div className="font-semibold text-ink-60 text-sm">{fmt(r.mensualidad)}/mes</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-red-500 text-xs font-medium flex items-center gap-1">
                              <AlertCircle size={12} /> No aplica por edad o ingreso insuficiente
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="https://wa.me/524422004936?text=Hola%2C%20usé%20el%20precalificador%20y%20me%20gustaría%20hablar%20con%20un%20asesor."
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-[#25D166]/10 border border-[#25D166]/30 hover:bg-[#25D166]/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D166]/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={18} className="text-[#25D366]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-ink text-sm">¿Listo para encontrar tu propiedad?</div>
                      <div className="text-ink-40 text-xs">Habla con un asesor NH Group ahora</div>
                    </div>
                    <ChevronRight size={16} className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
