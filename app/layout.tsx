import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NHGroup Bienes Raíces | Querétaro · Toluca',
  description: 'Inmobiliaria con +17 años en el mercado. Rentas, preventas, terrenos, casas, departamentos, construcción e inversión estratégica. Operaciones honestas desde el primer día.',
  keywords: 'bienes raíces, inmobiliaria, Querétaro, Toluca, casas en venta, departamentos, terrenos, inversión inmobiliaria, NHGroup',
  authors: [{ name: 'NHGroup Bienes Raíces' }],
  openGraph: {
    title: 'NHGroup Bienes Raíces | Querétaro · Toluca',
    description: 'Operaciones honestas desde el primer día. +17 años en el mercado inmobiliario.',
    url: 'https://nhgroup.com.mx',
    siteName: 'NHGroup',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHGroup Bienes Raíces',
    description: 'Operaciones honestas desde el primer día.',
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-dark text-white antialiased">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}
