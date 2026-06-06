'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronRight, Building2, TrendingUp, AlertCircle, Home } from 'lucide-react'

const BANCOS = [
  { nombre: 'BBVA',       tasa: 9.40, color: '#004A97', emoji: '🔵' },
  { nombre: 'Banorte',    tasa: 9.25, color: '#E8000D', emoji: '🔴' },
  { nombre: 'Santander',  tasa: 9.50, color: '#EC0000', emoji: '🔺' },
  { nombre: 'HSBC',       tasa: 9.90, color: '#DB0011', emoji: '🟥' },
  { nombre: 'Scotiabank', tasa: 9.80, color: '#C8102E', emoji: '🏦' },
  { nombre: 'Banamex',    tasa: 9.55, color: '#CC0000', emoji: '🏛️' },
]

// UMA diario 2026
const UMA_DIARIO = 113.14
// Tabla de tasas INFONAVIT por rango de salario diario (múltiplos de UMA)
function tasaInfonavit(salarioDiario: number): number {
  const uma = salarioDiario / UMA_DIARIO
  if (uma <= 2.6)  return 1.0
  if (uma <= 3.9)  return 2.0
  if (uma <= 5.2)  return 3.0
  if (uma <= 6.5)  return 4.0
  if (uma <= 7.8)  return 6.0
  if (uma <= 10.4) return 8.0
  if (uma <= 13.0) return 9.5
  return 10.0
}

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

function calcularInfonavit(ingreso: number, subcuenta: number, enganche: number, plazo: number, edad: number) {
  const salarioDiario = ingreso / 30
  const tasa = tasaInfonavit(salarioDiario)
  const capacidadMensual = ingreso * 0.30
  const meses = plazo * 12
  const r = tasa / 100 / 12
  const creditoPorCapacidad = r > 0
    ? capacidadMensual * (1 - Math.pow(1 + r, -meses)) / r
    : capacidadMensual * meses
  // INFONAVIT suma la subcuenta de vivienda al crédito
  const maxCredito = Math.min(creditoPorCapacidad + subcuenta, 2_800_000)
  const creditoSinSubcuenta = Math.min(creditoPorCapacidad, 2_800_000)
  const mensualidad = r > 0
    ? creditoSinSubcuenta * r / (1 - Math.pow(1 + r, -meses))
    : creditoSinSubcuenta / meses
  const valorPropiedad = maxCredito + enganche
  const viable = (edad + plazo) <= 65 && ingreso > 0
  return { tasa, maxCredito, creditoSinSubcuenta, valorPropiedad, mensualidad, viable, capacidadMensual, subcuenta }
}

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${Math.round(n).toLocaleString('es-MX')}`

export default function Precalificador() {
  const [modo, setModo] = useState<'banco' | 'infonavit'>('banco')

  // Banco
  const [ingreso, setIngreso]   = useState('')
  const [gastos, setGastos]     = useState('')
  const [enganche, setEnganche] = useState('')
  const [edad, setEdad]         = useState('')
  const [plazo, setPlazo]       = useState(20)
  const [resultados, setResultados] = useState<ReturnType<typeof calcular> | null>(null)
  const [calculando, setCalculando] = useState(false)

  // INFONAVIT
  const [iIngreso, setIIngreso]     = useState('')
  const [iSubcuenta, setISubcuenta] = useState('')
  const [iEnganche, setIEnganche]   = useState('')
  const [iEdad, setIEdad]           = useState('')
  const [iPlazo, setIPlazo]         = useState(20)
  const [iRes, setIRes]             = useState<ReturnType<typeof calcularInfonavit> | null>(null)
  const [iCalc, setICalc]           = useState(false)

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

  function handleCalcInfonavit() {
    if (!iIngreso) return
    setICalc(true)
    setTimeout(() => {
      setIRes(calcularInfonavit(
        Number(iIngreso), Number(iSubcuenta || 0),
        Number(iEnganche || 0), iPlazo, Number(iEdad || 35)
      ))
      setICalc(false)
    }, 600)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-cream-border bg-white text-ink text-sm outline-none focus:border-gold transition-colors placeholder:text-ink-20 font-sans'

  return (
    <section id="precalificador" className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
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
          className="text-center mb-10"
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
            Descubre en segundos cuánto crédito puedes obtener. Sin registro, sin compromiso.
          </p>
        </motion.div>

        {/* Tabs modo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="flex bg-white rounded-2xl p-1.5 border border-cream-border shadow-sm gap-1">
            <button
              onClick={() => setModo('banco')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                modo === 'banco'
                  ? 'bg-gradient-gold text-white shadow-sm'
                  : 'text-ink-40 hover:text-ink'
              }`}
            >
              <Building2 size={16} /> Crédito Bancario
            </button>
            <button
              onClick={() => setModo('infonavit')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                modo === 'infonavit'
                  ? 'bg-[#00723F] text-white shadow-sm'
                  : 'text-ink-40 hover:text-ink'
              }`}
            >
              <Home size={16} /> INFONAVIT
            </button>
          </div>
        </motion.div>

        {/* ══ MODO BANCO ══ */}
        {modo === 'banco' && (
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-cream-border shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Calculator size={20} className="text-gold" />
                </div>
                <div>
                  <div className="font-bold text-ink text-base">Datos del solicitante</div>
                  <div className="text-ink-20 text-xs">Cálculos aproximados · tasas nominales 2025</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Ingreso mensual neto *</label>
                  <input type="number" value={ingreso} onChange={e => setIngreso(e.target.value)} placeholder="Ej: 25,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Gastos / deudas mensuales</label>
                  <input type="number" value={gastos} onChange={e => setGastos(e.target.value)} placeholder="Ej: 5,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Enganche disponible</label>
                  <input type="number" value={enganche} onChange={e => setEnganche(e.target.value)} placeholder="Ej: 200,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Edad del solicitante</label>
                  <input type="number" value={edad} onChange={e => setEdad(e.target.value)} placeholder="Ej: 35" className={inputClass} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Plazo del crédito</label>
                <div className="flex gap-2">
                  {[10, 15, 20, 25, 30].map(p => (
                    <button key={p} onClick={() => setPlazo(p)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        plazo === p ? 'bg-gold/10 border-gold text-gold-dark' : 'bg-white border-cream-border text-ink-40 hover:border-gold/50'
                      }`}
                    >{p} años</button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-blue-700 text-xs leading-relaxed">
                  Los bancos aceptan hasta el <strong>30% del ingreso neto</strong> como pago mensual máximo.
                </p>
              </div>

              <motion.button onClick={handleCalc} disabled={!ingreso || calculando}
                whileHover={{ scale: ingreso ? 1.02 : 1 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-gold text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {calculando ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculando...</>) : (<><Calculator size={18} />Calcular capacidad de crédito<ChevronRight size={18} /></>)}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <AnimatePresence mode="wait">
                {!resultados ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl p-12 border border-cream-border shadow-sm text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-cream-dark border border-cream-border flex items-center justify-center mx-auto mb-6">
                      <Building2 size={36} className="text-gold/60" />
                    </div>
                    <div className="font-bold text-ink text-lg mb-2">Comparativa de bancos</div>
                    <p className="text-ink-40 text-sm">Ingresa los datos y compara cuánto te presta cada banco con las tasas actuales.</p>
                  </motion.div>
                ) : (
                  <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
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
                    <div className="space-y-3">
                      {resultados.map((r, i) => (
                        <motion.div key={r.nombre} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                          className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${r.viable ? 'border-cream-border hover:border-gold/30 hover:shadow-sm' : 'border-red-100 bg-red-50/50 opacity-60'}`}
                        >
                          <div className="text-2xl flex-shrink-0">{r.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-ink text-sm">{r.nombre}</span>
                              <span className="text-ink-20 text-xs">{r.tasa}% tasa nominal</span>
                            </div>
                            {r.viable ? (
                              <div className="flex gap-4 flex-wrap">
                                <div><div className="text-ink-20 text-[10px] uppercase tracking-wider">Crédito máx.</div><div className="font-bold text-green-700 text-sm">{fmt(r.maxCredito)}</div></div>
                                <div><div className="text-ink-20 text-[10px] uppercase tracking-wider">Valor propiedad</div><div className="font-bold text-gold-dark text-sm">{fmt(r.valorPropiedad)}</div></div>
                                <div><div className="text-ink-20 text-[10px] uppercase tracking-wider">Mensualidad</div><div className="font-semibold text-ink-60 text-sm">{fmt(r.mensualidad)}/mes</div></div>
                              </div>
                            ) : (
                              <div className="text-red-500 text-xs font-medium flex items-center gap-1"><AlertCircle size={12} /> No aplica por edad o ingreso</div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.a href="https://wa.me/524422004936?text=Hola%2C%20usé%20el%20precalificador%20y%20me%20gustaría%20hablar%20con%20un%20asesor."
                      target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }}
                      className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-[#25D166]/10 border border-[#25D166]/30 hover:bg-[#25D166]/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#25D166]/20 flex items-center justify-center flex-shrink-0"><TrendingUp size={18} className="text-[#25D366]" /></div>
                      <div className="flex-1"><div className="font-bold text-ink text-sm">¿Listo para encontrar tu propiedad?</div><div className="text-ink-40 text-xs">Habla con un asesor NH Group ahora</div></div>
                      <ChevronRight size={16} className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ══ MODO INFONAVIT ══ */}
        {modo === 'infonavit' && (
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-cream-border shadow-sm"
            >
              {/* Badge INFONAVIT */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00723F]/10 flex items-center justify-center">
                  <Home size={20} className="text-[#00723F]" />
                </div>
                <div>
                  <div className="font-bold text-ink text-base">Crédito INFONAVIT</div>
                  <div className="text-ink-20 text-xs">Tasas desde 1% anual según salario · 2025</div>
                </div>
              </div>

              {/* Ventaja INFONAVIT */}
              <div className="flex gap-3 p-4 rounded-xl bg-green-50 border border-green-200 mb-6">
                <span className="text-green-600 text-lg flex-shrink-0">✅</span>
                <p className="text-green-800 text-xs leading-relaxed">
                  INFONAVIT ofrece <strong>tasas mucho más bajas que los bancos</strong> (desde 1% anual) y descuenta directo de tu nómina. Además puedes usar tu subcuenta de vivienda como enganche.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Salario mensual neto *</label>
                  <input type="number" value={iIngreso} onChange={e => setIIngreso(e.target.value)} placeholder="Ej: 18,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Ahorro en subcuenta INFONAVIT</label>
                  <input type="number" value={iSubcuenta} onChange={e => setISubcuenta(e.target.value)} placeholder="Ej: 50,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Enganche adicional</label>
                  <input type="number" value={iEnganche} onChange={e => setIEnganche(e.target.value)} placeholder="Ej: 100,000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-2">Edad del solicitante</label>
                  <input type="number" value={iEdad} onChange={e => setIEdad(e.target.value)} placeholder="Ej: 35" className={inputClass} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Plazo del crédito</label>
                <div className="flex gap-2">
                  {[10, 15, 20, 25, 30].map(p => (
                    <button key={p} onClick={() => setIPlazo(p)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        iPlazo === p ? 'bg-[#00723F]/10 border-[#00723F] text-[#00723F]' : 'bg-white border-cream-border text-ink-40 hover:border-[#00723F]/50'
                      }`}
                    >{p} años</button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-blue-700 text-xs leading-relaxed">
                  La tasa INFONAVIT depende de tu salario. A mayor salario, mayor tasa (pero siempre menor que la banca). El crédito máximo actual es <strong>$2,800,000 MXN</strong>.
                </p>
              </div>

              <motion.button onClick={handleCalcInfonavit} disabled={!iIngreso || iCalc}
                whileHover={{ scale: iIngreso ? 1.02 : 1 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-[#00723F] text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {iCalc ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculando...</>) : (<><Home size={18} />Calcular crédito INFONAVIT<ChevronRight size={18} /></>)}
              </motion.button>
            </motion.div>

            {/* Resultados INFONAVIT */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <AnimatePresence mode="wait">
                {!iRes ? (
                  <motion.div key="empty-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl p-12 border border-cream-border shadow-sm text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
                      <Home size={36} className="text-[#00723F]/60" />
                    </div>
                    <div className="font-bold text-ink text-lg mb-2">Tu potencial con INFONAVIT</div>
                    <p className="text-ink-40 text-sm">Ingresa tu salario y el saldo de tu subcuenta para ver cuánto crédito puedes obtener.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                      {[['Salario ≤ $8,800/mes','Tasa 1% anual'],['Salario hasta $18,000/mes','Tasa 3-4% anual'],['Subcuenta = tu enganche','Sin necesidad de ahorro extra'],['Descuento directo de nómina','Sin trámites bancarios']].map(([t,d])=>(
                        <div key={t} className="flex gap-2 p-3 bg-green-50 rounded-xl">
                          <span className="text-green-600 text-sm">✓</span>
                          <div><div className="text-ink text-xs font-bold">{t}</div><div className="text-ink-40 text-[10px]">{d}</div></div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="results-info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {iRes.viable ? (
                      <>
                        {/* Tasa badge */}
                        <div className="bg-[#00723F] rounded-2xl p-5 mb-4 text-white shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <div className="text-white/70 text-xs uppercase tracking-wider font-semibold mb-1">Tu tasa INFONAVIT</div>
                              <div className="font-bold text-4xl">{iRes.tasa}%<span className="text-lg font-normal text-white/70"> anual</span></div>
                              <div className="text-white/70 text-xs mt-1">vs ~9.4% de la banca → tú ganas</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white/70 text-xs uppercase tracking-wider mb-1">Plazo</div>
                              <div className="font-bold text-lg">{iPlazo} años</div>
                            </div>
                          </div>
                        </div>

                        {/* Resultados */}
                        <div className="space-y-3 mb-4">
                          {[
                            { label: 'Crédito INFONAVIT', value: fmt(iRes.creditoSinSubcuenta), color: 'text-[#00723F]', note: 'Monto que te presta INFONAVIT' },
                            { label: 'Subcuenta de vivienda', value: fmt(iRes.subcuenta), color: 'text-blue-600', note: 'Tu ahorro acumulado (enganche)' },
                            { label: 'Valor total de propiedad', value: fmt(iRes.valorPropiedad), color: 'text-gold-dark', note: 'Crédito + subcuenta + enganche' },
                            { label: 'Pago mensual estimado', value: `${fmt(iRes.mensualidad)}/mes`, color: 'text-ink', note: 'Descuento directo de nómina' },
                          ].map(item => (
                            <div key={item.label} className="bg-white rounded-2xl border border-cream-border p-4 flex items-center justify-between">
                              <div>
                                <div className="font-bold text-ink text-sm">{item.label}</div>
                                <div className="text-ink-20 text-xs">{item.note}</div>
                              </div>
                              <div className={`font-bold text-lg ${item.color}`}>{item.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-4">
                          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-800 text-xs leading-relaxed">
                            Este es un estimado. El monto exacto depende de tus puntos bimestrales, años cotizando y la valuación del inmueble. Un asesor NH Group puede ayudarte a tramitarlo.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white rounded-3xl p-8 border border-red-100 text-center">
                        <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
                        <div className="font-bold text-ink mb-2">No aplica por edad</div>
                        <p className="text-ink-40 text-sm">INFONAVIT requiere que al término del crédito tengas máximo 65 años. Considera un plazo más corto.</p>
                      </div>
                    )}

                    <motion.a href="https://wa.me/524422004936?text=Hola%2C%20usé%20el%20precalificador%20de%20INFONAVIT%20y%20me%20gustaría%20información."
                      target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D166]/10 border border-[#25D166]/30 hover:bg-[#25D166]/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#25D166]/20 flex items-center justify-center flex-shrink-0"><TrendingUp size={18} className="text-[#25D366]" /></div>
                      <div className="flex-1"><div className="font-bold text-ink text-sm">Iniciar trámite INFONAVIT</div><div className="text-ink-40 text-xs">Un asesor NH Group te acompaña en todo el proceso</div></div>
                      <ChevronRight size={16} className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
